import UnderConstruction from '../components/UnderConstruction'

export default function NewsPage() {
  return (
    <div className="hub-full page-enter">
      <div className="page-header fi-1">
        <div className="sec-label">Intel Feed</div>
        <div className="page-title">Threat <span>News</span></div>
        <div className="page-sub">Live CVE feed · Threat intelligence · Platform updates</div>
      </div>
      <UnderConstruction label="Threat News" />
    </div>
  )
}
