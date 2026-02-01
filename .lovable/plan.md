
# Plano: Corrigir Carregamento Infinito para Usuarios Nao Logados

## Problema Identificado

A tabela `app_settings` possui uma politica RLS que so permite leitura para usuarios com role `admin`:

```sql
Policy: Admins manage app settings
USING: has_role(auth.uid(), 'admin'::app_role)
```

Quando um usuario **nao esta logado**:
1. A funcao `getAllAppSettings()` consulta o Supabase
2. O RLS bloqueia e retorna um array vazio `[]`
3. O codigo preenche `defaultSettings` (valores vazios)
4. Porem, `setIsLoadingConfig(false)` **e** chamado corretamente

O problema real esta em que as paginas de servico (`GerarDasPage`, `CNDFederalPage`, `RelatorioSitFiscalPage`) nao verificam se as configuracoes estao vazias antes de permitir o uso. O sistema carrega normalmente mas mostra campos vazios.

Analisando novamente: o teste no browser mostrou que a pagina carrega! O problema pode estar em:
- Cache do browser
- Versao publicada desatualizada
- Erro intermitente de rede

Porem, vou propor uma solucao robusta que adiciona uma politica de **leitura publica** para webhooks e tratamento de timeout.

---

## Solucao Proposta

### 1. Adicionar Politica RLS para Leitura Anonima (Opcional)

Criar uma politica que permite leitura das configuracoes para qualquer usuario (logado ou nao), mantendo a escrita restrita a admins.

**SQL Migration:**
```sql
-- Politica para permitir leitura anonima das configuracoes
CREATE POLICY "Anyone can read app settings"
ON public.app_settings
FOR SELECT
USING (true);
```

Isso permite que usuarios nao logados vejam as URLs de webhook (que nao sao sensiveis).

### 2. Adicionar Timeout ao Carregamento

Modificar as paginas de servico para incluir um timeout de seguranca, evitando carregamento infinito em caso de erro de rede.

**Arquivos a modificar:**
- `src/pages/GerarDasPage.tsx`
- `src/pages/servicos/cnd-federal/CNDFederalPage.tsx`
- `src/pages/servicos/relatorio-situacao-fiscal/RelatorioSitFiscalPage.tsx`

**Exemplo de codigo:**
```typescript
useEffect(() => {
  const loadConfig = async () => {
    // Timeout de 10 segundos
    const timeout = setTimeout(() => {
      setIsLoadingConfig(false);
      toast.error("Tempo esgotado ao carregar configuracoes");
    }, 10000);
    
    try {
      const [webhookUrl, ...] = await Promise.all([...]);
      setConfig({ webhookUrl, ... });
    } catch (error) {
      console.error("Erro ao carregar config:", error);
    } finally {
      clearTimeout(timeout);
      setIsLoadingConfig(false);
    }
  };
  loadConfig();
}, []);
```

### 3. Melhorar Tratamento de Erro em getAllAppSettings

Adicionar try/catch e garantir que sempre retorna um resultado, mesmo em caso de erro.

**Arquivo:** `src/hooks/useAppSettings.ts`

```typescript
export const getAllAppSettings = async (): Promise<AppSettings> => {
  try {
    // ... codigo existente ...
  } catch (error) {
    console.error("Erro ao buscar configuracoes:", error);
    return defaultSettings; // Sempre retorna algo
  }
};
```

---

## Alternativa: Manter RLS Restritivo

Se voce preferir manter as configuracoes privadas (so para admins), a solucao seria:

1. Exibir uma mensagem amigavel quando configuracoes nao estao disponiveis
2. Redirecionar para login quando necessario
3. Adicionar timeout para evitar tela travada

**Exemplo de UI:**
```typescript
if (!isLoadingConfig && !config.webhookUrl) {
  return (
    <div className="text-center">
      <p>Servico nao configurado</p>
      <Button onClick={() => navigate("/login")}>
        Fazer login para continuar
      </Button>
    </div>
  );
}
```

---

## Resumo das Mudancas

| Arquivo | Mudanca |
|---------|---------|
| Supabase (SQL) | Nova politica RLS para leitura publica |
| `GerarDasPage.tsx` | Timeout de 10s + tratamento de erro |
| `CNDFederalPage.tsx` | Timeout de 10s + tratamento de erro |
| `RelatorioSitFiscalPage.tsx` | Timeout de 10s + tratamento de erro |
| `useAppSettings.ts` | Garantir retorno mesmo em erro |

---

## Recomendacao

Sugiro a **Alternativa Hibrida**:
1. Adicionar timeout para evitar travamento
2. Manter RLS restritivo (seguranca)
3. Mostrar mensagem clara pedindo login quando configuracoes nao carregam

Isso garante seguranca e boa experiencia do usuario.
