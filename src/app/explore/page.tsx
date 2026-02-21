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
    <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-16">
      {/* Page header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
          探索提示词
        </h1>
        <p className="text-text-secondary text-sm">
          {hasFilters
            ? `找到 ${filtered.length} 条匹配的提示词`
            : `共 ${allPrompts.length} 条精选提示词`}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-5 rounded-xl border border-border-subtle bg-bg-card animate-fade-in-up stagger-1">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="masonry-grid">
          {filtered.map((prompt, i) => (
            <div key={prompt.id} className="masonry-item">
              <PromptCard prompt={prompt} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-text-secondary font-display">没有找到匹配的提示词</p>
          <p className="text-text-muted text-sm mt-2">试试调整筛选条件</p>
        </div>
      )}
    </div>
  );
}
