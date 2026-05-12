"use client";

import { AwesomePromptCase } from "@/lib/awesome-prompts";
import CopyButton from "./CopyButton";

export default function AwesomePromptCard({
  item,
  locale,
}: {
  item: AwesomePromptCase;
  locale: "zh" | "en";
}) {
  const title = locale === "zh" ? item.title_zh : item.title_en;
  const category = locale === "zh" ? item.category_zh : item.category_en;
  const sourceLabel = locale === "zh" ? "来源" : "Source";
  const generateLabel = locale === "zh" ? "去生成" : "Generate";

  return (
    <article className="prompt-card group overflow-hidden rounded-2xl border border-border-default/70 bg-bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden bg-bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image_url}
          alt={title}
          loading="lazy"
          className="prompt-card-image block aspect-[4/5] w-full object-cover"
        />
      </a>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">
          <span className="truncate">{category}</span>
          <span className="shrink-0 rounded-lg bg-primary/10 px-2 py-1 text-primary">{item.aspect_ratio}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-snug text-text-primary">
          {title}
        </h3>
        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-text-secondary">
          {item.prompt}
        </p>
        <div className="flex items-center justify-between gap-2">
          <CopyButton text={item.prompt} label={locale === "zh" ? "复制" : "Copy"} copiedLabel={locale === "zh" ? "已复制" : "Copied"} />
          <a
            href={item.generate_url}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-hover"
          >
            {generateLabel}
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border-default pt-3 text-[11px] text-text-muted">
          <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="truncate hover:text-primary">
            {sourceLabel}: {item.author}
          </a>
          <a href={item.github_url} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:text-primary">
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
