import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import {
  formatCNPJ,
  apiDateToDisplay,
  apiCompetenciaToDisplay,
  formatCurrency,
} from "@/utils/formatters";
import type { Das } from "@/types/das";

interface DasResumoCardProps {
  das: Das;
}

export const DasResumoCard = ({ das }: DasResumoCardProps) => {
  const { cnpjCompleto, detalhamento } = das;
  const { valores } = detalhamento;

  return (
    <Card>
      <CardHeader className="bg-gradient-header text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Resumo do DAS
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">CNPJ</p>
            <p className="text-base font-semibold">{formatCNPJ(cnpjCompleto)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Período de Apuração</p>
            <p className="text-base font-semibold">
              {apiCompetenciaToDisplay(detalhamento.periodoApuracao)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Número do Documento</p>
            <p className="text-base font-semibold">{detalhamento.numeroDocumento}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Data de Vencimento</p>
            <p className="text-base font-semibold">
              {apiDateToDisplay(detalhamento.dataVencimento)}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">
              Data Limite de Acolhimento
            </p>
            <p className="text-base font-semibold">
              {apiDateToDisplay(detalhamento.dataLimiteAcolhimento)}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Valores do DAS</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between p-2 bg-muted rounded">
              <span className="text-sm">Principal:</span>
              <span className="font-medium">{formatCurrency(valores.principal)}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted rounded">
              <span className="text-sm">Multa:</span>
              <span className="font-medium">{formatCurrency(valores.multa)}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted rounded">
              <span className="text-sm">Juros:</span>
              <span className="font-medium">{formatCurrency(valores.juros)}</span>
            </div>
            <div className="flex justify-between p-2 bg-primary text-primary-foreground rounded font-bold">
              <span>Total:</span>
              <span>{formatCurrency(valores.total)}</span>
            </div>
          </div>
        </div>

        {(detalhamento.observacao1 || detalhamento.observacao2 || detalhamento.observacao3) && (
          <div className="border-t pt-4 space-y-2">
            <h4 className="font-semibold">Observações</h4>
            {detalhamento.observacao1 && (
              <p className="text-sm text-muted-foreground">{detalhamento.observacao1}</p>
            )}
            {detalhamento.observacao2 && (
              <p className="text-sm text-muted-foreground">{detalhamento.observacao2}</p>
            )}
            {detalhamento.observacao3 && (
              <p className="text-sm text-muted-foreground">{detalhamento.observacao3}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
