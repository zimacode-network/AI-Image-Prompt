import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getExampleById, getRelatedExamples, getAllExamples, getStyleById } from "@/lib/data";
import CopyButton from "@/components/CopyButton";
import GenerateButton from "@/components/GenerateButton";
import PromptCard from "@/components/PromptCard";
import { buildGenerateUrl } from "@/lib/generate-url";
import {
  CATEGORY_TEXT,
  getExamplePrompt,
  getExampleSubtitle,
  getExampleTitle,
  getStyleName,
  localizePath,
  UI_TEXT,
} from "@/lib/i18n";

export async function generateStaticParams() {
  return getAllExamples().map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = "zh";
  const example = getExampleById(id);
  if (!example) return { title: "未找到" };

  const url = `https://prompt.hiapi.ai/prompt/${example.id}`;

  return {
    title: `${getExampleTitle(example, locale)} — AI 图像提示词`,
    description: `${getExampleSubtitle(example, locale)}。${getExamplePrompt(example, locale).slice(0, 120)}`,
    alternates: { canonical: url },
    openGraph: {
      title: getExampleTitle(example, locale),
      description: getExampleSubtitle(example, locale),
      images: [example.example_image_url],
      url,
      type: "article",
    },
  };
}

export default async function PromptDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ model?: string }>;
}) {
  const { id } = await params;
  const locale = "zh";
  const t = UI_TEXT[locale];
  const query = searchParams ? await searchParams : {};
  const example = getExampleById(id);
  if (!example) notFound();

  const style = getStyleById(example.style_id);
  const categoryLabel = style ? CATEGORY_TEXT[style.category] : null;
  const related = getRelatedExamples(example);
  const model =
    typeof query.model === "string" && query.model.trim()
      ? query.model.trim()
      : undefined;
  const prompt = getExamplePrompt(example, locale);
  const title = getExampleTitle(example, locale);
  const subtitle = getExampleSubtitle(example, locale);
  const generateUrl = buildGenerateUrl(prompt, {
    model,
    aspectRatio: example.aspect_ratio,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    alternativeHeadline: subtitle,
    description: prompt,
    image: example.example_image_url,
    url: `https://prompt.hiapi.ai/prompt/${example.id}`,
    datePublished: example.created_at,
    dateModified: example.created_at,
    author: { "@type": "Organization", name: "PromptStudio" },
    publisher: {
      "@type": "Organization",
      name: "PromptStudio",
      url: "https://prompt.hiapi.ai",
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
        <Link href={localizePath("/", locale)} className="hover:text-primary transition-colors duration-200">
          {t.home}
        </Link>
        <span>/</span>
        <Link href={localizePath("/styles", locale)} className="hover:text-primary transition-colors duration-200">
          {t.style}
        </Link>
        {style && (
          <>
            <span>/</span>
            <Link
              href={localizePath(`/style/${style.id}`, locale)}
              className="hover:text-primary transition-colors duration-200"
            >
              {getStyleName(style, locale)}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-text-secondary truncate max-w-[180px] normal-case">
          {title}
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
                  {getStyleName(style, locale)}
                  </div>
                  <div className="text-xs text-text-muted">{locale === "zh" ? style.name_en : style.name_zh}</div>
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
            {title}
            <span className="text-primary">.</span>
          </h1>
          <p className="text-sm text-text-secondary mb-6">{subtitle}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {style && (
              <Link
                href={localizePath(`/style/${style.id}`, locale)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide rounded-xl bg-primary/10 text-primary border border-primary/20"
              >
                <span className="material-symbols-outlined text-[14px]">palette</span>
                {getStyleName(style, locale)}
              </Link>
            )}
            {categoryLabel && (
              <Link
                href={`${localizePath("/styles", locale)}?category=${style!.category}`}
                className="tag-chip text-xs"
              >
                <span className="material-symbols-outlined text-[14px]">{categoryLabel.icon}</span>
                {locale === "zh" ? categoryLabel.zh : categoryLabel.en}
              </Link>
            )}
            <span className="tag-chip text-xs">
              {example.aspect_ratio}
            </span>
          </div>

          {/* Large CTA: Copy + Generate */}
          <div className="flex gap-3">
            <div className="flex-1 min-w-0">
              <CopyButton text={prompt} label={t.copyPrompt} copiedLabel={t.copied} copiedLargeLabel={t.copiedToClipboard} large />
            </div>
            <GenerateButton
              href={generateUrl}
              promptText={prompt}
              className="shrink-0 flex items-center justify-center gap-2 h-14 px-6 rounded-2xl font-bold text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              {t.generate}
            </GenerateButton>
          </div>

          {/* Full prompt block */}
          <div className="mt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">{t.prompt}</span>
              <CopyButton text={prompt} label={t.copy} copiedLabel={t.copied} />
            </div>
            <div className="prompt-code text-sm">{prompt}</div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <span className="section-label block mb-4">{locale === "zh" ? "标签" : "Tags"}</span>
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
              {t.related}
            </h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              {t.recommended}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <PromptCard key={p.id} example={p} index={i} model={model} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
