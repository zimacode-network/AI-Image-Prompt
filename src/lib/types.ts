export interface Prompt {
  id: string;
  title_zh: string;
  title_en: string;
  prompt_text: string;
  prompt_zh: string;
  category_style: StyleCategory;
  category_scene: SceneCategory;
  category_model: ModelCategory;
  tags: string[];
  example_image_url: string;
  parameters: Record<string, string | number>;
  source_model: string;
  created_at: string;
}

export type StyleCategory =
  | "realistic"
  | "anime"
  | "oil-painting"
  | "3d-render"
  | "pixel-art"
  | "cyberpunk"
  | "fantasy"
  | "minimalist"
  | "retro"
  | "logo";

export type SceneCategory =
  | "portrait"
  | "landscape"
  | "product"
  | "architecture"
  | "character"
  | "concept-art"
  | "social-media"
  | "wallpaper";

export type ModelCategory =
  | "gemini"
  | "midjourney"
  | "stable-diffusion"
  | "flux"
  | "dall-e"
  | "chatgpt-image";

export const STYLE_LABELS: Record<StyleCategory, { zh: string; en: string; icon: string }> = {
  realistic: { zh: "写实/摄影", en: "Realistic", icon: "📷" },
  anime: { zh: "动漫/二次元", en: "Anime", icon: "🎌" },
  "oil-painting": { zh: "油画/艺术", en: "Oil Painting", icon: "🎨" },
  "3d-render": { zh: "3D 渲染", en: "3D Render", icon: "🧊" },
  "pixel-art": { zh: "像素风", en: "Pixel Art", icon: "👾" },
  cyberpunk: { zh: "赛博朋克", en: "Cyberpunk", icon: "🌃" },
  fantasy: { zh: "奇幻/魔幻", en: "Fantasy", icon: "🐉" },
  minimalist: { zh: "极简/扁平", en: "Minimalist", icon: "◻️" },
  retro: { zh: "复古/胶片", en: "Retro", icon: "📼" },
  logo: { zh: "Logo/图标", en: "Logo", icon: "✦" },
};

export const SCENE_LABELS: Record<SceneCategory, { zh: string; en: string; icon: string }> = {
  portrait: { zh: "人物肖像", en: "Portrait", icon: "👤" },
  landscape: { zh: "风景/场景", en: "Landscape", icon: "🏔" },
  product: { zh: "产品展示", en: "Product", icon: "📦" },
  architecture: { zh: "建筑/室内", en: "Architecture", icon: "🏛" },
  character: { zh: "角色设计", en: "Character", icon: "🧙" },
  "concept-art": { zh: "概念艺术", en: "Concept Art", icon: "💡" },
  "social-media": { zh: "社交媒体", en: "Social Media", icon: "📱" },
  wallpaper: { zh: "壁纸", en: "Wallpaper", icon: "🖼" },
};

export const MODEL_LABELS: Record<
  ModelCategory,
  {
    zh: string;
    en: string;
    color: string;
    description: string;
    version: string;
    tags: string[];
    openSource: boolean;
  }
> = {
  gemini: {
    zh: "Gemini",
    en: "Gemini",
    color: "#4285f4",
    description: "Google 的多模态 AI 模型，支持高质量图像生成与理解，擅长创意图像和复杂场景构建。",
    version: "2.0 Flash",
    tags: ["多模态", "高质量", "Google"],
    openSource: false,
  },
  midjourney: {
    zh: "Midjourney",
    en: "Midjourney",
    color: "#00d4aa",
    description: "行业领先的 AI 绘画工具，以极致的艺术性和美学表现力著称，适合概念艺术和创意设计。",
    version: "v6.1",
    tags: ["艺术性", "高美感", "Discord"],
    openSource: false,
  },
  "stable-diffusion": {
    zh: "Stable Diffusion",
    en: "SD/SDXL",
    color: "#a855f7",
    description: "最流行的开源图像生成模型，支持本地部署和高度自定义，社区生态丰富。",
    version: "SDXL 1.0",
    tags: ["开源", "可本地部署", "社区丰富"],
    openSource: true,
  },
  flux: {
    zh: "FLUX",
    en: "FLUX",
    color: "#f97316",
    description: "Black Forest Labs 推出的新一代模型，在文本渲染和细节表现上有突出优势。",
    version: "1.1 Pro",
    tags: ["文本渲染", "高细节", "新一代"],
    openSource: true,
  },
  "dall-e": {
    zh: "DALL-E",
    en: "DALL-E",
    color: "#10b981",
    description: "OpenAI 的图像生成模型，以出色的指令理解能力和创意表达能力著称。",
    version: "3",
    tags: ["指令理解", "创意表达", "OpenAI"],
    openSource: false,
  },
  "chatgpt-image": {
    zh: "ChatGPT",
    en: "ChatGPT Image",
    color: "#6366f1",
    description: "ChatGPT 内置的图像生成功能，支持对话式创作，可根据反馈迭代优化。",
    version: "4o",
    tags: ["对话创作", "迭代优化", "易用"],
    openSource: false,
  },
};
