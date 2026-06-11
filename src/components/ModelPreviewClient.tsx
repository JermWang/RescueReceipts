"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { PetModel } from "./PetModel";
import { PetPlatform } from "./PetPlatform";

export type ModelPreviewEntry = {
  type: string;
  id: string;
  label: string;
  path: string;
  scale: number;
  idleAnimation: string;
};

export function ModelPreviewClient({ entries }: { entries: ModelPreviewEntry[] }) {
  const [selectedId, setSelectedId] = useState(entries[0]?.id ?? "");
  const [rotate, setRotate] = useState(true);
  const selected = useMemo(
    () => entries.find((entry) => entry.id === selectedId) ?? entries[0],
    [entries, selectedId],
  );

  if (!selected) {
    return <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-ink-soft">No models found.</div>;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[280px,1fr]">
      <aside className="rounded-2xl border border-ink/10 bg-white/80 p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl">Models</h2>
            <p className="text-xs text-ink-soft">{entries.length} registered GLB variants</p>
          </div>
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft">
            <input
              type="checkbox"
              checked={rotate}
              onChange={(event) => setRotate(event.currentTarget.checked)}
              className="accent-warm-orange"
            />
            Spin
          </label>
        </div>
        <div className="grid gap-2">
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setSelectedId(entry.id)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                entry.id === selected.id
                  ? "border-warm-orange bg-warm-orange/10 text-ink"
                  : "border-ink/10 bg-white text-ink-soft hover:border-ink/25 hover:text-ink"
              }`}
            >
              <span className="block font-semibold">{entry.label}</span>
              <span className="block text-xs capitalize">{entry.type} - {entry.path}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-b from-cream-50 to-cream-100">
        <div className="h-[520px]">
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.45, 4.2], fov: 36 }}>
            <color attach="background" args={["#f8f1e2"]} />
            <ambientLight intensity={0.72} />
            <directionalLight position={[3, 5, 2]} intensity={1.1} castShadow />
            <group position={[0, -0.1, 0]}>
              <PetPlatform featured hovered selected />
              <group rotation={[0, Math.PI, 0]}>
                <PetModel petType={selected.type} modelVariant={selected.id} selected hovered={false} />
              </group>
            </group>
            <ContactShadows position={[0, -0.28, 0]} opacity={0.42} scale={8} blur={2.5} far={4} />
            <OrbitControls
              enablePan={false}
              enableZoom
              autoRotate={rotate}
              autoRotateSpeed={0.75}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>
        </div>
        <div className="grid gap-2 border-t border-ink/10 bg-white/75 p-4 text-sm sm:grid-cols-2">
          <Info label="Variant" value={selected.id} />
          <Info label="Type" value={selected.type} />
          <Info label="Idle clip" value={selected.idleAnimation} />
          <Info label="Scale" value={selected.scale.toString()} />
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-ink-soft">{label}</div>
      <div className="break-all font-semibold">{value}</div>
    </div>
  );
}
