import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AppSettings {
  webhook_gerar_das: string;
  webhook_sitfis: string;
  webhook_cnd: string;
  cnpj_contratante: string;
  cnpj_autor_pedido: string;
}

const defaultSettings: AppSettings = {
  webhook_gerar_das: "",
  webhook_sitfis: "",
  webhook_cnd: "",
  cnpj_contratante: "",
  cnpj_autor_pedido: "",
};

// In-memory cache for settings
let settingsCache: AppSettings | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 60000; // 1 minute

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(settingsCache || defaultSettings);
  const [isLoading, setIsLoading] = useState(!settingsCache);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    // Use cache if valid
    if (settingsCache && Date.now() - cacheTimestamp < CACHE_TTL) {
      setSettings(settingsCache);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("app_settings")
        .select("key, value");

      if (fetchError) {
        // If user doesn't have permission, use defaults silently
        if (fetchError.code === "42501") {
          setSettings(defaultSettings);
          return;
        }
        throw fetchError;
      }

      const newSettings: AppSettings = { ...defaultSettings };
      
      data?.forEach((row) => {
        const key = row.key as keyof AppSettings;
        if (key in newSettings && row.value !== null) {
          // Value is stored as JSONB, extract the string value
          newSettings[key] = typeof row.value === "string" ? row.value : String(row.value);
        }
      });

      settingsCache = newSettings;
      cacheTimestamp = Date.now();
      setSettings(newSettings);
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError("Erro ao carregar configurações");
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    setIsLoading(true);
    setError(null);

    try {
      // Upsert each setting
      const keys = Object.keys(newSettings) as (keyof AppSettings)[];
      
      for (const key of keys) {
        const { error: upsertError } = await supabase
          .from("app_settings")
          .upsert(
            { key, value: newSettings[key] },
            { onConflict: "key" }
          );

        if (upsertError) throw upsertError;
      }

      // Update cache
      settingsCache = newSettings;
      cacheTimestamp = Date.now();
      setSettings(newSettings);

      return { success: true };
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Erro ao salvar configurações");
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const invalidateCache = () => {
    settingsCache = null;
    cacheTimestamp = 0;
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    isLoading,
    error,
    saveSettings,
    refetch: fetchSettings,
    invalidateCache,
  };
};

// Standalone functions for use in service pages
export const getAppSetting = async (key: keyof AppSettings): Promise<string> => {
  // Use cache if valid
  if (settingsCache && Date.now() - cacheTimestamp < CACHE_TTL) {
    return settingsCache[key];
  }

  try {
    const { data, error } = await supabase
      .from("app_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error || !data) return "";
    
    return typeof data.value === "string" ? data.value : String(data.value || "");
  } catch {
    return "";
  }
};

export const getAllAppSettings = async (): Promise<AppSettings> => {
  // Use cache if valid
  if (settingsCache && Date.now() - cacheTimestamp < CACHE_TTL) {
    return settingsCache;
  }

  try {
    const { data, error } = await supabase
      .from("app_settings")
      .select("key, value");

    if (error) return defaultSettings;

    const settings: AppSettings = { ...defaultSettings };
    
    data?.forEach((row) => {
      const key = row.key as keyof AppSettings;
      if (key in settings && row.value !== null) {
        settings[key] = typeof row.value === "string" ? row.value : String(row.value);
      }
    });

    settingsCache = settings;
    cacheTimestamp = Date.now();
    
    return settings;
  } catch {
    return defaultSettings;
  }
};
