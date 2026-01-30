import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatCNPJ, unformatCNPJ, validateCNPJ } from "@/utils/formatters";

const WEBHOOK_URL_KEY = "n8n_gerar_das_url";
const CONTRATANTE_CNPJ_KEY = "integra_contratante_cnpj";
const AUTOR_PEDIDO_CNPJ_KEY = "integra_autor_pedido_cnpj";

const ConfiguracoesPage = () => {
  const navigate = useNavigate();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [contratanteCnpj, setContratanteCnpj] = useState("");
  const [autorPedidoCnpj, setAutorPedidoCnpj] = useState("");

  useEffect(() => {
    const savedUrl = localStorage.getItem(WEBHOOK_URL_KEY) || "";
    const savedContratante = localStorage.getItem(CONTRATANTE_CNPJ_KEY) || "";
    const savedAutor = localStorage.getItem(AUTOR_PEDIDO_CNPJ_KEY) || "";
    
    setWebhookUrl(savedUrl);
    setContratanteCnpj(savedContratante ? formatCNPJ(savedContratante) : "");
    setAutorPedidoCnpj(savedAutor ? formatCNPJ(savedAutor) : "");
  }, []);

  const handleContratanteCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setContratanteCnpj(formatted);
  };

  const handleAutorPedidoCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setAutorPedidoCnpj(formatted);
  };

  const handleSave = () => {
    if (!webhookUrl.trim()) {
      toast.error("URL não pode estar vazia");
      return;
    }

    try {
      new URL(webhookUrl);
    } catch {
      toast.error("URL inválida", {
        description: "Por favor, insira uma URL válida (ex: https://...)",
      });
      return;
    }

    if (!contratanteCnpj.trim()) {
      toast.error("CNPJ do Contratante é obrigatório");
      return;
    }

    if (!validateCNPJ(contratanteCnpj)) {
      toast.error("CNPJ do Contratante inválido", {
        description: "Digite um CNPJ válido com 14 dígitos",
      });
      return;
    }

    if (!autorPedidoCnpj.trim()) {
      toast.error("CNPJ do Autor do Pedido é obrigatório");
      return;
    }

    if (!validateCNPJ(autorPedidoCnpj)) {
      toast.error("CNPJ do Autor do Pedido inválido", {
        description: "Digite um CNPJ válido com 14 dígitos",
      });
      return;
    }

    localStorage.setItem(WEBHOOK_URL_KEY, webhookUrl);
    localStorage.setItem(CONTRATANTE_CNPJ_KEY, unformatCNPJ(contratanteCnpj));
    localStorage.setItem(AUTOR_PEDIDO_CNPJ_KEY, unformatCNPJ(autorPedidoCnpj));
    
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-header text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">FMG – Integra Contador</h1>
              <p className="text-sm opacity-90">Configurações</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-background/10 text-primary-foreground border-border/20 hover:bg-background/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Configuração do Webhook N8N</CardTitle>
              <CardDescription>
                Configure a URL do webhook que será usado para gerar o DAS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL do Webhook N8N</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  placeholder="https://seu-n8n.com/webhook/gerar-das"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Esta URL será usada para enviar as solicitações de geração de DAS
                </p>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold">Dados da API Integra Contador</h3>
                <p className="text-sm text-muted-foreground">
                  Configure os dados que serão enviados na requisição para a API
                </p>

                <div className="space-y-2">
                  <Label htmlFor="contratante-cnpj">CNPJ do Contratante *</Label>
                  <Input
                    id="contratante-cnpj"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={contratanteCnpj}
                    onChange={handleContratanteCnpjChange}
                    maxLength={18}
                  />
                  <p className="text-xs text-muted-foreground">
                    CNPJ da empresa contratante do serviço Integra Contador
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="autor-pedido-cnpj">CNPJ do Autor do Pedido *</Label>
                  <Input
                    id="autor-pedido-cnpj"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={autorPedidoCnpj}
                    onChange={handleAutorPedidoCnpjChange}
                    maxLength={18}
                  />
                  <p className="text-xs text-muted-foreground">
                    CNPJ do responsável pela solicitação dos dados
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-sm">Formato de Envio - API Integra Contador:</h3>
                <p className="text-xs text-muted-foreground">
                  Os dados serão enviados no formato conforme especificação da API GERARDAS12 (sistema PGDASD), 
                  incluindo contratante, autorPedidoDados, contribuinte, idSistema e idServico.
                </p>
              </div>

              <Button onClick={handleSave} className="w-full" size="lg">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-12 py-6 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FMG – Integra Contador | Painel de Geração de DAS</p>
        </div>
      </footer>
    </div>
  );
};

export default ConfiguracoesPage;
