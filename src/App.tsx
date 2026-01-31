import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import GerarDasPage from "./pages/GerarDasPage";
import RelatorioSitFiscalPage from "./pages/servicos/relatorio-situacao-fiscal/RelatorioSitFiscalPage";
import CNDFederalPage from "./pages/servicos/cnd-federal/CNDFederalPage";
import ConfiguracoesPage from "./pages/admin/ConfiguracoesPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/servicos/gerar-das" element={<GerarDasPage />} />
          <Route path="/servicos/relatorio-situacao-fiscal" element={<RelatorioSitFiscalPage />} />
          <Route path="/servicos/cnd-federal" element={<CNDFederalPage />} />
          <Route
            path="/admin/configuracoes"
            element={
              <ProtectedRoute requiredRole="admin">
                <ConfiguracoesPage />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
