import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSettings, AppSettings } from "@/hooks/useAppSettings";
import { Shield, ArrowLeft, Save, Loader2, Webhook, Building2 } from "lucide-react";
import { toast } from "sonner";

const ConfiguracoesPage = () => {
  const navigate = useNavigate();
  const { settings, isLoading, saveSettings } = useAppSettings();
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (key: keyof AppSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const result = await saveSettings(formData);

    if (result.success) {
      toast.success("Configurações salvas com sucesso!");
    } else {
      toast.error("Erro ao salvar configurações");
    }

    setIsSaving(false);
  };

  const formatCnpj = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  if (isLoading) {
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
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
              <p className="text-sm opacity-90">Apenas administradores</p>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Webhooks Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-primary" />
                <CardTitle>Webhooks n8n</CardTitle>
              </div>
              <CardDescription>
                URLs dos workflows n8n para cada serviço integrado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook_gerar_das">URL Gerar DAS</Label>
                <Input
                  id="webhook_gerar_das"
                  type="url"
                  placeholder="https://seu-n8n.com/webhook/..."
                  value={formData.webhook_gerar_das}
                  onChange={(e) => handleChange("webhook_gerar_das", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook_sitfis">URL Relatório Situação Fiscal</Label>
                <Input
                  id="webhook_sitfis"
                  type="url"
                  placeholder="https://seu-n8n.com/webhook/..."
                  value={formData.webhook_sitfis}
                  onChange={(e) => handleChange("webhook_sitfis", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook_cnd">URL CND Federal</Label>
                <Input
                  id="webhook_cnd"
                  type="url"
                  placeholder="https://seu-n8n.com/webhook/..."
                  value={formData.webhook_cnd}
                  onChange={(e) => handleChange("webhook_cnd", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Company Data Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Dados do Escritório</CardTitle>
              </div>
              <CardDescription>
                Informações do contratante para as requisições à API Integra Contador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cnpj_contratante">CNPJ Contratante</Label>
                <Input
                  id="cnpj_contratante"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj_contratante}
                  onChange={(e) => handleChange("cnpj_contratante", formatCnpj(e.target.value))}
                  maxLength={18}
                />
                <p className="text-xs text-muted-foreground">
                  CNPJ do escritório contratante do serviço
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj_autor_pedido">CNPJ Autor do Pedido</Label>
                <Input
                  id="cnpj_autor_pedido"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={formData.cnpj_autor_pedido}
                  onChange={(e) => handleChange("cnpj_autor_pedido", formatCnpj(e.target.value))}
                  maxLength={18}
                />
                <p className="text-xs text-muted-foreground">
                  CNPJ do responsável pela solicitação
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FMG – Integra Contador | Configurações do Sistema</p>
        </div>
      </footer>
    </div>
  );
};

export default ConfiguracoesPage;
