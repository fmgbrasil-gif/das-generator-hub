import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { Mensagem } from "@/types/das";

interface DasStatusCardProps {
  status: number;
  mensagens: Mensagem[];
}

export const DasStatusCard = ({ status, mensagens }: DasStatusCardProps) => {
  const isSuccess = status >= 200 && status < 300;
  const isError = status >= 400;

  return (
    <Card className={isError ? "border-destructive" : isSuccess ? "border-success" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {isError ? (
            <AlertCircle className="h-5 w-5 text-destructive" />
          ) : isSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <Info className="h-5 w-5 text-primary" />
          )}
          Status da Requisição
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Status HTTP:</span>
          <span className={`font-bold ${isError ? 'text-destructive' : 'text-foreground'}`}>
            {status}
          </span>
        </div>

        {mensagens.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Mensagens:</p>
            <ul className="space-y-1.5">
              {mensagens.map((msg, index) => (
                <li
                  key={index}
                  className={`text-sm p-2 rounded-md ${
                    isError
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <span className="font-semibold">{msg.codigo}:</span> {msg.texto}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
