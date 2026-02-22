CREATE TABLE public.app_settings (
  key text PRIMARY KEY,
  value text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read app settings"
  ON public.app_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage app settings"
  ON public.app_settings FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.app_settings (key, value) VALUES
  ('webhook_gerar_das', ''),
  ('webhook_sitfis', ''),
  ('webhook_cnd', ''),
  ('cnpj_contratante', ''),
  ('cnpj_autor_pedido', '');