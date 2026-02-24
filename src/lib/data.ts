import { StyleTemplate, StyleExample, StyleCategory } from "./types";
import { allStyles } from "@/data/styles";
import { allExamples } from "@/data/examples";

// ─── Style queries ────────────────────────────────────────────

export function getAllStyles(): StyleTemplate[] {
  return allStyles;
}

export function getStyleById(id: string): StyleTemplate | undefined {
  return allStyles.find((s) => s.id === id);
}

export function getStylesByCategory(cat: StyleCategory): StyleTemplate[] {
  return allStyles.filter((s) => s.category === cat);
}

// ─── Example queries ──────────────────────────────────────────

export function getAllExamples(): StyleExample[] {
  return allExamples;
}

export function getExampleById(id: string): StyleExample | undefined {
  return allExamples.find((e) => e.id === id);
}

export function getExamplesByStyleId(styleId: string): StyleExample[] {
  return allExamples.filter((e) => e.style_id === styleId);
}

// ─── Relationship helpers ─────────────────────────────────────

export function getRelatedExamples(example: StyleExample, limit = 4): StyleExample[] {
  // First try same style, then same tags
  const sameStyle = allExamples.filter(
    (e) => e.id !== example.id && e.style_id === example.style_id
  );

  if (sameStyle.length >= limit) return sameStyle.slice(0, limit);

  const otherExamples = allExamples.filter(
    (e) =>
      e.id !== example.id &&
      e.style_id !== example.style_id &&
      e.tags.some((t) => example.tags.includes(t))
  );

  return [...sameStyle, ...otherExamples].slice(0, limit);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  allExamples.forEach((e) => e.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

// ─── Featured / curated ───────────────────────────────────────

export function getFeaturedStyles(limit = 8): StyleTemplate[] {
  // Pick a diverse set across categories
  const picks: StyleTemplate[] = [];
  const categories: StyleCategory[] = ["artistic", "illustration", "design", "practical", "theme"];
  let idx = 0;
  while (picks.length < limit) {
    const cat = categories[idx % categories.length];
    const catStyles = allStyles.filter(
      (s) => s.category === cat && !picks.some((p) => p.id === s.id)
    );
    if (catStyles.length > 0) {
      picks.push(catStyles[0]);
    }
    idx++;
    if (idx > limit * 3) break; // safety
  }
  return picks;
}

export function getFeaturedExamples(
  limit = 8,
  excludeStyleIds: string[] = []
): StyleExample[] {
  // Hand-picked visually striking examples, avoiding overlap with featured style covers
  const curatedIds = [
    "cyberpunk-cyber-girl",
    "oil-painting-flower-bouquet",
    "anime-sunset-rooftop-scene",
    "ukiyo-e-geisha-portrait",
    "fantasy-dragon-lair",
    "watercolor-rainy-street",
    "steampunk-clockwork-robot",
    "pixel-art-cozy-room",
    "concept-art-alien-planet",
    "claymation-bakery-shop",
    "pop-art-classic-car",
    "photography-street-photography",
  ];

  const result: StyleExample[] = [];
  for (const id of curatedIds) {
    if (result.length >= limit) break;
    const ex = allExamples.find((e) => e.id === id);
    if (ex && !excludeStyleIds.includes(ex.style_id)) {
      result.push(ex);
    }
  }

  // Fallback: fill remaining slots with non-first examples from diverse styles
  if (result.length < limit) {
    const usedStyleIds = new Set(result.map((e) => e.style_id));
    for (const style of allStyles) {
      if (result.length >= limit) break;
      if (usedStyleIds.has(style.id) || excludeStyleIds.includes(style.id)) continue;
      const examples = getExamplesByStyleId(style.id);
      if (examples.length > 1) {
        result.push(examples[1]);
        usedStyleIds.add(style.id);
      }
    }
  }

  return result;
}
