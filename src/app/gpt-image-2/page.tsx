import type { Metadata } from "next";
import Link from "next/link";
import PromptCard from "@/components/PromptCard";
import StyleCarousel from "@/components/StyleCarousel";
import { StyleCategory, StyleExample } from "@/lib/types";
import {
  getAllExamples,
  getExamplesByStyleId,
  getFeaturedStyles,
  getStyleById,
} from "@/lib/data";
import { CATEGORY_TEXT, getStyleName, localizePath } from "@/lib/i18n";

const MODEL_ID = "gpt-image-2-beta";
const HIAPI_MODEL_URL = "https://www.hiapi.ai/zh/models/gpt-image-2-beta";

const curatedExampleIds = [
  "knowledge-card-solar-system",
  "knowledge-card-programming-concept",
  "memphis-poster-design",
  "character-design-robot-companion",
  "flat-illustration-remote-work",
  "minimalism-interior-space",
  "recipe-card-pasta-recipe",
  "cyberpunk-neon-cityscape",
  "watercolor-rainy-street",
  "pixel-art-cozy-room",
  "oil-painting-sunset-landscape",
  "pop-art-classic-car",
];

export const metadata: Metadata = {
  title: "GPT Image 2 提示词模板与精选案例",
  description:
    "为 GPT Image 2 精选的 AI 图像提示词模板与案例，涵盖知识卡片、海报设计、角色 IP、插画、摄影和商业视觉。",
  alternates: { canonical: "https://prompt.hiapi.ai/gpt-image-2" },
  openGraph: {
    title: "GPT Image 2 提示词模板与精选案例",
    description: "选择案例，复制提示词，直接跳转到 HiAPI 使用 GPT Image 2 生成图片。",
    images: ["https://cdn.pynice.com/prompts/knowledge-card-solar-system.webp"],
    url: "https://prompt.hiapi.ai/gpt-image-2",
    type: "website",
  },
};

export default function GptImage2Page() {
  const locale = "zh";
  const featuredStyles = getFeaturedStyles(12);
  const carouselStyles = featuredStyles.map((style) => ({
    ...style,
    exampleCount: getExamplesByStyleId(style.id).length,
  }));

  const allExamples = getAllExamples();
  const curatedExamples = [
    ...curatedExampleIds
      .map((id) => allExamples.find((example) => example.id === id))
      .filter((example): example is StyleExample => Boolean(example)),
    ...allExamples.filter((example) => !curatedExampleIds.includes(example.id)),
  ].slice(0, 24);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GPT Image 2 提示词模板与精选案例",
    url: "https://prompt.hiapi.ai/gpt-image-2",
    description:
      "为 GPT Image 2 精选的 AI 图像提示词模板与案例，可复制提示词或跳转到 HiAPI 生成。",
    isPartOf: {
      "@type": "WebSite",
      name: "PromptStudio",
      url: "https://prompt.hiapi.ai",
    },
    about: {
      "@type": "SoftwareApplication",
      name: "GPT Image 2",
      url: HIAPI_MODEL_URL,
    },
    numberOfItems: curatedExamples.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-4 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="md:max-w-[62%]">
            <span className="section-label">GPT IMAGE 2 TEMPLATES</span>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-text-primary leading-[1.15] tracking-tight mt-4">
              适合 GPT Image 2 的
              <br className="hidden sm:block" />
              <span className="text-primary italic">提示词模板</span>与案例
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
              从知识卡片、商业海报到角色 IP 和社媒封面，挑选一个案例，复制提示词，或直接跳转到 HiAPI 使用 GPT Image 2 生成。
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
                <strong className="text-text-primary">34</strong> 种风格
              </span>
              <span className="w-px h-4 bg-border-default" />
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                <strong className="text-text-primary">170+</strong> 示例
              </span>
            </div>
            <a
              href={HIAPI_MODEL_URL}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-hover transition-colors"
            >
              去使用 GPT Image 2
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-border-default">
          <Link
            href={localizePath("/gpt-image-2", locale)}
            className="shrink-0 pb-3 border-b-2 border-primary text-sm font-semibold text-text-primary"
          >
            全部
          </Link>
          {(Object.entries(CATEGORY_TEXT) as [StyleCategory, typeof CATEGORY_TEXT[StyleCategory]][]).map(
            ([key, val]) => (
              <Link
                key={key}
                href={`${localizePath("/styles", locale)}?category=${key}`}
                className="shrink-0 pb-3 border-b-2 border-transparent text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                {val.zh}
              </Link>
            ),
          )}
        </div>
      </section>

      <StyleCarousel styles={carouselStyles} locale={locale} />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="divider" />
      </div>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
          <div>
            <span className="section-label">精选案例</span>
            <h2 className="text-2xl font-bold text-text-primary mt-1">点击案例查看提示词</h2>
          </div>
          <p className="text-xs text-text-muted leading-relaxed max-w-[360px]">
            卡片上的「去生成」会带着对应提示词和比例跳转到 HiAPI，并固定选择 GPT Image 2 Beta。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {curatedExamples.map((example, i) => {
            const style = getStyleById(example.style_id);
            return (
              <div key={example.id}>
                <PromptCard example={example} index={i} model={MODEL_ID} locale={locale} />
                {style && (
                  <p className="mt-2 px-1 text-[11px] text-text-muted">
                    {getStyleName(style, locale)} / {style.name_en}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
