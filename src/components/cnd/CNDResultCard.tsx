import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, EyeOff, ShieldCheck } from "lucide-react";

interface CNDResultCardProps {
  pdfBase64: string;
}

export const CNDResultCard = ({ pdfBase64 }: CNDResultCardProps) => {
  const [showViewer, setShowViewer] = useState(false);

  // Cria data URL em vez de blob URL
  const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;

  const handleDownload = () => {
    try {
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `cnd-federal-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Error handled silently in production
    }
  };

  const handleToggleViewer = () => {
    setShowViewer(!showViewer);
  };

  return (
    <Card className="border-success">
      <CardHeader className="bg-gradient-header text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Certidão Negativa de Débitos - CND Federal
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          A CND Federal foi emitida com sucesso. Você pode visualizá-la ou fazer o download.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleToggleViewer} className="flex-1 bg-gradient-primary hover:opacity-90">
            {showViewer ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Ocultar PDF
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Visualizar PDF
              </>
            )}
          </Button>
          
          <Button onClick={handleDownload} variant="outline" className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Visualizador de PDF embutido */}
        {showViewer && (
          <div className="mt-4 border rounded-lg overflow-hidden shadow-sm">
            <iframe
              src={pdfDataUrl}
              className="w-full h-[600px]"
              title="Visualizador de CND Federal"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
