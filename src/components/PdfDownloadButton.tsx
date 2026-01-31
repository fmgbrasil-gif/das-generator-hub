import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import type { Das } from "@/types/das";
import { logger } from "@/utils/logger";

interface PdfDownloadButtonProps {
  das: Das;
}

export const PdfDownloadButton = ({ das }: PdfDownloadButtonProps) => {
  const handleDownload = () => {
    if (das.pdfUrl) {
      // Se temos URL, abrir em nova aba
      window.open(das.pdfUrl, "_blank");
    } else if (das.pdfBase64) {
      // Se temos Base64, converter e fazer download
      try {
        const byteCharacters = atob(das.pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `DAS_${das.detalhamento.numeroDocumento}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Limpar o URL após o download
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } catch (error) {
        logger.error("Erro ao processar PDF Base64:", error);
        alert("Erro ao fazer download do PDF. Por favor, tente novamente.");
      }
    }
  };

  if (!das.pdfUrl && !das.pdfBase64) {
    return null;
  }

  return (
    <div className="bg-accent/20 border-2 border-accent rounded-lg p-6 text-center space-y-3">
      <h3 className="font-semibold text-lg">DAS Oficial</h3>
      <p className="text-sm text-muted-foreground">
        O documento de arrecadação está pronto para download
      </p>
      <Button
        onClick={handleDownload}
        size="lg"
        className="bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        {das.pdfUrl ? (
          <>
            <ExternalLink className="mr-2 h-5 w-5" />
            Abrir DAS em PDF
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            Baixar DAS em PDF
          </>
        )}
      </Button>
    </div>
  );
};
