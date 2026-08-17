import { useState } from 'react'
import UnderConstruction from '../components/UnderConstruction'
import BruteforceIntro from '../components/bruteforce/BruteforceIntro'
import BruteforceChallenge from '../components/bruteforce/BruteforceChallenge'

export default function ChallengesPage({ bruteforceComplete, onCompleteBruteforce }) {
  const [view, setView] = useState('list') // 'list' | 'intro' | 'challenge'

  if (view === 'intro') {
    return <BruteforceIntro onBegin={() => setView('challenge')} onBack={() => setView('list')} />
  }

  if (view === 'challenge') {
    return (
      <BruteforceChallenge
        onBack={() => setView('intro')}
        onComplete={() => {
          onCompleteBruteforce()
          setView('list')
        }}
      />
    )
  }

  return (
    <div className="hub-full page-enter">

      <div className="page-header fi-1">
        <div className="sec-label">Platform</div>
        <div className="page-title">Challenge <span>Arena</span></div>
        <div className="page-sub">Rebuilding the arena · 1 challenge live</div>
      </div>

      <div className="challenges-grid fi-2" style={{ marginBottom: 30 }}>
        <div className="challenge-card" onClick={() => setView('intro')}>
          {bruteforceComplete
            ? <div className="challenge-done">CONCLUÍDO ✓</div>
            : <div className="challenge-new">NOVO</div>
          }
          <div className="challenge-card-header">
            <div className="challenge-cat-icon">🔓</div>
            <div style={{ textAlign: 'right' }}>
              <span className="mono text-xs" style={{ color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                fácil
              </span>
              <div className="tag tag-red" style={{ marginTop: 4, display: 'inline-block' }}>Criptografia</div>
            </div>
          </div>
          <div className="challenge-name">O Que É Força Bruta?</div>
          <div className="challenge-desc">
            Aprenda como funcionam os ataques de força bruta e depois crie uma
            senha forte o suficiente para sobreviver a um — ao vivo, com uma
            simulação real de tempo de quebra.
          </div>
          <div className="challenge-footer">
            <div>
              <div className="challenge-xp">+100 XP</div>
              <div className="challenge-solves">{bruteforceComplete ? 'Concluído' : 'Não iniciado'}</div>
            </div>
            <button className="btn-primary btn-sm">{bruteforceComplete ? 'Repetir →' : 'Iniciar →'}</button>
          </div>
        </div>
      </div>

      <UnderConstruction
        label="More Challenges"
        note="The rest of the arena is still being built. Check back soon for more challenges."
      />
    </div>
  )
}
