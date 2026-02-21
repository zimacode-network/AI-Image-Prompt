import Link from "next/link";
import { Prompt, MODEL_LABELS } from "@/lib/types";

export default function PromptCard({ prompt, index = 0 }: { prompt: Prompt; index?: number }) {
  const model = MODEL_LABELS[prompt.category_model];

  return (
    <Link
      href={`/prompt/${prompt.id}`}
      className={`prompt-card group block rounded-2xl overflow-hidden bg-bg-card hover:bg-bg-card-hover transition-all duration-400 animate-fade-in-up stagger-${Math.min(index % 8 + 1, 8)}`}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={prompt.example_image_url}
          alt={prompt.title_zh}
          className="prompt-card-image w-full block"
          loading="lazy"
        />
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Model badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold tracking-wide rounded-md backdrop-blur-sm"
          style={{
            background: `${model.color}20`,
            color: model.color,
            border: `1px solid ${model.color}35`,
          }}
        >
          {model.en}
        </span>
      </div>

      <div className="px-4 pt-3.5 pb-4">
        <h3 className="font-display text-[15px] font-semibold text-text-primary leading-snug mb-1 group-hover:text-accent-gold transition-colors duration-300">
          {prompt.title_zh}
        </h3>
        <p className="text-[12px] text-text-muted leading-relaxed mb-3 tracking-wide">
          {prompt.title_en}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] tracking-wide rounded-full bg-bg-surface text-text-muted border border-border-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
