import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";
import ohhUiiSound from '../Audio/ohh uii.opus';

const catModelPath = "/cat/cat.glb";

function CatModelInner(props) {
  const { scene, animations } = useGLTF(catModelPath);
  const mixer = useRef();
  const group = useRef();

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
      return () => {
        animations.forEach((clip) => mixer.current.uncacheClip(clip));
      };
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <group
      ref={group}
      position={[0, -1.5, 0]} // shift cat down
      rotation={[0, Math.PI, 0]} // rotate if facing wrong way
      scale={[1.2, 1.2, 1.2]} // adjust scale (try 0.02–1)
      onDoubleClick={props.onDoubleClick}
    >
      <primitive object={scene} {...props} />
    </group>
  );
}

useGLTF.preload(catModelPath);

const CatModel = ({ pauseMeow, resumeMeow }) => {
  const audioRef = useRef();

  useEffect(() => {
    const handleOhhUiiEnded = () => {
      resumeMeow();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleOhhUiiEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleOhhUiiEnded);
      }
    };
  }, [resumeMeow]);

  const handleDoubleClick = () => {
    pauseMeow();
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} gl={{ powerPreference: "high-performance" }}>
        {/* Lights */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Model */}
        <CatModelInner onDoubleClick={handleDoubleClick} />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
        />
      </Canvas>
      <audio ref={audioRef} src={ohhUiiSound} />
    </div>
  );
};

export default CatModel;
