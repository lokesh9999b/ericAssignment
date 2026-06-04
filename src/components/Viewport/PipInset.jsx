import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'

export default function PipInset({ activeView, onSwapView }) {
  const pipLabel = activeView === 'camera' ? 'Map View' : 'Camera View'
  const isShowingMap = activeView === 'camera' // PiP shows the opposite
  const canvasRef = useRef(null)
  const animIdRef = useRef(null)

  useEffect(() => {
    // If PiP is showing the map, render a small Three.js scene
    if (!isShowingMap || !canvasRef.current) return

    const container = canvasRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 500)
    camera.position.set(20, 20, 20)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(1) // Lower quality for PiP
    container.appendChild(renderer.domElement)

    const light = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(light)

    const grid = new THREE.GridHelper(30, 30, 0xcccccc, 0xdddddd)
    scene.add(grid)

    // Try loading PCD, else generate simple points
    const loader = new PCDLoader()
    loader.load(
      '/models/sample.pcd',
      (points) => {
        points.material.size = 0.1
        points.material.color = new THREE.Color(0xde6b6b)
        const bbox = new THREE.Box3().setFromObject(points)
        const size = new THREE.Vector3()
        bbox.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim > 0) {
          const scale = 15 / maxDim
          points.scale.set(scale, scale, scale)
        }
        const center = new THREE.Vector3()
        bbox.getCenter(center)
        points.position.copy(center).multiplyScalar(-1).multiply(points.scale)
        scene.add(points)
      },
      undefined,
      () => {
        // Fallback: simple scatter
        const count = 5000
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 20
          positions[i * 3 + 1] = Math.random() * 3
          positions[i * 3 + 2] = (Math.random() - 0.5) * 20
          colors[i * 3] = 0.85
          colors[i * 3 + 1] = 0.4
          colors[i * 3 + 2] = 0.4
        }
        const geom = new THREE.BufferGeometry()
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        const mat = new THREE.PointsMaterial({ size: 0.15, vertexColors: true })
        scene.add(new THREE.Points(geom, mat))
      }
    )

    let angle = 0
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate)
      angle += 0.003
      camera.position.x = Math.cos(angle) * 25
      camera.position.z = Math.sin(angle) * 25
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animIdRef.current)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [isShowingMap])

  return (
    <div
      className={`pip-inset ${isShowingMap ? 'pip-inset--map' : 'pip-inset--camera'}`}
      onClick={onSwapView}
      id="pip-inset"
      role="button"
      aria-label={`Switch to ${pipLabel}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSwapView()}
    >
      <div className="pip-inset__content">
        {isShowingMap ? (
          <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        ) : (
          <video
            src="/videos/camera-feed.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <div className="pip-inset__overlay">
          <span className="pip-inset__overlay-text">
            Switch to {pipLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
