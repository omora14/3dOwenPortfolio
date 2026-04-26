"use client";

import React, { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Computer, { type ScreenInfo } from "./Computer";
import ScreenOverlay from "./ScreenOverlay";
import CameraRig from "./CameraRig";

const FOV = 32;
const START: [number, number, number] = [0, 1.2, 5.2];

export default function Scene() {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo | null>(null);
  const [glError, setGlError] = useState<string | null>(null);
  const [showDebugBox, setShowDebugBox] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const orbitRef = useRef<OrbitControlsImpl | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    setShowDebugBox(p.has("calibrate"));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () => setIsTouchDevice(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Cross-fade canvas out from 0.9 -> 1.0 scroll progress so the FullscreenOS
  // DOM mount can take over. We watch the global progress that CameraRig writes
  // and only update opacity (no React re-render in onScroll path).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const p = window.__scrollProgress ?? 0;
      const fade = p < 0.9 ? 1 : Math.max(0, 1 - (p - 0.9) / 0.1);
      el.style.opacity = String(fade);
      el.style.pointerEvents = fade < 0.05 ? "none" : "";
      el.style.visibility = fade <= 0.001 ? "hidden" : "visible";
    };
    update();
    let raf = 0;
    const loop = () => {
      update();
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const probe = document.createElement("canvas");
      const ctx =
        probe.getContext("webgl2") ||
        probe.getContext("webgl") ||
        probe.getContext("experimental-webgl");
      if (!ctx) {
        setGlError(
          "Your browser couldn't create a WebGL context. Try enabling hardware acceleration or another browser.",
        );
      }
    } catch (e) {
      setGlError("WebGL is unavailable in this browser.");
    }
  }, []);

  const handleCreated = useCallback(
    (state: { gl: { domElement: HTMLCanvasElement } }) => {
      const canvas = state.gl.domElement;
      const onLost = (e: Event) => {
        e.preventDefault();
        console.warn("[Scene] WebGL context lost, will attempt restore.");
      };
      canvas.addEventListener("webglcontextlost", onLost as EventListener, false);
    },
    [],
  );

  if (glError) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#cdd2da",
          fontFamily: "ms_sans_serif, system-ui, sans-serif",
          fontSize: 13,
          textAlign: "center",
          padding: 24,
          background: "#070708",
        }}
      >
        {glError}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        touchAction: "pan-y",
        transition: "opacity 120ms linear",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
          stencil: false,
        }}
        camera={{ position: START, fov: FOV, near: 0.01, far: 50 }}
        onCreated={handleCreated}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#070708"]} />
        <fog attach="fog" args={["#070708", 6, 16]} />

        <ambientLight intensity={0.18} color="#9aa6c2" />

        <spotLight
          position={[3.5, 5.5, 3.5]}
          angle={0.32}
          penumbra={1}
          intensity={140}
          color="#ffd2a6"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />

        <pointLight position={[-3, 2, -2]} intensity={6} color="#5b8cff" />

        <pointLight position={[0, -1.2, 1.2]} intensity={2.4} color="#ff8855" />

        <Suspense fallback={null}>
          <Computer
            onScreenReady={setScreenInfo}
            cameraStart={START}
            showDebugBox={showDebugBox}
          />
          {screenInfo && <ScreenOverlay info={screenInfo} cameraStart={START} />}
          <ContactShadows
            position={[0, -0.42, 0]}
            opacity={0.6}
            blur={2.6}
            far={3}
            scale={6}
            color="#000000"
          />
          <Environment preset="warehouse" />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.82}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.18} darkness={0.85} />
        </EffectComposer>

        <OrbitControls
          ref={orbitRef}
          enabled={!isTouchDevice}
          enableRotate={!isTouchDevice}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 2 - 0.4}
          maxPolarAngle={Math.PI / 2 + 0.4}
          minAzimuthAngle={-0.6}
          maxAzimuthAngle={0.6}
        />

        <CameraRig start={START} screenInfo={screenInfo} orbitRef={orbitRef} />
      </Canvas>
    </div>
  );
}
