import Avatar from './Avatar'
import UnderConstruction from './UnderConstruction'
import { ME } from '../App'

export default function Feed({ bruteforceComplete }) {
  return (
    <div>
      {/* Compose box */}
      <div className="compose-box mb-12">
        <Avatar initials={ME.initials} color={ME.color} size="sm" online={ME.online} />
        <input
          className="compose-input"
          placeholder="Share intel, ask for help, post a write-up..."
          readOnly
        />
        <button className="btn-outline btn-sm">Post</button>
      </div>

      {bruteforceComplete && (
        <div className="feed-card fi-1" style={{ borderLeft: '3px solid var(--green)', marginBottom: 10 }}>
          <div className="feed-user-row">
            <Avatar initials={ME.initials} color={ME.color} size="md" online={ME.online} />
            <div className="feed-user-info">
              <div className="feed-user-handle">
                {ME.handle}
                <span className="mono text-xs text-dim" style={{ marginLeft: 8 }}>concluiu um desafio</span>
              </div>
              <div className="feed-user-meta">Agora mesmo</div>
            </div>
            <span className="feed-time">agora</span>
          </div>

          <div className="feed-challenge-box">
            <div style={{ fontSize: '1.2rem' }}>🔓</div>
            <div className="feed-challenge-name">O Que É Força Bruta?</div>
            <span className="diff-easy">FÁCIL</span>
            <div className="feed-challenge-xp">+100 XP</div>
          </div>
        </div>
      )}

      <UnderConstruction
        label="Feed"
        note="The full activity feed is still being built. Complete challenges to see them show up here."
      />
    </div>
  )
}
