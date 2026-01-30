import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { formatCNPJ, unformatCNPJ, validateCNPJ } from "@/utils/formatters";
import type { SitFisRequest } from "@/types/sitfis";

interface SitFisFormProps {
  onSubmit: (data: SitFisRequest) => void;
  isLoading: boolean;
}

export const SitFisForm = ({ onSubmit, isLoading }: SitFisFormProps) => {
  const [cnpj, setCnpj] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState<"PF" | "PJ">("PJ");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setCnpj(formatted);
    if (errors.cnpj) setErrors({ ...errors, cnpj: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};

    if (!cnpj) {
      newErrors.cnpj = "CNPJ/CPF é obrigatório";
    } else if (!validateCNPJ(cnpj)) {
      newErrors.cnpj = "CNPJ/CPF inválido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const requestData: SitFisRequest = {
      cnpj: unformatCNPJ(cnpj),
      tipoPessoa,
    };

    onSubmit(requestData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Tipo de Pessoa *</Label>
        <RadioGroup value={tipoPessoa} onValueChange={(value) => setTipoPessoa(value as "PF" | "PJ")} disabled={isLoading}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PJ" id="pj" />
            <Label htmlFor="pj" className="cursor-pointer">Pessoa Jurídica (PJ)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PF" id="pf" />
            <Label htmlFor="pf" className="cursor-pointer">Pessoa Física (PF)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj" className="text-sm font-medium">
          {tipoPessoa === "PJ" ? "CNPJ" : "CPF"} do Contribuinte *
        </Label>
        <Input
          id="cnpj"
          type="text"
          placeholder={tipoPessoa === "PJ" ? "00.000.000/0000-00" : "000.000.000-00"}
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

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Gerando Relatório...
          </>
        ) : (
          "Gerar Relatório de Situação Fiscal"
        )}
      </Button>
    </form>
  );
};
