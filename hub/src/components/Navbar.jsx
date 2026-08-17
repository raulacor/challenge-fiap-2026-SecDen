import { useState } from 'react'
import Avatar from './Avatar'

export default function Navbar({ user, pageLabel, setPage }) {
  const [search, setSearch] = useState('')

  return (
    <header className="hub-topbar">
      {/* Breadcrumb */}
      <div className="nav-breadcrumb">
        secden <span>/</span> {pageLabel?.toLowerCase()}
      </div>

      {/* Search */}
      <div className="nav-search" style={{ marginLeft: 'auto' }}>
        <span className="nav-search-icon mono text-xs" style={{ color: 'var(--text-dim)' }}>⌕</span>
        <input
          type="text"
          placeholder="search challenges, hunters, news..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="nav-actions">
        {/* Notifications */}
        <div className="nav-bell" title="Notifications">
          🔔
          <span className="nav-bell-dot" />
        </div>

        <div className="nav-divider" />

        {/* User */}
        <div className="nav-user" onClick={() => setPage('profile')}>
          <Avatar
            initials={user.initials}
            color={user.color}
            size="sm"
            online={user.online}
          />
          <div>
            <div className="nav-user-name">{user.handle}</div>
            <div className="nav-user-rank">{user.rank}</div>
          </div>
          <span className="nav-caret">▾</span>
        </div>
      </div>
    </header>
  )
}
