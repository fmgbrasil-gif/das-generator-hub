import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { List } from "lucide-react";
import { apiCompetenciaToDisplay, formatCurrency } from "@/utils/formatters";
import type { Composicao } from "@/types/das";

interface DasComposicaoTableProps {
  composicao: Composicao[];
}

export const DasComposicaoTable = ({ composicao }: DasComposicaoTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          Composição do DAS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Denominação</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-right">Multa</TableHead>
                <TableHead className="text-right">Juros</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {composicao.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {apiCompetenciaToDisplay(item.periodoApuracao)}
                  </TableCell>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell className="max-w-xs truncate" title={item.denominacao}>
                    {item.denominacao}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.valores.principal)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.valores.multa)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.valores.juros)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(item.valores.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
