"use client";

import { useEffect, useRef } from "react";

type DragState = {
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  active: boolean;
  pointerId: number | null;
};

type UsePointerDragOpts = {
  onMove: (next: { x: number; y: number }, delta: { dx: number; dy: number }) => void;
  onStart?: () => void;
  getCurrent: () => { x: number; y: number };
  enabled?: boolean;
};

export function usePointerDrag(
  handleRef: React.RefObject<HTMLElement | null>,
  opts: UsePointerDragOpts,
) {
  const stateRef = useRef<DragState>({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    active: false,
    pointerId: null,
  });

  useEffect(() => {
    const handle = handleRef.current;
    if (!handle || opts.enabled === false) return;

    const onPointerDown = (e: PointerEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "BUTTON" || tag === "INPUT" || tag === "A") return;
      const cur = opts.getCurrent();
      stateRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: cur.x,
        origY: cur.y,
        active: true,
        pointerId: e.pointerId,
      };
      handle.setPointerCapture(e.pointerId);
      opts.onStart?.();
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.active || s.pointerId !== e.pointerId) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      opts.onMove({ x: s.origX + dx, y: s.origY + dy }, { dx, dy });
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = stateRef.current;
      if (s.pointerId !== e.pointerId) return;
      s.active = false;
      s.pointerId = null;
      try {
        handle.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };

    handle.addEventListener("pointerdown", onPointerDown);
    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
    handle.addEventListener("pointercancel", onPointerUp);

    return () => {
      handle.removeEventListener("pointerdown", onPointerDown);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);
      handle.removeEventListener("pointercancel", onPointerUp);
    };
  }, [handleRef, opts]);
}
