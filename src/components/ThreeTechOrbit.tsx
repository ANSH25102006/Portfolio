"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { TechStone, TechStoneCard } from "./TechOrbit";

interface ThreeTechOrbitProps {
  technologies: TechStone[];
}

function OrbitalItem({
  tech,
  idx,
  x,
  z,
}: {
  tech: TechStone;
  idx: number;
  x: number;
  z: number;
}) {
  const itemRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (itemRef.current) {
      const t = state.clock.getElapsedTime();
      // Smooth vertical floating/bobbing effect
      itemRef.current.position.y = Math.sin(t * 1.2 + idx) * 0.15;
    }
  });

  return (
    <group ref={itemRef} position={[x, 0, z]}>
      <Html distanceFactor={13} center className="pointer-events-none">
        {/* We use scale-85 md:scale-95 to make cards look nice and balanced in 3D */}
        <div className="w-[105px] sm:w-[125px] md:w-[135px] select-none pointer-events-auto">
          <TechStoneCard tech={tech} idx={idx} />
        </div>
      </Html>
    </group>
  );
}

function OrbitalRing({
  radius,
  children,
  speed,
  isPaused,
}: {
  radius: number;
  children: React.ReactNode;
  speed: number;
  isPaused: boolean;
}) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!isPaused && ringRef.current) {
      ringRef.current.rotation.y += speed * 0.012; // slow revolution around Y-axis
    }
  });

  return (
    <group ref={ringRef}>
      {/* 3D Visual ring path trace for coordinate guideline theme */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.06} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      {children}
    </group>
  );
}

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = t * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshBasicMaterial 
        color="#a78bfa" 
        wireframe 
        transparent 
        opacity={0.2} 
      />
      
      {/* Glowing inner core point */}
      <mesh>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>

      <Html distanceFactor={12} center className="pointer-events-none select-none">
        <div className="flex flex-col items-center justify-center font-mono pointer-events-none text-center bg-black/40 px-3 py-1.5 rounded-full border border-purple-500/10 backdrop-blur-xs select-none">
          <span className="text-[7.5px] tracking-[0.3em] text-purple-400 font-extrabold uppercase animate-pulse">
            CORE
          </span>
          <span className="text-white font-black text-[10px] uppercase tracking-wider mt-0.5">
            ANSH
          </span>
        </div>
      </Html>
    </mesh>
  );
}

function OrbitScene({ technologies }: { technologies: TechStone[] }) {
  const [isPaused, setIsPaused] = useState(false);

  // Group technologies into orbits
  // Inner: 4 items (React, TypeScript, Next.js, JavaScript)
  const innerTechs = technologies.filter(t => 
    ["React", "TypeScript", "Next.js", "JavaScript"].includes(t.name)
  );

  // Middle: 5 items (Node.js, Express.js, MongoDB, Tailwind CSS, Redux)
  const middleTechs = technologies.filter(t => 
    ["Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Redux"].includes(t.name)
  );

  // Outer: 5 items (HTML5, CSS3, Git, Figma, Docker)
  const outerTechs = technologies.filter(t => 
    ["HTML5", "CSS3", "Git", "Figma", "Docker"].includes(t.name)
  );

  const getPosition = (index: number, count: number, radius: number) => {
    const angle = (index / count) * Math.PI * 2;
    return {
      x: radius * Math.cos(angle),
      z: radius * Math.sin(angle)
    };
  };

  return (
    <group 
      onPointerOver={() => setIsPaused(true)}
      onPointerOut={() => setIsPaused(false)}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} />

      {/* Central node core */}
      <CentralCore />

      {/* Inner Orbit (Radius = 4.2) */}
      <OrbitalRing radius={4.2} speed={0.45} isPaused={isPaused}>
        {innerTechs.map((tech, idx) => {
          const pos = getPosition(idx, innerTechs.length, 4.2);
          return (
            <OrbitalItem 
              key={tech.name} 
              tech={tech} 
              idx={idx} 
              x={pos.x} 
              z={pos.z} 
            />
          );
        })}
      </OrbitalRing>

      {/* Middle Orbit (Radius = 6.8, counter-rotates!) */}
      <OrbitalRing radius={6.8} speed={-0.25} isPaused={isPaused}>
        {middleTechs.map((tech, idx) => {
          const pos = getPosition(idx, middleTechs.length, 6.8);
          return (
            <OrbitalItem 
              key={tech.name} 
              tech={tech} 
              idx={idx + 4} 
              x={pos.x} 
              z={pos.z} 
            />
          );
        })}
      </OrbitalRing>

      {/* Outer Orbit (Radius = 9.4) */}
      <OrbitalRing radius={9.4} speed={0.12} isPaused={isPaused}>
        {outerTechs.map((tech, idx) => {
          const pos = getPosition(idx, outerTechs.length, 9.4);
          return (
            <OrbitalItem 
              key={tech.name} 
              tech={tech} 
              idx={idx + 9} 
              x={pos.x} 
              z={pos.z} 
            />
          );
        })}
      </OrbitalRing>
    </group>
  );
}

export default function ThreeTechOrbit({ technologies }: ThreeTechOrbitProps) {
  return (
    <div className="w-full h-[450px] sm:h-[550px] md:h-[650px] relative select-none rounded-3xl border border-white/[0.03] bg-gradient-to-b from-[#040612]/30 via-[#070b1e]/10 to-[#040612]/30 overflow-hidden shadow-inner">
      
      {/* 3D drag instructional visual cue */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none text-[8.5px] font-mono font-black text-slate-500 uppercase tracking-widest bg-black/45 border border-white/5 px-3 py-1 rounded-md backdrop-blur-xs">
        Drag to Rotate Orbit Space &bull; Hover Card to Freeze
      </div>

      <Canvas 
        camera={{ position: [0, 9.5, 14.5], fov: 58 }}
        eventSource={typeof window !== "undefined" ? window.document.getElementById("skills") || undefined : undefined}
      >
        <Suspense fallback={null}>
          <OrbitScene technologies={technologies} />
        </Suspense>
        
        {/* Constrain camera rotation vertical angles slightly to keep premium look */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.15} 
          minPolarAngle={Math.PI / 3.2} 
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
