export default function BruteforceIntro({ onBegin, onBack }) {
  return (
    <div className="hub-full page-enter">
      <button className="btn-ghost bf-intro-back" onClick={onBack}>← Voltar para os desafios</button>

      <div className="bf-intro">
        <div className="sec-label">Briefing do Desafio · O Que É BRUTEFORCE?</div>
        <h1 className="bf-intro-title">O Que É <span>BRUTEFORCE</span>?</h1>
        <p className="bf-intro-lede">
          Antes de entrar no cofre, conheça seu inimigo. BRUTEFORCE é o
          instrumento mais rudimentar da quebra de senhas — não exige nenhuma
          esperteza, só poder de computação e tempo.
        </p>

        <div className="bf-intro-section">
          <div className="bf-intro-label">O Que É</div>
          <p>
            Um ataque de BRUTEFORCE testa cada combinação possível de
            caracteres até que uma delas corresponda a uma senha, ou ao seu
            hash. Não há reconhecimento de padrões nem sofisticação — apenas a
            exaustão sistemática de todos os valores do "espaço de busca" até
            o valor correto aparecer. É o recurso ao qual um atacante recorre
            quando o alvo não deixa nenhuma outra pista, e é a referência com
            a qual toda outra técnica de quebra é comparada.
          </p>
        </div>

        <div className="bf-intro-section">
          <div className="bf-intro-label">Como Funciona</div>
          <p>
            Um atacante começa com um alvo: um formulário de login para
            atacar diretamente ("online"), ou — muito mais comum — um hash de
            senha roubado para testar em particular ("offline"). A partir daí:
          </p>
          <ul>
            <li>Um software de quebra de senhas (Hashcat, John the Ripper, ou um script próprio) gera senhas candidatas, seja contando literalmente todas as combinações de um conjunto de caracteres, seja percorrendo primeiro listas de palavras e padrões humanos conhecidos.</li>
            <li>Cada candidata é transformada em hash e comparada com o hash alvo, ou enviada e verificada em busca de um login bem-sucedido.</li>
            <li>A velocidade depende inteiramente do hardware e do algoritmo de hash: uma rig de GPUs moderna consegue testar bilhões de candidatas por segundo contra um hash rápido e sem salt — mas apenas alguns milhares por segundo contra um hash deliberadamente lento, como bcrypt ou Argon2.</li>
            <li>O tempo total do ataque é limitado pelo tamanho do espaço de busca, que cresce exponencialmente com o comprimento e a variedade de caracteres. Adicionar um caractere não deixa o espaço de busca um pouco maior — ele multiplica.</li>
          </ul>
        </div>

        <div className="bf-intro-section">
          <div className="bf-intro-label">Onde É Usada</div>
          <p>
            Você encontra a BRUTEFORCE dos dois lados da moeda:
          </p>
          <ul>
            <li><strong>Pentest e red teaming</strong> — profissionais de segurança quebram credenciais em engajamentos autorizados para demonstrar o risco real a um cliente. É exatamente isso que você está prestes a simular.</li>
            <li><strong>Auditoria de senhas</strong> — organizações quebram seus próprios dumps de hash para encontrar senhas fracas de funcionários antes que um atacante o faça.</li>
            <li><strong>CTFs e treinamento</strong> — quebrar cifras fracas, PINs ou arquivos protegidos por senha é um exercício clássico para iniciantes.</li>
            <li><strong>Ataques maliciosos</strong> — contra formulários de login, handshakes de Wi-Fi e dumps de hash vazados, geralmente começando pelas senhas mais comuns do mundo antes de tentar uma varredura "pura" de caracteres.</li>
            <li><strong>Defesa</strong> — é exatamente o motivo pelo qual existem bloqueio de conta, limitação de tentativas, CAPTCHAs e algoritmos de hash lentos. Cada um deles torna a BRUTEFORCE lenta demais para valer a pena.</li>
          </ul>
        </div>

        <div className="bf-intro-cta">
          <button className="btn-primary" onClick={onBegin}>Começar Desafio →</button>
        </div>
      </div>
    </div>
  )
}
