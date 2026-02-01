-- Política para permitir leitura anônima das configurações (webhooks não são sensíveis)
CREATE POLICY "Anyone can read app settings"
ON public.app_settings
FOR SELECT
USING (true);