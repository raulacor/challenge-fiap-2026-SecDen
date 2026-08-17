import Avatar from './Avatar'

const TRENDING = [
  {
    name: 'CVE-2026-4471 Exploit Dev',
    diff: 'hard',
    xp: 250,
    category: 'Web',
    solves: 142,
  },
  {
    name: 'Active Directory Pivot',
    diff: 'insane',
    xp: 400,
    category: 'Network',
    solves: 89,
  },
  {
    name: 'OSINT: Ghost Protocol',
    diff: 'medium',
    xp: 150,
    category: 'OSINT',
    solves: 521,
  },
]

const TOP_HUNTERS = [
  { rank: 1, handle: 'H4ckUdo',    initials: 'HU', color: '#FF1A1A', xp: 98420 },
  { rank: 2, handle: 'sabirilo',   initials: 'SA', color: '#FFD700', xp: 94110 },
  { rank: 3, handle: 'antizzzz',   initials: 'AN', color: '#00EEFF', xp: 91870 },
  { rank: 4, handle: 'viper_0x7',  initials: 'VP', color: '#9B59B6', xp: 88340 },
  { rank: 5, handle: 'ph4nt0m_wr', initials: 'PW', color: '#00FF88', xp: 84990 },
]

const ACTIVE_CAMPAIGNS = [
  { name: 'APT28 — Fancy Bear',    progress: 67, daysLeft: 5,  type: 'RED TEAM' },
  { name: 'Lazarus Group Sim',     progress: 23, daysLeft: 12, type: 'CAMPAIGN' },
  { name: 'FIN7 Financial Attack', progress: 8,  daysLeft: 18, type: 'NEW' },
]

const RANK_COLORS = { 1: 'gold', 2: 'silver', 3: 'bronze' }
const DIFF_COLORS = {
  easy: 'var(--green)',
  medium: 'var(--gold)',
  hard: 'var(--red)',
  insane: 'var(--purple)',
}

export default function RightPanel() {
  return (
    <aside className="hub-right">

      {/* Trending Challenges */}
      <div className="rp-section">
        <div className="rp-title">
          <span className="rp-title-icon">⚔</span>
          Trending Challenges
        </div>
        {TRENDING.map((ch, i) => (
          <div className="rp-challenge-item" key={i}>
            <div style={{ flex: 1 }}>
              <div className="rp-challenge-name">{ch.name}</div>
              <div className="rp-challenge-meta">
                <span style={{ color: DIFF_COLORS[ch.diff], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {ch.diff}
                </span>
                {' · '}{ch.category}{' · '}{ch.solves} solves
              </div>
            </div>
            <div className="rp-xp">+{ch.xp}</div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* Top Hunters This Week */}
      <div className="rp-section">
        <div className="rp-title">
          <span className="rp-title-icon">▲</span>
          Top Hunters — Week
        </div>
        {TOP_HUNTERS.map(h => (
          <div className="rp-hunter-row" key={h.rank}>
            <div className={`rp-rank ${RANK_COLORS[h.rank] || 'dim'}`}>{h.rank}</div>
            <Avatar initials={h.initials} color={h.color} size="sm" />
            <div className="rp-hunter-info">
              <div className="rp-hunter-handle">{h.handle}</div>
            </div>
            <div className="rp-hunter-xp">{(h.xp / 1000).toFixed(1)}k</div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* Active Campaigns */}
      <div className="rp-section">
        <div className="rp-title">
          <span className="rp-title-icon">◎</span>
          Active Campaigns
        </div>
        {ACTIVE_CAMPAIGNS.map((c, i) => (
          <div className="rp-campaign-item" key={i}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <div className="rp-campaign-name">{c.name}</div>
              <span
                className="tag"
                style={{
                  fontSize: '0.52rem',
                  padding: '1px 6px',
                  background: c.type === 'NEW' ? 'rgba(0,255,136,0.08)' : 'var(--red-subtle)',
                  color: c.type === 'NEW' ? 'var(--green)' : 'var(--red)',
                  border: `1px solid ${c.type === 'NEW' ? 'rgba(0,255,136,0.2)' : 'var(--border)'}`,
                }}
              >
                {c.type}
              </span>
            </div>
            <div className="rp-campaign-prog">
              <div className="prog-bar" style={{ flex: 1 }}>
                <div
                  className="prog-fill red"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <div className="rp-prog-label">{c.progress}%</div>
            </div>
            <div className="mono text-xs text-dim" style={{ marginTop: 3 }}>
              {c.daysLeft} days remaining
            </div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* Quick note */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r)',
        padding: '12px 14px',
      }}>
        <div className="mono text-xs text-dim" style={{ letterSpacing: '0.12em', marginBottom: 6 }}>
          // SEASON ZER0 · 18 DAYS LEFT
        </div>
        <div className="prog-bar">
          <div className="prog-fill gold" style={{ width: '62%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span className="mono text-xs text-dim">Season progress</span>
          <span className="mono text-xs" style={{ color: 'var(--gold)' }}>62%</span>
        </div>
      </div>

    </aside>
  )
}
