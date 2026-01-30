import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface SitFisStatusCardProps {
  etapa: "processando" | "concluido" | "erro";
  mensagem?: string;
}

export const SitFisStatusCard = ({ etapa, mensagem }: SitFisStatusCardProps) => {
  const getStatusInfo = () => {
    switch (etapa) {
      case "processando":
        return {
          icon: <Loader2 className="h-5 w-5 text-primary animate-spin" />,
          title: "Processando Relatório",
          description: "Aguarde enquanto o relatório é gerado. O processo pode levar alguns segundos...",
          color: "border-primary",
        };
      case "concluido":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-success" />,
          title: "Relatório Gerado com Sucesso",
          description: "O relatório foi gerado e está disponível para download.",
          color: "border-success",
        };
      case "erro":
        return {
          icon: <AlertCircle className="h-5 w-5 text-destructive" />,
          title: "Erro ao Gerar Relatório",
          description: mensagem || "Ocorreu um erro ao gerar o relatório. Tente novamente.",
          color: "border-destructive",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className={statusInfo.color}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {statusInfo.icon}
          {statusInfo.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
      </CardContent>
    </Card>
  );
};
