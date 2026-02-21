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
    <div className="max-w-[1400px] mx-auto px-6 pt-6 pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6 animate-fade-in">
        <Link href="/" className="hover:text-accent-amber transition-colors">首页</Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-accent-amber transition-colors">探索</Link>
        <span>/</span>
        <Link
          href={`/explore?style=${prompt.category_style}`}
          className="hover:text-accent-amber transition-colors"
        >
          {style.zh}
        </Link>
        <span>/</span>
        <span className="text-text-secondary truncate max-w-[200px]">{prompt.title_zh}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image column */}
        <div className="lg:col-span-2 animate-fade-in-up">
          <div className="rounded-xl overflow-hidden border border-border-subtle bg-bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={prompt.example_image_url}
              alt={prompt.title_zh}
              className="w-full block"
            />
          </div>
        </div>

        {/* Content column */}
        <div className="lg:col-span-3 animate-fade-in-up stagger-2">
          {/* Title */}
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
            {prompt.title_zh}
          </h1>
          <p className="text-text-secondary text-sm mb-6">{prompt.title_en}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className="px-3 py-1.5 text-xs font-medium font-display rounded-lg"
              style={{
                background: `${model.color}18`,
                color: model.color,
                border: `1px solid ${model.color}40`,
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
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-xs font-medium text-text-muted uppercase tracking-widest">
                English Prompt
              </h2>
              <CopyButton text={prompt.prompt_text} label="复制英文" />
            </div>
            <div className="prompt-code">{prompt.prompt_text}</div>
          </div>

          {/* Chinese translation */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-xs font-medium text-text-muted uppercase tracking-widest">
                中文描述
              </h2>
              <CopyButton text={prompt.prompt_zh} label="复制中文" />
            </div>
            <div className="prompt-code">{prompt.prompt_zh}</div>
          </div>

          {/* Parameters */}
          {Object.keys(prompt.parameters).length > 0 && (
            <div className="mb-6">
              <h2 className="font-display text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
                参数配置
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(prompt.parameters).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-bg-surface border border-border-subtle"
                  >
                    <span className="text-xs text-text-muted font-mono">{key}</span>
                    <span className="text-xs text-text-primary font-mono font-medium">
                      {String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6">
            <h2 className="font-display text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
              标签
            </h2>
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
          <div className="px-4 py-3 rounded-lg bg-bg-surface border border-border-subtle text-sm text-text-muted">
            推荐模型：<span className="text-text-primary font-medium">{prompt.source_model}</span>
          </div>
        </div>
      </div>

      {/* Related prompts */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold tracking-tight mb-6">
            相关提示词
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <PromptCard key={p.id} prompt={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
