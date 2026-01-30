export interface DasRequest {
  cnpj: string;
  periodoApuracao: string;
  dataConsolidacao?: string;
}

export interface Mensagem {
  codigo: string;
  texto: string;
}

export interface Valores {
  principal: number;
  multa: number;
  juros: number;
  total: number;
}

export interface Composicao {
  periodoApuracao: string;
  codigo: string;
  denominacao: string;
  valores: Valores;
}

export interface DetalhamentoDas {
  periodoApuracao: string;
  numeroDocumento: string;
  dataVencimento: string;
  dataLimiteAcolhimento: string;
  valores: Valores;
  observacao1?: string;
  observacao2?: string;
  observacao3?: string;
  composicao: Composicao[];
}

export interface Das {
  pdfUrl?: string;
  pdfBase64?: string;
  cnpjCompleto: string;
  detalhamento: DetalhamentoDas;
}

export interface DasResponse {
  status: number;
  mensagens: Mensagem[];
  dados?: {
    das: Das[];
  };
}
