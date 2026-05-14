import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import GitHubMark from "@/components/GitHubMark";
import { getAwesomePromptCases } from "@/lib/awesome-prompts";
import {
  buildGptImage2CaseBreadcrumbJsonLd,
  buildGptImage2CaseJsonLd,
  buildGptImage2CaseMetadata,
} from "@/lib/gpt-image-2-seo";
import { localizePath } from "@/lib/i18n";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const cases = getAwesomePromptCases();
  return cases.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cases = getAwesomePromptCases();
  const item = cases.find((c) => c.id === id);

  if (!item) {
    return {
      title: "案例未找到",
    };
  }

  return buildGptImage2CaseMetadata(item, "zh");
}

export default async function GptImage2CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const locale = "zh";
  const cases = getAwesomePromptCases();
  const item = cases.find((c) => c.id === id);

  if (!item) {
    notFound();
  }
  const jsonLd = buildGptImage2CaseJsonLd(item, locale);
  const breadcrumbJsonLd = buildGptImage2CaseBreadcrumbJsonLd(item, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="site-shell pt-6 pb-4">
        <Link
          href={localizePath("/gpt-image-2", locale)}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          返回案例库
        </Link>
      </nav>

      <article className="site-shell pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <div className="mb-4">
              <span className="inline-block rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                {item.category_zh}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-4">
              {item.title_zh}
            </h1>

            <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">aspect_ratio</span>
                {item.aspect_ratio}
              </span>
              <span className="w-px h-4 bg-border-default" />
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">translate</span>
                {item.prompt_language === "en" ? "English" : "中文"}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">Prompt</h2>
              <div className="rounded-xl border border-border-default bg-bg-surface p-4">
                <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-wrap">
                  {item.prompt}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <CopyButton
                text={item.prompt}
                label="复制 Prompt"
                copiedLabel="已复制"
              />
              <a
                href={item.generate_url}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
              >
                去生成
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
              <a
                href={item.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border-default bg-bg-card px-5 py-2.5 text-sm font-bold text-text-primary transition-colors hover:border-primary/30 hover:text-primary"
              >
                <GitHubMark />
                GitHub
              </a>
            </div>

            <div className="border-t border-border-default pt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">来源信息</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-text-muted shrink-0">作者:</span>
                  <a
                    href={item.author_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-primary transition-colors"
                  >
                    {item.author}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-text-muted shrink-0">原始来源:</span>
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-primary transition-colors break-all"
                  >
                    {item.source_url}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="sticky top-6">
              <div className="overflow-hidden rounded-2xl border border-border-default bg-bg-surface shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.title_zh}
                  className="block w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
