import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TorusNodeModel() {
  const ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = time * 0.3;
      ref.current.rotation.y = time * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -time * 0.1;
    }
  });

  // Generate particles for a "neural network/AI" aesthetic
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 4;
  }

  return (
    <group scale={1.5} position={[0, 0, 0]}>
      {/* Complex Tech Knot */}
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
        <meshStandardMaterial 
          color="#34d399" // Brighter green
          metalness={0.8}
          roughness={0.2}
          emissive="#10b981"
          emissiveIntensity={1.5}
          wireframe={false}
        />
      </mesh>

      {/* Floating Nodes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          {/* @ts-ignore */}
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#34d399"
          transparent={true}
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}
