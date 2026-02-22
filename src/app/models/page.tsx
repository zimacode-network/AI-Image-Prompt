import type { Metadata } from "next";
import Link from "next/link";
import { MODEL_LABELS, ModelCategory } from "@/lib/types";
import { prompts } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI 模型探索",
  description:
    "探索主流 AI 绘画模型，包括 Midjourney、Stable Diffusion、FLUX、Gemini、DALL-E 等，了解各模型特点与适用场景。",
};

function getModelPromptCount(model: ModelCategory): number {
  return prompts.filter((p) => p.category_model === model).length;
}

function getModelImage(model: ModelCategory): string {
  const p = prompts.find((p) => p.category_model === model);
  return p?.example_image_url || "";
}

export default function ModelsPage() {
  const models = Object.entries(MODEL_LABELS) as [ModelCategory, (typeof MODEL_LABELS)[ModelCategory]][];

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-20">
      {/* Page title */}
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-3">
          AI 模型<span className="text-primary">探索</span>
        </h1>
        <p className="text-sm text-text-secondary max-w-xl leading-relaxed">
          探索主流 AI 绘画模型，了解每个引擎的独特能力，找到最适合你创作需求的工具。
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar animate-fade-in-up stagger-1">
        <button className="shrink-0 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold">
          全部模型
        </button>
        <button className="shrink-0 px-5 py-2.5 rounded-xl border border-border-default bg-bg-card text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all">
          最新版本
        </button>
        <button className="shrink-0 px-5 py-2.5 rounded-xl border border-border-default bg-bg-card text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all">
          最受欢迎
        </button>
        <button className="shrink-0 px-5 py-2.5 rounded-xl border border-border-default bg-bg-card text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all">
          开源模型
        </button>
      </div>

      {/* Model cards — 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map(([key, val], i) => {
          const count = getModelPromptCount(key);
          const image = getModelImage(key);

          return (
            <div
              key={key}
              className={`group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-bg-card border border-border-default hover:shadow-lg hover:border-primary/15 transition-all duration-300 animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
            >
              {/* Thumbnail */}
              {image && (
                <div className="shrink-0 w-full sm:w-40 h-40 rounded-xl overflow-hidden bg-bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={val.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Text content */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-lg font-bold text-text-primary">{val.en}</h3>
                    <span
                      className="px-2 py-0.5 text-[10px] font-bold rounded-lg"
                      style={{
                        background: `${val.color}15`,
                        color: val.color,
                        border: `1px solid ${val.color}30`,
                      }}
                    >
                      {val.version}
                    </span>
                    {val.openSource && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-green-500/10 text-green-600 border border-green-500/20">
                        开源
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">
                    {val.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {val.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-bg-surface text-text-muted border border-border-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    {count} 条提示词
                  </span>
                  <Link
                    href={`/explore?model=${key}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors duration-200"
                  >
                    探索提示词
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
