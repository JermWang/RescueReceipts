"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function PetPlatform({
  position = [0, 0, 0],
  featured = false,
  hovered = false,
  selected = false,
}: {
  position?: [number, number, number];
  featured?: boolean;
  hovered?: boolean;
  selected?: boolean;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const targetY = (hovered || selected) ? 0.05 : 0;
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, Math.min(1, dt * 8));
  });
  const top = featured ? "#8fc294" : "#7fb685";
  const side = featured ? "#5e8f63" : "#4f8a5b";
  return (
    <group position={position} ref={ref}>
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.1, 28]} />
        <meshStandardMaterial color={top} roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.85, 0.78, 0.18, 28]} />
        <meshStandardMaterial color={side} roughness={1} />
      </mesh>
      {featured && (
        <mesh position={[0, -0.04, 0.9]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.88, 0.95, 28]} />
          <meshBasicMaterial color="#f97a3d" transparent opacity={0.55} />
        </mesh>
      )}
    </group>
  );
}
