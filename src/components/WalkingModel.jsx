import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function WalkingModel({ animationName = "Walk", ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/scene.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions);
    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
    }
    return () => actions[animationName]?.fadeOut(0.5);
  }, [animationName, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <group>
          {Object.keys(nodes)
            .filter((key) => nodes[key].isSkinnedMesh)
            .map((key) => {
              const node = nodes[key];
              return (
                <skinnedMesh
                  key={key}
                  castShadow
                  geometry={node.geometry}
                  material={materials[node.material?.name]}
                  skeleton={node.skeleton}
                />
              );
            })}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/scene.glb");
