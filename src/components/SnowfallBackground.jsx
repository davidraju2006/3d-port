import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createSnowflakeTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBAFormat;
  return texture;
}

function Snowfall({ count = 600 }) {
  const snowRef = useRef();
  const [texture] = useState(() => createSnowflakeTexture());

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 100;
      arr[i * 3 + 1] = Math.random() * 100;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!snowRef.current) return;

    const posArray = snowRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = posArray[i * 3 + 1];
      y -= 0.15 + Math.random() * 0.05;
      if (y < -50) {
        y = 50 + Math.random() * 10;
      }
      posArray[i * 3 + 1] = y;
    }
    snowRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={snowRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={2}
        sizeAttenuation
        transparent
        alphaTest={0.5}
        opacity={1}
        depthWrite={false}
      />
    </points>
  );
}

const SnowfallBackground = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: '#000010', zIndex: -1 }}>
      <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 60], fov: 75 }}>
        <color attach="background" args={['#000010']} />
        <ambientLight intensity={0.3} />
        <Snowfall count={300} />
      </Canvas>
    </div>
  );
};

export default SnowfallBackground;
