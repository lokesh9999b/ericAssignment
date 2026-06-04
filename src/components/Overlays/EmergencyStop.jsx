import { RotateCcw } from 'lucide-react'
import './Overlays.css'

export default function EmergencyStop() {
  return (
    <div className="estop" id="emergency-stop">
      <button className="estop__btn" aria-label="Emergency Stop" onClick={() => alert('EMERGENCY STOP TRIGGERED!')}>
        {/* Yellow ring */}
        <div className="estop__ring" />

        {/* Ring text */}
        <svg className="estop__ring-text" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="topArc" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0" />
            <path id="bottomArc" d="M 50,50 m 38,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text
            fill="#111"
            fontSize="10"
            fontWeight="800"
            letterSpacing="3"
            fontFamily="Inter, sans-serif"
          >
            <textPath href="#topArc" startOffset="50%" textAnchor="middle">
              EMERGENCY
            </textPath>
          </text>
          <text
            fill="#111"
            fontSize="11"
            fontWeight="800"
            letterSpacing="5"
            fontFamily="Inter, sans-serif"
          >
            <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
              STOP
            </textPath>
          </text>
        </svg>

        {/* Red inner circle */}
        <div className="estop__inner">
          <RotateCcw size={28} strokeWidth={2.5} className="estop__icon" />
        </div>
      </button>
    </div>
  )
}
