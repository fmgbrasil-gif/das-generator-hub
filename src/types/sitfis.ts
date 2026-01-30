export interface SitFisRequest {
  cnpj: string;
  tipoPessoa: "PF" | "PJ";
}

export interface Mensagem {
  codigo: string;
  texto: string;
}

export interface SitFisProtocoloResponse {
  status: number;
  mensagens: Mensagem[];
  dados?: {
    protocoloRelatorio: string;
    tempoEspera: number;
  };
}

export interface SitFisRelatorioResponse {
  status: number;
  mensagens: Mensagem[];
  dados?: {
    relatorio: {
      pdfBase64?: string;
      tempoEspera?: number;
    };
  };
}

// Resposta do workflow n8n completo (uma única chamada)
export interface SitFisWorkflowResponse {
  sucesso: boolean;
  pdfBase64?: string;
  erro?: string;
  mensagem?: string;
}
