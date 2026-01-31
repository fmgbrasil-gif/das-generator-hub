import { getAllAppSettings, AppSettings } from "@/hooks/useAppSettings";

// Cache for settings
let cachedSettings: AppSettings | null = null;

// Initialize settings from database
export const initializeSettings = async (): Promise<void> => {
  cachedSettings = await getAllAppSettings();
};

// Get cached settings or fetch if not available
const getSettings = async (): Promise<AppSettings> => {
  if (!cachedSettings) {
    cachedSettings = await getAllAppSettings();
  }
  return cachedSettings;
};

// GERAR DAS
export const getWebhookUrl = async (): Promise<string> => {
  const settings = await getSettings();
  return settings.webhook_gerar_das;
};

export const getContratanteCnpj = async (): Promise<string> => {
  const settings = await getSettings();
  return settings.cnpj_contratante;
};

export const getAutorPedidoCnpj = async (): Promise<string> => {
  const settings = await getSettings();
  return settings.cnpj_autor_pedido;
};

// RELATÓRIO SITUAÇÃO FISCAL
export const getSitFisWebhookUrl = async (): Promise<string> => {
  const settings = await getSettings();
  return settings.webhook_sitfis;
};

// CND FEDERAL
export const getCNDWebhookUrl = async (): Promise<string> => {
  const settings = await getSettings();
  return settings.webhook_cnd;
};

// Invalidate cache (call after settings are updated)
export const invalidateSettingsCache = (): void => {
  cachedSettings = null;
};
