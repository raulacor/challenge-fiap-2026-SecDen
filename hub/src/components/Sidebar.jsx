import Avatar from './Avatar'

const NAV_ITEMS = [
  { id: 'feed',        label: 'Feed',        icon: '◈', badge: null },
  { id: 'challenges',  label: 'Challenges',  icon: '⚔', badge: '3' },
  { id: 'campaigns',   label: 'Campaigns',   icon: '◎', badge: null },
  { id: 'news',        label: 'News',        icon: '◈', badge: '5' },
  { id: 'community',   label: 'Community',   icon: '◫', badge: null },
  { id: 'leaderboard', label: 'Leaderboard', icon: '▲', badge: null },
]

export default function Sidebar({ currentPage, setPage, user }) {
  const xpPct = Math.round((user.xp / user.xpNext) * 100)

  return (
    <aside className="hub-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <a href="../../index.html">Sec<span>Den</span></a>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigate</div>

        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            className={`sidebar-nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
          </div>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: 24 }}>Account</div>

        <div
          className={`sidebar-nav-item ${currentPage === 'profile' ? 'active' : ''}`}
          onClick={() => setPage('profile')}
        >
          <span className="sidebar-icon">◉</span>
          <span style={{ flex: 1 }}>Profile</span>
        </div>

        <div className="sidebar-nav-item" style={{ cursor: 'default', opacity: 0.5 }}>
          <span className="sidebar-icon">◌</span>
          <span style={{ flex: 1 }}>Settings</span>
        </div>
      </nav>

      {/* User card at bottom */}
      <div className="sidebar-user">
        <div className="sidebar-user-card" onClick={() => setPage('profile')}>
          <Avatar
            initials={user.initials}
            color={user.color}
            size="md"
            online={user.online}
          />
          <div className="sidebar-user-info">
            <div className="sidebar-user-handle">{user.handle}</div>
            <div className="sidebar-user-rank">{user.rank}</div>
            <div className="xp-bar" style={{ marginTop: 5 }}>
              <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
            </div>
          </div>
          <div className="sidebar-user-xp">{(user.xp / 1000).toFixed(1)}k</div>
        </div>
      </div>
    </aside>
  )
}
