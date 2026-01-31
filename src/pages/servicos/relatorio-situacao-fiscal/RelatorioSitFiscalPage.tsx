import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { SitFisForm } from "@/components/sitfis/SitFisForm";
import { SitFisStatusCard } from "@/components/sitfis/SitFisStatusCard";
import { SitFisRelatorioCard } from "@/components/sitfis/SitFisRelatorioCard";
import { getSitFisWebhookUrl, getContratanteCnpj, getAutorPedidoCnpj } from "@/utils/config";
import type { SitFisRequest, SitFisWorkflowResponse } from "@/types/sitfis";
import { logger } from "@/utils/logger";

type Etapa = "processando" | "concluido" | "erro";

// Detecta se o conteúdo é PDF pelos primeiros bytes (magic number %PDF)
const isPdfContent = (arrayBuffer: ArrayBuffer): boolean => {
  const uint8Array = new Uint8Array(arrayBuffer);
  return (
    uint8Array[0] === 0x25 && // %
    uint8Array[1] === 0x50 && // P
    uint8Array[2] === 0x44 && // D
    uint8Array[3] === 0x46    // F
  );
};

// Converte ArrayBuffer para Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const RelatorioSitFiscalPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [config, setConfig] = useState({
    webhookUrl: "",
    contratanteCnpj: "",
    autorPedidoCnpj: "",
  });

  useEffect(() => {
    const loadConfig = async () => {
      const [webhookUrl, contratanteCnpj, autorPedidoCnpj] = await Promise.all([
        getSitFisWebhookUrl(),
        getContratanteCnpj(),
        getAutorPedidoCnpj(),
      ]);
      setConfig({ webhookUrl, contratanteCnpj, autorPedidoCnpj });
      setIsLoadingConfig(false);
    };
    loadConfig();
  }, []);

  const handleSubmit = async (formData: SitFisRequest) => {
    setIsLoading(true);
    setEtapa("processando");
    setPdfBase64("");
    setErrorMessage("");

    if (!config.webhookUrl) {
      toast({
        title: "Configuração Incompleta",
        description: "Peça ao administrador para configurar o webhook.",
        variant: "destructive",
      });
      setEtapa("erro");
      setErrorMessage("URL de webhook não configurada");
      setIsLoading(false);
      return;
    }

    if (!config.contratanteCnpj || !config.autorPedidoCnpj) {
      toast({
        title: "Configuração Incompleta",
        description: "Peça ao administrador para configurar os CNPJs.",
        variant: "destructive",
      });
      setEtapa("erro");
      setErrorMessage("CNPJs não configurados");
      setIsLoading(false);
      return;
    }

    try {
      // Payload para o workflow n8n completo (com idServico para o Switch)
      const payload = {
        idServico: "SOLICITAR",
        cpfContribuinte: formData.cnpj.replace(/\D/g, ""),
        cnpjContratante: config.contratanteCnpj,
        cnpjAutor: config.autorPedidoCnpj,
      };

      const response = await fetch(config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Obter resposta como ArrayBuffer para inspeção dos bytes
      const arrayBuffer = await response.arrayBuffer();
      let pdfBase64Result = "";

      if (isPdfContent(arrayBuffer)) {
        // Resposta é PDF binário (independente do content-type header)
        pdfBase64Result = arrayBufferToBase64(arrayBuffer);
      } else {
        // Tentar processar como JSON
        const textDecoder = new TextDecoder();
        const jsonString = textDecoder.decode(arrayBuffer);
        const rawData = JSON.parse(jsonString);
        const data: SitFisWorkflowResponse = Array.isArray(rawData) ? rawData[0] : rawData;

        if (data.sucesso && data.pdfBase64) {
          pdfBase64Result = data.pdfBase64;
        } else {
          const errorMsg = data.erro || data.mensagem || "Erro ao gerar relatório";
          throw new Error(errorMsg);
        }
      }

      if (pdfBase64Result) {
        setPdfBase64(pdfBase64Result);
        setEtapa("concluido");
        toast({
          title: "Relatório Gerado",
          description: "O relatório de situação fiscal foi gerado com sucesso!",
        });
      } else {
        throw new Error("Nenhum PDF retornado pelo servidor");
      }
    } catch (error) {
      logger.error("Erro ao gerar relatório:", error);
      toast({
        title: "Erro de Rede",
        description: "Não foi possível conectar ao servidor. Verifique sua conexão.",
        variant: "destructive",
      });
      setEtapa("erro");
      setErrorMessage("Erro de conexão");
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
            <FileCheck className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">FMG – Integra Contador</h1>
              <p className="text-sm opacity-90">Relatório de Situação Fiscal</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Formulário */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Dados do Contribuinte</CardTitle>
                <CardDescription>
                  Informe os dados para gerar o relatório de situação fiscal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SitFisForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Resultados */}
          <div className="space-y-6">
            {!etapa && (
              <Card className="border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <FileCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Preencha os dados e clique em "Gerar Relatório" para começar
                  </p>
                </CardContent>
              </Card>
            )}

            {etapa && etapa !== "concluido" && (
              <SitFisStatusCard 
                etapa={etapa} 
                mensagem={errorMessage}
              />
            )}

            {etapa === "concluido" && pdfBase64 && (
              <SitFisRelatorioCard pdfBase64={pdfBase64} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FMG – Integra Contador | Relatório de Situação Fiscal</p>
        </div>
      </footer>
    </div>
  );
};

export default RelatorioSitFiscalPage;
