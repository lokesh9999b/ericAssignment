import './ViewBadge.css'

export default function ViewBadge({ activeView }) {
  const label = activeView === 'camera' ? 'Camera View' : 'Map View'

  return (
    <div className="view-badge" id="view-badge">
      {label}
    </div>
  )
}
