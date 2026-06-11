"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hasWebGL } from "@/hooks/useIsMobile";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const ContactShadows = dynamic(() => import("@react-three/drei").then((m) => m.ContactShadows), { ssr: false });
const Float = dynamic(() => import("@react-three/drei").then((m) => m.Float), { ssr: false });
const PetModel = dynamic(() => import("./PetModel").then((m) => m.PetModel), { ssr: false });
const PetPlatform = dynamic(() => import("./PetPlatform").then((m) => m.PetPlatform), { ssr: false });

export function Hero3D() {
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState(true);
  useEffect(() => { setWebgl(hasWebGL()); }, []);

  if (!webgl) {
    return (
      <div className="aspect-[4/3] rounded-3xl border border-ink/10 bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center">
        <div className="text-ink-soft text-sm">Cute pet preview</div>
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/3] rounded-3xl border border-ink/10 overflow-hidden bg-gradient-to-br from-cream-100 to-cream-200 shadow-soft">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.4, 4.2], fov: 38 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.8;
        }}
      >
        <hemisphereLight args={["#ffd0a3", "#6fbf8a", 0.42]} />
        <directionalLight position={[-3, 4.8, 2.5]} intensity={0.58} color="#ffb36a" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <Suspense fallback={null}>
          <group position={[-1.0, 0, 0]}>
            <PetPlatform />
            <PetModel petType="dog" />
          </group>
          <group position={[1.0, 0, -0.2]}>
            <PetPlatform featured />
            <PetModel petType="cat" />
          </group>
          {/* Floating receipts + SOL coin */}
          <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.4} floatIntensity={0.6} position={[-0.2, 1.6, 0.6]}>
            <mesh castShadow>
              <boxGeometry args={[0.6, 0.36, 0.02]} />
              <meshStandardMaterial color="#fffdf6" />
            </mesh>
          </Float>
          <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.5} floatIntensity={0.5} position={[1.5, 1.9, 0.4]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.04, 36]} />
              <meshStandardMaterial color="#9945ff" metalness={0.4} roughness={0.4} />
            </mesh>
          </Float>
          <ContactShadows position={[0, -0.2, 0]} opacity={0.34} scale={10} blur={2.5} far={4} />
        </Suspense>
      </Canvas>
      <div className="absolute top-3 left-3 stamp text-warm-orange bg-white/70 rounded-md">Verified</div>
    </div>
  );
}
