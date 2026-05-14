"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { getLocaleFromPathname, localizePath, stripLocale, UI_TEXT } from "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const locale = getLocaleFromPathname(pathname);
  const t = UI_TEXT[locale];
  const pathWithoutLocale = stripLocale(pathname);
  const nextLocale = locale === "zh" ? "en" : "zh";
  const languagePath = localizePath(pathWithoutLocale, nextLocale);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${localizePath("/styles", locale)}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50 border-b border-border-default">
      <div className="site-shell h-16 flex items-center gap-6">
        {/* Logo */}
        <Link href={localizePath("/", locale)} className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">flare</span>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-text-primary">
            Prompt<span className="text-primary">Studio</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-5">
          <Link
            href={localizePath("/styles", locale)}
            className={`text-[13px] font-semibold transition-colors duration-200 ${
              pathWithoutLocale === "/" || pathWithoutLocale.startsWith("/style")
                ? "text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {t.inspiration}
          </Link>
          <Link
            href={localizePath("/styles", locale)}
            className={`text-[13px] font-semibold transition-colors duration-200 ${
              pathWithoutLocale.startsWith("/prompt")
                ? "text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {t.resources}
          </Link>
        </nav>

        {/* Search — fills the middle space */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 ml-auto">
          <div className="relative w-full max-w-md ml-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full h-9 pl-4 pr-10 rounded-full border border-border-default bg-transparent text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/40 transition-colors"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">search</span>
            </button>
          </div>
        </form>

        {/* CTA + Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={localizePath("/styles", locale)}
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-primary text-white text-[13px] font-bold hover:bg-primary-hover transition-colors duration-200"
          >
            {t.browseAll}
          </Link>
          <Link
            href={languagePath}
            onClick={(event) => {
              event.preventDefault();
              router.push(`${languagePath}${window.location.search}`);
            }}
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
            aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
          >
            <span className="material-symbols-outlined text-[16px]">translate</span>
            {locale === "zh" ? "EN" : "中文"}
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <button className="sm:hidden shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border border-border-default text-text-muted">
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
      </div>
    </header>
  );
}
