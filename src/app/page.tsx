import Link from "next/link";
import PromptCard from "@/components/PromptCard";
import { prompts } from "@/lib/data";
import { STYLE_LABELS } from "@/lib/types";

export default function HomePage() {
  const featured = prompts[0];
  const trending = prompts.slice(1, 9);

  return (
    <>
      {/* Hero — Prompt of the Day */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-10 animate-fade-in-up">
        <div className="rounded-3xl bg-amber-tint/40 dark:bg-amber-tint p-6 sm:p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
            {/* Featured image */}
            <div className="w-full md:w-1/2 shrink-0">
              <Link href={`/prompt/${featured.id}`} className="block">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.example_image_url}
                    alt={featured.title_zh}
                    className="w-full block aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            </div>

            {/* Featured text */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                今日推荐
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight mb-3">
                {featured.title_zh}
              </h1>
              <p className="text-sm text-text-secondary mb-3">{featured.title_en}</p>
              <p className="text-sm text-text-muted leading-relaxed mb-8 line-clamp-3">
                {featured.prompt_zh}
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href={`/prompt/${featured.id}`}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors duration-200"
                >
                  查看详情
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-border-strong text-text-secondary font-medium text-sm hover:border-primary/30 hover:text-text-primary transition-all duration-200"
                >
                  探索更多
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category scroll pills */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          <Link
            href="/explore"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            全部
          </Link>
          {Object.entries(STYLE_LABELS).map(([key, val]) => (
            <Link
              key={key}
              href={`/explore?style=${key}`}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-default bg-bg-card text-sm font-medium text-text-secondary hover:border-primary/30 hover:text-primary transition-all duration-200"
            >
              <span>{val.icon}</span>
              {val.zh}
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Collections */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              <span className="text-primary">热门</span>精选
            </h2>
            <p className="text-sm text-text-muted mt-1">热门精选提示词</p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors duration-200"
          >
            查看全部
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
