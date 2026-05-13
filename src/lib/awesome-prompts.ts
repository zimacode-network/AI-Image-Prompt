import awesomeData from "@/data/awesome-gpt-image-2/prompts.json";
import { buildGenerateUrl } from "./generate-url";

export const AWESOME_REPO_URL = "https://github.com/HiAPIAI/awesome-gpt-image-2-prompts";
export const AWESOME_MODEL_ID = "gpt-image-2";

type AwesomeCategory = {
  id: string;
  zh: string;
  en: string;
  description_zh: string;
  description_en: string;
};

type AwesomePromptItem = {
  id: string;
  category: string;
  title_zh: string;
  title_en: string;
  source_url: string;
  author: string;
  author_url: string;
  image: string;
  aspect_ratio: string;
  prompt_language: string;
  prompt: string;
  case_number: number;
  source_title?: string;
  adapted_from?: string;
};

type AwesomePromptData = {
  name: string;
  model: string;
  updated_at: string;
  categories: AwesomeCategory[];
  items: AwesomePromptItem[];
};

const data = awesomeData as AwesomePromptData;

export type AwesomePromptCategory = AwesomeCategory;
type PublicAwesomePromptItem = Pick<
  AwesomePromptItem,
  | "id"
  | "category"
  | "title_zh"
  | "title_en"
  | "source_url"
  | "author"
  | "author_url"
  | "image"
  | "aspect_ratio"
  | "prompt_language"
  | "prompt"
  | "case_number"
>;

export type AwesomePromptCase = PublicAwesomePromptItem & {
  image_url: string;
  category_zh: string;
  category_en: string;
  category_description_zh: string;
  category_description_en: string;
  generate_url: string;
  github_url: string;
};

function toPublicImageUrl(image: string): string {
  return `/awesome-gpt-image-2/${image.replace(/^images\//, "images/")}`;
}

export function getAwesomePromptStats() {
  return {
    itemCount: data.items.length,
    categoryCount: data.categories.length,
    updatedAt: data.updated_at,
  };
}

export function getAwesomePromptCategories(): AwesomePromptCategory[] {
  return data.categories;
}

export function getAwesomePromptCases(): AwesomePromptCase[] {
  return data.items.map((item) => {
    const category = data.categories.find((entry) => entry.id === item.category);
    return {
      id: item.id,
      category: item.category,
      title_zh: item.title_zh,
      title_en: item.title_en,
      source_url: item.source_url,
      author: item.author,
      author_url: item.author_url,
      image: item.image,
      aspect_ratio: item.aspect_ratio,
      prompt_language: item.prompt_language,
      prompt: item.prompt,
      case_number: item.case_number,
      image_url: toPublicImageUrl(item.image),
      category_zh: category?.zh || item.category,
      category_en: category?.en || item.category,
      category_description_zh: category?.description_zh || "",
      category_description_en: category?.description_en || "",
      generate_url: buildGenerateUrl(item.prompt, {
        model: AWESOME_MODEL_ID,
        aspectRatio: item.aspect_ratio,
        source: "awesome-gpt-image-2-prompts",
      }),
      github_url: `${AWESOME_REPO_URL}#${item.id}`,
    };
  });
}

export function getFeaturedAwesomePromptCases(limit = 36): AwesomePromptCase[] {
  const priorityIds = [
    "community-xhs-03",
    "community-xhs-09",
    "community-xhs-02",
    "community-xhs-07",
    "community-reddit-10",
    "community-reddit-12",
    "community-reddit-08",
    "community-xhs-01",
    "poster-case-5-2026-spring-guangzhou-city-poster-by-liyueai",
    "ui-case-5-multi-platform-content-screenshots-by-mrlarus",
    "character-design-cases-case-2-persona5-character-reference-card-by-iamrednights",
    "comparison-case-33-multi-concept-battle-poster-set-by-joshesye",
  ];
  const cases = getAwesomePromptCases();
  const picked = priorityIds
    .map((id) => cases.find((item) => item.id === id))
    .filter((item): item is AwesomePromptCase => Boolean(item));
  return [...picked, ...cases.filter((item) => !priorityIds.includes(item.id))].slice(0, limit);
}
