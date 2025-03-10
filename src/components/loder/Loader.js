// Loader3D.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import "../loder/Loader.css"

const Loader = () => {
    return (
        <div className="loader-container">
          {/* Display GIF */}
          <img 
            src="https://media.giphy.com/media/3o7TKwvIaODeqZ6z7m/giphy.gif" 
            alt="Loading..." 
            className="loader-gif"
          />
        </div>
      );
};

export default Loader;
