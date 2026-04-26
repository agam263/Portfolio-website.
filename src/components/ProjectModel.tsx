import { useGLTF, Html } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ProjectModel({ isDrivingMode = false }: { isDrivingMode?: boolean }) {
  const { scene } = useGLTF('/ferrari.glb');
  const ref = useRef<THREE.Group>(null);
  const glassMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const armRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Enhance the Ferrari's paint and get a reference to the lights
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // Enhance paint
        if (mesh.material && (mesh.material as any).name === 'body') {
          const material = mesh.material as THREE.MeshPhysicalMaterial;
          material.color.set('#ff0000'); // Classic Ferrari Red
          material.metalness = 0.5;
          material.roughness = 0.1;
          material.clearcoat = 1.0;
          material.clearcoatRoughness = 0.1;
        }

        // Grab reference to the lights
        if (mesh.material && (mesh.material as any).name === 'glass') {
           glassMatRef.current = mesh.material as THREE.MeshPhysicalMaterial;
        }
      }
    });
  }, [scene]);

  // Animations: Flashing headlights and Hover Effects
  useFrame((state) => {
    if (glassMatRef.current) {
      if (isDrivingMode) {
        // Flash white headlights rapidly when driving
        glassMatRef.current.color.set('#ffffff');
        glassMatRef.current.emissive.set('#ffffff');
        glassMatRef.current.emissiveIntensity = (Math.sin(state.clock.elapsedTime * 15) > 0) ? 15 : 0;
      } else {
        // Showroom mode: Red taillights on mouse hover
        if (hovered) {
          glassMatRef.current.color.set('#ff0000');
          glassMatRef.current.emissive.set('#ff0000');
          // Smooth transition up
          glassMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(glassMatRef.current.emissiveIntensity, 10, 0.1);
        } else {
          glassMatRef.current.color.set('#222222');
          glassMatRef.current.emissive.set('#000000');
          // Smooth transition down
          glassMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(glassMatRef.current.emissiveIntensity, 0, 0.1);
        }
      }
    }
    
    // Wave arm up and down when driving
    if (isDrivingMode && armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 12) * 0.5 + 0.5;
    }
  });

  return (
    <group 
      ref={ref} 
      scale={1.5} 
      position={[0, -0.5, 0]}
      // Face RIGHT (-90 degrees) when driving, side view for showroom
      rotation={[0, isDrivingMode ? -Math.PI / 2 : -Math.PI / 2, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <primitive object={scene} />

      {/* Companion Character Sitting on the Roof (Only visible when driving) */}
      {isDrivingMode && (
        <group position={[0, 0.85, -0.2]} scale={0.2} rotation={[0, Math.PI / 2, 0]}>
          {/* Body */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.5]} />
            <meshStandardMaterial color="#ff69b4" /> {/* Hot Pink shirt */}
          </mesh>
          {/* Head */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#ffe0bd" /> {/* Skin tone */}
          </mesh>
          {/* Sunglasses */}
        <mesh position={[0.31, 1.2, 0]}>
          <boxGeometry args={[0.05, 0.2, 0.5]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Waving Arm */}
        <group position={[0, 0.6, 0.35]} ref={armRef}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial color="#ffe0bd" />
          </mesh>
        </group>

        {/* Speech Bubble */}
        {isDrivingMode && (
          <Html position={[0, 2.5, 0]} center>
            <div className="bg-white text-black px-4 py-2 rounded-[2rem] rounded-bl-none text-sm md:text-base font-bold whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-black animate-bounce relative">
              Hii!! 👋
            </div>
          </Html>
        )}
      </group>
      )}

    </group>
  );
}

// Preload the model
useGLTF.preload('/ferrari.glb');
