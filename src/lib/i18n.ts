import { StyleCategory, StyleExample, StyleTemplate } from "./types";

export type Locale = "zh" | "en";

export const LOCALES: Locale[] = ["zh", "en"];

export function normalizeLocale(locale?: string): Locale {
  return locale === "en" ? "en" : "zh";
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname.split("/").filter(Boolean)[0] === "en" ? "en" : "zh";
}

export function stripLocale(pathname: string): string {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (first === "zh" || first === "en") {
    return rest.length ? `/${rest.join("/")}` : "/";
  }
  return pathname || "/";
}

export function localizePath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === "zh") return cleanPath;
  if (cleanPath === "/") return "/en";
  return `/${locale}${cleanPath}`;
}

export function localizeHref(href: string, locale: Locale): string {
  if (href.startsWith("http") || href.startsWith("#")) return href;
  return localizePath(stripLocale(href), locale);
}

export function getStyleName(style: StyleTemplate, locale: Locale): string {
  return locale === "en" ? style.name_en : style.name_zh;
}

export function getStyleDescription(style: StyleTemplate, locale: Locale): string {
  return locale === "en" ? style.description_en : style.description_zh;
}

export function getExampleTitle(example: StyleExample, locale: Locale): string {
  return locale === "en" ? example.title_en : example.title_zh;
}

export function getExampleSubtitle(example: StyleExample, locale: Locale): string {
  return locale === "en" ? "" : example.title_en;
}

export function getExamplePrompt(example: StyleExample, locale: Locale): string {
  return locale === "en" ? example.prompt_text : example.prompt_zh;
}

export function getLocalizedTemplate(style: StyleTemplate, locale: Locale): string {
  if (locale === "en") return style.template_prompt;

  return `请以「${style.name_zh}」风格创作一张关于 {content} 的图片。${style.description_zh} 画面需要有清晰主体、完整构图、统一色彩和精致细节，适合作为高质量 AI 图像生成提示词使用。`;
}

export const CATEGORY_TEXT: Record<
  StyleCategory,
  { zh: string; en: string; icon: string; descriptionZh: string; descriptionEn: string }
> = {
  artistic: {
    zh: "艺术绘画",
    en: "Artistic Painting",
    icon: "palette",
    descriptionZh: "传统绘画技法与艺术流派的数字化呈现",
    descriptionEn: "Digital interpretations of classic painting techniques and art movements.",
  },
  illustration: {
    zh: "现代插画",
    en: "Modern Illustration",
    icon: "draw",
    descriptionZh: "当代数字艺术与流行视觉风格",
    descriptionEn: "Contemporary digital art and popular visual styles.",
  },
  design: {
    zh: "设计风格",
    en: "Design Styles",
    icon: "design_services",
    descriptionZh: "平面设计、工艺美术与视觉实验",
    descriptionEn: "Graphic design, craft aesthetics, and visual experiments.",
  },
  practical: {
    zh: "实用模板",
    en: "Practical Templates",
    icon: "dashboard",
    descriptionZh: "信息可视化与实用内容模板",
    descriptionEn: "Reusable templates for information design and practical content.",
  },
  theme: {
    zh: "特定题材",
    en: "Themed Styles",
    icon: "auto_awesome",
    descriptionZh: "特定主题与场景的专项风格",
    descriptionEn: "Specialized styles for specific subjects and scenes.",
  },
};

export const UI_TEXT = {
  zh: {
    all: "全部",
    allStyles: "全部风格",
    browse: "浏览",
    browseAll: "探索全部",
    categoryStyleSuffix: "风格",
    copy: "复制",
    copied: "已复制",
    copiedToClipboard: "已复制到剪贴板",
    copyPrompt: "复制提示词",
    copyTemplate: "复制模板",
    examples: "示例",
    featuredExamples: "精选示例",
    featuredStyles: "风格精选",
    generate: "去生成",
    home: "首页",
    inspiration: "灵感库",
    resources: "资源",
    noResults: "没有找到匹配的风格",
    noResultsHint: "试试其他分类",
    prompt: "提示词",
    related: "相似风格推荐",
    recommended: "推荐",
    searchPlaceholder: "搜索风格模板...",
    style: "风格",
    styleGallery: "风格画廊",
    templatePrompt: "模板提示词",
    userContent: "输入你的内容",
    userContentPlaceholder: "描述你想生成的内容，如：一只在花丛中的猫咪",
    viewStyle: "查看风格",
  },
  en: {
    all: "All",
    allStyles: "All styles",
    browse: "Browse",
    browseAll: "Explore all",
    categoryStyleSuffix: "styles",
    copy: "Copy",
    copied: "Copied",
    copiedToClipboard: "Copied",
    copyPrompt: "Copy prompt",
    copyTemplate: "Copy template",
    examples: "examples",
    featuredExamples: "Featured examples",
    featuredStyles: "Featured styles",
    generate: "Generate",
    home: "Home",
    inspiration: "Inspiration",
    resources: "Resources",
    noResults: "No matching styles found",
    noResultsHint: "Try another category",
    prompt: "Prompt",
    related: "Similar examples",
    recommended: "Recommended",
    searchPlaceholder: "Search style templates...",
    style: "Style",
    styleGallery: "Style gallery",
    templatePrompt: "Template prompt",
    userContent: "Your subject",
    userContentPlaceholder: "Describe what you want, e.g. a cat sitting in flowers",
    viewStyle: "View style",
  },
} satisfies Record<Locale, Record<string, string>>;
