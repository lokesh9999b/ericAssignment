import { useRef } from 'react'
import CameraView from './CameraView'
import MapView from './MapView'
import PipInset from './PipInset'
import './Viewport.css'

export default function Viewport({ activeView, onSwapView, mapControlsRef, zoomLevel }) {
  return (
    <div className="viewport" id="viewport">
      {/* Main View */}
      <div className="viewport__main">
        {activeView === 'camera' ? (
          <CameraView />
        ) : (
          <MapView ref={mapControlsRef} zoomLevel={zoomLevel} />
        )}
      </div>

      {/* Picture-in-Picture */}
      <PipInset activeView={activeView} onSwapView={onSwapView} />
    </div>
  )
}
