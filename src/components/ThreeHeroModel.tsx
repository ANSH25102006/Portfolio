"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function InteractiveConstellation() {
  const torusRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const { x, y } = state.pointer; // Normalized between -1 and 1
    const elapsedTime = state.clock.getElapsedTime();

    // Rotate torus knot slowly with smooth swaying based on mouse pointer
    if (torusRef.current) {
      torusRef.current.rotation.y = elapsedTime * 0.15 + x * 0.4;
      torusRef.current.rotation.x = elapsedTime * 0.08 + -y * 0.4;
    }

    // Spin core in opposite direction
    if (coreRef.current) {
      coreRef.current.rotation.y = -elapsedTime * 0.25 - x * 0.2;
      coreRef.current.rotation.z = elapsedTime * 0.1;
    }

    // Sway particle sphere
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -elapsedTime * 0.05 + x * 0.3;
      pointsRef.current.rotation.x = elapsedTime * 0.05 + -y * 0.3;
    }
  });

  // Procedural construction of vertices for particle array
  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 11.5 + Math.random() * 2.5; // Thickness bounds

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return (
    <group>
      {/* 1. Wireframe Torus Knot as primary mesh */}
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[6.5, 1.8, 100, 16]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* 2. Inner Glowing Core Sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[3, 1]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.5} 
        />
      </mesh>

      {/* 3. Outer Constellation Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a78bfa"
          size={0.12}
          sizeAttenuation={true}
          transparent
          opacity={0.7}
        />
      </points>

      {/* 4. Subtle glowing nodes on mesh corners */}
      <points>
        <torusKnotGeometry args={[6.5, 1.8, 40, 8]} />
        <pointsMaterial 
          color="#60a5fa" 
          size={0.2} 
          sizeAttenuation={true} 
          transparent 
          opacity={0.9} 
        />
      </points>
    </group>
  );
}

export default function ThreeHeroModel() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] relative select-none">
      {/* Ambient background shadow inside Canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/2 to-transparent pointer-events-none rounded-full blur-[100px]" />
      
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <InteractiveConstellation />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
