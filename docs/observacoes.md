# Observacoes

Classificacao: real, falso positivo ou risco aceito.

## Antes da esteira

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| GHSA vite, esbuild, launch-editor (High) | `package-lock.json`, `hub/package-lock.json` | Real | Vite atualizado para 8.3.5 e plugin-react para 6.1.2 | `npm audit`: 0 vulnerabilidades nos dois apps |
| GHSA-2v37-7h3g-55p8 nanoid (High) | `hub/package-lock.json` | Real | Resolvido com a atualizacao do Vite | `npm audit`: 0 |
| GHSA-68fv-2mgg-jv7q source-map-js (High) | os dois lockfiles | Real | Resolvido com a atualizacao do Vite | `npm audit`: 0 |
| `npm ci` falhava (conflito de peer: vite 8 x plugin-react 4) | `package.json` raiz | Real | Versoes alinhadas | `npm ci` funciona nos dois apps |
| `node_modules/` e `dist/` versionados | repositorio | Real | Criado `.gitignore` e arquivos removidos do indice | Repositorio so com codigo fonte |
| Cabecalhos de seguranca ausentes | servidor | Real | `nginx.conf` com CSP e demais cabecalhos | Ver relatorio ZAP |
| Link do logo do Hub quebrado (`../index.html`) | `hub/src/components/Sidebar.jsx` | Real (bug) | Trocado para `../../index.html` | Link abre a landing |

## Gitleaks

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| PREENCHER | | | | |

Allowlist em `.gitleaks.toml` para `node_modules/` e `dist/`: codigo de terceiros e gerado, sem credenciais do grupo.

## Semgrep

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| PREENCHER | | | | |

## Trivy fs

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| PREENCHER | | | | |

## Trivy image

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| PREENCHER | | | | |

## ZAP

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| 90003 Sub Resource Integrity Attribute Missing | `index.html` (Google Fonts) | Risco aceito | Google Fonts gera CSS diferente por navegador, entao SRI nao funciona. Origem restrita pela CSP | Alerta mantido |
| PREENCHER | | | | |

## Execucao bloqueada

| Gate | Branch | O que foi feito | Correcao |
|------|--------|-----------------|----------|
| Gitleaks | `teste/segredo-ficticio` | Commit com token GitHub ficticio | Branch apagada, token nunca foi real |

## Licoes aprendidas

1. O `npm audit` ja mostrava vulnerabilidades High antes da esteira existir. Ninguem olhava porque nada bloqueava.
2. Lockfile so garante reprodutibilidade se o `npm ci` funcionar. O conflito de peer so apareceu ao rodar em ambiente limpo.
3. Versionar `node_modules` aumenta o ruido do Gitleaks e do Semgrep e mistura codigo de terceiros com o nosso.
4. A imagem final nao leva dependencias npm. Separar build e execucao reduz muito o que o Trivy encontra na imagem.
5. Cabecalhos de seguranca resolvem a maior parte dos alertas do ZAP em um app estatico e custam poucas linhas.
6. Tempo medio da esteira: PREENCHER.
