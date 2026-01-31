
# Plano: Adaptar Frontend para Nova Estrutura do Workflow n8n + Funcionalidade CND Federal

## Resumo das Mudanças no Workflow n8n

O workflow agora utiliza um **Switch** para rotear requisições baseado no campo `idServico`:

| idServico | Funcionalidade |
|-----------|----------------|
| (genérico) | Gerar DAS |
| `SOLICITAR` | Relatório de Situação Fiscal (SITFIS) |
| `emitircnd` | **NOVO** - Emitir CND Federal |

---

## 1. Atualizar Payload Atual do SITFIS

### Mudança Necessária

O payload atual NÃO envia o campo `idServico` - o workflow identifica apenas pelo campo `cpfContribuinte`. Para maior clareza e compatibilidade com o novo Switch, devemos adicionar `idServico`.

### Arquivo: `src/pages/servicos/relatorio-situacao-fiscal/RelatorioSitFiscalPage.tsx`

```typescript
// Payload ATUAL
const payload = {
  cpfContribuinte: formData.cnpj.replace(/\D/g, ""),
  cnpjContratante: contratanteCnpj,
  cnpjAutor: autorPedidoCnpj,
};

// Payload NOVO (adicionar idServico)
const payload = {
  idServico: "SOLICITAR",  // ← ADICIONAR
  cpfContribuinte: formData.cnpj.replace(/\D/g, ""),
  cnpjContratante: contratanteCnpj,
  cnpjAutor: autorPedidoCnpj,
};
```

---

## 2. Criar Nova Página: Emitir CND Federal

### 2.1 Adicionar Tipos para CND Federal

**Arquivo:** `src/types/sitfis.ts` (ou criar `src/types/cnd.ts`)

```typescript
export interface CNDRequest {
  cnpj: string;
  tipoPessoa: "PF" | "PJ";
}

export interface CNDWorkflowResponse {
  sucesso: boolean;
  pdfBase64?: string;
  erro?: string;
  mensagem?: string;
}
```

### 2.2 Criar Formulário CND

**Arquivo:** `src/components/cnd/CNDForm.tsx`

Formulário similar ao SITFIS com:
- Seleção Tipo de Pessoa (PF/PJ)
- Campo CNPJ/CPF
- Botão "Emitir CND Federal"

### 2.3 Criar Card de Resultado CND

**Arquivo:** `src/components/cnd/CNDResultCard.tsx`

Reutilizar lógica do `SitFisRelatorioCard.tsx`:
- Visualizador PDF embutido
- Botão Download
- Título: "Certidão Negativa de Débitos - CND Federal"

### 2.4 Criar Página Principal CND

**Arquivo:** `src/pages/servicos/cnd-federal/CNDFederalPage.tsx`

Estrutura similar ao `RelatorioSitFiscalPage.tsx`:

```typescript
const handleSubmit = async (formData: CNDRequest) => {
  const payload = {
    idServico: "emitircnd",  // ← Rota para CND no Switch
    CNPJ: formData.cnpj.replace(/\D/g, ""),
    tipoPessoa: formData.tipoPessoa,
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Processar resposta binária (PDF direto)
  const blob = await response.blob();
  // ... converter para base64 e exibir
};
```

### 2.5 Adicionar Rota

**Arquivo:** `src/App.tsx`

```typescript
<Route path="/servicos/cnd-federal" element={<CNDFederalPage />} />
<Route path="/servicos/cnd-federal/configuracoes" element={<ConfiguracoesCND />} />
```

---

## 3. Atualizar Configurações

### 3.1 Adicionar URL de Webhook para CND

**Arquivo:** `src/utils/config.ts`

```typescript
// CND Federal
const CND_WEBHOOK_URL_KEY = "cnd_webhook_url";

export const getCNDWebhookUrl = (): string => {
  return localStorage.getItem(CND_WEBHOOK_URL_KEY) || "";
};

export const setCNDWebhookUrl = (url: string): void => {
  localStorage.setItem(CND_WEBHOOK_URL_KEY, url);
};
```

**Nota:** Como o workflow usa o MESMO webhook (com Switch), podemos reutilizar a mesma URL do SITFIS ou configurar separadamente para flexibilidade.

### 3.2 Criar Página de Configurações CND

**Arquivo:** `src/pages/servicos/cnd-federal/ConfiguracoesCND.tsx`

Similar ao `ConfiguracoesRelatorioSitFiscal.tsx`.

---

## 4. Atualizar Home Page

### Arquivo: `src/pages/HomePage.tsx` (ou equivalente)

Adicionar card/link para o novo serviço:

```typescript
<ServiceCard
  title="CND Federal"
  description="Emitir Certidão Negativa de Débitos da Receita Federal"
  icon={<FileCheck className="h-8 w-8" />}
  to="/servicos/cnd-federal"
/>
```

---

## 5. Estrutura de Arquivos Final

```text
src/
├── components/
│   ├── sitfis/           (existente)
│   │   ├── SitFisForm.tsx
│   │   ├── SitFisRelatorioCard.tsx
│   │   └── SitFisStatusCard.tsx
│   └── cnd/              (NOVO)
│       ├── CNDForm.tsx
│       ├── CNDResultCard.tsx
│       └── CNDStatusCard.tsx
├── pages/
│   └── servicos/
│       ├── relatorio-situacao-fiscal/   (existente)
│       └── cnd-federal/                  (NOVO)
│           ├── CNDFederalPage.tsx
│           └── ConfiguracoesCND.tsx
└── types/
    ├── sitfis.ts         (atualizar)
    └── cnd.ts            (NOVO, opcional)
```

---

## 6. Payload Comparativo

| Campo | SITFIS | CND Federal |
|-------|--------|-------------|
| `idServico` | `"SOLICITAR"` | `"emitircnd"` |
| `cpfContribuinte` / `CNPJ` | CNPJ do contribuinte | CNPJ do contribuinte |
| `cnpjContratante` | CNPJ do escritório | - |
| `cnpjAutor` | CNPJ do autor | - |
| `tipoPessoa` | - | `"PF"` ou `"PJ"` |

---

## Resumo das Tarefas

| # | Tarefa | Arquivos |
|---|--------|----------|
| 1 | Adicionar `idServico: "SOLICITAR"` ao payload SITFIS | `RelatorioSitFiscalPage.tsx` |
| 2 | Criar tipos para CND | `src/types/cnd.ts` ou `sitfis.ts` |
| 3 | Criar componente `CNDForm.tsx` | `src/components/cnd/` |
| 4 | Criar componente `CNDResultCard.tsx` | `src/components/cnd/` |
| 5 | Criar componente `CNDStatusCard.tsx` | `src/components/cnd/` |
| 6 | Criar página `CNDFederalPage.tsx` | `src/pages/servicos/cnd-federal/` |
| 7 | Criar página `ConfiguracoesCND.tsx` | `src/pages/servicos/cnd-federal/` |
| 8 | Adicionar funções de config no `config.ts` | `src/utils/config.ts` |
| 9 | Adicionar rotas no `App.tsx` | `src/App.tsx` |
| 10 | Adicionar link na Home Page | `src/pages/HomePage.tsx` ou `Index.tsx` |
