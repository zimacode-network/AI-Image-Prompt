import Link from "next/link";
import PromptCard from "@/components/PromptCard";
import StyleCard from "@/components/StyleCard";
import { CATEGORY_LABELS, StyleCategory } from "@/lib/types";
import { getFeaturedStyles, getFeaturedExamples } from "@/lib/data";

export default function HomePage() {
  const featuredStyles = getFeaturedStyles(8);
  const featuredExamples = getFeaturedExamples(8, featuredStyles.map((s) => s.id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PromptStudio",
    alternateName: "AI 图像风格提示词工具站",
    url: "https://promptstudio.art",
    description:
      "精选 AI 图像风格模板与提示词，搭配你的创意内容，一键生成精美图片。支持 34 种视觉风格，170+ 示例。",
    inLanguage: ["zh-CN", "en"],
    publisher: {
      "@type": "Organization",
      name: "PromptStudio",
      url: "https://promptstudio.art",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-10 animate-fade-in-up">
        <div className="rounded-3xl bg-amber-tint/40 dark:bg-amber-tint p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              34 种风格 / 170+ 示例
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-4">
              选一种<span className="text-primary">风格</span>，
              <br className="hidden sm:block" />
              搭配你的创意内容
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg">
              精选 AI 图像风格模板，从古风水墨到赛博朋克，从极简设计到实用信息图表。复制模板提示词，替换你的内容，即可生成精美图片。
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="/styles"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors duration-200"
              >
                浏览所有风格
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category quick access */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          <Link
            href="/styles"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            全部
          </Link>
          {(Object.entries(CATEGORY_LABELS) as [StyleCategory, typeof CATEGORY_LABELS[StyleCategory]][]).map(
            ([key, val]) => (
              <Link
                key={key}
                href={`/styles?category=${key}`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-default bg-bg-card text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[16px]">{val.icon}</span>
                {val.zh}
              </Link>
            )
          )}
        </div>
      </section>

      {/* Featured Styles */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              <span className="text-primary">热门</span>风格推荐
            </h2>
            <p className="text-sm text-text-muted mt-1">精选多种视觉风格模板</p>
          </div>
          <Link
            href="/styles"
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors duration-200"
          >
            查看全部
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredStyles.map((style, i) => (
            <StyleCard key={style.id} style={style} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Examples */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              <span className="text-primary">精选</span>示例
            </h2>
            <p className="text-sm text-text-muted mt-1">来自不同风格的精选提示词示例</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredExamples.map((example, i) => (
            <PromptCard key={example.id} example={example} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
