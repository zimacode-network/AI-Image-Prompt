import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";
import StyleCard from "@/components/StyleCard";
import { getAllStyles, getStylesByCategory } from "@/lib/data";
import { CATEGORY_TEXT, UI_TEXT } from "@/lib/i18n";
import { StyleCategory } from "@/lib/types";

export default async function EnStylesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = "en";
  const t = UI_TEXT[locale];
  const params = await searchParams;
  const activeCategory = params.category as StyleCategory | undefined;
  const styles = activeCategory ? getStylesByCategory(activeCategory) : getAllStyles();
  const categoryLabel = activeCategory ? CATEGORY_TEXT[activeCategory]?.en : null;

  return (
    <div className="site-shell pt-10 pb-20">
      <div className="mb-10 animate-fade-in-up">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 animate-fade-in-up stagger-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            {categoryLabel ? (
              <><span className="text-primary">{categoryLabel}</span> styles</>
            ) : (
              <>All <span className="text-primary">styles</span></>
            )}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {activeCategory
              ? `${styles.length} templates in ${categoryLabel}`
              : `${styles.length} style templates, each with 5 examples`}
          </p>
        </div>
      </div>

      {styles.length > 0 ? (
        activeCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {styles.map((style, i) => (
              <StyleCard key={style.id} style={style} index={i} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-14">
            {(Object.entries(CATEGORY_TEXT) as [StyleCategory, typeof CATEGORY_TEXT[StyleCategory]][]).map(([catKey, catVal]) => {
              const catStyles = getStylesByCategory(catKey);
              if (catStyles.length === 0) return null;
              return (
                <section key={catKey}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-xl text-primary">{catVal.icon}</span>
                    <div>
                      <h2 className="text-lg font-bold text-text-primary">{catVal.en}</h2>
                      <p className="text-xs text-text-muted">{catVal.descriptionEn}</p>
                    </div>
                    <span className="ml-auto text-xs text-text-muted font-medium">
                      {catStyles.length} styles
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {catStyles.map((style, i) => (
                      <StyleCard key={style.id} style={style} index={i} locale={locale} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )
      ) : (
        <div className="text-center py-24">
          <span className="material-symbols-outlined text-5xl text-text-muted/30 mb-4 block">search_off</span>
          <p className="text-lg font-bold text-text-secondary">{t.noResults}</p>
          <p className="text-sm text-text-muted mt-2">{t.noResultsHint}</p>
        </div>
      )}
    </div>
  );
}
