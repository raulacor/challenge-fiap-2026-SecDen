# Observacoes

Classificacao: real, falso positivo ou risco aceito.

## Antes da esteira

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| GHSA vite, esbuild, launch-editor (High) | `package-lock.json`, `hub/package-lock.json` | Real | Vite atualizado para 8.3.5 e plugin-react para 6.1.2 | `npm audit`: 0 vulnerabilidades nos dois apps |
| GHSA-2v37-7h3g-55p8 nanoid (High) | `hub/package-lock.json` | Real | Resolvido com a atualizacao do Vite | `npm audit`: 0 |
| GHSA-68fv-2mgg-jv7q source-map-js (High) | os dois lockfiles | Real | Resolvido com a atualizacao do Vite | `npm audit`: 0 |
| `npm ci` falhava (conflito de peer: vite 8 x plugin-react 4) | `package.json` raiz | Real | Versoes alinhadas | `npm ci` funciona nos dois apps |
| `node_modules/` e `dist/` versionados | repositorio | Real | Criado `.gitignore` e arquivos removidos do indice | Repositorio so com codigo fonte. Gitleaks confirmou que nao havia segredos nesses arquivos |
| Cabecalhos de seguranca ausentes | servidor | Real | `nginx.conf` com CSP e demais cabecalhos | Ver relatorio ZAP |
| Link do logo do Hub quebrado (`../index.html`) | `hub/src/components/Sidebar.jsx` | Real (bug) | Trocado para `../../index.html` | Link abre a landing |

## Gitleaks

Historico completo de todas as branches: nenhum segredo real.

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| generic-api-key | `teste-segredo.txt:1`, commit `f2da1be`, branch `teste/segredo-ficticio` | Falso positivo | Chave ficticia criada para testar o gate. Como o checkout traz todas as branches, ela passou a bloquear a `main` (execucao #5). Registrada no `.gitleaksignore` pelo fingerprint exato | Execucao seguinte sem achados |

## Semgrep

Na esteira (`p/default` e `p/owasp-top-ten`): 0 achados.

Antes da esteira rodamos tambem as pastas de regras javascript, react, dockerfile, nginx, secrets, github-actions e html do repositorio publico do Semgrep. Nenhum achado WARNING ou ERROR. Os achados INFO foram:

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| jsx-not-internationalized (INFO, 134x) | `src/Landing.jsx` e `hub/src` | Falso positivo para seguranca | Regra de portabilidade (i18n), nao de seguranca. O app e so em portugues | Mantido, nao bloqueia |
| prefer-json-notation (INFO) | `Dockerfile`, HEALTHCHECK | Real | HEALTHCHECK no formato JSON | Achado removido |
| dockerfile-source-not-pinned (INFO, 2x) | `Dockerfile`, FROM | Risco aceito | Tags fixadas na versao (`node:22-alpine`, `1.29-alpine`). Fixar por digest exigiria atualizacao manual a cada patch de seguranca | Mantido |
| avoid-apk-upgrade (INFO) | `Dockerfile` | Risco aceito | `apk upgrade` aplica correcoes do alpine que ainda nao estao na imagem base. Reduz achados da etapa 6 | Mantido |

## Trivy fs

Dockerfile: 0 misconfiguracoes. Segredos: 0. Dependencias: 0 HIGH/CRITICAL, consistente com o `npm audit` (0 vulnerabilidades apos atualizar o Vite).

## Trivy image

0 HIGH/CRITICAL com correcao disponivel na imagem `nginx-unprivileged` alpine. A imagem nao leva dependencias npm, entao os achados possiveis vem so do sistema base. O SBOM CycloneDX fica no relatorio 06.

## ZAP

| Achado | Onde | Classificacao | Acao tomada | Resultado |
|--------|------|---------------|-------------|-----------|
| 90003 Sub Resource Integrity Attribute Missing (Medium) | `index.html` (Google Fonts) | Risco aceito | Google Fonts gera CSS diferente por navegador, entao SRI nao funciona. Origem restrita pela CSP | Alerta mantido |
| 90004 Cross-Origin-Embedder-Policy ausente (Low) | `/` | Risco aceito | `require-corp` bloquearia as fontes do Google. O app nao usa recursos que precisam de isolamento | Alerta mantido |
| 10049 Storable and Cacheable Content (Informativo) | `/`, `/assets/*` | Falso positivo | Site estatico e publico, cache e desejado | Alerta mantido |
| 10109 Modern Web Application (Informativo) | `/` | Informativo | Apenas indica que o app e uma SPA React | Alerta mantido |

Baseline: 0 FAIL, 0 High, 64 regras PASS. Os cabecalhos do `nginx.conf` (CSP, X-Frame-Options, X-Content-Type-Options e outros) evitaram os alertas Medium mais comuns.

## Execucao bloqueada

| Gate | Branch | O que foi feito | Correcao |
|------|--------|-----------------|----------|
| Gitleaks | `teste/segredo-ficticio` ([#4](https://github.com/raulacor/challenge-fiap-2026-SecDen/actions/runs/41327498959)) | Commit com chave de API ficticia em `teste-segredo.txt` | Gitleaks: `leaks found: 1`, etapas 2 a 8 puladas. A branch nunca vai para a `main` e a chave nunca foi real |

## Licoes aprendidas

1. O `npm audit` ja mostrava vulnerabilidades High antes da esteira existir. Ninguem olhava porque nada bloqueava.
2. Lockfile so garante reprodutibilidade se o `npm ci` funcionar. O conflito de peer so apareceu ao rodar em ambiente limpo.
3. Versionar `node_modules` aumenta o ruido do Gitleaks e do Semgrep e mistura codigo de terceiros com o nosso.
4. A imagem final nao leva dependencias npm. Separar build e execucao reduz muito o que o Trivy encontra na imagem.
5. Cabecalhos de seguranca resolvem a maior parte dos alertas do ZAP em um app estatico e custam poucas linhas.
6. O deploy no Render falhou porque a tag escolhida no GHCR era a assinatura do Cosign (`sha256-...`), nao a imagem. Referenciar a imagem sempre pela tag do commit evita esse erro.
7. Tempo da esteira: cerca de 6 minutos de execucao automatica (ZAP Baseline + Full Scan levam 3). O total da execucao #3 foi 12m40s por causa da espera pela aprovacao.
