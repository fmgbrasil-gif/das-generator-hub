export interface CNDRequest {
  cnpj: string;
  tipoPessoa: "PF" | "PJ";
}

export interface CNDWorkflowResponse {
  sucesso: boolean;
  pdfBase64?: string;
  erro?: string;
  mensagem?: string;
}
