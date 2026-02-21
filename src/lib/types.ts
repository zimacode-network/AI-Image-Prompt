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

export const MODEL_LABELS: Record<ModelCategory, { zh: string; en: string; color: string }> = {
  gemini: { zh: "Gemini", en: "Gemini", color: "#4285f4" },
  midjourney: { zh: "Midjourney", en: "Midjourney", color: "#00d4aa" },
  "stable-diffusion": { zh: "Stable Diffusion", en: "SD/SDXL", color: "#a855f7" },
  flux: { zh: "FLUX", en: "FLUX", color: "#f97316" },
  "dall-e": { zh: "DALL-E", en: "DALL-E", color: "#10b981" },
  "chatgpt-image": { zh: "ChatGPT", en: "ChatGPT Image", color: "#6366f1" },
};
