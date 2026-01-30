import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { SitFisForm } from "@/components/sitfis/SitFisForm";
import { SitFisStatusCard } from "@/components/sitfis/SitFisStatusCard";
import { SitFisRelatorioCard } from "@/components/sitfis/SitFisRelatorioCard";
import { getSitFisWebhookUrl, getContratanteCnpj, getAutorPedidoCnpj } from "@/utils/config";
import type { SitFisRequest, SitFisWorkflowResponse } from "@/types/sitfis";

type Etapa = "processando" | "concluido" | "erro";

// Converte Blob para Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove o prefixo "data:application/pdf;base64,"
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const RelatorioSitFiscalPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (formData: SitFisRequest) => {
    setIsLoading(true);
    setEtapa("processando");
    setPdfBase64("");
    setErrorMessage("");

    const webhookUrl = getSitFisWebhookUrl();
    const contratanteCnpj = getContratanteCnpj();
    const autorPedidoCnpj = getAutorPedidoCnpj();

    if (!webhookUrl) {
      toast({
        title: "Configuração Incompleta",
        description: "Configure a URL do webhook antes de continuar.",
        variant: "destructive",
      });
      setEtapa("erro");
      setErrorMessage("URL de webhook não configurada");
      setIsLoading(false);
      return;
    }

    if (!contratanteCnpj || !autorPedidoCnpj) {
      toast({
        title: "Configuração Incompleta",
        description: "Configure os CNPJs do contratante e autor do pedido.",
        variant: "destructive",
      });
      setEtapa("erro");
      setErrorMessage("CNPJs não configurados");
      setIsLoading(false);
      return;
    }

    try {
      // Payload para o workflow n8n completo
      const payload = {
        cpfContribuinte: formData.cnpj.replace(/\D/g, ""),
        cnpjContratante: contratanteCnpj,
        cnpjAutor: autorPedidoCnpj,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      let pdfBase64Result = "";

      if (contentType.includes("application/pdf")) {
        // Resposta binária (PDF direto do n8n)
        const blob = await response.blob();
        pdfBase64Result = await blobToBase64(blob);
      } else {
        // Resposta JSON (formato legado ou erro)
        const rawData = await response.json();
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
      console.error("Erro ao gerar relatório:", error);
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="bg-background/10 text-primary-foreground border-border/20 hover:bg-background/20"
            >
              Voltar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/servicos/relatorio-situacao-fiscal/configuracoes")}
              className="bg-background/10 text-primary-foreground border-border/20 hover:bg-background/20"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
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
