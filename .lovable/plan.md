
# Plano: Corrigir URL de Preconnect e Publicar

## Problema

O sistema funciona corretamente no ambiente de teste (preview), mas o site publicado ainda usa o codigo antigo que aponta para o banco de dados que foi apagado. Alem disso, o `index.html` tem links de preconnect apontando para o Supabase antigo.

## Correção

### 1. Atualizar preconnect no index.html

Trocar a URL antiga pela nova:

- **De:** `https://wdbtqanwncruzbvnxmrk.supabase.co`
- **Para:** `https://xysfgpqhofvysgqomzcm.supabase.co`

Linhas 23-24 do `index.html`.

### 2. Publicar as alteracoes

Apos a correcao, voce precisa **publicar** o projeto para que o site em producao use o novo banco de dados.

## Resumo

| Arquivo | Mudanca |
|---------|---------|
| `index.html` | Atualizar URLs de preconnect para novo Supabase |
| Publicacao | Necessario publicar para corrigir o site em producao |
