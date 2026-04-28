import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllStyles, getStyleById, getExamplesByStyleId } from "@/lib/data";
import PromptCard from "@/components/PromptCard";
import TemplateBlock from "@/components/TemplateBlock";
import {
  CATEGORY_TEXT,
  getLocalizedTemplate,
  getStyleDescription,
  getStyleName,
  localizePath,
  UI_TEXT,
} from "@/lib/i18n";

export async function generateStaticParams() {
  return getAllStyles().map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const style = getStyleById(id);
  if (!style) return { title: "Not found" };

  return {
    title: `${style.name_en} — AI image style template`,
    description: `${style.description_en} Includes 5 prompt examples ready to copy and adapt.`,
    alternates: { canonical: `https://prompt.hiapi.ai/en/style/${style.id}` },
    openGraph: {
      title: `${style.name_en} (${style.name_zh})`,
      description: style.description_en,
      images: [style.cover_image_url],
      url: `https://prompt.hiapi.ai/en/style/${style.id}`,
      type: "article",
    },
  };
}

export default async function EnStyleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = "en";
  const t = UI_TEXT[locale];
  const style = getStyleById(id);
  if (!style) notFound();

  const examples = getExamplesByStyleId(style.id);
  const categoryLabel = CATEGORY_TEXT[style.category];

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-20">
      <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted/60 mb-10 animate-fade-in">
        <Link href={localizePath("/", locale)} className="hover:text-primary transition-colors duration-200">{t.home}</Link>
        <span>/</span>
        <Link href={localizePath("/styles", locale)} className="hover:text-primary transition-colors duration-200">{t.style}</Link>
        <span>/</span>
        <Link href={`${localizePath("/styles", locale)}?category=${style.category}`} className="hover:text-primary transition-colors duration-200">
          {categoryLabel.en}
        </Link>
        <span>/</span>
        <span className="text-text-secondary truncate max-w-[180px] normal-case">{getStyleName(style, locale)}</span>
      </nav>

      <div className="mb-10 animate-fade-in-up">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Link
            href={`${localizePath("/styles", locale)}?category=${style.category}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wide rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">{categoryLabel.icon}</span>
            {categoryLabel.en}
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">
          {getStyleName(style, locale)}
          <span className="text-primary">.</span>
        </h1>
        <p className="text-sm text-text-muted leading-relaxed max-w-2xl mb-4">
          {getStyleDescription(style, locale)}
        </p>

        <div className="flex flex-wrap gap-2">
          {[style.name_en, categoryLabel.en, "AI image prompt", "Style template"].map((tag) => (
            <span key={tag} className="tag-chip text-xs">{tag}</span>
          ))}
        </div>
      </div>

      <div className="mb-12 animate-fade-in-up stagger-2">
        <TemplateBlock template={getLocalizedTemplate(style, locale)} locale={locale} />
      </div>

      {examples.length > 0 && (
        <section className="animate-fade-in-up stagger-3">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-text-primary">Examples</h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              {examples.length} {t.examples}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {examples.map((example, i) => (
              <PromptCard key={example.id} example={example} index={i} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
