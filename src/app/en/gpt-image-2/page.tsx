import type { Metadata } from "next";
import Link from "next/link";
import AwesomePromptCard from "@/components/AwesomePromptCard";
import GitHubMark from "@/components/GitHubMark";
import PromptCard from "@/components/PromptCard";
import StyleCarousel from "@/components/StyleCarousel";
import {
  AWESOME_REPO_URL,
  getAwesomePromptStats,
  getFeaturedAwesomePromptCases,
} from "@/lib/awesome-prompts";
import { getAllExamples, getExamplesByStyleId, getFeaturedStyles, getStyleById } from "@/lib/data";
import { CATEGORY_TEXT, getStyleName, localizePath } from "@/lib/i18n";
import { StyleCategory, StyleExample } from "@/lib/types";

const MODEL_ID = "gpt-image-2-beta";
const HIAPI_MODEL_URL = "https://www.hiapi.ai/en/models/gpt-image-2-beta";

const curatedExampleIds = [
  "knowledge-card-solar-system",
  "knowledge-card-programming-concept",
  "memphis-poster-design",
  "character-design-robot-companion",
  "flat-illustration-remote-work",
  "minimalism-interior-space",
  "recipe-card-pasta-recipe",
  "cyberpunk-neon-cityscape",
  "watercolor-rainy-street",
  "pixel-art-cozy-room",
  "oil-painting-sunset-landscape",
  "pop-art-classic-car",
];

export const metadata: Metadata = {
  title: "GPT Image 2 Prompt Templates and Examples",
  description:
    "Curated GPT Image 2 prompt templates and examples for knowledge cards, posters, character IP, illustration, photography, and commercial visuals.",
  alternates: { canonical: "https://prompt.hiapi.ai/en/gpt-image-2" },
  openGraph: {
    title: "GPT Image 2 Prompt Templates and Examples",
    description: "Choose an example, copy the prompt, and generate with GPT Image 2 on HiAPI.",
    images: ["https://cdn.pynice.com/prompts/knowledge-card-solar-system.webp"],
    url: "https://prompt.hiapi.ai/en/gpt-image-2",
    type: "website",
  },
};

export default function EnGptImage2Page() {
  const locale = "en";
  const awesomeStats = getAwesomePromptStats();
  const awesomeCases = getFeaturedAwesomePromptCases(36);
  const featuredStyles = getFeaturedStyles(12);
  const carouselStyles = featuredStyles.map((style) => ({
    ...style,
    exampleCount: getExamplesByStyleId(style.id).length,
  }));

  const allExamples = getAllExamples();
  const curatedExamples = [
    ...curatedExampleIds
      .map((id) => allExamples.find((example) => example.id === id))
      .filter((example): example is StyleExample => Boolean(example)),
    ...allExamples.filter((example) => !curatedExampleIds.includes(example.id)),
  ].slice(0, 24);

  return (
    <>
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-4 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="md:max-w-[62%]">
            <span className="section-label">GPT IMAGE 2 TEMPLATES</span>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-text-primary leading-[1.15] tracking-tight mt-4">
              Prompt templates and examples
              <br className="hidden sm:block" />
              <span className="text-primary italic">for GPT Image 2</span>
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
              Browse examples for knowledge cards, launch posters, character IP, and social visuals, then copy the prompt or jump to HiAPI to generate with GPT Image 2.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
                <strong className="text-text-primary">34</strong> styles
              </span>
              <span className="w-px h-4 bg-border-default" />
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                <strong className="text-text-primary">{awesomeStats.itemCount}</strong> real cases
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <a href={HIAPI_MODEL_URL} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-hover transition-colors">
                Use GPT Image 2
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
              <a
                href={AWESOME_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-card px-5 py-2.5 text-sm font-bold text-text-primary transition-colors hover:border-primary/30 hover:text-primary"
              >
                <GitHubMark />
                Full prompt library
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-border-default">
          <Link href={localizePath("/gpt-image-2", locale)} className="shrink-0 pb-3 border-b-2 border-primary text-sm font-semibold text-text-primary">
            All
          </Link>
          {(Object.entries(CATEGORY_TEXT) as [StyleCategory, typeof CATEGORY_TEXT[StyleCategory]][]).map(([key, val]) => (
            <Link key={key} href={`${localizePath("/styles", locale)}?category=${key}`} className="shrink-0 pb-3 border-b-2 border-transparent text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200">
              {val.en}
            </Link>
          ))}
        </div>
      </section>

      <StyleCarousel styles={carouselStyles} locale={locale} />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="divider" />
      </div>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
          <div>
            <span className="section-label">Featured examples</span>
            <h2 className="text-2xl font-bold text-text-primary mt-1">Open an example to copy the prompt</h2>
          </div>
          <p className="text-xs text-text-muted leading-relaxed max-w-[360px]">
            The Generate button sends the prompt, aspect ratio, and GPT Image 2 Beta model selection back to HiAPI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {curatedExamples.map((example, i) => {
            const style = getStyleById(example.style_id);
            return (
              <div key={example.id}>
                <PromptCard example={example} index={i} model={MODEL_ID} locale={locale} />
                {style && (
                  <p className="mt-2 px-1 text-[11px] text-text-muted">
                    {getStyleName(style, locale)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-16">
        <div className="divider mb-10" />
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <span className="section-label">Awesome GPT Image 2 Prompts</span>
            <h2 className="text-2xl font-bold text-text-primary mt-1">
              Curated from the GitHub prompt library
            </h2>
            <p className="text-sm text-text-secondary mt-2 max-w-[640px] leading-relaxed">
              Synced from the HiAPI GitHub prompt library: {awesomeStats.itemCount} real output cases with complete prompts. Open a card to generate with the prompt, or visit GitHub to browse the full set.
            </p>
          </div>
          <a
            href={AWESOME_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-card px-5 py-2.5 text-sm font-bold text-text-primary transition-colors hover:border-primary/30 hover:text-primary"
          >
            <GitHubMark />
            View all {awesomeStats.itemCount} on GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {awesomeCases.map((item) => (
            <AwesomePromptCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
