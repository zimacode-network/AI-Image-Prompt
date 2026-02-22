"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { STYLE_LABELS, SCENE_LABELS, MODEL_LABELS } from "@/lib/types";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeStyle = searchParams.get("style") || "";
  const activeScene = searchParams.get("scene") || "";
  const activeModel = searchParams.get("model") || "";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/explore?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push("/explore", { scroll: false });
  }

  const hasFilters = activeStyle || activeScene || activeModel;

  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-bg-card/40 dark:bg-bg-card/60 p-6 sm:p-7 border border-border-default/50">
      {/* Model row */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted w-20 shrink-0">
          AI 模型
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={clearAll}
            className={`shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              !activeModel
                ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                : "bg-bg-card border border-border-default text-text-secondary hover:border-primary/30 hover:text-primary"
            }`}
          >
            全部模型
          </button>
          {Object.entries(MODEL_LABELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilter("model", key)}
              className={`shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeModel === key
                  ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                  : "bg-bg-card border border-border-default text-text-secondary hover:border-primary/30 hover:text-primary"
              }`}
            >
              {val.en}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      {/* Style row */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted w-20 shrink-0">
          风格
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("style");
              router.push(`/explore?${params.toString()}`, { scroll: false });
            }}
            className={`shrink-0 flex items-center px-5 py-2 rounded-full text-xs font-bold transition-all ${
              !activeStyle
                ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                : "bg-bg-card border border-border-default text-text-secondary hover:border-primary/30 hover:text-primary"
            }`}
          >
            全部风格
          </button>
          {Object.entries(STYLE_LABELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilter("style", key)}
              className={`shrink-0 flex items-center px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeStyle === key
                  ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                  : "bg-bg-card border border-border-default text-text-secondary hover:border-primary/30 hover:text-primary"
              }`}
            >
              {val.zh}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      {/* Scene row */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted w-20 shrink-0">
          场景
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("scene");
              router.push(`/explore?${params.toString()}`, { scroll: false });
            }}
            className={`shrink-0 flex items-center px-5 py-2 rounded-full text-xs font-bold transition-all ${
              !activeScene
                ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                : "bg-bg-card border border-border-default text-text-secondary hover:border-primary/30 hover:text-primary"
            }`}
          >
            全部场景
          </button>
          {Object.entries(SCENE_LABELS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilter("scene", key)}
              className={`shrink-0 flex items-center px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeScene === key
                  ? "bg-primary text-white shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                  : "bg-bg-card border border-border-default text-text-secondary hover:border-primary/30 hover:text-primary"
              }`}
            >
              {val.zh}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearAll}
            className="text-xs font-bold text-primary hover:text-primary-hover transition-colors"
          >
            清除全部筛选
          </button>
        </div>
      )}
    </div>
  );
}
