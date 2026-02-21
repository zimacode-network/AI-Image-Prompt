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
    <div className="max-w-[1200px] mx-auto px-8 pt-10 pb-20">
      {/* Page header */}
      <div className="mb-10 animate-fade-in-up">
        <div className="section-label mb-2">Explore</div>
        <h1 className="font-display text-[26px] md:text-[30px] font-bold tracking-tight mb-2">
          探索提示词
        </h1>
        <p className="text-text-secondary text-[13.5px] tracking-wide">
          {hasFilters
            ? `找到 ${filtered.length} 条匹配的提示词`
            : `共 ${allPrompts.length} 条精选提示词`}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 p-6 rounded-2xl border border-border-subtle bg-bg-card/50 animate-fade-in-up stagger-1">
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
        <div className="text-center py-24">
          <div className="text-3xl mb-5 opacity-40">&#x2715;</div>
          <p className="text-text-secondary font-display text-lg">没有找到匹配的提示词</p>
          <p className="text-text-muted text-[13px] mt-2 tracking-wide">试试调整筛选条件</p>
        </div>
      )}
    </div>
  );
}
