"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localizePath, UI_TEXT } from "@/lib/i18n";

export default function Footer() {
  const locale = getLocaleFromPathname(usePathname());
  const t = UI_TEXT[locale];

  return (
    <footer className="mt-20 border-t border-border-default bg-bg-card">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + description */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-2xl text-primary">flare</span>
              <span className="text-lg font-bold tracking-tight text-text-primary">
                Prompt<span className="text-primary">Studio</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              {locale === "zh"
                ? "AI 图像风格提示词工具站 — 精选风格模板，一键复制，搭配你的创意内容即可生成精美图片。"
                : "An AI image prompt library with curated style templates, ready to copy and adapt for your ideas."}
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-primary">
              {t.browse}
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-text-muted">
              <li>
                <Link href={localizePath("/styles", locale)} className="hover:text-primary transition-colors">
                  {t.allStyles}
                </Link>
              </li>
              <li>
                <Link href={`${localizePath("/styles", locale)}?category=artistic`} className="hover:text-primary transition-colors">
                  {locale === "zh" ? "艺术绘画" : "Artistic Painting"}
                </Link>
              </li>
              <li>
                <Link href={`${localizePath("/styles", locale)}?category=illustration`} className="hover:text-primary transition-colors">
                  {locale === "zh" ? "现代插画" : "Modern Illustration"}
                </Link>
              </li>
              <li>
                <Link href={`${localizePath("/styles", locale)}?category=practical`} className="hover:text-primary transition-colors">
                  {locale === "zh" ? "实用模板" : "Practical Templates"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-primary">
              {locale === "zh" ? "社区" : "Community"}
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-text-muted">
              <li>
                <a
                  href="https://github.com/HiAPIAI/awesome-gpt-image-2-prompts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {locale === "zh" ? "GPT Image 2 提示词库" : "GPT Image 2 prompt library"}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-widest text-text-primary">
              {locale === "zh" ? "保持灵感" : "Stay inspired"}
            </h4>
            <p className="text-xs text-text-muted mb-4">
              {locale === "zh"
                ? "加入创作者社区，获取每周精选风格推荐。"
                : "Get curated style recommendations for your next image idea."}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={locale === "zh" ? "输入邮箱地址" : "Email address"}
                className="flex-1 rounded-xl border border-border-default bg-bg-surface px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
              />
              <button className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-hover transition-colors">
                {locale === "zh" ? "订阅" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border-default flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-text-muted">
            &copy; {new Date().getFullYear()} PromptStudio. {locale === "zh" ? "保留所有权利。" : "All rights reserved."}
          </p>
          <div className="flex gap-5">
            <a
              href="https://github.com/HiAPIAI/awesome-gpt-image-2-prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors"
              aria-label="GitHub prompt library"
            >
              <span className="material-symbols-outlined text-lg">code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
