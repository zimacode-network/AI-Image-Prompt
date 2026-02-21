import Link from "next/link";
import { Prompt, MODEL_LABELS } from "@/lib/types";

export default function PromptCard({ prompt, index = 0 }: { prompt: Prompt; index?: number }) {
  const model = MODEL_LABELS[prompt.category_model];

  return (
    <Link
      href={`/prompt/${prompt.id}`}
      className={`prompt-card group block rounded-xl overflow-hidden border border-border-subtle bg-bg-card hover:border-border-accent hover:bg-bg-card-hover transition-all duration-300 animate-fade-in-up stagger-${Math.min(index % 8 + 1, 8)}`}
    >
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={prompt.example_image_url}
          alt={prompt.title_zh}
          className="prompt-card-image w-full block"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Model badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-medium font-display rounded-md"
          style={{
            background: `${model.color}22`,
            color: model.color,
            border: `1px solid ${model.color}44`,
          }}
        >
          {model.en}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-display font-medium text-sm text-text-primary leading-snug mb-1.5 group-hover:text-accent-amber transition-colors">
          {prompt.title_zh}
        </h3>
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">
          {prompt.title_en}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full bg-bg-surface text-text-muted border border-border-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
