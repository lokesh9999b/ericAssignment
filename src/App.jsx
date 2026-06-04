import { useState, useCallback, useRef } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Viewport from './components/Viewport/Viewport'
import StatusBar from './components/Overlays/StatusBar'
import ActionButtons from './components/Overlays/ActionButtons'
import EmergencyStop from './components/Overlays/EmergencyStop'
import DPad from './components/Overlays/DPad'
import ZoomSlider from './components/Overlays/ZoomSlider'
import ViewBadge from './components/ViewBadge/ViewBadge'
import { useRosConnection } from './hooks/useRosConnection'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('camera') // 'camera' | 'map'
  const [controlMode, setControlMode] = useState('auto')  // 'auto' | 'manual'
  const [activeSidebarItem, setActiveSidebarItem] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(50)
  const mapControlsRef = useRef(null)
  
  // Try connecting to a local ROS bridge (ws://localhost:9090)
  const { connected: rosConnected } = useRosConnection()

  const handleSwapView = useCallback(() => {
    setActiveView(prev => prev === 'camera' ? 'map' : 'camera')
  }, [])

  const handleDPadPress = useCallback((direction) => {
    if (mapControlsRef.current && mapControlsRef.current.moveCamera) {
      mapControlsRef.current.moveCamera(direction)
    }
  }, [])

  const handleZoomChange = useCallback((value) => {
    setZoomLevel(value)
    if (mapControlsRef.current && mapControlsRef.current.setZoom) {
      mapControlsRef.current.setZoom(value)
    }
  }, [])

  return (
    <div className="app">
      <Sidebar
        activeItem={activeSidebarItem}
        onItemClick={setActiveSidebarItem}
      />
      <div className="app__main">
        <Viewport
          activeView={activeView}
          onSwapView={handleSwapView}
          mapControlsRef={mapControlsRef}
          zoomLevel={zoomLevel}
        />

        {/* Overlays */}
        <StatusBar
          controlMode={controlMode}
          onModeChange={setControlMode}
          rosConnected={rosConnected}
        />
        <ViewBadge activeView={activeView} />
        <ActionButtons />
        <EmergencyStop />
        <DPad onDirectionPress={handleDPadPress} />
        <ZoomSlider value={zoomLevel} onChange={handleZoomChange} />
      </div>
    </div>
  )
}

export default App
