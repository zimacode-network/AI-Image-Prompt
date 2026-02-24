import Link from "next/link";
import { StyleTemplate } from "@/lib/types";
import { getExamplesByStyleId } from "@/lib/data";

export default function StyleCard({ style, index = 0 }: { style: StyleTemplate; index?: number }) {
  const exampleCount = getExamplesByStyleId(style.id).length;

  return (
    <Link
      href={`/style/${style.id}`}
      className={`prompt-card group block p-3.5 rounded-2xl bg-bg-card border border-border-default/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up stagger-${Math.min(index % 8 + 1, 8)}`}
    >
      <div className="relative overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={style.cover_image_url}
          alt={style.name_zh}
          className="prompt-card-image w-full block aspect-[4/3] object-cover"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur text-charcoal text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            查看风格
          </span>
        </div>

        {/* Example count badge */}
        <span className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-lg bg-white/90 backdrop-blur-sm text-charcoal">
          {exampleCount} 个示例
        </span>
      </div>

      <div className="pt-3.5 px-1.5 pb-2">
        <h3 className="text-sm font-bold text-text-primary leading-snug mb-1.5 group-hover:text-primary transition-colors duration-200">
          {style.name_zh}
        </h3>
        <p className="text-xs text-text-muted mb-2">{style.name_en}</p>
        <div className="flex flex-wrap gap-1.5">
          {style.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-bg-surface text-text-muted border border-border-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
