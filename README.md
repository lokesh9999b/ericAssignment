# Insight.IO Dashboard - FSD Assignment #1

This is the implementation of the ERIC Robotics Insight.IO dashboard as per the assignment requirements.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation & Running
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the local URL provided (usually `http://localhost:5173/`).

---

## 🛠 Features Implemented

- **Responsive Design**: Adapts beautifully to large monitors and scales down.
- **Dark Theme**: Strict adherence to the provided UI mockup with subtle glassmorphism (`backdrop-filter`) for overlay components.
- **3D Map View**: Uses `Three.js` and `PCDLoader` to render a sample `.pcd` point cloud. Points are shaded dynamically by height to provide depth perception.
- **Camera View**: Displays an MP4 video feed covering the viewport.
- **Picture-in-Picture (PiP)**: A bottom-left inset shows the alternate view. Clicking it smoothly swaps the main viewport and the PiP content.
- **Virtual Controls**:
  - **D-Pad**: Directional buttons (W, A, S, D) wired up to pan the 3D camera around the point cloud space.
  - **Zoom Slider**: Vertical slider natively scales the Three.js camera zoom level.
- **Emergency Stop**: Accurately styled using CSS and SVG text paths to match the mock precisely.
- **ROS Integration**: Includes `roslibjs` hooked up in `src/hooks/useRosConnection.js`. It attempts to connect to a local rosbridge websocket server (ws://localhost:9090) and displays the connection status natively in the top telemetry pill (replacing the generic "System" status).

## 🏗 Architecture & Tech Stack

- **React 18**: Chosen for its robust ecosystem and component-based structure, which aligns perfectly with this heavily modular dashboard.
- **Vite**: Used for lightning-fast HMR and minimal setup boilerplate.
- **Three.js**: Powering the 3D SLAM map visualization with `OrbitControls`.
- **Lucide React**: Clean, modern iconography matching the design spec.
- **Vanilla CSS (Design Tokens)**: Tailored approach using CSS variables in `index.css` (e.g., `--bg-pill`, `--accent-green`) to guarantee consistency without the overhead of heavy styling frameworks like Tailwind.

## 🎥 Demonstration

- I've included a fallback synthetic point cloud generation within the code, ensuring that even if the network fails to load the `.pcd`, the 3D view still works!
- I utilized `lucide-react` for standard UI iconography.
- The entire interface is self-contained and fully functional without relying on an external internet connection (beyond fetching initial dependencies).
