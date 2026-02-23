export type StyleCategory =
  | "artistic"
  | "illustration"
  | "design"
  | "practical"
  | "theme";

export interface Attribution {
  source_platform?: string;
  source_url?: string;
  source_author?: string;
}

export interface StyleTemplate {
  id: string;
  name_zh: string;
  name_en: string;
  category: StyleCategory;
  description_zh: string;
  description_en: string;
  template_prompt: string;
  cover_image_url: string;
  tags: string[];
  attribution?: Attribution;
  created_at: string;
}

export interface StyleExample {
  id: string;
  style_id: string;
  title_zh: string;
  title_en: string;
  subject_zh: string;
  prompt_text: string;
  prompt_zh: string;
  example_image_url: string;
  aspect_ratio: string;
  tags: string[];
  created_at: string;
}

export const CATEGORY_LABELS: Record<StyleCategory, { zh: string; en: string; icon: string; description: string }> = {
  artistic: {
    zh: "艺术绘画",
    en: "Artistic Painting",
    icon: "palette",
    description: "传统绘画技法与艺术流派的数字化呈现",
  },
  illustration: {
    zh: "现代插画",
    en: "Modern Illustration",
    icon: "draw",
    description: "当代数字艺术与流行视觉风格",
  },
  design: {
    zh: "设计风格",
    en: "Design Styles",
    icon: "design_services",
    description: "平面设计、工艺美术与视觉实验",
  },
  practical: {
    zh: "实用模板",
    en: "Practical Templates",
    icon: "dashboard",
    description: "信息可视化与实用内容模板",
  },
  theme: {
    zh: "特定题材",
    en: "Themed Styles",
    icon: "auto_awesome",
    description: "特定主题与场景的专项风格",
  },
};
