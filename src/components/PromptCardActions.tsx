"use client";

export default function PromptCardActions({
  generateUrl,
  promptText,
  copyLabel = "快速复制",
  generateLabel = "去生成",
}: {
  generateUrl: string;
  promptText: string;
  copyLabel?: string;
  generateLabel?: string;
}) {
  async function copyPrompt() {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(promptText);
    } catch {
      // Navigation should still work if clipboard permission is denied.
    }
  }

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await copyPrompt();
  }

  async function handleGenerate(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    await copyPrompt();
    window.location.href = generateUrl;
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur text-charcoal text-xs font-bold"
      >
        <span className="material-symbols-outlined text-[14px]">
          content_copy
        </span>
        {copyLabel}
      </button>
      <button
        type="button"
        onClick={handleGenerate}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
      >
        <span className="material-symbols-outlined text-[14px]">
          open_in_new
        </span>
        {generateLabel}
      </button>
    </div>
  );
}
