
# Plano: Centralizar Configurações com Acesso Admin via Supabase

## Resumo

Criar uma seção centralizada de **Configurações do Sistema** acessível apenas por usuários com role `admin`. As configurações serão armazenadas no banco de dados Supabase (tabela `app_settings`) em vez de localStorage.

---

## 1. Estrutura do Banco de Dados

### Tabela Existente: `app_settings`

A tabela já existe com a estrutura adequada:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `key` | text (PK) | Identificador único da configuração |
| `value` | jsonb | Valor da configuração em JSON |

### RLS Existente

A política `Admins manage app settings` já está configurada:
- Apenas usuários com role `admin` podem ler/escrever

### Chaves de Configuração

| Chave | Descrição |
|-------|-----------|
| `webhook_gerar_das` | URL do webhook para Gerar DAS |
| `webhook_sitfis` | URL do webhook para SITFIS |
| `webhook_cnd` | URL do webhook para CND Federal |
| `cnpj_contratante` | CNPJ do Contratante |
| `cnpj_autor_pedido` | CNPJ do Autor do Pedido |

---

## 2. Implementar Autenticação

### 2.1 Criar Hook de Autenticação

**Arquivo:** `src/hooks/useAuth.ts`

```typescript
// Hook que gerencia estado de autenticação
// - Verifica sessão ativa
// - Verifica role do usuário (admin, financial_staff, viewer)
// - Fornece funções de login/logout
```

### 2.2 Criar Página de Login

**Arquivo:** `src/pages/LoginPage.tsx`

- Formulário de email/senha
- Integração com Supabase Auth
- Redirecionamento após login

### 2.3 Criar Componente de Rota Protegida

**Arquivo:** `src/components/ProtectedRoute.tsx`

```typescript
// Wrapper que verifica:
// 1. Se usuário está autenticado
// 2. Se usuário tem a role necessária (ex: admin)
// Redireciona para login ou página de acesso negado
```

---

## 3. Criar Página de Configurações Centralizada

### 3.1 Página Principal

**Arquivo:** `src/pages/admin/ConfiguracoesPage.tsx`

```text
+--------------------------------------------------+
|  [Shield] Configurações do Sistema               |
|  Apenas administradores podem acessar            |
+--------------------------------------------------+

+--------------------------------------------------+
|  Webhooks n8n                                    |
|  ------------------------------------------------|
|  URL Gerar DAS:    [________________________]    |
|  URL SITFIS:       [________________________]    |
|  URL CND Federal:  [________________________]    |
+--------------------------------------------------+

+--------------------------------------------------+
|  Dados do Escritório                             |
|  ------------------------------------------------|
|  CNPJ Contratante:     [00.000.000/0000-00]     |
|  CNPJ Autor Pedido:    [00.000.000/0000-00]     |
+--------------------------------------------------+

          [Salvar Configurações]
```

### 3.2 Hook para Configurações

**Arquivo:** `src/hooks/useAppSettings.ts`

```typescript
// Hook que:
// - Busca configurações do Supabase
// - Salva configurações no Supabase
// - Cache local para performance
// - Fallback para valores padrão
```

---

## 4. Atualizar Páginas de Serviço

### 4.1 Remover Páginas de Configuração Individuais

Remover arquivos:
- `src/pages/servicos/gerar-das/ConfiguracoesGerarDas.tsx`
- `src/pages/servicos/relatorio-situacao-fiscal/ConfiguracoesRelatorioSitFiscal.tsx`
- `src/pages/servicos/cnd-federal/ConfiguracoesCND.tsx`

### 4.2 Atualizar `config.ts`

**Arquivo:** `src/utils/config.ts`

Modificar para buscar do Supabase em vez de localStorage:

```typescript
// Funções async que buscam do banco
// Com cache em memória para evitar requisições repetidas
export const getWebhookUrl = async (): Promise<string>
export const getSitFisWebhookUrl = async (): Promise<string>
export const getCNDWebhookUrl = async (): Promise<string>
export const getContratanteCnpj = async (): Promise<string>
export const getAutorPedidoCnpj = async (): Promise<string>
```

### 4.3 Atualizar Páginas de Serviço

Modificar para usar funções async:
- `GerarDasPage.tsx`
- `RelatorioSitFiscalPage.tsx`
- `CNDFederalPage.tsx`

---

## 5. Atualizar Rotas

**Arquivo:** `src/App.tsx`

```typescript
// Adicionar rotas:
<Route path="/login" element={<LoginPage />} />
<Route path="/admin/configuracoes" element={
  <ProtectedRoute requiredRole="admin">
    <ConfiguracoesPage />
  </ProtectedRoute>
} />

// Remover rotas antigas de configuração individual
```

---

## 6. Atualizar Home Page

**Arquivo:** `src/pages/HomePage.tsx`

- Adicionar link para Configurações (visível apenas para admins)
- Adicionar botão de Login/Logout no header

---

## 7. Estrutura Final de Arquivos

```text
src/
├── components/
│   ├── ProtectedRoute.tsx          (NOVO)
│   └── ...
├── hooks/
│   ├── useAuth.ts                  (NOVO)
│   ├── useAppSettings.ts           (NOVO)
│   └── ...
├── pages/
│   ├── LoginPage.tsx               (NOVO)
│   ├── admin/
│   │   └── ConfiguracoesPage.tsx   (NOVO)
│   └── servicos/
│       ├── gerar-das/
│       │   └── (remover ConfiguracoesGerarDas.tsx)
│       ├── relatorio-situacao-fiscal/
│       │   └── (remover ConfiguracoesRelatorioSitFiscal.tsx)
│       └── cnd-federal/
│           └── (remover ConfiguracoesCND.tsx)
└── utils/
    └── config.ts                   (ATUALIZAR)
```

---

## 8. Resumo das Tarefas

| # | Tarefa | Arquivos |
|---|--------|----------|
| 1 | Criar hook de autenticação | `src/hooks/useAuth.ts` |
| 2 | Criar página de login | `src/pages/LoginPage.tsx` |
| 3 | Criar componente de rota protegida | `src/components/ProtectedRoute.tsx` |
| 4 | Criar hook para app settings | `src/hooks/useAppSettings.ts` |
| 5 | Criar página de configurações admin | `src/pages/admin/ConfiguracoesPage.tsx` |
| 6 | Atualizar `config.ts` para Supabase | `src/utils/config.ts` |
| 7 | Atualizar páginas de serviço | `GerarDasPage.tsx`, `RelatorioSitFiscalPage.tsx`, `CNDFederalPage.tsx` |
| 8 | Atualizar rotas em `App.tsx` | `src/App.tsx` |
| 9 | Atualizar Home Page com login/admin | `src/pages/HomePage.tsx` |
| 10 | Remover páginas de config antigas | 3 arquivos |

---

## Notas de Segurança

1. **RLS já configurado**: A tabela `app_settings` já possui política que restringe acesso a admins
2. **Verificação server-side**: A função `has_role()` é SECURITY DEFINER, validando no banco
3. **Autenticação Supabase**: Usa JWT tokens validados pelo servidor
4. **Nunca confiar no cliente**: Mesmo com UI restrita, o banco valida permissões
