"use client";

export default function GenerateButton({
  href,
  promptText,
  className,
  children,
}: {
  href: string;
  promptText: string;
  className?: string;
  children: React.ReactNode;
}) {
  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(promptText);
      } catch {
        // The prompt is also encoded in the URL, so navigation remains useful.
      }
    }
    window.location.href = href;
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
