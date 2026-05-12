const HIAPI_DRAW_URL =
  process.env.NEXT_PUBLIC_HIAPI_DRAW_URL || "https://www.hiapi.ai/draw";
const DEFAULT_MODEL =
  process.env.NEXT_PUBLIC_DEFAULT_DRAW_MODEL || "nano-banana-pro";

/**
 * Build a URL that jumps to hiapi.ai's image generation playground.
 *
 * @param promptText  Full prompt text
 * @param options.model       Target model ID (optional, defaults to env var)
 * @param options.aspectRatio Image aspect ratio e.g. "16:9" (optional)
 */
export function buildGenerateUrl(
  promptText: string,
  options?: { model?: string; aspectRatio?: string; source?: string }
): string {
  const encoded = Buffer.from(promptText, "utf-8").toString("base64");
  const params = new URLSearchParams({
    p: encoded,
    m: options?.model || DEFAULT_MODEL,
    utm_source: options?.source || "promptstudio",
  });
  if (options?.aspectRatio) params.set("s", options.aspectRatio);
  return `${HIAPI_DRAW_URL}?${params.toString()}`;
}
