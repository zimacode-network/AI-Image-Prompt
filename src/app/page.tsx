import Link from "next/link";
import PromptCard from "@/components/PromptCard";
import StyleCarousel from "@/components/StyleCarousel";
import { StyleCategory } from "@/lib/types";
import { getFeaturedStyles, getFeaturedExamples, getExamplesByStyleId } from "@/lib/data";
import { CATEGORY_TEXT, localizePath } from "@/lib/i18n";

export default function HomePage() {
  const locale = "zh";
  const featuredStyles = getFeaturedStyles(12);
  const featuredExamples = getFeaturedExamples(8, featuredStyles.map((s) => s.id));

  const carouselStyles = featuredStyles.map((s) => ({
    ...s,
    exampleCount: getExamplesByStyleId(s.id).length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PromptStudio",
    alternateName: "AI 图像风格提示词工具站",
    url: "https://prompt.hiapi.ai",
    description:
      "精选 AI 图像风格模板与提示词，搭配你的创意内容，一键生成精美图片。支持 34 种视觉风格，170+ 示例。",
    inLanguage: ["zh-CN", "en"],
    publisher: {
      "@type": "Organization",
      name: "PromptStudio",
      url: "https://prompt.hiapi.ai",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="site-shell pt-10 pb-4 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="md:max-w-[60%]">
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-text-primary leading-[1.15] tracking-tight">
              用<span className="text-primary italic">风格模板</span>，
              <br className="hidden sm:block" />
              释放你的创意
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
              精选 AI 图像风格模板与提示词，搭配你的创意内容，一键生成精美图片
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 shrink-0">
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
            <p className="text-xs text-text-muted text-right leading-relaxed max-w-[260px]">
              从古风水墨到赛博朋克，从极简设计到实用信息图表，复制模板提示词即可生成精美图片
            </p>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="site-shell pt-2 pb-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-border-default">
          <Link
            href={localizePath("/styles", locale)}
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
            )
          )}
        </div>
      </section>

      {/* Featured Styles — Carousel */}
      <StyleCarousel styles={carouselStyles} locale={locale} />

      {/* Divider */}
      <div className="site-shell">
        <div className="divider" />
      </div>

      {/* Featured Examples */}
      <section className="site-shell pt-6 pb-16">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="section-label">作品展示</span>
            <h2 className="text-2xl font-bold text-text-primary mt-1">精选示例</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredExamples.map((example, i) => (
            <PromptCard key={example.id} example={example} index={i} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
