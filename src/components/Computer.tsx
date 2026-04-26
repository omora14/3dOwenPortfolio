"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export type ScreenInfo = {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  width: number;
  height: number;
  normalAxis: "x" | "y" | "z";
  flip: boolean;
};

type ComputerProps = {
  onScreenReady?: (info: ScreenInfo) => void;
  cameraStart?: [number, number, number];
  showDebugBox?: boolean;
};

// Manually calibrated screen-glass placement in world coordinates. The two
// GLB meshes named Comp_Screen000/002 have ambiguous bounding boxes (one's a
// thin slab elsewhere on the chassis, the other is the entire CRT body), so
// we hardcode a tuned target instead of guessing.
const SCREEN_POSITION: [number, number, number] = [-0.12, 0.26, 0.41];
const SCREEN_WIDTH = 0.66;
const SCREEN_HEIGHT = 0.42;
const SCREEN_QUAT: [number, number, number, number] = [0, 0, 0, 1];

export default function Computer({
  onScreenReady,
  showDebugBox = false,
}: ComputerProps) {
  const { nodes, materials } = useGLTF("/computer.glb") as unknown as {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  };

  const reportedRef = useRef(false);

  useEffect(() => {
    if (reportedRef.current) return;
    reportedRef.current = true;
    if (typeof window !== "undefined") {
      console.info("[Computer] hardcoded screen", {
        position: SCREEN_POSITION,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      });
    }
    onScreenReady?.({
      position: SCREEN_POSITION,
      quaternion: SCREEN_QUAT,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      normalAxis: "z",
      flip: false,
    });
  }, [onScreenReady]);

  return (
    <>
      {showDebugBox && (
        <mesh position={SCREEN_POSITION}>
          <boxGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT, 0.01]} />
          <meshBasicMaterial color="lime" wireframe />
        </mesh>
      )}
      <group dispose={null} position={[0, -0.4, 0]}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.004}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group
              position={[0, -5.373, -41.867]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={120.572}
            >
              <mesh
                geometry={nodes.Plane_ShadowMaterial_0.geometry}
                material={materials.ShadowMaterial}
                receiveShadow
              />
              <mesh
                geometry={nodes.Plane_BackgroundMaterial_0.geometry}
                material={materials.BackgroundMaterial}
                receiveShadow
              />
            </group>
            <mesh
              name="Comp_Screen000"
              geometry={nodes.Comp_Screen000_TerminalMaterial_0.geometry}
              material={materials.TerminalMaterial}
              position={[18.161, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={212.25}
              castShadow
              receiveShadow
            />
            <mesh
              name="Comp_Screen002"
              geometry={nodes.Comp_Screen002_TerminalMaterial_0.geometry}
              material={materials.TerminalMaterial}
              position={[18.161, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={212.25}
              castShadow
              receiveShadow
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/computer.glb");
