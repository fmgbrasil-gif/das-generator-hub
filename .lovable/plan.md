

# Plano: Correção do Salvamento de Configurações

## Problema Identificado

As configurações não estão sendo salvas porque a **sessão de autenticação do usuário expirou**. Quando isso acontece:

1. A política de segurança (RLS) do banco de dados bloqueia tanto leitura quanto escrita
2. O sistema mostra campos vazios (como se não houvesse dados)
3. Ao tentar salvar, a operação falha silenciosamente

O banco de dados **já contém** as configurações salvas anteriormente - elas apenas não aparecem devido ao problema de autenticação.

---

## Solução Proposta

### 1. Adicionar Tratamento de Sessão Expirada

Modificar o hook `useAppSettings` para detectar quando a sessão expirou e informar o usuário, em vez de simplesmente mostrar campos vazios.

**Arquivo:** `src/hooks/useAppSettings.ts`

```text
Mudanças:
- Verificar se o usuário está autenticado antes de buscar/salvar
- Detectar erro de sessão expirada e retornar mensagem apropriada
- Adicionar flag para indicar se requer re-autenticação
```

### 2. Melhorar Feedback na Página de Configurações

Modificar a página para mostrar um aviso claro quando a sessão expirar, com opção de fazer login novamente.

**Arquivo:** `src/pages/admin/ConfiguracoesPage.tsx`

```text
Mudanças:
- Mostrar mensagem quando erro de autenticação for detectado
- Adicionar botão para redirecionar ao login
- Impedir tentativa de salvar com sessão inválida
```

### 3. Refresh Automático de Token

Garantir que o sistema tente renovar o token antes de operações críticas.

**Arquivo:** `src/hooks/useAppSettings.ts`

```text
Mudanças:
- Chamar supabase.auth.getSession() para forçar refresh
- Se falhar, sinalizar necessidade de re-login
```

---

## Detalhes Técnicos

### Fluxo Atual (Problemático)
```text
Usuário abre página → Token expirado → RLS bloqueia → Retorna [] → Campos vazios
                                                                  ↓
Usuário clica "Salvar" → RLS bloqueia INSERT → Falha silenciosa
```

### Fluxo Corrigido
```text
Usuário abre página → Verifica sessão → Token expirado? 
                                              ↓
                           SIM: Mostra aviso + botão "Fazer Login"
                           NÃO: Busca configurações normalmente
```

### Código Principal da Correção

**Hook useAppSettings (saveSettings):**
```typescript
const saveSettings = async (newSettings: AppSettings) => {
  // Verificar sessão antes de salvar
  const { data: { session }, error: sessionError } = 
    await supabase.auth.getSession();
  
  if (sessionError || !session) {
    setError("Sessão expirada. Faça login novamente.");
    return { success: false, error: "session_expired" };
  }
  
  // Continuar com salvamento...
};
```

**Página ConfiguracoesPage:**
```typescript
// Mostrar erro de sessão
{error && error.includes("expirada") && (
  <Alert variant="destructive">
    <AlertDescription>
      Sua sessão expirou. 
      <Button onClick={() => navigate("/login")}>
        Fazer Login
      </Button>
    </AlertDescription>
  </Alert>
)}
```

---

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/hooks/useAppSettings.ts` | Verificação de sessão e tratamento de erros |
| `src/pages/admin/ConfiguracoesPage.tsx` | UI para sessão expirada |

---

## Ação Imediata para Testar

Após implementar as correções, o usuário precisará:
1. Fazer logout
2. Fazer login novamente
3. Acessar `/admin/configuracoes`
4. Verificar se as configurações aparecem
5. Testar o salvamento

