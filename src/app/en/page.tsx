import Link from "next/link";
import PromptCard from "@/components/PromptCard";
import StyleCarousel from "@/components/StyleCarousel";
import { getFeaturedStyles, getFeaturedExamples, getExamplesByStyleId } from "@/lib/data";
import { CATEGORY_TEXT, localizePath } from "@/lib/i18n";
import { StyleCategory } from "@/lib/types";

export default function EnHomePage() {
  const locale = "en";
  const featuredStyles = getFeaturedStyles(12);
  const featuredExamples = getFeaturedExamples(8, featuredStyles.map((s) => s.id));
  const carouselStyles = featuredStyles.map((s) => ({
    ...s,
    exampleCount: getExamplesByStyleId(s.id).length,
  }));

  return (
    <>
      <section className="site-shell pt-10 pb-4 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="md:max-w-[60%]">
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-text-primary leading-[1.15] tracking-tight">
              Create with <span className="text-primary italic">style templates</span>
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
              Curated AI image style templates and prompt examples for fast, polished generation.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
                <strong className="text-text-primary">34</strong> styles
              </span>
              <span className="w-px h-4 bg-border-default" />
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                <strong className="text-text-primary">170+</strong> examples
              </span>
            </div>
            <p className="text-xs text-text-muted text-right leading-relaxed max-w-[260px]">
              Copy a ready-made prompt, adapt the subject, and generate with your preferred image model.
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell pt-2 pb-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-border-default">
          <Link href={localizePath("/styles", locale)} className="shrink-0 pb-3 border-b-2 border-primary text-sm font-semibold text-text-primary">
            All
          </Link>
          {(Object.entries(CATEGORY_TEXT) as [StyleCategory, typeof CATEGORY_TEXT[StyleCategory]][]).map(([key, val]) => (
            <Link
              key={key}
              href={`${localizePath("/styles", locale)}?category=${key}`}
              className="shrink-0 pb-3 border-b-2 border-transparent text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              {val.en}
            </Link>
          ))}
        </div>
      </section>

      <StyleCarousel styles={carouselStyles} locale={locale} />

      <div className="site-shell">
        <div className="divider" />
      </div>

      <section className="site-shell pt-6 pb-16">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="section-label">Gallery</span>
            <h2 className="text-2xl font-bold text-text-primary mt-1">Featured examples</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredExamples.map((example, i) => (
            <PromptCard key={example.id} example={example} index={i} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
