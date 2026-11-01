# Esteira DevSecOps

Arquivo: `.github/workflows/devsecops.yml`. Roda em push na `main`, em branches `teste/**` e manualmente. Cada etapa depende da anterior. O Resumo roda sempre.

Todas as actions estao fixadas pelo SHA do commit. As ferramentas tem versao fixa. A permissao padrao e `contents: read`; cada job pede so o que precisa.

## 1. Secrets (`secrets-scan`)

Gitleaks no historico completo (`fetch-depth: 0`) com `--redact` e `--exit-code 1`, regras padrao. O `.gitleaksignore` tem uma unica entrada: a chave ficticia do teste de quality gate.

## 2. SAST (`sast`)

Semgrep com `p/default` e `p/owasp-top-ten`. O gate falha com qualquer achado WARNING ou ERROR. Achados INFO ficam no relatorio sem bloquear. Gera JSON e SARIF; o SARIF vai para a aba Security. O `.semgrepignore` ignora dependencias, build e docs.

## 3. Build (`build`)

`npm ci` nos dois apps, arvore de dependencias (`npm ls --all`), `npm audit --json` (informativo), testes (`npm test`) e build. O artefato e `secden-<sha>.tar.gz`.

## 4. SCA (`sca`)

`trivy fs` com `vuln,misconfig,secret`. Tabela completa em `trivy-fs.txt` e JSON filtrado HIGH/CRITICAL em `trivy-fs.json`, com `--exit-code 1`.

## 5. Imagem (`docker-build`)

Dockerfile multi-stage: build com `node:22-alpine` e execucao com `nginx-unprivileged` alpine, usuario 101, porta 8080, sem segredos. Tag igual ao SHA do commit, nunca `latest`. Login no GHCR com `GITHUB_TOKEN` e `packages: write` so neste job. A imagem e assinada com Cosign keyless (OIDC). O relatorio tem imagem, digest e manifesto.

## 6. Scan da imagem (`image-scan`)

`trivy image` na mesma tag. Credenciais do registry por variavel de ambiente (`TRIVY_USERNAME`, `TRIVY_PASSWORD`). Gate com `--ignore-unfixed` e `--exit-code 1`. Gera SBOM CycloneDX.

## 7. Homologacao + DAST (`dast-staging`)

Sobe a imagem no proprio runner (environment `homologacao`) e roda ZAP Baseline e ZAP Full Scan contra `http://localhost:8080`, com `fail_action: false`. O `nginx.conf` ja define CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy e esconde a versao do servidor.

## 8. Producao (`deploy-prod`)

Environment `producao` com revisor obrigatorio e restrito a `main`. Depois da aprovacao, chama o deploy hook do Render passando a imagem pelo SHA, espera a URL responder e gera relatorio com imagem, aprovador, data e link da execucao.

## Resumo (`pipeline-summary`)

Baixa os relatorios, conta os achados com `jq` e publica a tabela no Job Summary e em `resumo-esteira.md`.

## Configuracao no GitHub

- Settings > Environments: `homologacao` e `producao` (Required reviewers, branch `main`).
- Em `producao`: secret `RENDER_DEPLOY_HOOK_URL` e variable `PROD_URL`.
- Settings > Actions > General > Workflow permissions: Read and write.
- Package no GHCR com visibilidade publica, para o Render baixar a imagem.
