import type { Metadata } from "next";
import type { AwesomePromptCase, AwesomePromptCategory } from "@/lib/awesome-prompts";

type Locale = "zh" | "en";

type PromptStats = {
  itemCount: number;
  categoryCount: number;
  updatedAt: string;
};

const SITE_URL = "https://prompt.hiapi.ai";
const SITE_NAME = "PromptStudio";
const MODEL_NAME = "GPT Image 2";
const HIAPI_MODEL_URL = "https://www.hiapi.ai/models/gpt-image-2-beta";

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number): string {
  const cleaned = cleanText(text);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trim()}…`;
}

function getCaseTitle(item: AwesomePromptCase, locale: Locale): string {
  return locale === "zh" ? item.title_zh : item.title_en;
}

function getCaseCategory(item: AwesomePromptCase, locale: Locale): string {
  return locale === "zh" ? item.category_zh : item.category_en;
}

function getHomeTitle(locale: Locale): string {
  return locale === "zh"
    ? "GPT Image 2 提示词案例库：真实效果图与完整 Prompt"
    : "GPT Image 2 Prompt Gallery and Examples";
}

function getHomeDescription(locale: Locale, stats: PromptStats): string {
  if (locale === "zh") {
    return `收录 ${stats.itemCount} 个 GPT Image 2 真实生成案例，覆盖海报插画、UI 与社交截图、角色设计、模型测试、人像摄影和社区精选。每个案例提供效果图、完整 Prompt、画面比例、来源链接和一键生成入口，适合快速复用、改写与对比模型效果。`;
  }

  return `Browse ${stats.itemCount} GPT Image 2 prompt examples with real outputs, complete prompts, aspect ratios, source links, and HiAPI generation shortcuts.`;
}

function getHomeKeywords(locale: Locale): string[] {
  return locale === "zh"
    ? [
        "GPT Image 2 提示词",
        "GPT Image 2 Prompt",
        "AI 图片提示词",
        "AI 图像案例",
        "海报插画提示词",
        "UI 截图生成",
        "角色设计提示词",
        "HiAPI GPT Image 2",
      ]
    : [
        "GPT Image 2 prompts",
        "GPT Image 2 prompt gallery",
        "AI image prompts",
        "image generation examples",
        "poster prompt examples",
        "UI mockup prompts",
        "character design prompts",
        "HiAPI GPT Image 2",
      ];
}

export function buildGptImage2HomeMetadata({
  locale,
  stats,
  featuredCase,
}: {
  locale: Locale;
  stats: PromptStats;
  featuredCase?: AwesomePromptCase;
}): Metadata {
  const path = locale === "zh" ? "/gpt-image-2" : "/en/gpt-image-2";
  const title = getHomeTitle(locale);
  const description = getHomeDescription(locale, stats);
  const imageUrl = absoluteUrl(
    featuredCase?.image_url || "/awesome-gpt-image-2/images/poster-case-1-boston-spring-2026-city-poster-by-bubblebrain.webp"
  );

  return {
    title,
    description,
    keywords: getHomeKeywords(locale),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        "zh-CN": `${SITE_URL}/gpt-image-2`,
        en: `${SITE_URL}/en/gpt-image-2`,
        "x-default": `${SITE_URL}/gpt-image-2`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1600,
          alt: featuredCase ? getCaseTitle(featuredCase, locale) : title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildGptImage2HomeJsonLd({
  locale,
  stats,
  categories,
  cases,
}: {
  locale: Locale;
  stats: PromptStats;
  categories: AwesomePromptCategory[];
  cases: AwesomePromptCase[];
}) {
  const path = locale === "zh" ? "/gpt-image-2" : "/en/gpt-image-2";
  const title = getHomeTitle(locale);
  const description = getHomeDescription(locale, stats);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: `${SITE_URL}${path}`,
    description,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "SoftwareApplication",
      name: MODEL_NAME,
      url: HIAPI_MODEL_URL,
      applicationCategory: "MultimediaApplication",
    },
    numberOfItems: stats.itemCount,
    keywords: getHomeKeywords(locale).join(", "),
    genre: categories.map((category) => (locale === "zh" ? category.zh : category.en)),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cases.length,
      itemListElement: cases.slice(0, 24).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${path}/${item.id}`,
        name: getCaseTitle(item, locale),
        image: absoluteUrl(item.image_url),
      })),
    },
  };
}

