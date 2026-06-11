"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile, hasWebGL } from "@/hooks/useIsMobile";
import { WebGLFallback } from "./WebGLFallback";
import { PetReceiptOverlay } from "./PetReceiptOverlay";
import type { PublicReceipt } from "@/types/db";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const Drei = {
  OrbitControls: dynamic(() => import("@react-three/drei").then((m) => m.OrbitControls), { ssr: false }),
  ContactShadows: dynamic(() => import("@react-three/drei").then((m) => m.ContactShadows), { ssr: false }),
  Environment: dynamic(() => import("@react-three/drei").then((m) => m.Environment), { ssr: false }),
};
const PetModel = dynamic(() => import("./PetModel").then((m) => m.PetModel), { ssr: false });
const PetPlatform = dynamic(() => import("./PetPlatform").then((m) => m.PetPlatform), { ssr: false });

export function AdoptionPark({ receipts, compact = false }: { receipts: PublicReceipt[]; compact?: boolean }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [webgl, setWebgl] = useState(true);
  const [active, setActive] = useState<PublicReceipt | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => { setWebgl(hasWebGL()); }, []);

  const displayed = useMemo(() => {
    if (!receipts.length) return [];
    const sorted = [...receipts].sort((a, b) => Number(b.featured) - Number(a.featured));
    return compact ? sorted.slice(0, 6) : sorted.slice(0, isMobile ? 8 : 16);
  }, [receipts, compact, isMobile]);

  if (!webgl) return <WebGLFallback receipts={displayed} />;
  if (!displayed.length) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-cream-50 p-8 text-center text-ink-soft">
        The Adoption Park is waiting for its first verified residents.
      </div>
    );
  }

  // Lay out pets in a row of platforms; rotation handled by Canvas
  const positions = layout(displayed.length, isMobile);

  return (
    <div className="relative">
      <div className={`rounded-3xl overflow-hidden border border-ink/10 bg-gradient-to-b from-cream-50 to-cream-100 shadow-soft ${compact ? "h-[360px]" : "h-[520px]"}`}>
        <Suspense fallback={<ParkSkeleton />}>
          <Canvas
            shadows
            dpr={[1, isMobile ? 1.5 : 2]}
            camera={{ position: [0, 1.6, 4.5], fov: 38 }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 0.78;
            }}
          >
            <color attach="background" args={["#f4dfbf"]} />
            <hemisphereLight args={["#ffd0a3", "#6fbf8a", 0.42]} />
            <directionalLight
              position={[-3, 4.8, 2.5]}
              intensity={0.58}
              color="#ffb36a"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <Suspense fallback={null}>
              {displayed.map((r, i) => (
                <group
                  key={r.id}
                  position={positions[i]}
                  onPointerOver={(e) => { e.stopPropagation(); setHoverId(r.id); document.body.style.cursor = "pointer"; }}
                  onPointerOut={(e) => { e.stopPropagation(); setHoverId((id) => (id === r.id ? null : id)); document.body.style.cursor = ""; }}
                  onClick={(e) => { e.stopPropagation(); setActive(r); }}
                >
                  <PetPlatform featured={r.featured} hovered={hoverId === r.id} selected={active?.id === r.id} />
                  <group position={[0, 0, 0]}>
                    <PetModel
                      petType={r.pet_type}
                      modelVariant={r.model_variant}
                      modelColor={r.model_color}
                      hovered={hoverId === r.id}
                      selected={active?.id === r.id}
                    />
                  </group>
                </group>
              ))}
              <Drei.ContactShadows position={[0, -0.2, 0]} opacity={0.34} scale={20} blur={2.5} far={4} />
              {/* Soft env if available; fail-safe */}
              <SafeEnvironment />
            </Suspense>
            <Drei.OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate={!reduced}
              autoRotateSpeed={0.6}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </Suspense>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-center text-xs text-ink-soft">
          {isMobile ? "Tap a pet to view its receipt" : "Hover a pet, click for the full receipt"}
        </div>
      </div>
      <PetReceiptOverlay open={!!active} receipt={active} onClose={() => setActive(null)} />
    </div>
  );
}

function SafeEnvironment() {
  try {
    return <Drei.Environment preset="sunset" environmentIntensity={0.45} />;
  } catch {
    return null;
  }
}

function ParkSkeleton() {
  return (
    <div className="h-full w-full flex items-center justify-center text-ink-soft">
      <div className="animate-pulse">Loading park…</div>
    </div>
  );
}

function layout(n: number, mobile: boolean): [number, number, number][] {
  const spacing = mobile ? 1.4 : 1.7;
  const perRow = mobile ? 3 : Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const out: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const inThisRow = Math.min(perRow, n - row * perRow);
    const xOffset = -((inThisRow - 1) * spacing) / 2;
    const x = xOffset + col * spacing;
    const z = -row * spacing;
    out.push([x, 0, z]);
  }
  return out;
}
