import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ContactBot() {
  const botRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const handLeftRef = useRef<THREE.Mesh>(null);
  const handRightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (botRef.current) {
      // Floating animation
      botRef.current.position.y = Math.sin(t * 2) * 0.15;
      // Slight rotation looking around
      botRef.current.rotation.y = Math.sin(t * 0.8) * 0.2;
      botRef.current.rotation.x = Math.cos(t * 1.2) * 0.1;
      botRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 2) * 0.1;
      ringRef.current.rotation.y = t * 0.5;
    }

    // Eyes blinking and looking
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.random() > 0.98 ? 0.1 : 1;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, blink, 0.2);
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, blink, 0.2);
      
      const lookX = Math.sin(t * 2) * 0.05;
      leftEyeRef.current.position.x = -0.2 + lookX;
      rightEyeRef.current.position.x = 0.2 + lookX;
    }

    // Hands animating
    if (handLeftRef.current && handRightRef.current) {
      handLeftRef.current.position.y = Math.sin(t * 3) * 0.1 - 0.2;
      handLeftRef.current.rotation.x = Math.sin(t * 2) * 0.2;
      
      // Right hand waving
      handRightRef.current.position.y = Math.sin(t * 4) * 0.2 + 0.3;
      handRightRef.current.rotation.z = Math.sin(t * 8) * 0.4 - 0.2;
    }
  });

  return (
    <group scale={1.8} position={[0, 0, 0]}>
      <group ref={botRef}>
        {/* Main Body Orb */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.1} 
            roughness={0.1} 
            clearcoat={1}
          />
        </mesh>

        {/* Outer Glass Shell (for premium look) */}
        <mesh scale={1.05}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transparent={true} 
            opacity={0.15} 
            roughness={0} 
            metalness={1} 
            transmission={0.9} 
          />
        </mesh>

        {/* Face Screen */}
        <mesh position={[0, 0.1, 0.85]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.4]} />
          <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Eyes */}
        <group position={[0, 0.1, 1.06]} rotation={[-0.1, 0, 0]}>
          <mesh ref={leftEyeRef} position={[-0.2, 0, 0]}>
            <capsuleGeometry args={[0.08, 0.2, 4, 16]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.2, 0, 0]}>
            <capsuleGeometry args={[0.08, 0.2, 4, 16]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
        </group>

        {/* Cheeks (Blush) */}
        <mesh position={[-0.4, -0.1, 1.02]} rotation={[-0.1, 0, 0]}>
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.4, -0.1, 1.02]} rotation={[-0.1, 0, 0]}>
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.6} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
        </mesh>

        {/* Floating Hands */}
        <mesh ref={handLeftRef} position={[-1.2, -0.2, 0.5]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.15, 0.4, 4, 16]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.1} clearcoat={1} />
        </mesh>
        
        {/* Right Hand Waving */}
        <mesh ref={handRightRef} position={[1.2, 0.2, 0.5]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.15, 0.4, 4, 16]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.1} clearcoat={1} />
        </mesh>

        {/* Halo / Tech Ring */}
        <mesh ref={ringRef} position={[0, -0.5, 0]}>
          <torusGeometry args={[1.4, 0.02, 16, 64]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  );
}
