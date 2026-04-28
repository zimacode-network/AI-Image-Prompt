"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label = "复制",
  copiedLabel = "已复制",
  copiedLargeLabel = "已复制到剪贴板",
  large = false,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  copiedLargeLabel?: string;
  large?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (large) {
    return (
      <button
        onClick={handleCopy}
        className={`w-full flex items-center justify-center gap-2 h-14 rounded-2xl font-bold text-base transition-all duration-200 ${
          copied
            ? "bg-green-500 text-white"
            : "bg-primary text-white hover:bg-primary-hover"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">
          {copied ? "check" : "content_copy"}
        </span>
        {copied ? copiedLargeLabel : label}
      </button>
    );
  }

  return (
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
      {copied ? copiedLabel : label}
    </button>
  );
}
