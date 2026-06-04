import { Video } from 'lucide-react'

export default function CameraView() {
  return (
    <div className="camera-view" id="camera-view">
      <video
        className="camera-view__video"
        src="/videos/camera-feed.mp4"
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => {
          // Hide video, show placeholder on error
          e.target.style.display = 'none'
          e.target.nextElementSibling.style.display = 'flex'
        }}
      />
      <div className="camera-view__placeholder" style={{ display: 'none' }}>
        <Video size={48} className="camera-view__placeholder-icon" />
        <span className="camera-view__placeholder-text">Camera Feed</span>
        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>
          Place a video file at /public/videos/camera-feed.mp4
        </span>
      </div>
    </div>
  )
}
