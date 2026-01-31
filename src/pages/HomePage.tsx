import { FileSpreadsheet, FileCheck, Sparkles, ShieldCheck } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { getWebhookUrl, getContratanteCnpj, getAutorPedidoCnpj, getSitFisWebhookUrl, getCNDWebhookUrl } from "@/utils/config";

const HomePage = () => {
  // Verificar se Gerar DAS está configurado
  const isGerarDasConfigured = !!(getWebhookUrl() && getContratanteCnpj() && getAutorPedidoCnpj());
  
  // Verificar se Relatório Situação Fiscal está configurado
  const isSitFisConfigured = !!(getSitFisWebhookUrl() && getContratanteCnpj() && getAutorPedidoCnpj());

  // Verificar se CND Federal está configurado
  const isCNDConfigured = !!getCNDWebhookUrl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.05),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-7xl relative z-10">
        {/* Header */}
        <header className="text-center mb-16 lg:mb-24 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
            FMG – Integra Contador
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Painel de Serviços Integrados
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Sistema operacional</span>
          </div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-20">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <ServiceCard
              title="Gerar DAS"
              description="Gere o DAS de competências do Simples Nacional de forma rápida e segura"
              icon={FileSpreadsheet}
              servicePath="/servicos/gerar-das"
              isConfigured={isGerarDasConfigured}
              iconColor="text-primary"
            />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <ServiceCard
              title="Relatório Situação Fiscal"
              description="Consulte a situação fiscal de contribuintes pessoa física e jurídica"
              icon={FileCheck}
              servicePath="/servicos/relatorio-situacao-fiscal"
              isConfigured={isSitFisConfigured}
              iconColor="text-accent"
            />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <ServiceCard
              title="CND Federal"
              description="Emita a Certidão Negativa de Débitos da Receita Federal"
              icon={ShieldCheck}
              servicePath="/servicos/cnd-federal"
              isConfigured={isCNDConfigured}
              iconColor="text-success"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center space-y-4 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-200">Suporte</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Documentação</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Privacidade</a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 FMG Integra Contador. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
