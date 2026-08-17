import { useEffect, useRef } from 'react'

export default function Landing() {
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.style.background = window.scrollY > 60
          ? 'rgba(4,4,4,0.98)'
          : 'rgba(4,4,4,0.85)'
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Navbar */}
      <nav id="navbar" ref={navRef}>
        <a href="#" className="nav-logo">
          Sec<span>Den</span>
        </a>
        <ul className="nav-links">
          <li><a href="#mission">Missão</a></li>
          <li><a href="#how">Como Funciona</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
        </ul>
        <a href="#cta" className="nav-cta"><span>Junte-se à arena</span></a>
      </nav>

      {/* Hero */}
      <section id="hero">
        <div className="hero-grid"></div>
        <div className="hero-vignette"></div>

        <div className="lightning-stage">
          {/* Bolt 1 */}
          <svg
            className="lightning-svg bolt-1"
            width="320"
            height="700"
            viewBox="0 0 320 700"
            style={{ position: 'absolute', top: '-30px', right: '12%', opacity: 0 }}
          >
            <defs>
              <filter id="glow1">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Outer glow */}
            <polyline
              points="200,0 160,190 220,190 110,430 180,430 60,700"
              stroke="rgba(255,26,26,0.3)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Core bolt */}
            <polyline
              points="200,0 160,190 220,190 110,430 180,430 60,700"
              stroke="#FF3333"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow1)"
            />
            {/* Branch right */}
            <polyline
              points="220,190 270,300 255,300 285,380"
              stroke="rgba(255,80,80,0.7)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Branch left */}
            <polyline
              points="110,430 60,510 75,510 40,580"
              stroke="rgba(255,60,60,0.55)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Bolt 2 — slim, mid right */}
          <svg
            className="lightning-svg bolt-2"
            width="200"
            height="550"
            viewBox="0 0 200 550"
            style={{ position: 'absolute', top: '60px', right: '26%', opacity: 0 }}
          >
            <polyline
              points="130,0 100,155 150,155 80,330 125,330 50,550"
              stroke="rgba(255,26,26,0.28)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <polyline
              points="130,0 100,155 150,155 80,330 125,330 50,550"
              stroke="#FF1A1A"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Bolt 3 — wide dramatic */}
          <svg
            className="lightning-svg bolt-3"
            width="280"
            height="750"
            viewBox="0 0 280 750"
            style={{ position: 'absolute', top: '-60px', right: '4%', opacity: 0 }}
          >
            <defs>
              <filter id="glow3">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <polyline
              points="170,0 130,210 195,210 90,450 160,450 50,750"
              stroke="rgba(255,26,26,0.25)"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="170,0 130,210 195,210 90,450 160,450 50,750"
              stroke="#FF4444"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow3)"
            />
          </svg>

          {/* Bolt 4 — thin accent */}
          <svg
            className="lightning-svg bolt-4"
            width="160"
            height="480"
            viewBox="0 0 160 480"
            style={{ position: 'absolute', top: '120px', right: '36%', opacity: 0 }}
          >
            <polyline
              points="100,0 75,130 115,130 60,270 90,270 30,480"
              stroke="rgba(255,26,26,0.22)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <polyline
              points="100,0 75,130 115,130 60,270 90,270 30,480"
              stroke="#FF1A1A"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Background radial glow orb */}
          <svg
            width="700"
            height="700"
            viewBox="0 0 700 700"
            style={{
              position: 'absolute',
              right: '-80px',
              top: '50%',
              transform: 'translateY(-55%)',
              animation: 'glow-orb 4.5s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          >
            <defs>
              <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF1A1A" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF1A1A" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="350" cy="350" r="300" fill="url(#rg1)" opacity="0.12" />
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">SEC_DEN // PLATFORM v0.0.1 // ACTIVE</div>

          <h1 className="hero-title">
            <span className="l1">HACK THE</span>
            <span className="l2 glitch" data-text="LEARNING">LEARNING</span>
            <span className="l3">CURVE</span>
          </h1>

          <p className="hero-sub">
            Segurança não é um trabalho, é uma obrigação. Aprenda a identificar ameaças reais em
            cenários reais, suba de nível, ganhe badges e domine a leaderboard.
          </p>

          <div className="hero-actions">
            <a href="#cta" className="btn-primary">
              <span>Comece sua missão</span>
            </a>
            <a href="#how" className="btn-ghost">
              Veja como funciona
              <span className="arr">→</span>
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">48K</div>
            <div className="stat-label">Caçadores Ativos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1.2M</div>
            <div className="stat-label">Challenges Concluídos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Desfios Live</div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>CTF Challenge Live</span>
          <span>Novos Ransk Disponíveis</span>
          <span>Simulação de Ameaças Atualizada</span>
          <span>Temporada Zer0</span>
          <span>Versão Beta</span>
          <span>Novo Mdulo: O que é Phishing?</span>
          <span>Arena Open</span>
          <span>CTF Challenge Live</span>
          <span>Novos Ranks Disponíveis</span>
          <span>Simulação de Ameaças Atualizada</span>
          <span>Temporada Zer0</span>
          <span>Versão Beta</span>
          <span>Novo Mdulo: O que é Phishing?</span>
          <span>Arena Open</span>
        </div>
      </div>

      {/* Mission */}
      <section id="mission">
        <div className="section-label">Our Mission</div>
        <h2 className="section-title">
          Segurança <br /><span>é Mentalidade</span>
        </h2>
        <div className="mission-layout">
          <div className="mission-text">
            <p>
              O mundo enfrenta um <strong>déficit de cibersegurança sem precedentes</strong>.
              Organizações são invadidas diariamente — não porque as ferramentas sejam insuficientes,
              mas porque a camada mais vulneravel está mal treinada. <strong>A camada humana.</strong>
            </p>
            <p>
              A SecDen transforma o ensino árido e passivo em uma experiência{' '}
              <strong>imersiva e competitiva.</strong> Simulações reais de ataques. Cenários
              adversários ao vivo. Uma comunidade global de defensores que realmente sabem o que
              estão fazendo.
            </p>
            <p>
              Não apenas ensinamos segurança. <strong>Forjamos profissionais</strong> — um desafio
              de cada vez.
            </p>
          </div>

          <div className="terminal-box">
            <div className="t-bar">
              <div className="dot dr"></div>
              <div className="dot dy"></div>
              <div className="dot dg"></div>
              <span className="t-title">secden_init.sh — bash</span>
            </div>
            <div className="t-body">
              <span className="tl">
                <span className="tp">root@secden:~$</span>{' '}
                <span className="tc">./launch_mission.sh --mode=training</span>
              </span>
              <span className="tl">
                <span className="to">[+] Initializing SecDen Platform...</span>
              </span>
              <span className="tl">
                <span className="to">[+] Loading threat database: 48,290 scenarios</span>
              </span>
              <span className="tl">
                <span className="tod">[*] Fetching live CVE feeds...</span>
              </span>
              <span className="tl">
                <span className="to">[+] Engine: ONLINE</span>
              </span>
              <span className="tl">
                <span className="tow">[!] New badge available: Recon Expert</span>
              </span>
              <span className="tl">
                <span className="to">[+] Your current rank: #247 / 48,290</span>
              </span>
              <span className="tl">
                <span className="tod">[*] XP until next level: 1,340</span>
              </span>
              <span className="tl">
                <span className="to">[+] 3 new challenges unlocked</span>
              </span>
              <span className="tl">
                <span className="tp">root@secden:~$</span>{' '}
                <span className="tc">start_challenge --id=APT-31</span>
              </span>
              <span className="tl">
                <span className="to">
                  [+] Challenge started. Good luck, hunter.<span className="tcur"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how">
        <div className="how-inner">
          <div className="section-label">Como Funciona</div>
          <h2 className="section-title">
            O seu<br /><span>caminho</span>
          </h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-xp">+50 XP</div>
              <div className="step-icon">🎯</div>
              <div className="step-title">Escolha o Seu Caminho</div>
              <div className="step-text">
                Escolha entre dezenas de caminhos especializados — desde hacking ético e inteligência
                de ameaças até perícia digital. Cada caminho apreseta uma campanha completa.
              </div>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-xp">+100 XP</div>
              <div className="step-icon">⚔️</div>
              <div className="step-title">Complete Desafios</div>
              <div className="step-text">
                Enfrente cenários adversários reais em ambientes isolados. Padrões de ataque reais.
                Consequências reais. Aprendizado real.
              </div>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-xp">+150 XP</div>
              <div className="step-icon">🏆</div>
              <div className="step-title">Suba de nível</div>
              <div className="step-text">
                Colecione emblemas, acumule XP, suba no ranking global. Sua habilidade é sua
                pontuação — sem atalhos.
              </div>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-xp">+200 XP</div>
              <div className="step-icon">🔥</div>
              <div className="step-title">Vire a Elite</div>
              <div className="step-text">
                Alcance o nível Elite. Acesse operações privadas de equipe vermelha. Seja notado
                pelas principais empresas de segurança que estão recrutando ativamente em nossa
                plataforma.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="section-label">Platform Features</div>
        <h2 className="section-title">
          feito para <br /><span>caçadores</span>
        </h2>
        <div className="features-grid">
          {/* Large card with mini leaderboard */}
          <div className="feature-card large">
            <div className="left">
              <div className="feature-tag">Sistema Essencial</div>
              <div className="feature-title">Live Arena</div>
              <p className="feature-text">
                Nossa arena utiliza infraestrutura real — isolada, porém autêntica. Explore serviços
                mal configurados, mova-se lateralmente pelas redes, extraia flags. Sem laboratórios
                falsos. Sem ambientes higienizados.
              </p>
              <a href="#" className="btn-primary">Acesse a arena</a>
            </div>

            <div className="lb-mini">
              <div className="lb-mini-head">⚡ Live Arena — Top Hunters</div>
              <div className="lb-row">
                <div className="lb-rank g">1</div>
                <div className="lb-name">H4ckUdo</div>
                <div className="lb-score">98,420</div>
                <div className="lb-badge-i">🔥</div>
              </div>
              <div className="lb-row">
                <div className="lb-rank s">2</div>
                <div className="lb-name">sabirilo</div>
                <div className="lb-score">94,110</div>
                <div className="lb-badge-i">⚡</div>
              </div>
              <div className="lb-row">
                <div className="lb-rank b">3</div>
                <div className="lb-name">antizzzz</div>
                <div className="lb-score">91,870</div>
                <div className="lb-badge-i">🎯</div>
              </div>
              <div className="lb-row">
                <div className="lb-rank">4</div>
                <div className="lb-name">viper_0x7</div>
                <div className="lb-score">88,340</div>
                <div className="lb-badge-i">🛡️</div>
              </div>
              <div className="lb-row">
                <div className="lb-rank">5</div>
                <div className="lb-name">ph4nt0m_wr</div>
                <div className="lb-score">84,990</div>
                <div className="lb-badge-i">💀</div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🎮</span>
            <div className="feature-tag">Gamification</div>
            <div className="feature-title">XP, Ranks &amp; Seasons</div>
            <p className="feature-text">
              Competições sazonais com rankings, obtenção de emblemas raros e recompensas de
              prestígio. Cada desafio importa. Cada ação é registrada.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">👥</span>
            <div className="feature-tag">Comunidade</div>
            <div className="feature-title">Team Operations</div>
            <p className="feature-text">
              Forme equipes, coordene operações ao vivo, compartilhe informações. O SecDen foi
              desenvolvido para colaboração — porque segurança de verdade é um esporte coletivo.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🔴</span>
            <div className="feature-tag">Avançado</div>
            <div className="feature-title">Campanhas Red Team</div>
            <p className="feature-text">
              Operações de várias semanas, guiadas por narrativas e baseadas em manuais reais de
              APTs. APT28. Lazarus. FIN7. Estude os melhores adversários.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <div className="feature-tag">Analytics</div>
            <div className="feature-title">Painel de Métricas</div>
            <p className="feature-text">
              Acompanhe sua cobertura do MITRE ATT&amp;CK, suas classificações de habilidades por
              domínio e sua velocidade de progressão. Os recrutadores visualizam seu perfil
              verificado.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="cta-inner">
          <div className="section-label">Ready to Deploy</div>
          <h2 className="section-title">
            acesse o <br /><span>covil</span>
          </h2>
          <p className="cta-sub">
            Junte-se a profissionais de segurança que escolheram evoluir da maneira certa.<br />
            Comece grátis. Sem cartão de crédito. Apenas suas habilidades.
          </p>
          <div className="cta-actions">
            <a href="./hub/dist/index.html" className="btn-primary">Crie a sua Conta</a>
          </div>
          <div className="cta-note">// NO_SPAM · FREE_TIER_AVAILABLE · ALL_SKILL_LEVELS_WELCOME</div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <a href="#" className="nav-logo">
          Sec<span>Den</span>
        </a>
        <ul className="footer-links">
          <li><a href="#">Plataformas</a></li>
          <li><a href="#">Comunidade</a></li>
          <li><a href="#">Carreiras</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
        <div className="footer-copy">© 2026 SecDen. All rights reserved.</div>
      </footer>
    </>
  )
}
