import {
  LayoutGrid,
  Map,
  MapPin,
  Square,
  Compass,
  BarChart3,
  User,
  Share2
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: Map, label: 'Map' },
  { icon: MapPin, label: 'Location' },
  { icon: Square, label: 'Region' },
  { icon: Compass, label: 'Compass' },
  { icon: Share2, label: 'Analytics' },
]

export default function Sidebar({ activeItem, onItemClick }) {
  return (
    <aside className="sidebar" id="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <span className="sidebar__logo-text">ERIC</span>
        <span className="sidebar__logo-sub">ROBOTICS</span>
      </div>

      {/* Navigation Icons */}
      <nav className="sidebar__nav" aria-label="Main navigation">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={`sidebar__nav-item ${index === activeItem ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => onItemClick(index)}
              aria-label={item.label}
              title={item.label}
              id={`nav-${item.label.toLowerCase()}`}
            >
              <Icon size={20} strokeWidth={1.8} />
            </button>
          )
        })}
      </nav>

      {/* Profile */}
      <div className="sidebar__profile">
        <button
          className="sidebar__profile-btn"
          aria-label="User Profile"
          id="nav-profile"
        >
          <User size={20} strokeWidth={1.8} />
        </button>
      </div>
    </aside>
  )
}