export function buildGptImage2CaseTitle(item: AwesomePromptCase, locale: Locale): string {
  const title = getCaseTitle(item, locale);
  const suffix = locale === "zh" ? " - GPT Image 2" : " | GPT Image 2";
  const maxTitleLength = 54 - suffix.length;
  return `${truncateText(title, maxTitleLength)}${suffix}`;
}

export function buildGptImage2CaseDescription(item: AwesomePromptCase, locale: Locale): string {
  const title = getCaseTitle(item, locale);
  const category = getCaseCategory(item, locale);
  const promptExcerpt = truncateText(item.prompt, locale === "zh" ? 76 : 96);

  if (locale === "zh") {
    return truncateText(
      `${title} 是 ${category} 类 GPT Image 2 提示词案例，画面比例 ${item.aspect_ratio}。查看真实效果图、完整 Prompt、作者来源、原帖链接和 HiAPI 生成入口。Prompt 摘要：${promptExcerpt}`,
      155
    );
  }

  return truncateText(
    `Explore "${title}", a GPT Image 2 ${category} prompt case in ${item.aspect_ratio}. View the real output, complete prompt, source attribution, original post, and HiAPI generation link. Prompt excerpt: ${promptExcerpt}`,
    165
  );
}

export function buildGptImage2CaseMetadata(
  item: AwesomePromptCase,
  locale: Locale
): Metadata {
  const path = locale === "zh" ? `/gpt-image-2/${item.id}` : `/en/gpt-image-2/${item.id}`;
  const title = buildGptImage2CaseTitle(item, locale);
  const description = buildGptImage2CaseDescription(item, locale);
  const imageUrl = absoluteUrl(item.image_url);
  const category = getCaseCategory(item, locale);

  return {
    title,
    description,
    keywords: [
      `${MODEL_NAME} Prompt`,
      `${MODEL_NAME} 提示词`,
      category,
      item.aspect_ratio,
      getCaseTitle(item, locale),
      item.author,
    ],
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        "zh-CN": `${SITE_URL}/gpt-image-2/${item.id}`,
        en: `${SITE_URL}/en/gpt-image-2/${item.id}`,
        "x-default": `${SITE_URL}/gpt-image-2/${item.id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "article",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1600,
          alt: getCaseTitle(item, locale),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildGptImage2CaseJsonLd(item: AwesomePromptCase, locale: Locale) {
  const path = locale === "zh" ? `/gpt-image-2/${item.id}` : `/en/gpt-image-2/${item.id}`;
  const collectionPath = locale === "zh" ? "/gpt-image-2" : "/en/gpt-image-2";
  const title = getCaseTitle(item, locale);
  const description = buildGptImage2CaseDescription(item, locale);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    headline: buildGptImage2CaseTitle(item, locale),
    url: `${SITE_URL}${path}`,
    description,
    image: absoluteUrl(item.image_url),
    inLanguage: item.prompt_language === "zh" ? "zh-CN" : "en",
    genre: getCaseCategory(item, locale),
    keywords: [MODEL_NAME, "prompt", getCaseCategory(item, locale), item.aspect_ratio].join(", "),
    creator: {
      "@type": "Person",
      name: item.author,
      url: item.author_url,
    },
    isPartOf: {
      "@type": "CollectionPage",
      name: getHomeTitle(locale),
      url: `${SITE_URL}${collectionPath}`,
    },
    about: {
      "@type": "SoftwareApplication",
      name: MODEL_NAME,
      url: HIAPI_MODEL_URL,
      applicationCategory: "MultimediaApplication",
    },
    associatedMedia: {
      "@type": "ImageObject",
      contentUrl: absoluteUrl(item.image_url),
      caption: title,
    },
    citation: item.source_url,
  };
}

export function buildGptImage2CaseBreadcrumbJsonLd(item: AwesomePromptCase, locale: Locale) {
  const collectionPath = locale === "zh" ? "/gpt-image-2" : "/en/gpt-image-2";
  const casePath = `${collectionPath}/${item.id}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "zh" ? "GPT Image 2 提示词案例库" : "GPT Image 2 Prompt Gallery",
        item: `${SITE_URL}${collectionPath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: getCaseTitle(item, locale),
        item: `${SITE_URL}${casePath}`,
      },
    ],
  };
}
