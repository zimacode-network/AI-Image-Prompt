"use client";

import { useState } from "react";

export default function TemplateBlock({ template }: { template: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Split template around {content} to highlight it
  const parts = template.split("{content}");

  return (
    <div className="rounded-2xl border border-border-default bg-bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-default bg-bg-surface/50">
        <span className="section-label">模板提示词</span>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
            copied
              ? "bg-green-500/10 text-green-600 border border-green-500/20"
              : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 hover:border-primary/30"
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {copied ? "check" : "content_copy"}
          </span>
          {copied ? "已复制" : "复制模板"}
        </button>
      </div>
      <div className="px-5 py-4 text-sm leading-relaxed text-text-secondary font-[family-name:var(--font-sans)]">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20">
              <span className="material-symbols-outlined text-[14px]">edit</span>
              {"{content}"}
            </span>
            {parts[1]}
          </>
        ) : (
          template
        )}
      </div>
      <div className="px-5 py-3 border-t border-border-default bg-bg-surface/30">
        <p className="text-xs text-text-muted">
          <span className="material-symbols-outlined text-[12px] mr-1 align-middle">info</span>
          将 <span className="text-primary font-bold">{"{content}"}</span> 替换为你的具体内容描述，然后复制完整提示词到 AI 图像生成工具中使用。
        </p>
      </div>
    </div>
  );
}
