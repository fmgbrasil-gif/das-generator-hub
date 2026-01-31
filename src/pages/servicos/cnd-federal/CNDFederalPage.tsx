import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { CNDForm } from "@/components/cnd/CNDForm";
import { CNDStatusCard } from "@/components/cnd/CNDStatusCard";
import { CNDResultCard } from "@/components/cnd/CNDResultCard";
import { getCNDWebhookUrl } from "@/utils/config";
import type { CNDRequest, CNDWorkflowResponse } from "@/types/cnd";

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

const CNDFederalPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [webhookUrl, setWebhookUrl] = useState("");

  useEffect(() => {
    const loadConfig = async () => {
      const url = await getCNDWebhookUrl();
      setWebhookUrl(url);
      setIsLoadingConfig(false);
    };
    loadConfig();
  }, []);

  const handleSubmit = async (formData: CNDRequest) => {
    setIsLoading(true);
    setEtapa("processando");
    setPdfBase64("");
    setErrorMessage("");

    if (!webhookUrl) {
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
            <ShieldCheck className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">FMG – Integra Contador</h1>
              <p className="text-sm opacity-90">Emitir CND Federal</p>
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
