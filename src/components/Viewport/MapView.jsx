import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'

const MapView = forwardRef(function MapView({ zoomLevel }, ref) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef(null)
  const animationIdRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Expose camera controls to parent
  useImperativeHandle(ref, () => ({
    moveCamera: (direction) => {
      const camera = cameraRef.current
      const controls = controlsRef.current
      if (!camera || !controls) return

      const speed = 2
      const forward = new THREE.Vector3()
      camera.getWorldDirection(forward)
      forward.y = 0
      forward.normalize()

      const right = new THREE.Vector3()
      right.crossVectors(forward, camera.up).normalize()

      switch (direction) {
        case 'w':
          camera.position.addScaledVector(forward, speed)
          controls.target.addScaledVector(forward, speed)
          break
        case 's':
          camera.position.addScaledVector(forward, -speed)
          controls.target.addScaledVector(forward, -speed)
          break
        case 'a':
          camera.position.addScaledVector(right, -speed)
          controls.target.addScaledVector(right, -speed)
          break
        case 'd':
          camera.position.addScaledVector(right, speed)
          controls.target.addScaledVector(right, speed)
          break
      }
      controls.update()
    },
    setZoom: (value) => {
      const camera = cameraRef.current
      if (!camera) return
      // Map 0-100 slider to camera distance 80-5
      const distance = 80 - (value / 100) * 75
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      const target = controlsRef.current?.target || new THREE.Vector3(0, 0, 0)
      camera.position.copy(target).addScaledVector(direction, -distance)
      controlsRef.current?.update()
    }
  }))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x08080a)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(15, 15, 15)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = true
    controls.minDistance = 3
    controls.maxDistance = 100
    controls.target.set(0, 0, 0)
    controls.update()
    controlsRef.current = controls

    // Grid
    const gridHelper = new THREE.GridHelper(50, 50, 0x222233, 0x111122)
    gridHelper.position.y = -0.5
    scene.add(gridHelper)

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Load PCD
    const loader = new PCDLoader()
    loader.load(
      '/models/sample.pcd',
      (points) => {
        // Color points by height for visual depth
        const positions = points.geometry.attributes.position
        const colors = new Float32Array(positions.count * 3)

        const bbox = new THREE.Box3().setFromBufferAttribute(positions)
        const minY = bbox.min.y
        const maxY = bbox.max.y
        const range = maxY - minY || 1

        for (let i = 0; i < positions.count; i++) {
          const y = positions.getY(i)
          const t = (y - minY) / range

          // Gradient: blue (bottom) → cyan → green → yellow → red (top)
          let r, g, b
          if (t < 0.25) {
            r = 0; g = t * 4; b = 1
          } else if (t < 0.5) {
            r = 0; g = 1; b = 1 - (t - 0.25) * 4
          } else if (t < 0.75) {
            r = (t - 0.5) * 4; g = 1; b = 0
          } else {
            r = 1; g = 1 - (t - 0.75) * 4; b = 0
          }
          colors[i * 3] = r
          colors[i * 3 + 1] = g
          colors[i * 3 + 2] = b
        }

        points.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        points.material.vertexColors = true
        points.material.size = 0.05
        points.material.sizeAttenuation = true

        // Center the point cloud
        const center = new THREE.Vector3()
        bbox.getCenter(center)
        
        // Scale it up to fit nicely in the view (milk.pcd is very small)
        const size = new THREE.Vector3()
        bbox.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim > 0) {
          const scale = 15 / maxDim
          points.scale.set(scale, scale, scale)
        }
        
        points.position.copy(center).multiplyScalar(-1).multiply(points.scale)

        scene.add(points)
        setLoading(false)
      },
      undefined,
      () => {
        // PCD not found — generate a synthetic point cloud
        generateSyntheticPointCloud(scene)
        setLoading(false)
      }
    )

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationIdRef.current)
      controls.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="map-view" ref={containerRef} id="map-view">
      {loading && (
        <div className="map-view__loading">
          <div className="map-view__spinner" />
          <span>Loading 3D Map...</span>
        </div>
      )}
    </div>
  )
})

/**
 * Generate a synthetic SLAM-like point cloud if no .pcd is available
 */
function generateSyntheticPointCloud(scene) {
  const pointCount = 80000
  const positions = new Float32Array(pointCount * 3)
  const colors = new Float32Array(pointCount * 3)

  for (let i = 0; i < pointCount; i++) {
    const i3 = i * 3

    // Create a room/building-like structure
    const section = Math.random()

    if (section < 0.3) {
      // Floor
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 0.3
      positions[i3 + 2] = (Math.random() - 0.5) * 30

      colors[i3] = 0.35
      colors[i3 + 1] = 0.35
      colors[i3 + 2] = 0.4
    } else if (section < 0.55) {
      // Walls
      const wall = Math.floor(Math.random() * 4)
      const h = Math.random() * 6
      const l = (Math.random() - 0.5) * 30

      switch (wall) {
        case 0:
          positions[i3] = -15; positions[i3 + 1] = h; positions[i3 + 2] = l; break
        case 1:
          positions[i3] = 15; positions[i3 + 1] = h; positions[i3 + 2] = l; break
        case 2:
          positions[i3] = l; positions[i3 + 1] = h; positions[i3 + 2] = -15; break
        case 3:
          positions[i3] = l; positions[i3 + 1] = h; positions[i3 + 2] = 15; break
      }

      const t = h / 6
      colors[i3] = 0.2 + t * 0.5
      colors[i3 + 1] = 0.3 + t * 0.3
      colors[i3 + 2] = 0.5 + t * 0.3
    } else if (section < 0.75) {
      // Internal structures (pillars, machinery)
      const cx = (Math.floor(Math.random() * 4) - 1.5) * 8
      const cz = (Math.floor(Math.random() * 4) - 1.5) * 8
      const r = 0.5 + Math.random() * 1.5
      const angle = Math.random() * Math.PI * 2
      const h = Math.random() * 4

      positions[i3] = cx + Math.cos(angle) * r
      positions[i3 + 1] = h
      positions[i3 + 2] = cz + Math.sin(angle) * r

      colors[i3] = 0.8
      colors[i3 + 1] = 0.3
      colors[i3 + 2] = 0.3
    } else {
      // Random objects / clutter
      const cx = (Math.random() - 0.5) * 24
      const cz = (Math.random() - 0.5) * 24
      positions[i3] = cx + (Math.random() - 0.5) * 3
      positions[i3 + 1] = Math.random() * 2
      positions[i3 + 2] = cz + (Math.random() - 0.5) * 3

      colors[i3] = 0.4 + Math.random() * 0.3
      colors[i3 + 1] = 0.6 + Math.random() * 0.2
      colors[i3 + 2] = 0.3 + Math.random() * 0.2
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)
}

export default MapView
