import Link from "next/link";
import { StyleExample } from "@/lib/types";
import { getStyleById } from "@/lib/data";
import { buildGenerateUrl } from "@/lib/generate-url";
import PromptCardActions from "./PromptCardActions";
import {
  getExamplePrompt,
  getExampleSubtitle,
  getExampleTitle,
  getStyleName,
  localizePath,
  Locale,
  UI_TEXT,
} from "@/lib/i18n";

export default function PromptCard({
  example,
  index = 0,
  model,
  locale = "zh",
}: {
  example: StyleExample;
  index?: number;
  model?: string;
  locale?: Locale;
}) {
  const style = getStyleById(example.style_id);
  const t = UI_TEXT[locale];
  const title = getExampleTitle(example, locale);
  const subtitle = getExampleSubtitle(example, locale);
  const prompt = getExamplePrompt(example, locale);
  const generateUrl = buildGenerateUrl(prompt, {
    model,
    aspectRatio: example.aspect_ratio,
  });
  const detailHref = model
    ? `${localizePath(`/prompt/${example.id}`, locale)}?model=${encodeURIComponent(model)}`
    : localizePath(`/prompt/${example.id}`, locale);

  return (
    <Link
      href={detailHref}
      className={`prompt-card group block p-3.5 rounded-2xl bg-bg-card border border-border-default/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up stagger-${Math.min(index % 8 + 1, 8)}`}
    >
      <div className="relative overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={example.example_image_url}
          alt={title}
          className="prompt-card-image w-full block aspect-[4/5] object-cover"
          loading="lazy"
        />
        {/* Hover gradient overlay */}
        <PromptCardActions
          generateUrl={generateUrl}
          promptText={prompt}
          copyLabel={locale === "zh" ? "快速复制" : "Quick copy"}
          generateLabel={t.generate}
        />

        {/* Style badge — top right */}
        {style && (
          <span className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-lg bg-white/90 backdrop-blur-sm text-charcoal">
            {getStyleName(style, locale)}
          </span>
        )}
      </div>

      <div className="pt-3.5 px-1.5 pb-2">
        <h3 className="text-sm font-bold text-text-primary leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted line-clamp-1">{subtitle}</span>
          <span className="flex items-center gap-1 text-xs text-text-muted shrink-0 ml-2">
            {example.aspect_ratio}
          </span>
        </div>
      </div>
    </Link>
  );
}
