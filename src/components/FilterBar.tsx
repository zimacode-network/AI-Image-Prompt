"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StyleCategory } from "@/lib/types";
import { CATEGORY_TEXT, getLocaleFromPathname, localizePath, UI_TEXT } from "@/lib/i18n";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = getLocaleFromPathname(usePathname());
  const t = UI_TEXT[locale];

  const activeCategory = searchParams.get("category") || "";

  function setFilter(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("category") === value) {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    const qs = params.toString();
    router.push(qs ? `${localizePath("/styles", locale)}?${qs}` : localizePath("/styles", locale), { scroll: false });
  }

  function clearAll() {
    router.push(localizePath("/styles", locale), { scroll: false });
  }

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
      <button
        onClick={clearAll}
        className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
          !activeCategory
            ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
            : "border border-border-default bg-bg-card text-text-secondary hover:border-primary/30 hover:text-primary"
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">grid_view</span>
        {t.allStyles}
      </button>
      {(Object.entries(CATEGORY_TEXT) as [StyleCategory, typeof CATEGORY_TEXT[StyleCategory]][]).map(
        ([key, val]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeCategory === key
                ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                : "border border-border-default bg-bg-card text-text-secondary hover:border-primary/30 hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{val.icon}</span>
            {locale === "zh" ? val.zh : val.en}
          </button>
        )
      )}
    </div>
  );
}
