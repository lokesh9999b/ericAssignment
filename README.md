# Insight.IO Dashboard — ERIC Robotics 🚀

**🌍 Live Demo:** [https://eric-assignment.vercel.app](https://eric-assignment.vercel.app)

Insight.IO is a high-performance, dark-themed robotics control dashboard designed to mimic a real-world telemetry and SLAM (Simultaneous Localization and Mapping) interface. This project was built as a frontend assignment to demonstrate modern UI development, 3D rendering, and responsive design.

---

## 🌟 Features Implemented

*   **Pixel-Perfect Dark Theme UI:** Strict adherence to the provided design mockup. Implements a responsive layout using modern CSS variables and flexbox, incorporating glassmorphism (`backdrop-filter`) for premium overlay effects.
*   **3D Map View (Three.js):** 
    *   Features a custom 3D view using `Three.js` and `OrbitControls`.
    *   Dynamically renders an 80,000-point synthetic environment SLAM map.
    *   Points are procedurally colored based on their height (Y-axis) to provide instant visual depth perception.
*   **Camera Feed Integration:** Implements a scalable HTML5 video element simulating a live camera feed.
*   **Picture-in-Picture (PiP) Toggling:** The bottom-left inset shows the alternate view. Clicking the PiP window seamlessly swaps the main viewport and the inset content.
*   **Virtual Interactive Controls:**
    *   **D-Pad (WASD):** Fully wired to the Three.js camera! You can physically fly around the 3D map space.
    *   **Zoom Slider:** Vertical slider intuitively controls the 3D camera distance.
    *   **Action Buttons / E-Stop:** Buttons are fully interactive and trigger Javascript popup alerts to demonstrate click capture.
*   **Bonus Point — ROS Integration:** Includes a generic `roslibjs` connection hook (`useRosConnection.js`) that attempts to connect to a local `rosbridge` websocket server (`ws://localhost:9090`). The top telemetry pill dynamically updates to show whether the ROS connection is "Connected" or "Offline".

---

## 🏗️ Technical Architecture & Choices

*   **React 18 & Vite:** Chosen for lightning-fast Hot Module Replacement (HMR) and a modular, component-based architecture. Vite significantly reduces build times compared to Webpack.
*   **Three.js:** Used instead of generic canvas drawing to provide true 3D spatial rendering. It handles the complex math of orbiting and rendering point clouds effortlessly.
*   **Vanilla CSS (Design Tokens):** The design system is built using pure CSS variables (`index.css`) rather than a heavy utility framework like Tailwind or Bootstrap. This guarantees maximum flexibility, keeps the DOM clean, and proves deep understanding of raw CSS styling.
*   **Lucide React:** Used for crisp, scalable SVG iconography that perfectly matches the clean, modern aesthetic of the assignment mockup.

---

## 🛠️ Getting Started

Follow these instructions to build and run the project locally.

### Prerequisites
Make sure you have Node.js and npm installed on your machine.
*   [Node.js](https://nodejs.org/) (v16.0 or higher recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lokesh9999b/ericAssignment.git
    cd ericAssignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To spin up the local development environment:

```bash
npm run dev
```

The application will be available in your browser at `http://localhost:5173/`. 

*(Note: Vite will automatically open a local port, usually 5173. Check your terminal output for the exact URL).*

---

## 🎮 How to Test the Functionality

Once the app is running in your browser, try the following:
1.  **Swap Views:** Click the small "Switch to Camera View" / "Switch to Map View" picture-in-picture window in the bottom left.
2.  **Explore the 3D Map:** While in Map View, use the **WASD D-Pad** in the bottom right corner to pan the camera around the point cloud space.
3.  **Zoom:** Drag or click the vertical **+/-** slider to zoom in and out of the map.
4.  **Test Buttons:** Click the **QUICK GOAL**, **INITIATE**, and the massive **EMERGENCY STOP** button to see the event handlers triggering successfully.
