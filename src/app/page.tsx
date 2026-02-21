import Link from "next/link";
import PromptCard from "@/components/PromptCard";
import { prompts } from "@/lib/data";
import { STYLE_LABELS } from "@/lib/types";

export default function HomePage() {
  const featured = prompts.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent-amber/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-16 relative">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-light bg-bg-card text-xs text-text-muted mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
              {prompts.length} 条精选提示词，持续更新中
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              AI 绘画
              <br />
              <span className="text-accent-amber">提示词工具站</span>
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
              精选高质量提示词，覆盖 Midjourney、SD、FLUX、Gemini 等主流模型。
              中英双语，一键复制，让创作更简单。
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-amber text-bg-primary font-display font-semibold text-sm hover:bg-accent-amber-dim transition-colors"
              >
                探索提示词
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/explore?style=anime"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-light text-text-secondary font-display font-medium text-sm hover:border-border-accent hover:text-text-primary transition-colors"
              >
                动漫风格
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Style Categories */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16">
        <h2 className="font-display text-xs font-medium text-text-muted uppercase tracking-widest mb-5">
          按风格浏览
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(STYLE_LABELS).map(([key, val], i) => (
            <Link
              key={key}
              href={`/explore?style=${key}`}
              className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border-subtle bg-bg-card hover:border-border-accent hover:bg-bg-card-hover transition-all animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
            >
              <span className="text-xl">{val.icon}</span>
              <div>
                <span className="block text-sm font-medium text-text-primary group-hover:text-accent-amber transition-colors">
                  {val.zh}
                </span>
                <span className="block text-[10px] text-text-muted">{val.en}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            精选提示词
          </h2>
          <Link
            href="/explore"
            className="text-sm text-text-muted hover:text-accent-amber transition-colors font-display"
          >
            查看全部 →
          </Link>
        </div>

        <div className="masonry-grid">
          {featured.map((prompt, i) => (
            <div key={prompt.id} className="masonry-item">
              <PromptCard prompt={prompt} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-b border-border-subtle bg-bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: `${prompts.length}+`, label: "精选提示词" },
            { num: "6", label: "支持模型" },
            { num: "10", label: "风格分类" },
            { num: "8", label: "场景分类" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-accent-amber mb-1">
                {stat.num}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
