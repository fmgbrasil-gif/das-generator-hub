// GERAR DAS
const WEBHOOK_URL_KEY = "n8n_gerar_das_url";
const CONTRATANTE_CNPJ_KEY = "integra_contratante_cnpj";
const AUTOR_PEDIDO_CNPJ_KEY = "integra_autor_pedido_cnpj";

export const getWebhookUrl = (): string => {
  const savedUrl = localStorage.getItem(WEBHOOK_URL_KEY);
  return savedUrl || import.meta.env.VITE_N8N_GERAR_DAS_URL || "";
};

export const getContratanteCnpj = (): string => {
  return localStorage.getItem(CONTRATANTE_CNPJ_KEY) || "";
};

export const getAutorPedidoCnpj = (): string => {
  return localStorage.getItem(AUTOR_PEDIDO_CNPJ_KEY) || "";
};

// RELATÓRIO SITUAÇÃO FISCAL - WORKFLOW COMPLETO
const SITFIS_WEBHOOK_URL_KEY = "sitfis_webhook_url";

export const getSitFisWebhookUrl = (): string => {
  return localStorage.getItem(SITFIS_WEBHOOK_URL_KEY) || "";
};
