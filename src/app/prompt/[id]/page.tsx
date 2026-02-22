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
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted/60 mb-10 animate-fade-in">
        <Link href="/" className="hover:text-primary transition-colors duration-200">首页</Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-primary transition-colors duration-200">探索</Link>
        <span>/</span>
        <Link
          href={`/explore?style=${prompt.category_style}`}
          className="hover:text-primary transition-colors duration-200"
        >
          {style.zh}
        </Link>
        <span>/</span>
        <span className="text-text-secondary truncate max-w-[180px] normal-case">{prompt.title_zh}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Image column — LEFT, larger (7 cols) */}
        <div className="lg:col-span-7 animate-fade-in-up">
          <div className="sticky top-20">
            <div className="overflow-hidden rounded-3xl bg-bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prompt.example_image_url}
                alt={prompt.title_zh}
                className="w-full block aspect-square object-cover"
              />
            </div>

            {/* Image toolbar */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-card border border-border-default text-sm font-medium text-text-secondary hover:border-primary/30 transition-all">
                  <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                  放大
                </button>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-card border border-border-default text-sm font-medium text-text-secondary hover:border-primary/30 transition-all">
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  下载
                </button>
              </div>
              <div className="flex items-center gap-1 rounded-xl bg-bg-card border border-border-default p-1">
                <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold">高清</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text-primary transition-colors">原图</button>
              </div>
            </div>

            {/* Author card */}
            <div className="flex items-center gap-3 mt-6 p-4 rounded-2xl bg-bg-card border border-border-default">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {prompt.source_model.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-text-primary">{prompt.source_model}</div>
                <div className="text-xs text-text-muted">AI 模型</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content column — RIGHT (5 cols) */}
        <div className="lg:col-span-5 animate-fade-in-up stagger-2">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">
            {prompt.title_zh}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-text-secondary mb-6">{prompt.title_en}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide rounded-xl bg-primary/10 text-primary border border-primary/20">
              <span className="material-symbols-outlined text-[14px]">smart_toy</span>
              {model.en}
            </span>
            <Link
              href={`/explore?style=${prompt.category_style}`}
              className="tag-chip text-xs"
            >
              {style.icon} {style.zh}
            </Link>
            <Link
              href={`/explore?scene=${prompt.category_scene}`}
              className="tag-chip text-xs"
            >
              {scene.icon} {scene.zh}
            </Link>
          </div>

          {/* Large Copy CTA */}
          <CopyButton text={prompt.prompt_text} label="复制提示词" large />

          {/* Full prompt block */}
          <div className="mt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">英文提示词</span>
              <CopyButton text={prompt.prompt_text} label="复制" />
            </div>
            <div className="prompt-code text-sm">{prompt.prompt_text}</div>
          </div>

          {/* Chinese translation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">中文描述</span>
              <CopyButton text={prompt.prompt_zh} label="复制" />
            </div>
            <div className="prompt-code text-sm">{prompt.prompt_zh}</div>
          </div>

          {/* Parameters — 2x2 grid */}
          {Object.keys(prompt.parameters).length > 0 && (
            <div className="mb-8">
              <span className="section-label block mb-4">参数配置</span>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(prompt.parameters).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex flex-col gap-1 px-4 py-3 rounded-2xl bg-bg-card border border-border-default"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-primary">tune</span>
                      <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider">{key}</span>
                    </div>
                    <span className="text-sm text-text-primary font-bold">{String(val)}</span>
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
                  className="tag-chip text-xs"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related prompts */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="divider mb-10" />
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-text-primary">
              相似风格推荐
            </h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              推荐
            </span>
          </div>
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
