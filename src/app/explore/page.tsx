import { Suspense } from "react";
import type { Metadata } from "next";
import FilterBar from "@/components/FilterBar";
import PromptCard from "@/components/PromptCard";
import { getPromptsByFilter, prompts as allPrompts } from "@/lib/data";

export const metadata: Metadata = {
  title: "探索提示词",
  description:
    "浏览精选 AI 绘画提示词库，按风格、场景、模型分类筛选。支持 Midjourney、Stable Diffusion、FLUX、Gemini、DALL-E 等。",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string; scene?: string; model?: string }>;
}) {
  const params = await searchParams;
  const hasFilters = params.style || params.scene || params.model;
  const filtered = hasFilters
    ? getPromptsByFilter({
        style: params.style,
        scene: params.scene,
        model: params.model,
      })
    : allPrompts;

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-20">
      {/* Filters */}
      <div className="mb-10 animate-fade-in-up">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      {/* Discovery Feed title + sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            发现
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {hasFilters
              ? `找到 ${filtered.length} 条匹配的提示词`
              : `共 ${allPrompts.length} 条精选提示词`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-full bg-bg-surface p-1">
            <button className="rounded-full bg-bg-card px-4 py-1.5 text-xs font-bold text-text-primary shadow-sm">
              最新
            </button>
            <button className="rounded-full px-4 py-1.5 text-xs font-bold text-text-muted hover:text-text-primary transition-colors">
              热门
            </button>
            <button className="rounded-full px-4 py-1.5 text-xs font-bold text-text-muted hover:text-text-primary transition-colors">
              趋势
            </button>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-default bg-bg-card text-text-muted hover:border-primary/20 hover:text-primary transition-all">
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>

      {/* Results — 4-col grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-5xl text-text-muted/30 mb-4 block">search_off</span>
          <p className="text-lg font-bold text-text-secondary">没有找到匹配的提示词</p>
          <p className="text-sm text-text-muted mt-2">试试调整筛选条件</p>
        </div>
      )}
    </div>
  );
}
