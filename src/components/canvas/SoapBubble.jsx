// SoapBubble.jsx
import React, { useRef, useMemo, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const SoapBubble = forwardRef(({ position = [0, -5, 0] }, ref) => {
  const mesh = useRef();

  // Random iridescent color
  const color = useMemo(
    () => new THREE.Color(`hsl(${Math.random() * 360}, 100%, 80%)`),
    []
  );

  // Random speed and amplitude for floating animation
  const speed = useMemo(() => Math.random() * 0.5 + 0.5, []);
  const amplitude = useMemo(() => Math.random() * 0.5 + 0.5, []);
  const initialY = position[1];

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * speed) * amplitude;
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={ref || mesh} args={[0.2, 64, 64]} position={position}>
      <meshPhysicalMaterial
        transmission={1}
        thickness={0.5}
        roughness={0}
        metalness={0.1}
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        iridescence={1}
        iridescenceIOR={1.3}
        color={color}
        enebleRotatorion={false}
      />
    </Sphere>
  );
});

SoapBubble.displayName = "SoapBubble";

export default SoapBubble;
