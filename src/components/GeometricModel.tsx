import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GeometricModel() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.2;
      outerRef.current.rotation.y = time * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.4;
      innerRef.current.rotation.y = -time * 0.5;
      innerRef.current.scale.setScalar(Math.sin(time * 2) * 0.05 + 0.9);
    }
  });

  return (
    <group scale={1.8} position={[0, 0, 0]}>
      {/* Outer Abstract Shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0.4}
          roughness={0.1}
          transmission={0.9} 
          thickness={0.5}
          transparent={true}
          opacity={0.6}
          wireframe={true}
        />
      </mesh>
      
      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial 
          color="#a855f7" // Purple tint
          emissive="#a855f7"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}
