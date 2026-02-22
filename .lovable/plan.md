
# Plano: Recriar Tabela `app_settings` no Banco de Dados

## Problema Identificado

A tabela `app_settings` foi apagada quando o banco de dados original foi deletado. Essa tabela e essencial para o funcionamento do sistema -- ela armazena as configuracoes de webhooks e CNPJs usados pelas paginas de servico (Gerar DAS, CND Federal, Relatorio Situacao Fiscal).

**Tabelas que o codigo referencia:**
- `user_roles` -- Existe no banco
- `app_settings` -- NAO existe no banco (causa dos erros de build)

**Todas as outras 24 tabelas do banco estao presentes e integras.**

## O Que Sera Feito

### 1. Criar a tabela `app_settings` via migracao SQL

```text
Estrutura da tabela:
- key (text, PRIMARY KEY) -- nome da configuracao
- value (text) -- valor da configuracao  
- created_at (timestamptz, default now())
- updated_at (timestamptz, default now())
```

### 2. Politicas de seguranca (RLS)

- **Leitura publica**: qualquer usuario pode ler (necessario para carregar webhooks nas paginas de servico)
- **Escrita restrita**: somente admins podem inserir, atualizar e deletar

### 3. Inserir dados iniciais

As 5 configuracoes esperadas pelo codigo serao inseridas com valores vazios para evitar erros:

| Chave | Descricao |
|-------|-----------|
| `webhook_gerar_das` | URL do webhook para gerar DAS |
| `webhook_sitfis` | URL do webhook para situacao fiscal |
| `webhook_cnd` | URL do webhook para CND |
| `cnpj_contratante` | CNPJ do contratante |
| `cnpj_autor_pedido` | CNPJ do autor do pedido |

Voce precisara preencher os valores corretos na pagina de Configuracoes apos o login como admin.

### 4. Atualizar os tipos TypeScript

Apos a criacao da tabela, os tipos do Supabase serao regenerados automaticamente, corrigindo todos os erros de build.

---

## Resumo Tecnico

**SQL da migracao:**

```text
CREATE TABLE public.app_settings (
  key text PRIMARY KEY,
  value text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Leitura publica
CREATE POLICY "Anyone can read app settings"
  ON public.app_settings FOR SELECT USING (true);

-- Escrita restrita a admins
CREATE POLICY "Admins can manage app settings"
  ON public.app_settings FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Dados iniciais
INSERT INTO public.app_settings (key, value) VALUES
  ('webhook_gerar_das', ''),
  ('webhook_sitfis', ''),
  ('webhook_cnd', ''),
  ('cnpj_contratante', ''),
  ('cnpj_autor_pedido', '');
```

**Resultado esperado:** Todos os 18 erros de build serao corrigidos e o sistema voltara a funcionar normalmente.
