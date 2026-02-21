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
        {/* Ambient glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%)' }}
        />

        <div className="max-w-[1200px] mx-auto px-8 pt-28 pb-20 relative">
          <div className="max-w-xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-light bg-bg-card/60 text-[12px] text-text-muted mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" style={{ animation: 'subtlePulse 2.5s ease-in-out infinite' }} />
              {prompts.length} 条精选提示词，持续更新中
            </div>

            <h1 className="font-display text-[42px] md:text-[52px] lg:text-[60px] font-bold leading-[1.08] mb-6 tracking-tight">
              <span className="text-text-primary">AI 绘画</span>
              <br />
              <span className="text-accent-gold" style={{ fontStyle: 'italic' }}>提示词工具站</span>
            </h1>

            <p className="text-[15px] text-text-secondary leading-[1.8] mb-10 max-w-md">
              精选高质量提示词，覆盖 Midjourney、SD、FLUX、Gemini 等主流模型。中英双语，一键复制，让创作更简单。
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-accent-gold text-bg-primary font-body font-semibold text-[13.5px] tracking-wide hover:bg-accent-gold-soft transition-all duration-300 hover:shadow-lg"
              >
                探索提示词
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/explore?style=anime"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-border-medium text-text-secondary font-body font-medium text-[13.5px] tracking-wide hover:border-accent-gold/30 hover:text-text-primary transition-all duration-300"
              >
                动漫风格
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="divider" />
      </div>

      {/* Style Categories */}
      <section className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="section-label mb-6">按风格浏览</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(STYLE_LABELS).map(([key, val], i) => (
            <Link
              key={key}
              href={`/explore?style=${key}`}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border-subtle bg-bg-card hover:border-border-accent hover:bg-bg-card-hover transition-all duration-300 animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
            >
              <span className="text-lg opacity-80 group-hover:opacity-100 transition-opacity">{val.icon}</span>
              <div>
                <span className="block text-[13px] font-medium text-text-primary group-hover:text-accent-gold transition-colors duration-300">
                  {val.zh}
                </span>
                <span className="block text-[10px] text-text-muted tracking-wider mt-0.5">{val.en}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="divider" />
      </div>

      {/* Featured Prompts */}
      <section className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-label mb-2">Featured</div>
            <h2 className="font-display text-[22px] font-semibold tracking-tight text-text-primary">
              精选提示词
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-[13px] text-text-muted hover:text-accent-gold transition-colors duration-200 tracking-wide"
          >
            查看全部 &rarr;
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
      <section className="border-t border-border-subtle bg-bg-secondary/50">
        <div className="max-w-[1200px] mx-auto px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { num: `${prompts.length}+`, label: "精选提示词" },
            { num: "6", label: "支持模型" },
            { num: "10", label: "风格分类" },
            { num: "8", label: "场景分类" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[28px] md:text-[34px] font-bold text-accent-gold-soft mb-1.5 tracking-tight" style={{ fontStyle: 'italic' }}>
                {stat.num}
              </div>
              <div className="text-[12px] text-text-muted tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
