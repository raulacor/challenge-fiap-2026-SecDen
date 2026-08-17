export default function UnderConstruction({ label, note }) {
  return (
    <div className="uc-wrap">
      <div className="uc-icon">🚧</div>
      <div className="uc-title">{label || 'Under Construction'}</div>
      <div className="uc-note">
        {note || 'This part of the Den is still being built. Check back soon.'}
      </div>
      <div className="uc-bar"><div className="uc-bar-fill" /></div>
    </div>
  )
}
