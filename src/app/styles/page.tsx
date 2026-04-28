import { Suspense } from "react";
import type { Metadata } from "next";
import FilterBar from "@/components/FilterBar";
import StyleCard from "@/components/StyleCard";
import { getAllStyles, getStylesByCategory } from "@/lib/data";
import { StyleCategory } from "@/lib/types";
import { CATEGORY_TEXT, UI_TEXT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "风格画廊 — 浏览所有 AI 图像风格",
  description:
    "浏览 34 种 AI 图像风格模板，涵盖艺术绘画、现代插画、设计风格、实用模板和特定题材。选择喜欢的风格，复制模板提示词即可生成图片。",
  alternates: { canonical: "https://prompt.hiapi.ai/styles" },
};

export default async function StylesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = "zh";
  const t = UI_TEXT[locale];
  const params = await searchParams;
  const activeCategory = params.category as StyleCategory | undefined;

  const styles = activeCategory
    ? getStylesByCategory(activeCategory)
    : getAllStyles();

  const categoryLabel = activeCategory
    ? CATEGORY_TEXT[activeCategory]?.zh
    : null;

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-20">
      {/* Filters */}
      <div className="mb-10 animate-fade-in-up">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            {categoryLabel ? (
              <>
                <span className="text-primary">{categoryLabel}</span>{t.categoryStyleSuffix}
              </>
            ) : (
              <>
                {t.all}<span className="text-primary">{t.style}</span>
              </>
            )}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {activeCategory
              ? `${categoryLabel}类共 ${styles.length} 种风格模板`
              : `共 ${styles.length} 种风格模板，每种含 5 个示例`}
          </p>
        </div>
      </div>

      {/* Style cards grid */}
      {styles.length > 0 ? (
        activeCategory ? (
          // Single category — flat grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {styles.map((style, i) => (
              <StyleCard key={style.id} style={style} index={i} locale={locale} />
            ))}
          </div>
        ) : (
          // All categories — grouped
          <div className="flex flex-col gap-14">
            {(Object.entries(CATEGORY_TEXT) as [StyleCategory, typeof CATEGORY_TEXT[StyleCategory]][]).map(
              ([catKey, catVal]) => {
                const catStyles = getStylesByCategory(catKey);
                if (catStyles.length === 0) return null;
                return (
                  <section key={catKey}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-xl text-primary">
                        {catVal.icon}
                      </span>
                      <div>
                        <h2 className="text-lg font-bold text-text-primary">
                        {catVal.zh}
                        </h2>
                        <p className="text-xs text-text-muted">{catVal.descriptionZh}</p>
                      </div>
                      <span className="ml-auto text-xs text-text-muted font-medium">
                        {catStyles.length} 种风格
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {catStyles.map((style, i) => (
                        <StyleCard key={style.id} style={style} index={i} locale={locale} />
                      ))}
                    </div>
                  </section>
                );
              }
            )}
          </div>
        )
      ) : (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-5xl text-text-muted/30 mb-4 block">
            search_off
          </span>
          <p className="text-lg font-bold text-text-secondary">{t.noResults}</p>
          <p className="text-sm text-text-muted mt-2">{t.noResultsHint}</p>
        </div>
      )}
    </div>
  );
}
