"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { ScreenInfo } from "./Computer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

declare global {
  interface Window {
    __camZ?: number;
    __scrollProgress?: number;
    __resetCameraView?: () => void;
  }
}

type Props = {
  start?: [number, number, number];
  screenInfo: ScreenInfo | null;
  orbitRef?: React.MutableRefObject<OrbitControlsImpl | null>;
};

export default function CameraRig({
  start = [0, 1.2, 5.2],
  screenInfo,
  orbitRef,
}: Props) {
  const { camera, invalidate } = useThree();
  const targetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const endRef = useRef<THREE.Vector3>(
    new THREE.Vector3(start[0], start[1], start[2] - 4),
  );
  const stRef = useRef<ScrollTrigger | null>(null);
  const draggingRef = useRef(false);
  const handedOffRef = useRef(false);
  const startRef = useRef<[number, number, number]>(start);

  useGSAP(
    () => {
      startRef.current = start;
      camera.position.set(start[0], start[1], start[2]);
      camera.lookAt(targetRef.current);
      if (typeof window !== "undefined") {
        window.__camZ = camera.position.z;
        window.__scrollProgress = 0;
      }
      invalidate();

      const reduced =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        camera.position.copy(endRef.current);
        camera.lookAt(targetRef.current);
        if (typeof window !== "undefined") {
          window.__camZ = camera.position.z;
          window.__scrollProgress = 1;
        }
        invalidate();
        return;
      }

      const st = ScrollTrigger.create({
        trigger: "#scroll-spacer",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Once the user begins scrolling for real, snap orbit off so the
          // scroll-driven rig owns the camera. We also tween the camera back
          // to the canonical start before the scrub takes over.
          if (
            !handedOffRef.current &&
            p > 0.02 &&
            orbitRef?.current?.enabled
          ) {
            handedOffRef.current = true;
            const ctrl = orbitRef.current;
            ctrl.enabled = false;
            const sx = startRef.current[0];
            const sy = startRef.current[1];
            const sz = startRef.current[2];
            gsap.to(camera.position, {
              x: sx,
              y: sy,
              z: sz,
              duration: 0.4,
              ease: "power2.out",
              onUpdate: () => {
                camera.lookAt(targetRef.current);
                invalidate();
              },
            });
          }

          if (draggingRef.current) {
            // User is mid-drag: don't fight their input.
            if (typeof window !== "undefined") {
              window.__camZ = camera.position.z;
              window.__scrollProgress = p;
            }
            return;
          }

          camera.position.set(
            THREE.MathUtils.lerp(start[0], endRef.current.x, p),
            THREE.MathUtils.lerp(start[1], endRef.current.y, p),
            THREE.MathUtils.lerp(start[2], endRef.current.z, p),
          );
          camera.lookAt(targetRef.current);
          if (typeof window !== "undefined") {
            window.__camZ = camera.position.z;
            window.__scrollProgress = p;
          }
          invalidate();
        },
      });
      stRef.current = st;

      if (typeof window !== "undefined") {
        window.__resetCameraView = () => {
          handedOffRef.current = false;
          if (orbitRef?.current) {
            orbitRef.current.enabled = true;
            orbitRef.current.target.set(0, 0, 0);
          }
          gsap.to(camera.position, {
            x: startRef.current[0],
            y: startRef.current[1],
            z: startRef.current[2],
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
              camera.lookAt(targetRef.current);
              invalidate();
            },
            onComplete: () => {
              orbitRef?.current?.update?.();
            },
          });
        };
      }
    },
    { dependencies: [] },
  );

  useEffect(() => {
    if (!orbitRef?.current) return;
    const ctrl = orbitRef.current;
    const onStart = () => {
      draggingRef.current = true;
    };
    const onEnd = () => {
      draggingRef.current = false;
    };
    ctrl.addEventListener("start", onStart);
    ctrl.addEventListener("end", onEnd);
    return () => {
      ctrl.removeEventListener("start", onStart);
      ctrl.removeEventListener("end", onEnd);
    };
  }, [orbitRef]);

  useEffect(() => {
    if (!screenInfo) return;
    targetRef.current.set(
      screenInfo.position[0],
      screenInfo.position[1],
      screenInfo.position[2],
    );
    const fov = (camera as THREE.PerspectiveCamera).fov ?? 32;
    const fovRad = (fov * Math.PI) / 180;
    // Push slightly closer than exact-fit so the bezel/chassis exits the
    // viewport just before the 95% handoff to the DOM FullscreenOS.
    const dist = (screenInfo.width / 2) / Math.tan(fovRad / 2) * 1.0;
    endRef.current.set(
      screenInfo.position[0],
      screenInfo.position[1],
      screenInfo.position[2] + dist,
    );
    if (stRef.current) {
      const p = stRef.current.progress;
      camera.position.set(
        THREE.MathUtils.lerp(start[0], endRef.current.x, p),
        THREE.MathUtils.lerp(start[1], endRef.current.y, p),
        THREE.MathUtils.lerp(start[2], endRef.current.z, p),
      );
      camera.lookAt(targetRef.current);
    } else {
      camera.lookAt(targetRef.current);
    }
    ScrollTrigger.refresh();
    invalidate();
  }, [screenInfo, camera, invalidate, start]);

  return null;
}
