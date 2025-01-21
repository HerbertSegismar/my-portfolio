import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTFResult } from "../types"; // Adjust the import path based on your file structure

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/Can.glb") as unknown as GLTFResult;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Adjust the rotation speed as needed
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group
        position={[0.032, 10.868, -0.065]}
        rotation={[-Math.PI, 0.542, -Math.PI]} // Initial rotation values
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle004.geometry}
          material={materials.TopOfCan}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle004_1.geometry}
          material={materials.CanArt}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tab.geometry}
          material={materials.CanArt}
          position={[-0.701, -0.06, -0.012]}
          rotation={[0, 0.02, 0]}
          scale={0.692}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Can.glb");
