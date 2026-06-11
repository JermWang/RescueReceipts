import type { PetType } from "./config";

export type PetModelEntry = {
  id: string;
  label: string;
  path: string;
  scale: number;
  idleAnimation: string;
};

// Local GLB residents used by the React Three views. The fullscreen redesign
// serves its own copied set from /redesign/models.
export const PET_MODELS: Record<string, PetModelEntry[]> = {
  dog: [
    { id: "dog_01", label: "Shiba Inu", path: "/models/pets/dog_01.glb", scale: 1, idleAnimation: "Idle" },
    { id: "dog_02", label: "Husky", path: "/models/pets/dog_02.glb", scale: 1, idleAnimation: "Idle" },
    { id: "cat_02", label: "Wolf", path: "/models/pets/cat_02.glb", scale: 0.95, idleAnimation: "Idle" },
    { id: "dog", label: "Rescue Mix", path: "/models/pets/dog.glb", scale: 0.9, idleAnimation: "iddle" },
  ],
  cat: [
    { id: "cat", label: "Tabby", path: "/models/pets/cat.glb", scale: 0.8, idleAnimation: "Idle" },
  ],
  rabbit: [
    { id: "rabbit_01", label: "Rabbit (procedural)", path: "/models/pets/rabbit_01.glb", scale: 0.7, idleAnimation: "Idle" },
  ],
  bird: [
    { id: "bird_01", label: "Pigeon", path: "/models/pets/bird_01.glb", scale: 0.6, idleAnimation: "Idle" },
  ],
  reptile: [],
  other: [
    { id: "chichen", label: "Chicken", path: "/models/pets/chichen.glb", scale: 0.55, idleAnimation: "Idle" },
  ],
};

export const PET_COLOR_PRESETS = [
  { id: "amber", label: "Amber", hex: "#d49256" },
  { id: "charcoal", label: "Charcoal", hex: "#5a4a3d" },
  { id: "cream", label: "Cream", hex: "#f0e3c4" },
  { id: "rust", label: "Rust", hex: "#b65a2c" },
  { id: "slate", label: "Slate", hex: "#7c8a93" },
  { id: "moss", label: "Moss", hex: "#7fb685" },
];

export function getModelForVariant(petType: string, modelVariant?: string | null): PetModelEntry | null {
  const list = PET_MODELS[petType] ?? [];
  if (!list.length) return null;
  if (modelVariant) {
    const hit = list.find((m) => m.id === modelVariant);
    if (hit) return hit;
  }
  return list[0];
}

export function listAllVariants(): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  for (const [type, list] of Object.entries(PET_MODELS)) {
    for (const m of list) out.push({ id: m.id, label: `${type} - ${m.label}` });
  }
  return out;
}

export const IDLE_CLIP_CANDIDATES = ["Idle", "idle", "iddle", "fly", "Sit", "Stand", "Idle_A", "Idle_1"];

export function pickIdleClipName(available: string[], preferred?: string): string | null {
  if (!available.length) return null;
  if (preferred && available.includes(preferred)) return preferred;
  for (const c of IDLE_CLIP_CANDIDATES) if (available.includes(c)) return c;
  return available[0];
}

export type { PetType };
