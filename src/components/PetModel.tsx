"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { getModelForVariant, pickIdleClipName } from "@/lib/petModelConfig";
import { ModelErrorBoundary } from "./ModelErrorBoundary";

type Props = {
  petType: string;
  modelVariant?: string | null;
  modelColor?: string | null;
  hovered?: boolean;
  selected?: boolean;
};

export function PetModel({ petType, modelVariant, modelColor, hovered, selected }: Props) {
  const entry = getModelForVariant(petType, modelVariant);
  const fallback = <ProceduralPet petType={petType} color={modelColor ?? undefined} hovered={hovered} />;
  if (!entry) return fallback;
  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <GLBPet
          path={entry.path}
          scale={entry.scale}
          preferredClip={entry.idleAnimation}
          hovered={hovered}
          selected={selected}
          color={modelColor ?? undefined}
        />
      </Suspense>
    </ModelErrorBoundary>
  );
}

function GLBPet({
  path, scale, preferredClip, hovered, selected, color,
}: {
  path: string; scale: number; preferredClip: string; hovered?: boolean; selected?: boolean; color?: string;
}) {
  const group = useRef<THREE.Group>(null!);
  const gltf = useGLTF(path) as any;
  const cloned = useMemo(() => (gltf?.scene ? gltf.scene.clone(true) : null), [gltf]);
  const { actions, names } = useAnimations(gltf?.animations ?? [], group);

  useEffect(() => {
    if (!actions || !names?.length) return;
    const pick = pickIdleClipName(names, preferredClip);
    if (pick && actions[pick]) {
      actions[pick].reset().fadeIn(0.4).play();
      return () => { actions[pick]?.fadeOut(0.3); };
    }
  }, [actions, names, preferredClip]);

  useEffect(() => {
    if (!cloned || !color) return;
    cloned.traverse((obj: any) => {
      if (obj.isMesh && obj.material?.color) {
        obj.material = obj.material.clone();
        obj.material.color.set(color);
      }
    });
  }, [cloned, color]);

  useFrame((_, dt) => {
    if (!group.current) return;
    const target = (hovered || selected) ? scale * 1.08 : scale;
    group.current.scale.lerp(new THREE.Vector3(target, target, target), Math.min(1, dt * 6));
    if (!gltf?.animations?.length) group.current.rotation.y += dt * 0.35;
  });

  if (!cloned) return null;
  return (
    <group ref={group} scale={scale}>
      <primitive object={cloned} />
    </group>
  );
}

function ProceduralPet({ petType, color, hovered }: { petType: string; color?: string; hovered?: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const baseColor = color ?? defaultColor(petType);
  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.5;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 1.6) * 0.04 + 0.05;
    const target = hovered ? 1.08 : 1;
    group.current.scale.lerp(new THREE.Vector3(target, target, target), Math.min(1, dt * 6));
  });
  return (
    <group ref={group}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.32, 24, 18]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.78, 0.05]}>
        <sphereGeometry args={[0.22, 20, 16]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[-0.13, 0.98, 0.04]} rotation={[0, 0, -0.2]}>
        <coneGeometry args={[0.06, 0.18, 8]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
      <mesh castShadow position={[0.13, 0.98, 0.04]} rotation={[0, 0, 0.2]}>
        <coneGeometry args={[0.06, 0.18, 8]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
      <mesh position={[0, 0.76, 0.26]}>
        <sphereGeometry args={[0.03, 12, 10]} />
        <meshStandardMaterial color="#1a1410" />
      </mesh>
      <mesh position={[-0.07, 0.83, 0.22]}>
        <sphereGeometry args={[0.025, 12, 10]} />
        <meshStandardMaterial color="#1a1410" />
      </mesh>
      <mesh position={[0.07, 0.83, 0.22]}>
        <sphereGeometry args={[0.025, 12, 10]} />
        <meshStandardMaterial color="#1a1410" />
      </mesh>
      <mesh castShadow position={[0, 0.4, -0.32]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
        <meshStandardMaterial color={baseColor} />
      </mesh>
    </group>
  );
}

function defaultColor(petType: string): string {
  switch (petType) {
    case "cat": return "#5a4a3d";
    case "rabbit": return "#e9d8b8";
    case "bird": return "#f97a3d";
    case "reptile": return "#7fb685";
    default: return "#d49256";
  }
}
