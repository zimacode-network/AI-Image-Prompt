"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50 border-b border-border-default">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">flare</span>
          </div>
          <span className="font-semibold text-[17px] tracking-tight text-text-primary">
            Prompt<span className="text-primary">Studio</span>
          </span>
        </Link>

        {/* Search (hidden on mobile) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">search</span>
            <input
              type="text"
              placeholder="搜索提示词..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border-default bg-bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        {/* Nav + Actions */}
        <div className="flex items-center gap-1">
          <nav className="hidden sm:flex items-center gap-0.5">
            <NavLink href="/" label="首页" icon="home" active={pathname === "/"} />
            <NavLink href="/explore" label="探索" icon="explore" active={pathname.startsWith("/explore")} />
            <NavLink href="/models" label="模型" icon="smart_toy" active={pathname.startsWith("/models")} />
          </nav>

          <div className="w-px h-5 bg-border-default mx-2 hidden sm:block" />

          <ThemeToggle />

          <Link
            href="/explore"
            className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            投稿
          </Link>

          {/* Mobile menu button */}
          <button className="sm:hidden ml-2 w-9 h-9 rounded-xl flex items-center justify-center border border-border-default text-text-muted">
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        active
          ? "text-primary bg-primary/8"
          : "text-text-secondary hover:text-text-primary hover:bg-bg-surface"
      }`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {label}
    </Link>
  );
}
