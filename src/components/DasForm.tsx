import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  formatCNPJ,
  unformatCNPJ,
  formatCompetencia,
  competenciaToApi,
  formatDate,
  dateToApi,
  validateCNPJ,
  validateCompetencia,
  validateDate,
} from "@/utils/formatters";
import type { DasRequest } from "@/types/das";

interface DasFormProps {
  onSubmit: (data: DasRequest) => void;
  isLoading: boolean;
}

export const DasForm = ({ onSubmit, isLoading }: DasFormProps) => {
  const [cnpj, setCnpj] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [dataConsolidacao, setDataConsolidacao] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setCnpj(formatted);
    if (errors.cnpj) setErrors({ ...errors, cnpj: "" });
  };

  const handleCompetenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCompetencia(e.target.value);
    setCompetencia(formatted);
    if (errors.competencia) setErrors({ ...errors, competencia: "" });
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    setDataConsolidacao(formatted);
    if (errors.dataConsolidacao) setErrors({ ...errors, dataConsolidacao: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};

    if (!cnpj) {
      newErrors.cnpj = "CNPJ é obrigatório";
    } else if (!validateCNPJ(cnpj)) {
      newErrors.cnpj = "CNPJ inválido (deve ter 14 dígitos)";
    }

    if (!competencia) {
      newErrors.competencia = "Período de apuração é obrigatório";
    } else if (!validateCompetencia(competencia)) {
      newErrors.competencia = "Competência inválida (formato MM/AAAA)";
    }

    if (dataConsolidacao && !validateDate(dataConsolidacao)) {
      newErrors.dataConsolidacao = "Data inválida (formato DD/MM/AAAA)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const requestData: DasRequest = {
      cnpj: unformatCNPJ(cnpj),
      periodoApuracao: competenciaToApi(competencia),
    };

    if (dataConsolidacao) {
      requestData.dataConsolidacao = dateToApi(dataConsolidacao);
    }

    onSubmit(requestData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cnpj" className="text-sm font-medium">
          CNPJ do Contribuinte *
        </Label>
        <Input
          id="cnpj"
          type="text"
          placeholder="00.000.000/0000-00"
          value={cnpj}
          onChange={handleCnpjChange}
          maxLength={18}
          disabled={isLoading}
          className={errors.cnpj ? "border-destructive" : ""}
        />
        {errors.cnpj && (
          <p className="text-sm text-destructive">{errors.cnpj}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="competencia" className="text-sm font-medium">
          Período de Apuração (Competência) *
        </Label>
        <Input
          id="competencia"
          type="text"
          placeholder="MM/AAAA"
          value={competencia}
          onChange={handleCompetenciaChange}
          maxLength={7}
          disabled={isLoading}
          className={errors.competencia ? "border-destructive" : ""}
        />
        {errors.competencia && (
          <p className="text-sm text-destructive">{errors.competencia}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataConsolidacao" className="text-sm font-medium">
          Data de Consolidação (Opcional)
        </Label>
        <Input
          id="dataConsolidacao"
          type="text"
          placeholder="DD/MM/AAAA"
          value={dataConsolidacao}
          onChange={handleDataChange}
          maxLength={10}
          disabled={isLoading}
          className={errors.dataConsolidacao ? "border-destructive" : ""}
        />
        {errors.dataConsolidacao && (
          <p className="text-sm text-destructive">{errors.dataConsolidacao}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Gerando DAS...
          </>
        ) : (
          "Gerar DAS"
        )}
      </Button>
    </form>
  );
};
