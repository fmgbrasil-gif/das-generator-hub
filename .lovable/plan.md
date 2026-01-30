

# Plano: Corrigir Visualização do PDF Bloqueada

## Problema Identificado

O Chrome está bloqueando a abertura do PDF porque:

1. O código atual usa `window.open(blobUrl, "_blank")`
2. URLs do tipo `blob:` abertas em nova aba são frequentemente bloqueadas por:
   - Extensões de navegador (bloqueadores de anúncios)
   - Políticas de segurança do navegador
   - Bloqueio de popups

---

## Soluções Possíveis

### Opção 1: Visualizar PDF em iframe na mesma página (Recomendada)
Adicionar um visualizador de PDF embutido na página usando um iframe ou `<object>`.

### Opção 2: Usar data URL em vez de blob URL
Usar `data:application/pdf;base64,...` que é menos bloqueado.

### Opção 3: Forçar download sempre
Remover o botão "Visualizar" e manter apenas "Download".

---

## Solução Recomendada: Visualizador Embutido

Vou adicionar um visualizador de PDF embutido na página que evita completamente o problema de bloqueio.

### Mudanças no Arquivo: `src/components/sitfis/SitFisRelatorioCard.tsx`

```typescript
import { useState } from "react";

export const SitFisRelatorioCard = ({ pdfBase64 }: SitFisRelatorioCardProps) => {
  const [showViewer, setShowViewer] = useState(false);
  
  // Cria data URL em vez de blob URL
  const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;
  
  const handleView = () => {
    setShowViewer(!showViewer);
  };

  return (
    <Card>
      {/* ... header ... */}
      <CardContent>
        <div className="flex gap-3">
          <Button onClick={handleView}>
            {showViewer ? "Ocultar PDF" : "Visualizar PDF"}
          </Button>
          <Button onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
        
        {/* Visualizador embutido */}
        {showViewer && (
          <div className="mt-4 border rounded-lg overflow-hidden">
            <iframe
              src={pdfDataUrl}
              className="w-full h-[600px]"
              title="Visualizador PDF"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
```

---

## Vantagens da Solução

| Aspecto | Benefício |
|---------|-----------|
| Sem bloqueio | Data URL em iframe não é bloqueado |
| Melhor UX | PDF aparece na mesma página |
| Sem popup | Não abre nova aba |
| Compatível | Funciona em todos os navegadores modernos |

---

## Alternativa: Abrir em Nova Aba (se preferir)

Se você preferir manter a abertura em nova aba, podemos tentar usar data URL:

```typescript
const handleView = () => {
  const dataUrl = `data:application/pdf;base64,${pdfBase64}`;
  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(`
      <iframe src="${dataUrl}" style="width:100%;height:100%;border:none;"></iframe>
    `);
  }
};
```

---

## Resumo

| Arquivo | Mudança |
|---------|---------|
| `SitFisRelatorioCard.tsx` | Trocar `window.open(blob)` por visualizador embutido com iframe |

