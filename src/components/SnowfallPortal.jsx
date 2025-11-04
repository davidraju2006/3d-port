import React, { useRef, useMemo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';

function Snowfall({ count = 600 }) {
  const snowRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 100; // x
      arr[i * 3 + 1] = Math.random() * 100;         // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!snowRef.current) return;

    const posArray = snowRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = posArray[i * 3 + 1];
      y -= 0.15 + Math.random() * 0.05; // slower than stars
      if (y < -50) {
        y = 50 + Math.random() * 10; // reset to top
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
      <pointsMaterial color="white" size={1.2} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

const SnowfallPortal = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      // Cleanup WebGL context on unmount
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        }
      }
    };
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 60], fov: 75 }}>
        <color attach="background" args={['#00001a']} />
        <ambientLight intensity={0.2} />
        <Snowfall count={800} />
      </Canvas>
    </div>,
    document.body
  );
};

export default SnowfallPortal;
