import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, SpotLight } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";
import ErrorBoundary from "../ErrorBoundary";
import ComputersModel from "./ComputersModel";

const Computers = ({ onModelClick }) => {


  return (
    <ErrorBoundary>
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [20, 3, 5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (onModelClick) {
            onModelClick();
          }
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (onModelClick) {
            onModelClick();
          }
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ambientLight intensity={60} />
          <SpotLight
            position={[20, 20, 20]}
            angle={0.15}
            penumbra={1}
            intensity={4}
            castShadow
            shadow-mapSize={2000}
          />
          <ComputersModel onModelClick={onModelClick} />
          <Preload />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default Computers;
