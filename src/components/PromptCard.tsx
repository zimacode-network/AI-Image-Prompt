import Link from "next/link";
import { Prompt, MODEL_LABELS } from "@/lib/types";

export default function PromptCard({ prompt, index = 0 }: { prompt: Prompt; index?: number }) {
  const model = MODEL_LABELS[prompt.category_model];

  return (
    <Link
      href={`/prompt/${prompt.id}`}
      className={`prompt-card group block p-3.5 rounded-2xl bg-bg-card border border-border-default hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-${Math.min(index % 8 + 1, 8)}`}
    >
      <div className="relative overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={prompt.example_image_url}
          alt={prompt.title_zh}
          className="prompt-card-image w-full block aspect-[4/5] object-cover"
          loading="lazy"
        />
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur text-charcoal text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">content_copy</span>
            快速复制
          </span>
        </div>

        {/* Model badge — top right */}
        <span className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-lg bg-white/90 backdrop-blur-sm text-charcoal">
          {model.en}
        </span>
      </div>

      <div className="pt-3.5 px-1.5 pb-2">
        <h3 className="text-sm font-bold text-text-primary leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {prompt.title_zh}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted line-clamp-1">{prompt.title_en}</span>
          <span className="flex items-center gap-1 text-xs text-text-muted shrink-0 ml-2">
            <span className="material-symbols-outlined text-[14px]">favorite</span>
            {Math.floor(Math.random() * 200 + 50)}
          </span>
        </div>
      </div>
    </Link>
  );
}
