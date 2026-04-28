"use client";

import { useState } from "react";
import { Locale, UI_TEXT } from "@/lib/i18n";

const DRAW_URL =
  process.env.NEXT_PUBLIC_HIAPI_DRAW_URL || "https://www.hiapi.ai/draw";
const DEFAULT_MODEL =
  process.env.NEXT_PUBLIC_DEFAULT_DRAW_MODEL || "nano-banana-pro";

/** Unicode-safe base64 encoding (works in browser) */
function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  const binary = Array.from(bytes, (b) => String.fromCodePoint(b)).join("");
  return btoa(binary);
}

export default function TemplateBlock({ template, locale = "zh" }: { template: string; locale?: Locale }) {
  const [copied, setCopied] = useState(false);
  const [userContent, setUserContent] = useState("");
  const t = UI_TEXT[locale];

  const hasContent = userContent.trim().length > 0;

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
  }

  async function handleCopy() {
    await copyText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const finalPrompt = hasContent
    ? template.replace("{content}", userContent.trim())
    : template;
  const generateUrl = `${DRAW_URL}?${new URLSearchParams({
    p: encodeBase64(finalPrompt),
    m: DEFAULT_MODEL,
    utm_source: "promptstudio",
  }).toString()}`;

  async function handleGenerate(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await copyText(finalPrompt);
    } catch {
      // Continue to HiAPI even if clipboard permission is denied.
    }
    window.location.href = generateUrl;
  }

  // Split template around {content} to highlight it
  const parts = template.split("{content}");

  return (
    <div className="rounded-2xl border border-border-default bg-bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-default bg-bg-surface/50">
        <span className="section-label">{t.templatePrompt}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
              copied
                ? "bg-green-500/10 text-green-600 border border-green-500/20"
                : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 hover:border-primary/30"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? t.copied : hasContent ? t.copyPrompt : t.copyTemplate}
          </button>
          <button
            onClick={handleGenerate}
            className="inline-flex cursor-pointer items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            {t.generate}
          </button>
        </div>
      </div>
      {/* User content input */}
      <div className="px-5 py-3 border-b border-border-default bg-bg-surface/30">
        <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-2">
          <span className="material-symbols-outlined text-[14px] text-primary">edit</span>
          {t.userContent}
        </label>
        <input
          type="text"
          value={userContent}
          onChange={(e) => setUserContent(e.target.value)}
          placeholder={t.userContentPlaceholder}
          className="w-full px-3.5 py-2.5 rounded-xl border border-border-default bg-bg-card text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
        />
      </div>
      {/* Template preview */}
      <div className="px-5 py-4 text-sm leading-relaxed text-text-secondary font-[family-name:var(--font-sans)]">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            {hasContent ? (
              <span className="inline px-1.5 py-0.5 mx-0.5 rounded-md bg-primary/15 text-primary font-bold">
                {userContent.trim()}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20">
                <span className="material-symbols-outlined text-[14px]">edit</span>
                {"{content}"}
              </span>
            )}
            {parts[1]}
          </>
        ) : (
          template
        )}
      </div>
      <div className="px-5 py-3 border-t border-border-default bg-bg-surface/30">
        <p className="text-xs text-text-muted">
          <span className="material-symbols-outlined text-[12px] mr-1 align-middle">info</span>
          {hasContent
            ? locale === "zh"
              ? "点击「复制提示词」即可获得替换后的完整提示词，直接粘贴到 AI 图像生成工具中使用。"
              : "Copy the completed prompt and paste it into your AI image generator."
            : locale === "zh"
              ? <>将 <span className="text-primary font-bold">{"{content}"}</span> 替换为你的具体内容描述，然后复制完整提示词到 AI 图像生成工具中使用。</>
              : <>Replace <span className="text-primary font-bold">{"{content}"}</span> with your subject, then copy the full prompt into an AI image generator.</>
          }
        </p>
      </div>
    </div>
  );
}
