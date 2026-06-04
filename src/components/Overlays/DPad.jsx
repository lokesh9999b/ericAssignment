import { Keyboard, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import './Overlays.css'

export default function DPad({ onDirectionPress }) {
  return (
    <div className="dpad" id="dpad">
      <div className="dpad__container">
        {/* W - Up */}
        <button
          className="dpad__btn dpad__btn--up"
          onClick={() => onDirectionPress('w')}
          aria-label="Move forward (W)"
          id="dpad-w"
        >
          <span className="dpad__arrow">W</span>
        </button>

        {/* A - Left */}
        <button
          className="dpad__btn dpad__btn--left"
          onClick={() => onDirectionPress('a')}
          aria-label="Move left (A)"
          id="dpad-a"
        >
          <span className="dpad__arrow">‹</span>
        </button>

        {/* Center */}
        <div className="dpad__center">
          <Keyboard size={14} className="dpad__center-icon" />
          <span className="dpad__center-text">key</span>
        </div>

        {/* D - Right */}
        <button
          className="dpad__btn dpad__btn--right"
          onClick={() => onDirectionPress('d')}
          aria-label="Move right (D)"
          id="dpad-d"
        >
          <span className="dpad__arrow">›</span>
        </button>

        {/* S - Down */}
        <button
          className="dpad__btn dpad__btn--down"
          onClick={() => onDirectionPress('s')}
          aria-label="Move backward (S)"
          id="dpad-s"
        >
          <span className="dpad__arrow">S</span>
        </button>
      </div>
    </div>
  )
}
