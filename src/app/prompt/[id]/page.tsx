import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getExampleById, getRelatedExamples, getAllExamples, getStyleById } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";
import CopyButton from "@/components/CopyButton";
import PromptCard from "@/components/PromptCard";

export async function generateStaticParams() {
  return getAllExamples().map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const example = getExampleById(id);
  if (!example) return { title: "未找到" };

  const url = `https://promptstudio.art/prompt/${example.id}`;

  return {
    title: `${example.title_zh} — AI 图像提示词`,
    description: `${example.title_en}。${example.prompt_zh.slice(0, 120)}`,
    alternates: { canonical: url },
    openGraph: {
      title: example.title_zh,
      description: example.title_en,
      images: [example.example_image_url],
      url,
      type: "article",
    },
  };
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const example = getExampleById(id);
  if (!example) notFound();

  const style = getStyleById(example.style_id);
  const categoryLabel = style ? CATEGORY_LABELS[style.category] : null;
  const related = getRelatedExamples(example);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: example.title_zh,
    alternativeHeadline: example.title_en,
    description: example.prompt_zh,
    image: example.example_image_url,
    url: `https://promptstudio.art/prompt/${example.id}`,
    datePublished: example.created_at,
    dateModified: example.created_at,
    author: { "@type": "Organization", name: "PromptStudio" },
    publisher: {
      "@type": "Organization",
      name: "PromptStudio",
      url: "https://promptstudio.art",
    },
    keywords: [...example.tags, style?.name_zh, style?.name_en].filter(Boolean).join(", "),
    associatedMedia: {
      "@type": "ImageObject",
      contentUrl: example.example_image_url,
      name: example.title_en,
      description: `AI-generated image: ${example.title_en}`,
    },
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted/60 mb-10 animate-fade-in">
        <Link href="/" className="hover:text-primary transition-colors duration-200">
          首页
        </Link>
        <span>/</span>
        <Link href="/styles" className="hover:text-primary transition-colors duration-200">
          风格
        </Link>
        {style && (
          <>
            <span>/</span>
            <Link
              href={`/style/${style.id}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {style.name_zh}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-text-secondary truncate max-w-[180px] normal-case">
          {example.title_zh}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Image column — LEFT (7 cols) */}
        <div className="lg:col-span-7 animate-fade-in-up">
          <div className="sticky top-20">
            <div className="overflow-hidden rounded-3xl bg-bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={example.example_image_url}
                alt={example.title_zh}
                className="w-full block aspect-square object-cover"
              />
            </div>

            {/* Style link card */}
            {style && (
              <Link
                href={`/style/${style.id}`}
                className="flex items-center gap-3 mt-6 p-4 rounded-2xl bg-bg-card border border-border-default hover:border-primary/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">palette</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                    {style.name_zh}
                  </div>
                  <div className="text-xs text-text-muted">{style.name_en}</div>
                </div>
                <span className="material-symbols-outlined text-[16px] text-text-muted group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Content column — RIGHT (5 cols) */}
        <div className="lg:col-span-5 animate-fade-in-up stagger-2">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">
            {example.title_zh}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-text-secondary mb-6">{example.title_en}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {style && (
              <Link
                href={`/style/${style.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide rounded-xl bg-primary/10 text-primary border border-primary/20"
              >
                <span className="material-symbols-outlined text-[14px]">palette</span>
                {style.name_zh}
              </Link>
            )}
            {categoryLabel && (
              <Link
                href={`/styles?category=${style!.category}`}
                className="tag-chip text-xs"
              >
                <span className="material-symbols-outlined text-[14px]">{categoryLabel.icon}</span>
                {categoryLabel.zh}
              </Link>
            )}
            <span className="tag-chip text-xs">
              {example.aspect_ratio}
            </span>
          </div>

          {/* Large Copy CTA */}
          <CopyButton text={example.prompt_text} label="复制提示词" large />

          {/* Full prompt block */}
          <div className="mt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">英文提示词</span>
              <CopyButton text={example.prompt_text} label="复制" />
            </div>
            <div className="prompt-code text-sm">{example.prompt_text}</div>
          </div>

          {/* Chinese translation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">中文描述</span>
              <CopyButton text={example.prompt_zh} label="复制" />
            </div>
            <div className="prompt-code text-sm">{example.prompt_zh}</div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <span className="section-label block mb-4">标签</span>
            <div className="flex flex-wrap gap-2">
              {example.tags.map((tag) => (
                <span key={tag} className="tag-chip text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related examples */}
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
              <PromptCard key={p.id} example={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
