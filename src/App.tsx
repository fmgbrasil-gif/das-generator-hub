import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GerarDasPage from "./pages/GerarDasPage";
import ConfiguracoesGerarDas from "./pages/servicos/gerar-das/ConfiguracoesGerarDas";
import RelatorioSitFiscalPage from "./pages/servicos/relatorio-situacao-fiscal/RelatorioSitFiscalPage";
import ConfiguracoesRelatorioSitFiscal from "./pages/servicos/relatorio-situacao-fiscal/ConfiguracoesRelatorioSitFiscal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos/gerar-das" element={<GerarDasPage />} />
          <Route path="/servicos/gerar-das/configuracoes" element={<ConfiguracoesGerarDas />} />
          <Route path="/servicos/relatorio-situacao-fiscal" element={<RelatorioSitFiscalPage />} />
          <Route path="/servicos/relatorio-situacao-fiscal/configuracoes" element={<ConfiguracoesRelatorioSitFiscal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
