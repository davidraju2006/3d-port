import React, { useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ComputersModel from "./ComputersModel";
import SoapBubble from "./SoapBubble";
import ErrorBoundary from "../ErrorBoundary";

const ModelCanvas = React.memo(({ onModelClick, animationName }) => {
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL support on mount
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      setWebglSupported(false);
    } else {
      // Check for context loss extension
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        // Listen for context loss
        canvas.addEventListener('webglcontextlost', (event) => {
          console.warn('WebGL context lost');
          event.preventDefault();
          setWebglSupported(false);
        });
        // Listen for context restore
        canvas.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
          setWebglSupported(true);
        });
      }
    }
  }, []);

  // Generate bubble positions once
  const bubbles = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        position: [
          5 + Math.random() * 10, // X
          Math.random() * 4 - 1,  // Y
          2 + Math.random() * 4   // Z
        ],
        enableRotation: Math.random() > 0.5 // randomize rotation
      })),
    []
  );

  // Removed the useEffect that loses WebGL context on unmount as it may cause issues

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">WebGL Not Supported</h1>
          <p className="mb-4">Your browser does not support WebGL or it is disabled.</p>
          <p className="text-sm">Please enable WebGL in your browser settings or try a different browser.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Canvas
        className="absolute inset-0 z-0"
        camera={{ position: [20, 3, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      >
        {/* Lights */}
        <ambientLight intensity={5} />
        <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={5} />

        <group>
          {/* Main character model */}
          <ComputersModel
            onModelClick={onModelClick}
            animationName={animationName} // 👈 This tells the model which anim to play
          />

          {/* Camera Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            target={[0, 0, 0]}
          />

          {/* Soap bubbles */}
          <group>
            {bubbles.map((bubble, index) => (
              <SoapBubble
                key={index}
                position={bubble.position}
                enableRotation={bubble.enableRotation}
              />
            ))}
          </group>
        </group>
      </Canvas>
    </ErrorBoundary>
  );
});

ModelCanvas.displayName = "ModelCanvas";

export default ModelCanvas;
