import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader.jsx";


const FloatingImage = ({ texture, position, speed }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += speed;
      if (ref.current.position.y > 2) ref.current.position.y = -2;
      ref.current.rotation.z += 0.01;
    }
  });
  return <sprite ref={ref} position={position} scale={[0.5, 0.5, 0.5]}>
    <spriteMaterial map={texture} transparent />
  </sprite>;
};

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={3}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[0, 0, 0.75]} intensity={0.8} />
      <pointLight position={[0, 0, 1]} intensity={0.5} />
      <mesh castShadow receiveShadow scale={1.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#fff8eb"
          emissive="#915eff"
          emissiveIntensity={0.6}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal 
          position={[0, 0, 1]}
          rotation={[0, 0, Math.PI / 4]}
          flatShading
          map={decal}
          scale={2.0}
        />
      </mesh>
  
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const glRef = useRef();



  return (
    <Canvas
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      shadows
      onCreated={({ gl }) => {
        glRef.current = gl;
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
