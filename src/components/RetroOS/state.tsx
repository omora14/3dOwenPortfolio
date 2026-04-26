"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export type WindowId =
  | "about"
  | "experience"
  | "projects"
  | "resume"
  | "terminal"
  | "contact"
  | "contactForm"
  | "my-computer"
  | "recycle";

export type WindowState = {
  id: WindowId;
  open: boolean;
  minimized: boolean;
  z: number;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
};

export type WallpaperVariant = "retro" | "teal" | "beach";

type Ctx = {
  windows: Record<WindowId, WindowState>;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, x: number, y: number) => void;
  topZ: number;
  // Boot
  booted: boolean;
  setBooted: (b: boolean) => void;
  // Wallpaper
  wallpaper: WallpaperVariant;
  setWallpaper: (w: WallpaperVariant) => void;
  cycleWallpaper: () => void;
  // Screensaver
  screensaverActive: boolean;
  setScreensaverActive: (a: boolean) => void;
  // BSOD
  bsodActive: boolean;
  triggerBSOD: () => void;
  dismissBSOD: () => void;
};

export const OSContext = createContext<Ctx | null>(null);

export const TITLES: Record<WindowId, string> = {
  about: "About Owen.txt — Notepad",
  experience: "Experience.exe",
  projects: "Projects",
  resume: "Resume.pdf — Acrobat Reader 3.0",
  terminal: "MS-DOS Prompt",
  contact: "Connect — Outlook Express",
  contactForm: "Compose Mail — Outlook Express",
  "my-computer": "My Computer",
  recycle: "Recycle Bin",
};

const DEFAULTS: Record<WindowId, Omit<WindowState, "id" | "open" | "minimized" | "z" | "title">> = {
  about: { x: 60, y: 60, width: 680, height: 520 },
  experience: { x: 110, y: 80, width: 760, height: 560 },
  projects: { x: 140, y: 60, width: 820, height: 580 },
  resume: { x: 90, y: 40, width: 920, height: 680 },
  terminal: { x: 200, y: 110, width: 640, height: 440 },
  contact: { x: 220, y: 140, width: 520, height: 420 },
  contactForm: { x: 180, y: 80, width: 560, height: 520 },
  "my-computer": { x: 70, y: 90, width: 600, height: 420 },
  recycle: { x: 250, y: 160, width: 380, height: 220 },
};

const WALLPAPER_CYCLE: WallpaperVariant[] = ["retro", "beach", "teal"];

const initialWindow = (id: WindowId, z: number): WindowState => ({
  id,
  open: false,
  minimized: false,
  z,
  title: TITLES[id],
  ...DEFAULTS[id],
});

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [topZ, setTopZ] = useState(10);
  const zRef = useRef(10);

  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => ({
    about: initialWindow("about", 1),
    experience: initialWindow("experience", 1),
    projects: initialWindow("projects", 1),
    resume: initialWindow("resume", 1),
    terminal: initialWindow("terminal", 1),
    contact: initialWindow("contact", 1),
    contactForm: initialWindow("contactForm", 1),
    "my-computer": initialWindow("my-computer", 1),
    recycle: initialWindow("recycle", 1),
  }));

  const bumpZ = useCallback(() => {
    zRef.current += 1;
    setTopZ(zRef.current);
    return zRef.current;
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    const newZ = (zRef.current += 1);
    setTopZ(newZ);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: true, minimized: false, z: newZ },
    }));
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false },
    }));
  }, []);

  const toggleMinimize = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: !prev[id].minimized },
    }));
  }, []);

  const focusWindow = useCallback(
    (id: WindowId) => {
      const newZ = bumpZ();
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], z: newZ, minimized: false },
      }));
    },
    [bumpZ],
  );

  const moveWindow = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y },
    }));
  }, []);

  const [booted, setBooted] = useState(false);
  const [wallpaper, setWallpaper] = useState<WallpaperVariant>("retro");
  const cycleWallpaper = useCallback(() => {
    setWallpaper((w) => {
      const i = WALLPAPER_CYCLE.indexOf(w);
      const next = WALLPAPER_CYCLE[(i + 1) % WALLPAPER_CYCLE.length];
      return next;
    });
  }, []);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [bsodActive, setBsodActive] = useState(false);
  const triggerBSOD = useCallback(() => setBsodActive(true), []);
  const dismissBSOD = useCallback(() => {
    setBsodActive(false);
    setBooted(false);
    setTimeout(() => setBooted(true), 50);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      windows,
      openWindow,
      closeWindow,
      toggleMinimize,
      focusWindow,
      moveWindow,
      topZ,
      booted,
      setBooted,
      wallpaper,
      setWallpaper,
      cycleWallpaper,
      screensaverActive,
      setScreensaverActive,
      bsodActive,
      triggerBSOD,
      dismissBSOD,
    }),
    [
      windows,
      openWindow,
      closeWindow,
      toggleMinimize,
      focusWindow,
      moveWindow,
      topZ,
      booted,
      wallpaper,
      cycleWallpaper,
      screensaverActive,
      bsodActive,
      triggerBSOD,
      dismissBSOD,
    ],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used within OSProvider");
  return ctx;
}
