
# Plano: Corrigir Visualização de PDF no Módulo CND Federal

## Problema Identificado

A resposta do workflow n8n está retornando:
- **Header:** `content-type: application/json`
- **Body:** Conteúdo binário do PDF (ex: `%PDF-1.4...`)

O código atual verifica o `content-type` e, como indica JSON, tenta `response.json()` que falha porque o corpo é um PDF binário.

## Solução

Implementar detecção inteligente que verifica o conteúdo real da resposta, não apenas o header `content-type`.

---

## Arquivo: `src/pages/servicos/cnd-federal/CNDFederalPage.tsx`

### Alteração na Lógica de Processamento da Resposta

A estratégia será:
1. Primeiro, obter a resposta como ArrayBuffer
2. Verificar os primeiros bytes para detectar se é PDF (`%PDF`)
3. Se for PDF binário, converter para Base64
4. Se não for PDF, tratar como JSON

### Código Modificado

```typescript
// Função auxiliar para detectar PDF pelos primeiros bytes
const isPdfContent = (arrayBuffer: ArrayBuffer): boolean => {
  const uint8Array = new Uint8Array(arrayBuffer);
  // PDF começa com "%PDF" (0x25 0x50 0x44 0x46)
  return (
    uint8Array[0] === 0x25 && // %
    uint8Array[1] === 0x50 && // P
    uint8Array[2] === 0x44 && // D
    uint8Array[3] === 0x46    // F
  );
};

// Função para converter ArrayBuffer em Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Na função handleSubmit:
const response = await fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

// Obter resposta como ArrayBuffer para inspeção
const arrayBuffer = await response.arrayBuffer();
let pdfBase64Result = "";

if (isPdfContent(arrayBuffer)) {
  // Resposta é PDF binário (independente do content-type)
  pdfBase64Result = arrayBufferToBase64(arrayBuffer);
} else {
  // Tentar processar como JSON
  const textDecoder = new TextDecoder();
  const jsonString = textDecoder.decode(arrayBuffer);
  const rawData = JSON.parse(jsonString);
  const data: CNDWorkflowResponse = Array.isArray(rawData) ? rawData[0] : rawData;

  if (data.sucesso && data.pdfBase64) {
    pdfBase64Result = data.pdfBase64;
  } else {
    const errorMsg = data.erro || data.mensagem || "Erro ao emitir CND";
    throw new Error(errorMsg);
  }
}
```

---

## Arquivo: `src/pages/servicos/relatorio-situacao-fiscal/RelatorioSitFiscalPage.tsx`

Aplicar a mesma correção para garantir consistência em todo o sistema.

---

## Resumo das Tarefas

| # | Tarefa | Arquivo |
|---|--------|---------|
| 1 | Adicionar função `isPdfContent()` para detectar PDF pelos primeiros bytes | `CNDFederalPage.tsx` |
| 2 | Adicionar função `arrayBufferToBase64()` para conversão | `CNDFederalPage.tsx` |
| 3 | Modificar `handleSubmit` para usar detecção por conteúdo | `CNDFederalPage.tsx` |
| 4 | Aplicar mesma correção no SITFIS | `RelatorioSitFiscalPage.tsx` |

---

## Detalhes Técnicos

### Por que essa abordagem?

1. **Robustez:** Não depende do header `content-type` que pode estar incorreto
2. **Detecção Precisa:** Arquivos PDF sempre começam com `%PDF` (bytes 0x25 0x50 0x44 0x46)
3. **Compatibilidade:** Funciona tanto se o n8n enviar o PDF com header correto quanto incorreto
4. **Fallback JSON:** Se não for PDF, tenta processar como JSON normalmente

### Fluxo de Dados

```text
Resposta n8n
     |
     v
ArrayBuffer (dados brutos)
     |
     v
Verifica primeiros 4 bytes
     |
     +-- É "%PDF"? --> Converte para Base64 --> Exibe no iframe
     |
     +-- Não é PDF --> Decodifica como JSON --> Extrai pdfBase64
```
