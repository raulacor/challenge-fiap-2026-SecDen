import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import HubHome from './pages/HubHome'
import ProfilePage from './pages/ProfilePage'
import ChallengesPage from './pages/ChallengesPage'
import CampaignsPage from './pages/CampaignsPage'
import NewsPage from './pages/NewsPage'
import CommunityPage from './pages/CommunityPage'
import LeaderboardPage from './pages/LeaderboardPage'

export const ME = {
  handle: 'dr3d_0x7',
  displayName: 'DR3D',
  rank: 'Elite Hunter',
  xp: 67340,
  xpNext: 75000,
  initials: 'DX',
  color: '#FF4500',
  globalRank: 247,
  online: true,
}

export default function App() {
  const [page, setPage] = useState('feed')
  const [bruteforceComplete, setBruteforceComplete] = useState(() => {
    try { return localStorage.getItem('secden_bruteforce_done') === '1' } catch { return false }
  })

  const completeBruteforce = () => {
    setBruteforceComplete(true)
    try { localStorage.setItem('secden_bruteforce_done', '1') } catch { /* ignore */ }
  }

  const renderPage = () => {
    switch (page) {
      case 'feed':        return <HubHome bruteforceComplete={bruteforceComplete} />
      case 'profile':     return <ProfilePage user={ME} />
      case 'challenges':  return <ChallengesPage bruteforceComplete={bruteforceComplete} onCompleteBruteforce={completeBruteforce} />
      case 'campaigns':   return <CampaignsPage />
      case 'news':        return <NewsPage />
      case 'community':   return <CommunityPage />
      case 'leaderboard': return <LeaderboardPage />
      default:            return <HubHome bruteforceComplete={bruteforceComplete} />
    }
  }

  const PAGE_LABELS = {
    feed: 'Feed',
    profile: 'Profile',
    challenges: 'Challenges',
    campaigns: 'Campaigns',
    news: 'News',
    community: 'Community',
    leaderboard: 'Leaderboard',
  }

  return (
    <div className="hub-shell">
      <Sidebar currentPage={page} setPage={setPage} user={ME} />
      <div className="hub-body">
        <Navbar user={ME} pageLabel={PAGE_LABELS[page]} setPage={setPage} />
        <div className="hub-content" key={page}>
          {renderPage()}
        </div>
      </div>
    </div>
  )
}
