"use client";

import React, { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import styled from "styled-components";
import Computer, { type ScreenInfo } from "./Computer";
import ScreenOverlay from "./ScreenOverlay";
import CameraRig from "./CameraRig";
import { useTranslations } from "@/i18n/LocaleProvider";

const FOV = 32;
const START: [number, number, number] = [0, 1.2, 5.2];

type SceneProps = {
  onProgressChange?: (progress: number) => void;
  onReadyChange?: (ready: boolean) => void;
};

const MoveCoach = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: #f2f6ff;
  text-align: center;
  animation: moveCoachFade 380ms ease-out 6.62s forwards;

  @keyframes moveCoachFade {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

const SwipeLane = styled.div`
  margin: 10px auto 8px;
  width: min(210px, 62vw);
  height: 38px;
  border-radius: 999px;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
`;

const MoveCoachCard = styled.div`
  width: min(500px, calc(100vw - 28px));
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 10px;
  background: rgba(8, 14, 24, 0.55);
  padding: 14px 16px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.42);
`;

const SwipeDot = styled.div`
  position: absolute;
  top: 5px;
  left: 7px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff 0 25%, #ffd8c4 55%, #eeaf8a 100%);
  border: 1px solid rgba(0, 0, 0, 0.25);
  animation: swipeMove 1.05s ease-in-out infinite;

  @keyframes swipeMove {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(calc(min(210px, 62vw) - 42px));
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default function Scene({ onProgressChange, onReadyChange }: SceneProps) {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo | null>(null);
  const [glError, setGlError] = useState<string | null>(null);
  const [showDebugBox, setShowDebugBox] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showMoveCoach, setShowMoveCoach] = useState(true);
  const { active, progress } = useProgress();
  const orbitRef = useRef<OrbitControlsImpl | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const t = useTranslations();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    setShowDebugBox(p.has("calibrate"));
  }, []);

  useEffect(() => {
    onProgressChange?.(Math.max(0, Math.min(100, progress)));
  }, [progress, onProgressChange]);

  useEffect(() => {
    // Consider scene "ready" once assets are loaded and we have calibrated
    // screen information from the model.
    const ready = !active && progress >= 100 && !!screenInfo;
    onReadyChange?.(ready);
  }, [active, progress, screenInfo, onReadyChange]);

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
      canvasRef.current = canvas;
      const onLost = (e: Event) => {
        e.preventDefault();
        console.warn("[Scene] WebGL context lost, will attempt restore.");
      };
      canvas.addEventListener("webglcontextlost", onLost as EventListener, false);
    },
    [],
  );

  useEffect(() => {
    if (active || progress < 100) return;
    const timer = window.setTimeout(() => setShowMoveCoach(false), 7000);
    return () => window.clearTimeout(timer);
  }, [active, progress]);

  useEffect(() => {
    if (!isTouchDevice) return;
    const canvas = canvasRef.current;
    const controls = orbitRef.current;
    if (!canvas || !controls) return;

    // Mobile interaction contract:
    // - 1 finger: rotate model (lock canvas touch-action to prevent page pan).
    // - 2 fingers: disable orbit and allow native page scroll/pinch.
    canvas.style.touchAction = "none";

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        controls.enabled = false;
        canvas.style.touchAction = "pan-y pinch-zoom";
      } else {
        controls.enabled = true;
        canvas.style.touchAction = "none";
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        controls.enabled = false;
        canvas.style.touchAction = "pan-y pinch-zoom";
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length <= 1) {
        controls.enabled = true;
        canvas.style.touchAction = "none";
      }
    };

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });
    canvas.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
      canvas.style.touchAction = "";
    };
  }, [isTouchDevice]);

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
        position: "relative",
        touchAction: isTouchDevice ? "none" : "pan-y",
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
          enabled
          enableRotate
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
      {showMoveCoach && !active && progress >= 100 && (
        <MoveCoach>
          <MoveCoachCard>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{t("os.coach.title")}</div>
            <div style={{ fontSize: 13, opacity: 0.95 }}>{t("os.coach.subtitle")}</div>
            <SwipeLane>
              <SwipeDot />
            </SwipeLane>
            <div style={{ fontSize: 11, opacity: 0.9, marginBottom: 8 }}>
              {t("os.coach.resetHint")}
            </div>
            <button
              type="button"
              onClick={() => {
                window.__resetCameraView?.();
                setShowMoveCoach(false);
              }}
              style={{
                fontSize: 11,
                fontWeight: 700,
                borderRadius: 5,
                border: "1px solid #fff",
                background: "#d8eeff",
                color: "#0e2e4c",
                padding: "3px 9px",
                cursor: "pointer",
              }}
            >
              {t("resetView.button")}
            </button>
          </MoveCoachCard>
        </MoveCoach>
      )}
    </div>
  );
}
