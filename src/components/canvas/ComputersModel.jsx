import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ComputersModel({ animationName = "dance", onModelClick }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF("/models/scene.glb");
  const { actions, mixer } = useAnimations(animations, scene);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile devices
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // ✅ Prepare the scene (important for skinned meshes)
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isSkinnedMesh) {
        child.frustumCulled = false;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // ✅ Play default or selected animation
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    const available = Object.keys(actions);
    console.log("✅ Available animations:", available);

    // Find closest match for animationName
    const matched = available.find(
      (a) => a.toLowerCase() === animationName.toLowerCase()
    );

    // If not found, fallback to first
    const clipToPlay = matched ? actions[matched] : actions[available[0]];
    if (clipToPlay) {
      Object.values(actions).forEach((a) => a.fadeOut(0.3));
      clipToPlay.reset().fadeIn(0.3).play();
      clipToPlay.loop = THREE.LoopRepeat;
      console.log(`▶️ Playing animation: ${clipToPlay._clip.name}`);
    }

    return () => mixer.stopAllAction();
  }, [animationName, actions, mixer]);

  // ✅ Update the mixer every frame
  useFrame((_, delta) => mixer?.update(delta));

  // ✅ Render the model
  return (
    <group ref={groupRef} onClick={onModelClick} dispose={null}>
      <primitive
        object={scene}
        scale={isMobile ? 7 : 6}
        position={isMobile ? [0, -8, -2.2] : [0, -6.25, -1.5]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/scene.glb");
