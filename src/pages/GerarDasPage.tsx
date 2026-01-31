import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DasForm } from "@/components/DasForm";
import { DasStatusCard } from "@/components/DasStatusCard";
import { DasResumoCard } from "@/components/DasResumoCard";
import { DasComposicaoTable } from "@/components/DasComposicaoTable";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { Loader2, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { DasRequest, DasResponse } from "@/types/das";
import { getWebhookUrl, getContratanteCnpj, getAutorPedidoCnpj } from "@/utils/config";
import { logger } from "@/utils/logger";

const GerarDasPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [response, setResponse] = useState<DasResponse | null>(null);
  const [config, setConfig] = useState({
    webhookUrl: "",
    contratanteCnpj: "",
    autorPedidoCnpj: "",
  });

  useEffect(() => {
    const loadConfig = async () => {
      const [webhookUrl, contratanteCnpj, autorPedidoCnpj] = await Promise.all([
        getWebhookUrl(),
        getContratanteCnpj(),
        getAutorPedidoCnpj(),
      ]);
      setConfig({ webhookUrl, contratanteCnpj, autorPedidoCnpj });
      setIsLoadingConfig(false);
    };
    loadConfig();
  }, []);

  const handleSubmit = async (data: DasRequest) => {
    if (!config.webhookUrl) {
      toast.error("URL do webhook não configurada", {
        description: "Peça ao administrador para configurar o sistema",
      });
      return;
    }

    if (!config.contratanteCnpj || !config.autorPedidoCnpj) {
      toast.error("Configurações incompletas", {
        description: "Peça ao administrador para configurar os CNPJs",
      });
      return;
    }

    setIsLoading(true);
    setResponse(null);

    // Monta o payload conforme especificação da API Integra Contador (GERARDAS12)
    const payload = {
      contratante: {
        numero: config.contratanteCnpj,
        tipo: 2
      },
      autorPedidoDados: {
        numero: config.autorPedidoCnpj,
        tipo: 2
      },
      contribuinte: {
        numero: data.cnpj,
        tipo: 2
      },
      idSistema: "PGDASD",
      idServico: "GERARDAS12",
      versaoSistema: "1.0",
      dados: {
        periodoApuracao: data.periodoApuracao,
        ...(data.dataConsolidacao && { dataConsolidacao: data.dataConsolidacao })
      }
    };

    try {
      const res = await fetch(config.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData: DasResponse = await res.json();
      setResponse(responseData);

      if (responseData.status >= 200 && responseData.status < 300) {
        toast.success("DAS gerado com sucesso!");
      } else {
        toast.error("Erro ao gerar DAS", {
          description: responseData.mensagens[0]?.texto || "Erro desconhecido",
        });
      }
    } catch (error) {
      logger.error("Erro ao chamar webhook:", error);
      toast.error("Erro de conexão", {
        description: "Não foi possível conectar ao servidor. Tente novamente.",
      });
      setResponse({
        status: 0,
        mensagens: [
          {
            codigo: "ERRO_REDE",
            texto: "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
          },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-header text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">FMG – Integra Contador</h1>
              <p className="text-sm opacity-90">Painel de Geração de DAS</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-background/10 text-primary-foreground border-border/20 hover:bg-background/20"
          >
            Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Solicitar Geração de DAS</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para gerar o DAS de uma competência do Simples
                  Nacional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DasForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {isLoading && (
              <Card className="shadow-lg">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg font-medium">Gerando DAS, aguarde...</p>
                    <p className="text-sm text-muted-foreground">
                      Processando sua solicitação
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isLoading && !response && (
              <Card className="shadow-lg">
                <CardContent className="py-12">
                  <div className="text-center space-y-2">
                    <FileSpreadsheet className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      Preencha os dados ao lado para gerar o DAS de uma competência do
                      Simples Nacional.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isLoading && response && (
              <div className="space-y-6">
                <DasStatusCard status={response.status} mensagens={response.mensagens} />

                {response.dados?.das && response.dados.das.length > 0 && (
                  <>
                    <PdfDownloadButton das={response.dados.das[0]} />
                    <DasResumoCard das={response.dados.das[0]} />
                    <DasComposicaoTable
                      composicao={response.dados.das[0].detalhamento.composicao}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FMG – Integra Contador | Painel de Geração de DAS</p>
        </div>
      </footer>
    </div>
  );
};

export default GerarDasPage;
