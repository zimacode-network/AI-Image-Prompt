"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { StyleTemplate } from "@/lib/types";
import { getStyleName, localizePath, Locale, UI_TEXT } from "@/lib/i18n";

interface CarouselStyle extends StyleTemplate {
  exampleCount: number;
}

export default function StyleCarousel({ styles, locale = "zh" }: { styles: CarouselStyle[]; locale?: Locale }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const t = UI_TEXT[locale];

  /* ---- helpers ---- */
  const getStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 300;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return 300;
    // card width + gap (parsed from the container's column-gap)
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    return card.offsetWidth + gap;
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollBy({
        left: direction === "left" ? -getStep() : getStep(),
        behavior: "smooth",
      });
    },
    [getStep],
  );

  /* ---- auto-play ---- */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isPaused) return;

    const timer = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      // if we've reached the end, loop back
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: getStep(), behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, getStep]);

  return (
    <section className="site-shell pt-4 pb-8">
      {/* header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <span className="section-label">{t.featuredStyles}</span>
          <h2 className="text-2xl font-bold text-text-primary mt-1">
            {locale === "zh" ? "热门风格推荐" : "Popular style templates"}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-strong transition-colors"
            aria-label="Previous"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-lg border border-border-default flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-strong transition-colors"
            aria-label="Next"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* track */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="carousel-track flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory"
      >
        {styles.map((style) => (
          <Link
            key={style.id}
            href={localizePath(`/style/${style.id}`, locale)}
            data-card=""
            className="group flex-none w-[80%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)] snap-start"
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={style.cover_image_url}
                alt={getStyleName(style, locale)}
                className="w-full block aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-lg bg-white/90 backdrop-blur-sm text-charcoal">
                {style.exampleCount} {t.examples}
              </span>
            </div>
            <div className="pt-3 px-0.5">
              <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                {getStyleName(style, locale)}
              </h3>
              <p className="text-xs text-text-muted mt-0.5 uppercase tracking-wider">
                {style.name_en}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
