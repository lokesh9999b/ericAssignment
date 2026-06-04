import { ArrowRight } from 'lucide-react'
import './Overlays.css'

export default function ActionButtons() {
  const handleClick = (action) => {
    alert(`${action} triggered! (Assignment functionality not specified)`)
  }

  return (
    <div className="action-buttons" id="action-buttons">
      <button className="action-btn" id="btn-quick-goal" onClick={() => handleClick('QUICK GOAL')}>
        QUICK GOAL
        <span className="action-btn__arrow">
          <ArrowRight size={13} />
        </span>
      </button>
      <button className="action-btn" id="btn-initiate" onClick={() => handleClick('INITIATE')}>
        INITIATE
        <span className="action-btn__arrow">
          <ArrowRight size={13} />
        </span>
      </button>
    </div>
  )
}
