import { useState, useEffect, useRef } from 'react'
import { analyzePassword, formatDuration, formatRate, GUESSES_PER_SECOND } from '../../utils/crackTime'

const MATRIX_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>/\\[]{}=+-?'

function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const fontSize = 16
    let columns, drops

    function resize() {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      columns = Math.ceil(canvas.width / fontSize)
      drops = new Array(columns).fill(0).map(() => Math.random() * -60)
    }
    resize()
    window.addEventListener('resize', resize)

    const id = setInterval(() => {
      ctx.fillStyle = 'rgba(4,4,4,0.07)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00FF88'
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`
      for (let i = 0; i < columns; i++) {
        const char = MATRIX_CHARS[(Math.random() * MATRIX_CHARS.length) | 0]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }, 45)

    return () => { clearInterval(id); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="matrix-canvas" />
}

export default function BruteforceChallenge({ onBack, onComplete }) {
  const [password, setPassword] = useState('')
  const analysis = analyzePassword(password)
  const canFinish = analysis.tier.id === 'strong' || analysis.tier.id === 'unbreakable'

  return (
    <div className="bf-stage">
      <MatrixRain />

      <div className="bf-card">
        <div className="bf-card-eyebrow">FOGO REAL · SIMULAÇÃO DE QUEBRA DE SENHA</div>
        <h2 className="bf-card-title">Quebre o Cofre</h2>
        <p className="bf-card-sub">
          Digite uma senha abaixo. Vamos simular quanto tempo um ataque de
          BRUTEFORCE offline a {formatRate(GUESSES_PER_SECOND)} levaria para descobri-la.
        </p>

        <div className="bf-meter" data-tier={analysis.tier.id}>
          <div className="bf-meter-track">
            <div
              className="bf-meter-fill"
              style={{
                width: `${password ? analysis.tier.pct : 0}%`,
                background: analysis.tier.color,
                boxShadow: password ? `0 0 16px ${analysis.tier.color}` : 'none',
              }}
            />
          </div>
          <div className="bf-meter-label" style={{ color: password ? analysis.tier.color : 'var(--text-dim)' }}>
            {password ? analysis.tier.label : 'AGUARDANDO ENTRADA'}
          </div>
        </div>

        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          className="bf-input"
          placeholder="Digite uma senha para testar..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="bf-readout">
          <div className="bf-readout-row"><span>Conjunto de caracteres</span><span>{analysis.charsetSize || 0} caracteres possíveis</span></div>
          <div className="bf-readout-row"><span>Entropia</span><span>{analysis.entropyBits.toFixed(1)} bits</span></div>
          <div className="bf-readout-row"><span>Combinações</span><span>{analysis.combinationsDisplay}</span></div>
          <div className="bf-readout-row bf-readout-highlight">
            <span>Tempo estimado para quebrar</span>
            <span>{password ? formatDuration(analysis.seconds) : '—'}</span>
          </div>
        </div>

        <div className="bf-actions">
          <button className="btn-ghost" onClick={onBack}>← Voltar</button>
          <button
            className="btn-primary"
            disabled={!canFinish}
            style={!canFinish ? { opacity: 0.35, boxShadow: 'none', cursor: 'not-allowed' } : {}}
            onClick={() => canFinish && onComplete()}
          >
            {canFinish ? 'Finalizar Desafio →' : 'Alcance "FORTE" para finalizar'}
          </button>
        </div>
      </div>
    </div>
  )
}
