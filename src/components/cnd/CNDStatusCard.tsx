import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface CNDStatusCardProps {
  etapa: "processando" | "concluido" | "erro";
  mensagem?: string;
}

export const CNDStatusCard = ({ etapa, mensagem }: CNDStatusCardProps) => {
  const getStatusInfo = () => {
    switch (etapa) {
      case "processando":
        return {
          icon: <Loader2 className="h-5 w-5 text-primary animate-spin" />,
          title: "Emitindo CND Federal",
          description: "Aguarde enquanto a certidão é gerada. O processo pode levar alguns segundos...",
          color: "border-primary",
        };
      case "concluido":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-success" />,
          title: "CND Emitida com Sucesso",
          description: "A Certidão Negativa de Débitos foi emitida e está disponível para download.",
          color: "border-success",
        };
      case "erro":
        return {
          icon: <AlertCircle className="h-5 w-5 text-destructive" />,
          title: "Erro ao Emitir CND",
          description: mensagem || "Ocorreu um erro ao emitir a certidão. Tente novamente.",
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
