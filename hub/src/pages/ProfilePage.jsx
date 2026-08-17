import Avatar from '../components/Avatar'

const BADGES = [
  { icon: '🔥', label: 'Streak 30' },
  { icon: '🎯', label: 'Sniper' },
  { icon: '🛡️', label: 'Defender' },
  { icon: '⚡', label: 'Speed Run' },
  { icon: '🔴', label: 'Red Team' },
  { icon: '👁', label: 'Recon Pro' },
  { icon: '💀', label: 'Zero Day' },
  { icon: '🏆', label: 'Season 0' },
]

const SKILLS = [
  { name: 'Network Recon',    pct: 84, color: 'var(--red)' },
  { name: 'Web Exploitation', pct: 71, color: 'var(--red)' },
  { name: 'OSINT',            pct: 67, color: 'var(--gold)' },
  { name: 'Privilege Escal.', pct: 58, color: 'var(--gold)' },
  { name: 'Cryptography',     pct: 42, color: 'var(--teal)' },
  { name: 'Forensics',        pct: 35, color: 'var(--teal)' },
]

const RECENT_ACTIVITY = [
  { challenge: 'APT-31 Recon',             xp: '+150', time: '2h ago',   diff: 'hard' },
  { challenge: 'SQLi — Blind Time Based',  xp: '+90',  time: '1d ago',   diff: 'medium' },
  { challenge: 'DNS Tunneling Detection',  xp: '+120', time: '2d ago',   diff: 'hard' },
  { challenge: 'OSINT: Open Sesame',       xp: '+75',  time: '3d ago',   diff: 'easy' },
  { challenge: 'Buffer Overflow 101',      xp: '+60',  time: '5d ago',   diff: 'easy' },
]

const DIFF_COLOR = {
  easy: 'var(--green)',
  medium: 'var(--gold)',
  hard: 'var(--red)',
  insane: '#9B59B6',
}

export default function ProfilePage({ user }) {
  const xpPct = Math.round((user.xp / user.xpNext) * 100)

  return (
    <div className="hub-full page-enter">

      {/* Cover + Header */}
      <div className="profile-cover fi-1">
        <div className="profile-cover-grid" />
        <div className="profile-cover-glow" />
      </div>

      <div className="profile-header fi-2">
        <div className="profile-avatar-wrap">
          <Avatar initials={user.initials} color={user.color} size="xl" online={user.online} />
        </div>

        <div className="profile-meta">
          <div>
            <div className="profile-name">{user.displayName}<span style={{ color: 'var(--red)' }}>_0x7</span></div>
            <div className="profile-handle">@{user.handle} · #{user.globalRank} Global</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <span className="tag tag-red">{user.rank}</span>
              <span className="tag tag-gold">Season Zer0</span>
              <span className="tag tag-green">● Online</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost btn-sm">Message</button>
            <button className="btn-primary btn-sm">Follow</button>
          </div>
        </div>

        {/* XP bar */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span className="mono text-xs text-dim">XP Progress to next rank</span>
            <span className="mono text-xs" style={{ color: 'var(--gold)' }}>
              {user.xp.toLocaleString()} / {user.xpNext.toLocaleString()} XP · {xpPct}%
            </span>
          </div>
          <div className="prog-bar" style={{ height: 4 }}>
            <div className="prog-fill gold" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="profile-stats-row fi-3">
        <div className="profile-stat">
          <div className="profile-stat-val gold">{user.xp.toLocaleString()}</div>
          <div className="profile-stat-label">Total XP</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-val">#{user.globalRank}</div>
          <div className="profile-stat-label">Global Rank</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-val green">142</div>
          <div className="profile-stat-label">Challenges</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-val">30</div>
          <div className="profile-stat-label">Day Streak</div>
        </div>
        <div className="profile-stat">
          <div className="profile-stat-val gold">8</div>
          <div className="profile-stat-label">Season Wins</div>
        </div>
      </div>

      {/* Content grid */}
      <div className="profile-grid fi-4">

        {/* Left: Skills & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Skills */}
          <div className="card card-no-anim">
            <div className="sec-label" style={{ marginBottom: 16 }}>Skill Breakdown</div>
            {SKILLS.map(s => (
              <div className="skill-item" key={s.name}>
                <div className="skill-header">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct" style={{ color: s.color }}>{s.pct}%</span>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: `${s.pct}%`, background: s.color, boxShadow: `0 0 8px ${s.color}50` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="card card-no-anim">
            <div className="sec-label" style={{ marginBottom: 14 }}>Badges Earned</div>
            <div className="profile-badge-grid">
              {BADGES.map(b => (
                <div className="badge-item" key={b.label} title={b.label}>
                  <span className="badge-icon">{b.icon}</span>
                  <span className="badge-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Bio */}
          <div className="card card-no-anim">
            <div className="sec-label" style={{ marginBottom: 12 }}>About</div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              Red team operator · OSCP certified · MITRE ATT&CK enthusiast.
              Building tools in Python and Rust. Currently focused on AD exploitation and evasion tradecraft.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <span className="mono text-xs text-dim">🌐 Brazil</span>
              <span className="mono text-xs text-dim">🔗 github.com/dr3d0x7</span>
              <span className="mono text-xs text-dim">📅 Joined Mar 2025</span>
            </div>
          </div>

          {/* Recent activity */}
          <div className="card card-no-anim">
            <div className="sec-label" style={{ marginBottom: 14 }}>Recent Activity</div>
            {RECENT_ACTIVITY.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: DIFF_COLOR[a.diff],
                  boxShadow: `0 0 6px ${DIFF_COLOR[a.diff]}`,
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {a.challenge}
                  </div>
                  <div className="mono text-xs text-dim">{a.time}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--gold)', flexShrink: 0 }}>
                  {a.xp}
                </div>
              </div>
            ))}
          </div>

          {/* MITRE coverage teaser */}
          <div className="card card-no-anim">
            <div className="sec-label" style={{ marginBottom: 12 }}>MITRE ATT&amp;CK Coverage</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: 42 }).map((_, i) => {
                const pct = Math.random()
                const bg = pct > 0.7
                  ? 'rgba(255,26,26,0.7)'
                  : pct > 0.4
                  ? 'rgba(255,26,26,0.3)'
                  : pct > 0.15
                  ? 'rgba(255,26,26,0.12)'
                  : 'var(--surface-2)'
                return (
                  <div
                    key={i}
                    style={{
                      height: 12,
                      borderRadius: 2,
                      background: bg,
                      transition: 'opacity 0.2s',
                      cursor: 'default',
                    }}
                    title={`Tactic ${i + 1}`}
                  />
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
              {[
                { label: 'Covered', color: 'rgba(255,26,26,0.7)' },
                { label: 'Partial', color: 'rgba(255,26,26,0.3)' },
                { label: 'Exposed', color: 'var(--surface-2)' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                  <span className="mono text-xs text-dim">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
