"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeThemeChange(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("promptstudio-theme-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("promptstudio-theme-change", onStoreChange);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeThemeChange, getThemeSnapshot, () => "light");
  const dark = theme === "dark";

  function toggle() {
    const next = !dark;
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("promptstudio-theme-change"));
  }

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-xl flex items-center justify-center border border-border-default text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
      aria-label={dark ? "切换为浅色模式" : "切换为深色模式"}
    >
      <span className="material-symbols-outlined text-[20px]">
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
