import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, FileSpreadsheet, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { formatCNPJ, unformatCNPJ, validateCNPJ } from "@/utils/formatters";

const WEBHOOK_URL_KEY = "n8n_gerar_das_url";
const CONTRATANTE_CNPJ_KEY = "integra_contratante_cnpj";
const AUTOR_PEDIDO_CNPJ_KEY = "integra_autor_pedido_cnpj";

const ConfiguracoesGerarDas = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [contratanteCnpj, setContratanteCnpj] = useState("");
  const [autorPedidoCnpj, setAutorPedidoCnpj] = useState("");

  useEffect(() => {
    const savedUrl = localStorage.getItem(WEBHOOK_URL_KEY) || "";
    const savedContratanteCnpj = localStorage.getItem(CONTRATANTE_CNPJ_KEY) || "";
    const savedAutorPedidoCnpj = localStorage.getItem(AUTOR_PEDIDO_CNPJ_KEY) || "";

    setWebhookUrl(savedUrl);
    setContratanteCnpj(formatCNPJ(savedContratanteCnpj));
    setAutorPedidoCnpj(formatCNPJ(savedAutorPedidoCnpj));
  }, []);

  const handleContratanteCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContratanteCnpj(formatCNPJ(e.target.value));
  };

  const handleAutorPedidoCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutorPedidoCnpj(formatCNPJ(e.target.value));
  };

  const handleSave = () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Erro de Validação",
        description: "A URL do webhook é obrigatória",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(webhookUrl);
    } catch {
      toast({
        title: "Erro de Validação",
        description: "A URL do webhook deve ser válida",
        variant: "destructive",
      });
      return;
    }

    if (!validateCNPJ(contratanteCnpj)) {
      toast({
        title: "Erro de Validação",
        description: "CNPJ do Contratante inválido",
        variant: "destructive",
      });
      return;
    }

    if (!validateCNPJ(autorPedidoCnpj)) {
      toast({
        title: "Erro de Validação",
        description: "CNPJ do Autor do Pedido inválido",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem(WEBHOOK_URL_KEY, webhookUrl.trim());
    localStorage.setItem(CONTRATANTE_CNPJ_KEY, unformatCNPJ(contratanteCnpj));
    localStorage.setItem(AUTOR_PEDIDO_CNPJ_KEY, unformatCNPJ(autorPedidoCnpj));

    toast({
      title: "Configurações Salvas",
      description: "As configurações do Gerar DAS foram salvas com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/servicos/gerar-das" className="hover:text-foreground transition-colors">
              Gerar DAS
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Configurações</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Configurações</h1>
                <p className="text-muted-foreground">Gerar DAS</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/servicos/gerar-das">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Início
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Configuração do Webhook e CNPJs</CardTitle>
            <CardDescription>
              Configure a URL do webhook do n8n e os CNPJs necessários para gerar o DAS
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">URL Webhook n8n - Gerar DAS *</Label>
              <Input
                id="webhookUrl"
                type="url"
                placeholder="https://seu-n8n.com/webhook/gerar-das"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Endpoint para gerar DAS (GERARDAS12 via /Emitir)
              </p>
            </div>

            <div className="border-t pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contratanteCnpj">CNPJ do Contratante *</Label>
                <Input
                  id="contratanteCnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={contratanteCnpj}
                  onChange={handleContratanteCnpjChange}
                  maxLength={18}
                />
                <p className="text-sm text-muted-foreground">
                  CNPJ da empresa contratante do serviço
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="autorPedidoCnpj">CNPJ do Autor do Pedido *</Label>
                <Input
                  id="autorPedidoCnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={autorPedidoCnpj}
                  onChange={handleAutorPedidoCnpjChange}
                  maxLength={18}
                />
                <p className="text-sm text-muted-foreground">
                  CNPJ do responsável pela solicitação (mesmo do contratante se for o caso)
                </p>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-gradient-primary hover:opacity-90">
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>

        <footer className="text-center mt-16 text-sm text-muted-foreground">
          <p>© 2024 FMG Integra Contador. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default ConfiguracoesGerarDas;
