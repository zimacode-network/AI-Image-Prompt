"use client";

export default function PromptCardActions({
  generateUrl,
}: {
  generateUrl: string;
}) {
  function handleGenerate(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = generateUrl;
    } else {
      window.open(generateUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 backdrop-blur text-charcoal text-xs font-bold">
        <span className="material-symbols-outlined text-[14px]">
          content_copy
        </span>
        快速复制
      </span>
      <button
        onClick={handleGenerate}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
      >
        <span className="material-symbols-outlined text-[14px]">
          open_in_new
        </span>
        去生成
      </button>
    </div>
  );
}
