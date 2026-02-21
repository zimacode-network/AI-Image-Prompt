import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPromptById, getRelatedPrompts, prompts } from "@/lib/data";
import { STYLE_LABELS, SCENE_LABELS, MODEL_LABELS } from "@/lib/types";
import CopyButton from "@/components/CopyButton";
import PromptCard from "@/components/PromptCard";

export async function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) return { title: "未找到" };

  return {
    title: `${prompt.title_zh} — AI 绘画提示词`,
    description: `${prompt.title_en}。${prompt.prompt_zh.slice(0, 120)}`,
    openGraph: {
      title: prompt.title_zh,
      description: prompt.title_en,
      images: [prompt.example_image_url],
    },
  };
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = getPromptById(id);
  if (!prompt) notFound();

  const style = STYLE_LABELS[prompt.category_style];
  const scene = SCENE_LABELS[prompt.category_scene];
  const model = MODEL_LABELS[prompt.category_model];
  const related = getRelatedPrompts(prompt);

  return (
    <div className="max-w-[1200px] mx-auto px-8 pt-8 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-text-muted mb-8 animate-fade-in tracking-wide">
        <Link href="/" className="hover:text-accent-gold transition-colors duration-200">首页</Link>
        <span className="text-text-dim">/</span>
        <Link href="/explore" className="hover:text-accent-gold transition-colors duration-200">探索</Link>
        <span className="text-text-dim">/</span>
        <Link
          href={`/explore?style=${prompt.category_style}`}
          className="hover:text-accent-gold transition-colors duration-200"
        >
          {style.zh}
        </Link>
        <span className="text-text-dim">/</span>
        <span className="text-text-secondary truncate max-w-[180px]">{prompt.title_zh}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Image column */}
        <div className="lg:col-span-5 animate-fade-in-up">
          <div className="rounded-2xl overflow-hidden bg-bg-card sticky top-20" style={{ boxShadow: 'var(--shadow-elevated)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={prompt.example_image_url}
              alt={prompt.title_zh}
              className="w-full block"
            />
          </div>
        </div>

        {/* Content column */}
        <div className="lg:col-span-7 animate-fade-in-up stagger-2">
          {/* Title */}
          <h1 className="font-display text-[26px] md:text-[32px] font-bold tracking-tight leading-[1.15] mb-2">
            {prompt.title_zh}
          </h1>
          <p className="text-text-secondary text-[13.5px] tracking-wide mb-8">{prompt.title_en}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            <span
              className="px-3.5 py-1.5 text-[11px] font-semibold tracking-wide rounded-lg"
              style={{
                background: `${model.color}15`,
                color: model.color,
                border: `1px solid ${model.color}30`,
              }}
            >
              {model.en}
            </span>
            <Link
              href={`/explore?style=${prompt.category_style}`}
              className="tag-chip"
            >
              {style.icon} {style.zh}
            </Link>
            <Link
              href={`/explore?scene=${prompt.category_scene}`}
              className="tag-chip"
            >
              {scene.icon} {scene.zh}
            </Link>
          </div>

          {/* English prompt */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">English Prompt</span>
              <CopyButton text={prompt.prompt_text} label="复制英文" />
            </div>
            <div className="prompt-code">{prompt.prompt_text}</div>
          </div>

          {/* Chinese translation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">中文描述</span>
              <CopyButton text={prompt.prompt_zh} label="复制中文" />
            </div>
            <div className="prompt-code">{prompt.prompt_zh}</div>
          </div>

          {/* Parameters */}
          {Object.keys(prompt.parameters).length > 0 && (
            <div className="mb-8">
              <span className="section-label block mb-4">参数配置</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.entries(prompt.parameters).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle"
                  >
                    <span className="text-[11px] text-text-muted font-mono tracking-wide">{key}</span>
                    <span className="text-[12px] text-text-primary font-mono font-medium">
                      {String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-8">
            <span className="section-label block mb-4">标签</span>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/explore?style=${prompt.category_style}`}
                  className="tag-chip"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Source model */}
          <div className="px-5 py-4 rounded-xl bg-bg-surface border border-border-subtle text-[13px] text-text-muted tracking-wide">
            推荐模型：<span className="text-text-primary font-medium">{prompt.source_model}</span>
          </div>
        </div>
      </div>

      {/* Related prompts */}
      {related.length > 0 && (
        <section className="mt-24">
          <div className="divider mb-12" />
          <div className="section-label mb-2">Related</div>
          <h2 className="font-display text-[20px] font-semibold tracking-tight mb-8">
            相关提示词
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <PromptCard key={p.id} prompt={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
