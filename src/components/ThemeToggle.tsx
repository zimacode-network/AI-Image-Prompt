"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-xl flex items-center justify-center border border-border-default text-text-muted">
        <span className="material-symbols-outlined text-[20px]">light_mode</span>
      </button>
    );
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
