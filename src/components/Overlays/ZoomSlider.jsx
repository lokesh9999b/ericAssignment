import { Plus, Minus } from 'lucide-react'
import './Overlays.css'

export default function ZoomSlider({ value, onChange }) {
  const fillHeight = `${value}%`

  const handleTrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    const percent = Math.round(100 - (y / rect.height) * 100)
    onChange(Math.max(0, Math.min(100, percent)))
  }

  return (
    <div className="zoom-slider" id="zoom-slider">
      <button
        className="zoom-slider__btn"
        onClick={() => onChange(Math.min(100, value + 10))}
        aria-label="Zoom in"
        id="zoom-in"
      >
        <Plus size={14} />
      </button>

      <div className="zoom-slider__track" onClick={handleTrackClick}>
        <div className="zoom-slider__fill" style={{ height: fillHeight }} />
        <div
          className="zoom-slider__thumb"
          style={{ bottom: fillHeight }}
        />
      </div>

      <button
        className="zoom-slider__btn"
        onClick={() => onChange(Math.max(0, value - 10))}
        aria-label="Zoom out"
        id="zoom-out"
      >
        <Minus size={14} />
      </button>
    </div>
  )
}
