import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { CNDForm } from "@/components/cnd/CNDForm";
import { CNDStatusCard } from "@/components/cnd/CNDStatusCard";
import { CNDResultCard } from "@/components/cnd/CNDResultCard";
import { getCNDWebhookUrl } from "@/utils/config";
import type { CNDRequest, CNDWorkflowResponse } from "@/types/cnd";

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

const CNDFederalPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (formData: CNDRequest) => {
    setIsLoading(true);
    setEtapa("processando");
    setPdfBase64("");
    setErrorMessage("");

    const webhookUrl = getCNDWebhookUrl();

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

    try {
      // Payload para o workflow n8n (rota emitircnd no Switch)
      const payload = {
        idServico: "emitircnd",
        CNPJ: formData.cnpj.replace(/\D/g, ""),
        tipoPessoa: formData.tipoPessoa,
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
        const data: CNDWorkflowResponse = Array.isArray(rawData) ? rawData[0] : rawData;

        if (data.sucesso && data.pdfBase64) {
          pdfBase64Result = data.pdfBase64;
        } else {
          const errorMsg = data.erro || data.mensagem || "Erro ao emitir CND";
          throw new Error(errorMsg);
        }
      }

      if (pdfBase64Result) {
        setPdfBase64(pdfBase64Result);
        setEtapa("concluido");
        toast({
          title: "CND Emitida",
          description: "A Certidão Negativa de Débitos foi emitida com sucesso!",
        });
      } else {
        throw new Error("Nenhum PDF retornado pelo servidor");
      }
    } catch (error) {
      console.error("Erro ao emitir CND:", error);
      toast({
        title: "Erro de Rede",
        description: "Não foi possível conectar ao servidor. Verifique sua conexão.",
        variant: "destructive",
      });
      setEtapa("erro");
      setErrorMessage(error instanceof Error ? error.message : "Erro de conexão");
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
            <ShieldCheck className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">FMG – Integra Contador</h1>
              <p className="text-sm opacity-90">Emitir CND Federal</p>
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
              onClick={() => navigate("/servicos/cnd-federal/configuracoes")}
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
                  Informe os dados para emitir a Certidão Negativa de Débitos Federal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CNDForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Resultados */}
          <div className="space-y-6">
            {!etapa && (
              <Card className="border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <ShieldCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Preencha os dados e clique em "Emitir CND Federal" para começar
                  </p>
                </CardContent>
              </Card>
            )}

            {etapa && etapa !== "concluido" && (
              <CNDStatusCard 
                etapa={etapa} 
                mensagem={errorMessage}
              />
            )}

            {etapa === "concluido" && pdfBase64 && (
              <CNDResultCard pdfBase64={pdfBase64} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FMG – Integra Contador | CND Federal</p>
        </div>
      </footer>
    </div>
  );
};

export default CNDFederalPage;
