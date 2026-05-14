import type { Metadata } from "next";
import Link from "next/link";
import AwesomePromptCard from "@/components/AwesomePromptCard";
import GitHubMark from "@/components/GitHubMark";
import {
  AWESOME_REPO_URL,
  getAwesomePromptStats,
  getAwesomePromptCases,
  getAwesomePromptCategories,
} from "@/lib/awesome-prompts";
import {
  buildGptImage2HomeJsonLd,
  buildGptImage2HomeMetadata,
} from "@/lib/gpt-image-2-seo";
import { localizePath } from "@/lib/i18n";

const HIAPI_MODEL_URL = "https://www.hiapi.ai/en/models/gpt-image-2-beta";

export const metadata: Metadata = buildGptImage2HomeMetadata({
  locale: "en",
  stats: getAwesomePromptStats(),
  featuredCase: getAwesomePromptCases()[0],
});

export default async function EnGptImage2Page({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const locale = "en";
  const awesomeStats = getAwesomePromptStats();
  const awesomeCategories = getAwesomePromptCategories();
  const query = searchParams ? await searchParams : {};
  const selectedCategory = awesomeCategories.some((cat) => cat.id === query.category)
    ? query.category
    : undefined;
  const allCases = getAwesomePromptCases();
  const visibleCases = selectedCategory
    ? allCases.filter((item) => item.category === selectedCategory)
    : allCases;
  const jsonLd = buildGptImage2HomeJsonLd({
    locale,
    stats: awesomeStats,
    categories: awesomeCategories,
    cases: allCases,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="site-shell pt-10 pb-4 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="md:max-w-[62%]">
            <span className="section-label">GPT IMAGE 2 PROMPTS</span>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-text-primary leading-[1.15] tracking-tight mt-4">
              GPT Image 2
              <br className="hidden sm:block" />
              <span className="text-primary italic">Prompt Gallery</span>
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mt-3 leading-relaxed">
              Browse real outputs, copy prompts, or jump to generate.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">category</span>
                <strong className="text-text-primary">{awesomeStats.categoryCount}</strong> categories
              </span>
              <span className="w-px h-4 bg-border-default" />
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                <strong className="text-text-primary">{awesomeStats.itemCount}</strong> cases
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
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell pt-2 pb-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-border-default">
          <Link
            href={localizePath("/gpt-image-2", locale)}
            className={`shrink-0 pb-3 border-b-2 text-sm font-semibold transition-colors duration-200 ${
              selectedCategory
                ? "border-transparent text-text-muted hover:text-text-primary"
                : "border-primary text-text-primary"
            }`}
          >
            All
          </Link>
          {awesomeCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`${localizePath("/gpt-image-2", locale)}?category=${cat.id}`}
              className={`shrink-0 pb-3 border-b-2 text-sm font-medium transition-colors duration-200 ${
                selectedCategory === cat.id
                  ? "border-primary text-text-primary"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              {cat.en}
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell pt-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
          {visibleCases.map((item) => (
            <AwesomePromptCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
