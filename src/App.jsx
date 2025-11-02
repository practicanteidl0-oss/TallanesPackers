import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Youtube from "./components/Youtube";
import WhatsApp from "./components/WhatsApp";
import SomosTallanes from "./components/SomosTallanes";
import videoTallanes from "./assets/videos/videotallanes.mp4";
import { LiquidGlass } from "@liquidglass/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Youtube />
      <WhatsApp />
      <div className="relative min-h-screen overflow-hidden">
        {/* Video de fondo */}
        <video
          className="absolute inset-0 w-full h-full object-contain object-top md:object-cover md:object-center pointer-events-none"
          src={videoTallanes}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

      

      </div>
      
      {/* Sección Somos Tallanes */}
      <SomosTallanes />
    </>
  );
}

export default App;
