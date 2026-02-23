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

        {/* Nav + Actions */}
        <div className="flex items-center gap-1">
          <nav className="hidden sm:flex items-center gap-0.5">
            <NavLink href="/" label="首页" icon="home" active={pathname === "/"} />
            <NavLink href="/styles" label="风格" icon="palette" active={pathname.startsWith("/style")} />
          </nav>

          <div className="w-px h-5 bg-border-default mx-2 hidden sm:block" />

          <ThemeToggle />

          <Link
            href="/styles"
            className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[16px]">explore</span>
            探索风格
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
