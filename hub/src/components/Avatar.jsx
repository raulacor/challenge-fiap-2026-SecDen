export default function Avatar({ initials, color, size = 'md', online = false }) {
  const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : size === 'xl' ? 'xl' : 'md'
  const onlineClass = online ? 'avatar-online' : ''

  return (
    <div
      className={`avatar ${sizeClass} ${onlineClass}`}
      style={{
        background: `${color}18`,
        color: color,
        borderColor: `${color}30`,
        boxShadow: `0 0 10px ${color}22`,
      }}
    >
      {initials}
    </div>
  )
}
