import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const CND_WEBHOOK_URL_KEY = "cnd_webhook_url";

const ConfiguracoesCND = () => {
  const [webhookUrl, setWebhookUrl] = useState("");

  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem(CND_WEBHOOK_URL_KEY) || "";
    setWebhookUrl(savedWebhookUrl);
  }, []);

  const handleSave = () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Erro de Validação",
        description: "A URL do webhook CND é obrigatória",
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

    localStorage.setItem(CND_WEBHOOK_URL_KEY, webhookUrl.trim());

    toast({
      title: "Configurações Salvas",
      description: "As configurações da CND Federal foram salvas com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/servicos/cnd-federal" className="hover:text-foreground transition-colors">
              CND Federal
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Configurações</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Configurações</h1>
                <p className="text-muted-foreground">CND Federal</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/servicos/cnd-federal">
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
            <CardTitle>Configuração do Webhook</CardTitle>
            <CardDescription>
              Configure a URL do workflow n8n para emissão de CND Federal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">URL Webhook CND Federal *</Label>
              <Input
                id="webhookUrl"
                type="url"
                placeholder="https://seu-n8n.com/webhook/cnd-federal"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Endpoint do workflow que emite a Certidão Negativa de Débitos (idServico: emitircnd)
              </p>
            </div>

            <Button onClick={handleSave} className="w-full bg-gradient-primary hover:opacity-90">
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>

        <footer className="text-center mt-16 text-sm text-muted-foreground">
          <p>© 2025 FMG Integra Contador. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default ConfiguracoesCND;
