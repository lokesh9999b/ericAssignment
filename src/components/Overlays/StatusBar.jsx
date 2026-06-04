import { Pause, Battery, Wifi, ShieldCheck, Cpu } from 'lucide-react'
import './Overlays.css'

export default function StatusBar({ controlMode, onModeChange, rosConnected }) {
  return (
    <div className="status-bar" id="status-bar">
      {/* Left: Status Pill */}
      <div className="status-bar__left">
        <div className="status-pill" id="status-pill">
          <span className="status-pill__label">Status</span>
          <span className="status-pill__value">On Mission 1234</span>
          <button
            className="status-pill__pause"
            aria-label="Pause mission"
            id="btn-pause"
          >
            <Pause size={12} fill="white" />
          </button>
        </div>
      </div>

      {/* Center: Telemetry Pill */}
      <div className="status-bar__center">
        <div className="telemetry-pill" id="telemetry-pill">
          <div className="telemetry-pill__item">
            <Battery size={14} />
            <span className="telemetry-pill__value">100%</span>
            <span className="telemetry-pill__dot" />
          </div>

          <div className="telemetry-pill__separator" />

          <div className="telemetry-pill__item">
            <Wifi size={14} />
            <span className="telemetry-pill__value">Strong</span>
            <span className="telemetry-pill__dot" />
          </div>

          <div className="telemetry-pill__separator" />

          <div className="telemetry-pill__item">
            <span className="telemetry-pill__label">Failsafe</span>
            <span className="telemetry-pill__value">Okay</span>
            <span className="telemetry-pill__dot" />
          </div>

          <div className="telemetry-pill__separator" />

          <div className="telemetry-pill__item">
            <span className="telemetry-pill__label">ROS</span>
            <span className="telemetry-pill__value">{rosConnected ? 'Connected' : 'Offline'}</span>
            <span className={`telemetry-pill__dot ${!rosConnected ? 'telemetry-pill__dot--error' : ''}`} />
          </div>
        </div>
      </div>

      {/* Right: Mode Toggle */}
      <div className="status-bar__right">
        <div className="mode-toggle" id="mode-toggle">
          <span className="mode-toggle__label">Mode</span>
          <button
            className={`mode-toggle__btn ${controlMode === 'auto' ? 'mode-toggle__btn--active' : 'mode-toggle__btn--inactive'}`}
            onClick={() => onModeChange('auto')}
            id="btn-auto"
          >
            AUTO
          </button>
          <button
            className={`mode-toggle__btn ${controlMode === 'manual' ? 'mode-toggle__btn--active' : 'mode-toggle__btn--inactive'}`}
            onClick={() => onModeChange('manual')}
            id="btn-manual"
          >
            MANUAL
          </button>
        </div>
      </div>
    </div>
  )
}
