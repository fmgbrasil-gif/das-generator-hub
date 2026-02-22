

# Corrigir Politicas RLS da Tabela `app_settings`

## Problema

As politicas RLS da tabela `app_settings` foram criadas como **RESTRICTIVE** (o padrao do Supabase via migration). No PostgreSQL:

- E necessario pelo menos uma politica **PERMISSIVE** para conceder acesso
- Politicas **RESTRICTIVE** apenas restringem acesso ja concedido por uma PERMISSIVE

Como ambas as politicas sao RESTRICTIVE, ninguem consegue ler os dados, mesmo que a condicao seja `true`. Isso explica porque o sistema mostra "URL de webhook nao configurada" apesar dos valores estarem salvos no banco.

## Correcao

Recriar as duas politicas como **PERMISSIVE**:

1. Remover a politica "Anyone can read app settings" (RESTRICTIVE)
2. Remover a politica "Admins can manage app settings" (RESTRICTIVE)
3. Criar "Anyone can read app settings" como **PERMISSIVE** com `USING (true)`
4. Criar "Admins can manage app settings" como **PERMISSIVE** restrita a admins

## Resumo Tecnico

Uma unica migracao SQL sera criada:

```text
-- Remover politicas RESTRICTIVE
DROP POLICY IF EXISTS "Anyone can read app settings" ON public.app_settings;
DROP POLICY IF EXISTS "Admins can manage app settings" ON public.app_settings;

-- Recriar como PERMISSIVE (padrao do CREATE POLICY)
CREATE POLICY "Anyone can read app settings"
  ON public.app_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage app settings"
  ON public.app_settings FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
```

Nenhuma alteracao de codigo sera necessaria. Apos a migracao, os webhooks e CNPJs ja configurados voltarao a funcionar imediatamente.
