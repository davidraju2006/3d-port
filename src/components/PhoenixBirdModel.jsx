import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { AnimationMixer } from 'three';
import { gsap } from 'gsap';

const phoenixModelPath = '/phyonix/phoenix_bird.glb';

function PhoenixModelInner(props) {
  const { scene, animations } = useGLTF(phoenixModelPath);
  const mixer = useRef();
  const group = useRef();

  useEffect(() => {
    if (animations.length) {
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

  useEffect(() => {
    const arrPositionModel = [
      {
        id: 'banner',
        position: { x: 0, y: -0.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      {
        id: 'intro',
        position: { x: 3, y: -0.5, z: 0 },
        rotation: { x: 0.2, y: 0, z: 0 },
      },
      {
        id: 'project',
        position: { x: 0, y: -0.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      {
        id: 'description',
        position: { x: -3, y: -0.5, z: 0 },
        rotation: { x: 0.2, y: 0, z: 0 },
      },
      {
        id: 'contact',
        position: { x: 3, y: -0.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      },
      {
        id: 'contact2',
        position: { x: -3.5, y: -0.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
      }
      ];

    const modelMove = () => {
      const sections = document.querySelectorAll('.section');
      let currentSection = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = section.id;
        }
      });

      const activeData = arrPositionModel.find((val) => val.id === currentSection);
      if (activeData && group.current) {
        const { position, rotation } = activeData;
        // Calculate horizontal movement based on vertical scroll position
        const scrollY = window.scrollY || window.pageYOffset;
        const maxHorizontalMove = 1;
        const horizontalMove = Math.sin(scrollY * 0.0005) * maxHorizontalMove;

        gsap.to(group.current.position, {
          x: position.x + horizontalMove,
          y: position.y,
          z: position.z,
          duration: 0.5,
          ease: 'power1.out',
        });
        gsap.to(group.current.rotation, {
          x: rotation.x,
          y: rotation.y,
          z: rotation.z,
          duration: 0.5,
          ease: 'power1.out',
        });
      }
    };

    window.addEventListener('scroll', modelMove);
    return () => window.removeEventListener('scroll', modelMove);
  }, []);

  return (
    <group ref={group}>
      <primitive object={scene} {...props} />
    </group>
  );
}

useGLTF.preload(phoenixModelPath);

const PhoenixModel = () => {
  useEffect(() => {
    return () => {
      // No WebGL context cleanup needed
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 2.5, 6], fov: 50 }}
        gl={{ powerPreference: "high-performance" }}
      >

        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 2]} intensity={1} />


        <PhoenixModelInner position={[0, -0.5, 0]} scale={[0.006, 0.006, 0.006]} />


        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={0}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};

export default PhoenixModel;
