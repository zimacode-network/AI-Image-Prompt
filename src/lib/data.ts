import { Prompt } from "./types";

export const prompts: Prompt[] = [
  {
    id: "cyberpunk-cityscape-neon",
    title_zh: "霓虹赛博城市夜景",
    title_en: "Neon Cyberpunk Cityscape",
    prompt_text:
      "A sprawling cyberpunk cityscape at night, drenched in neon lights of pink and cyan, towering skyscrapers with holographic advertisements, flying vehicles leaving light trails, rain-slicked streets reflecting the glow, ultra detailed, cinematic composition, volumetric fog, 8k resolution",
    prompt_zh:
      "夜晚的赛博朋克城市全景，被粉色和青色霓虹灯浸染，高耸的摩天大楼上投射全息广告，飞行器留下光尾迹，雨水浸湿的街道反射光芒，超精细，电影构图，体积雾，8K分辨率",
    category_style: "cyberpunk",
    category_scene: "landscape",
    category_model: "midjourney",
    tags: ["城市", "夜景", "霓虹", "赛博朋克", "科幻"],
    example_image_url: "https://picsum.photos/seed/cyber1/800/1100",
    parameters: { ar: "16:9", stylize: 750, quality: 2 },
    source_model: "Midjourney v6",
    created_at: "2026-02-20",
  },
  {
    id: "anime-girl-cherry-blossom",
    title_zh: "樱花树下的少女",
    title_en: "Anime Girl Under Cherry Blossoms",
    prompt_text:
      "A beautiful anime girl standing under a blooming cherry blossom tree, petals falling gently around her, soft pink and white color palette, detailed eyes with reflections, flowing hair caught in a breeze, school uniform, golden hour lighting, Studio Ghibli inspired art style, masterpiece quality",
    prompt_zh:
      "一位美丽的动漫少女站在盛开的樱花树下，花瓣轻轻飘落在她周围，柔和的粉白色调，眼中带有反射的精细眼部细节，被微风吹动的飘逸长发，校服，黄金时段光线，吉卜力工作室风格，杰作品质",
    category_style: "anime",
    category_scene: "portrait",
    category_model: "stable-diffusion",
    tags: ["动漫", "少女", "樱花", "吉卜力", "唯美"],
    example_image_url: "https://picsum.photos/seed/anime1/800/1000",
    parameters: { steps: 30, cfg_scale: 7, sampler: "DPM++ 2M Karras" },
    source_model: "SDXL + LoRA",
    created_at: "2026-02-19",
  },
  {
    id: "oil-painting-mountain-lake",
    title_zh: "群山环绕的湖泊 · 油画风",
    title_en: "Mountain Lake Oil Painting",
    prompt_text:
      "An impressionist oil painting of a serene mountain lake at dawn, thick textured brushstrokes visible on canvas, mist rising from the still water surface, pine trees along the shoreline, snow-capped peaks in the background, warm golden light breaking through clouds, palette knife technique, rich impasto texture, museum quality fine art",
    prompt_zh:
      "一幅印象派油画——黎明时分宁静的山间湖泊，画布上可见厚重的笔触纹理，薄雾从平静的水面升起，松树沿着岸线排列，背景中有雪山，温暖的金色光线穿透云层，调色刀技法，厚涂质感，博物馆级别的艺术品",
    category_style: "oil-painting",
    category_scene: "landscape",
    category_model: "dall-e",
    tags: ["油画", "印象派", "风景", "湖泊", "山脉"],
    example_image_url: "https://picsum.photos/seed/oil1/800/600",
    parameters: { size: "1792x1024", quality: "hd", style: "vivid" },
    source_model: "DALL-E 3",
    created_at: "2026-02-18",
  },
  {
    id: "3d-isometric-room",
    title_zh: "等距3D小房间 · 低多边形",
    title_en: "Isometric 3D Cozy Room",
    prompt_text:
      "Isometric 3D render of a cozy tiny room, low poly style, warm ambient lighting from a desk lamp, miniature bookshelf filled with colorful books, a small computer desk with glowing screen, potted plants on windowsill, soft shadows, pastel color palette, cute miniature furniture, tilt-shift effect, octane render, clean white background",
    prompt_zh:
      "等距视角的3D渲染温馨小房间，低多边形风格，台灯发出温暖环境光，迷你书架上排满彩色书籍，发光屏幕的小电脑桌，窗台上的盆栽植物，柔和阴影，粉彩色调，可爱的微型家具，移轴效果，Octane渲染，干净白色背景",
    category_style: "3d-render",
    category_scene: "architecture",
    category_model: "midjourney",
    tags: ["3D", "等距", "房间", "低多边形", "可爱"],
    example_image_url: "https://picsum.photos/seed/3d1/800/800",
    parameters: { ar: "1:1", stylize: 500, quality: 2 },
    source_model: "Midjourney v6",
    created_at: "2026-02-17",
  },
  {
    id: "pixel-art-forest-adventure",
    title_zh: "像素森林冒险",
    title_en: "Pixel Art Forest Adventure",
    prompt_text:
      "16-bit pixel art scene of an enchanted forest, a small adventurer character with a glowing sword standing at the entrance of a mysterious cave, fireflies illuminating the path, ancient trees with twisted roots, treasure chest partially hidden by foliage, retro game aesthetic, limited color palette, dithering effects, nostalgic RPG vibes",
    prompt_zh:
      "16位像素风格的魔法森林场景，一个手持发光剑的小冒险者站在神秘洞穴入口，萤火虫照亮小路，古老的扭曲树根，被树叶半遮掩的宝箱，复古游戏美学，有限色板，抖动效果，怀旧RPG氛围",
    category_style: "pixel-art",
    category_scene: "landscape",
    category_model: "stable-diffusion",
    tags: ["像素", "游戏", "森林", "冒险", "复古"],
    example_image_url: "https://picsum.photos/seed/pixel1/800/600",
    parameters: { steps: 25, cfg_scale: 8, sampler: "Euler a" },
    source_model: "SD 1.5 + Pixel LoRA",
    created_at: "2026-02-16",
  },
  {
    id: "realistic-portrait-golden-hour",
    title_zh: "黄金时段人像写真",
    title_en: "Golden Hour Portrait Photography",
    prompt_text:
      "Professional portrait photograph of a young woman, golden hour sunlight streaming through her hair creating a warm backlit glow, shallow depth of field with creamy bokeh background, natural freckles visible, wearing a linen shirt, warm earthy tones, shot on Canon EOS R5 with 85mm f/1.4 lens, editorial fashion photography style",
    prompt_zh:
      "专业人像摄影，一位年轻女性，黄金时段的阳光穿过她的头发营造温暖的逆光效果，浅景深配奶油般的虚化背景，可见自然雀斑，穿着亚麻衬衫，温暖的大地色调，Canon EOS R5搭配85mm f/1.4镜头拍摄，编辑时尚摄影风格",
    category_style: "realistic",
    category_scene: "portrait",
    category_model: "flux",
    tags: ["写实", "人像", "摄影", "黄金时段", "时尚"],
    example_image_url: "https://picsum.photos/seed/photo1/800/1100",
    parameters: { steps: 30, guidance: 3.5 },
    source_model: "FLUX.1 [dev]",
    created_at: "2026-02-15",
  },
  {
    id: "fantasy-dragon-castle",
    title_zh: "龙与城堡 · 奇幻史诗",
    title_en: "Dragon & Castle Fantasy Epic",
    prompt_text:
      "An epic fantasy scene of a massive dragon perched atop a gothic castle tower, wings spread wide against a stormy sunset sky, lightning crackling in the dark clouds, medieval army gathering below with torches and banners, dramatic perspective from ground level looking up, hyper detailed scales and armor, cinematic lighting with god rays, dark fantasy art style, 4k wallpaper quality",
    prompt_zh:
      "一个史诗级奇幻场景——一条巨龙栖息在哥特式城堡塔顶，翅膀在暴风雨日落天空中展开，闪电在乌云中闪烁，中世纪军队在下方手持火把和旗帜集结，从地面仰视的戏剧性视角，超精细的鳞甲细节，电影灯光配丁达尔光线，暗黑奇幻风格，4K壁纸品质",
    category_style: "fantasy",
    category_scene: "concept-art",
    category_model: "midjourney",
    tags: ["奇幻", "龙", "城堡", "史诗", "暗黑"],
    example_image_url: "https://picsum.photos/seed/dragon1/800/500",
    parameters: { ar: "21:9", stylize: 1000, quality: 2 },
    source_model: "Midjourney v6",
    created_at: "2026-02-14",
  },
  {
    id: "minimalist-logo-coffee",
    title_zh: "极简咖啡品牌 Logo",
    title_en: "Minimalist Coffee Brand Logo",
    prompt_text:
      "Minimalist logo design for an artisan coffee brand, single line art of a coffee cup with steam forming a mountain silhouette, clean geometric shapes, monochrome black on white, negative space design, scalable vector style, professional brand identity, Bauhaus influenced, Swiss design principles",
    prompt_zh:
      "极简主义手工咖啡品牌Logo设计，咖啡杯的线条画蒸汽形成山脉剪影，干净的几何形状，白底黑色单色调，负空间设计，可缩放矢量风格，专业品牌标识，包豪斯影响，瑞士设计原则",
    category_style: "logo",
    category_scene: "product",
    category_model: "dall-e",
    tags: ["Logo", "极简", "品牌", "咖啡", "设计"],
    example_image_url: "https://picsum.photos/seed/logo1/800/800",
    parameters: { size: "1024x1024", quality: "hd", style: "natural" },
    source_model: "DALL-E 3",
    created_at: "2026-02-13",
  },
  {
    id: "retro-film-tokyo-street",
    title_zh: "东京街头 · 复古胶片风",
    title_en: "Tokyo Street Retro Film Look",
    prompt_text:
      "Photograph of a quiet Tokyo side street at dusk, shot on expired Kodak Portra 400 film, visible grain and warm color shift, vintage vending machines glowing softly, overhead tangled power lines silhouetted against a pastel orange sky, a lone figure with an umbrella walking away, Japanese signage with neon kanji, nostalgic melancholic atmosphere, Fujifilm disposable camera aesthetic",
    prompt_zh:
      "黄昏时分东京安静的小巷照片，用过期柯达Portra 400胶片拍摄，可见颗粒感和暖色偏移，复古自动贩卖机柔和发光，头顶缠绕的电线在粉橙色天空下的剪影，一个撑伞的孤独身影渐行渐远，日文招牌和霓虹汉字，怀旧忧郁的氛围，富士一次性相机美学",
    category_style: "retro",
    category_scene: "landscape",
    category_model: "gemini",
    tags: ["复古", "胶片", "东京", "日本", "街拍"],
    example_image_url: "https://picsum.photos/seed/retro1/800/1100",
    parameters: { model: "gemini-3-pro-image-preview" },
    source_model: "Gemini 3 Pro Image",
    created_at: "2026-02-12",
  },
  {
    id: "product-sneaker-floating",
    title_zh: "悬浮运动鞋 · 产品摄影",
    title_en: "Floating Sneaker Product Shot",
    prompt_text:
      "Product photography of a futuristic sneaker floating in mid-air, dramatic studio lighting with rim light highlighting the shoe contours, dynamic splash of colorful paint and water droplets frozen in time around the shoe, gradient background transitioning from deep navy to electric blue, ultra sharp focus, commercial advertisement quality, hyper realistic materials and textures",
    prompt_zh:
      "未来感运动鞋的产品摄影——悬浮在半空中，戏剧性的工作室灯光用轮廓光勾勒鞋身，动态的彩色油漆飞溅和水滴定格在鞋子周围，背景从深海军蓝渐变到电光蓝，超清晰对焦，商业广告品质，超写实材质和纹理",
    category_style: "realistic",
    category_scene: "product",
    category_model: "flux",
    tags: ["产品", "运动鞋", "商业", "广告", "写实"],
    example_image_url: "https://picsum.photos/seed/shoe1/800/800",
    parameters: { steps: 28, guidance: 4 },
    source_model: "FLUX.1 [pro]",
    created_at: "2026-02-11",
  },
  {
    id: "anime-mecha-battle",
    title_zh: "机甲大战 · 热血动漫",
    title_en: "Mecha Battle Anime Scene",
    prompt_text:
      "Intense anime mecha battle scene, two giant robots clashing in mid-air above a destroyed city, energy beams and explosions everywhere, dynamic action pose with dramatic foreshortening, speed lines radiating from impact point, vibrant saturated colors with high contrast, detailed mechanical parts and battle damage, Gundam and Evangelion inspired design, wide cinematic shot",
    prompt_zh:
      "激烈的动漫机甲战斗场景，两台巨型机器人在被摧毁的城市上空中交锋，能量光束和爆炸遍布画面，充满冲击力的动作姿势配合戏剧性透视，从撞击点辐射的速度线，鲜艳饱和的高对比色彩，精细的机械零件和战损细节，高达和EVA风格设计，宽屏电影镜头",
    category_style: "anime",
    category_scene: "concept-art",
    category_model: "stable-diffusion",
    tags: ["动漫", "机甲", "战斗", "热血", "科幻"],
    example_image_url: "https://picsum.photos/seed/mecha1/800/450",
    parameters: { steps: 35, cfg_scale: 7.5, sampler: "DPM++ SDE Karras" },
    source_model: "SDXL + Anime LoRA",
    created_at: "2026-02-10",
  },
  {
    id: "3d-character-cute-cat",
    title_zh: "3D 可爱猫咪角色",
    title_en: "3D Cute Cat Character Design",
    prompt_text:
      "3D rendered character design of an adorable cartoon cat wearing a tiny chef hat and apron, holding a miniature whisk, large expressive eyes with sparkle highlights, round soft body proportions, Pixar-style subsurface scattering on fur, soft studio lighting, clean pastel background, turntable character sheet showing front and side view, Blender Cycles render quality",
    prompt_zh:
      "3D渲染的可爱卡通猫咪角色设计，戴着迷你厨师帽和围裙，手持微型搅拌器，大而富有表现力的眼睛带有闪光高光，圆润柔软的身体比例，皮克斯风格的毛发次表面散射，柔和工作室灯光，干净粉彩背景，展示正面和侧面的角色转盘图，Blender Cycles渲染品质",
    category_style: "3d-render",
    category_scene: "character",
    category_model: "midjourney",
    tags: ["3D", "角色", "猫咪", "可爱", "皮克斯"],
    example_image_url: "https://picsum.photos/seed/cat3d1/800/800",
    parameters: { ar: "1:1", stylize: 600, quality: 2 },
    source_model: "Midjourney v6",
    created_at: "2026-02-09",
  },
  {
    id: "cyberpunk-portrait-neon",
    title_zh: "霓虹少女 · 赛博朋克肖像",
    title_en: "Cyberpunk Neon Girl Portrait",
    prompt_text:
      "Close-up portrait of a cyberpunk woman with cybernetic eye implants glowing electric blue, half face illuminated by neon pink light and half in shadow, chrome and titanium facial augmentations, short asymmetric hair with holographic streaks, rain droplets on skin, neural interface ports visible behind ear, dark moody atmosphere, blade runner aesthetic, hyperrealistic digital art",
    prompt_zh:
      "赛博朋克女性的特写肖像，赛博义眼植入物发出电光蓝，半边脸被霓虹粉光照亮另一半在阴影中，铬和钛面部增强装置，带全息条纹的不对称短发，皮肤上的雨滴，耳后可见的神经接口，暗沉情绪氛围，银翼杀手美学，超写实数字艺术",
    category_style: "cyberpunk",
    category_scene: "portrait",
    category_model: "flux",
    tags: ["赛博朋克", "肖像", "霓虹", "科幻", "义体"],
    example_image_url: "https://picsum.photos/seed/cybgirl1/800/1000",
    parameters: { steps: 30, guidance: 3.5 },
    source_model: "FLUX.1 [dev]",
    created_at: "2026-02-08",
  },
  {
    id: "minimalist-interior-wabi-sabi",
    title_zh: "侘寂风室内 · 极简美学",
    title_en: "Wabi-Sabi Minimalist Interior",
    prompt_text:
      "Wabi-sabi inspired minimalist interior space, raw concrete walls with beautiful imperfections, single dried flower branch in a handmade ceramic vase, natural linen curtains filtering soft morning light, wooden floor with visible grain, a low Japanese-style platform bed, earthy neutral tones of beige, clay, and stone, quiet contemplative atmosphere, architectural photography with wide lens, Kinfolk magazine aesthetic",
    prompt_zh:
      "侘寂风格的极简室内空间，带有美丽瑕疵的清水混凝土墙壁，手工陶瓷花瓶中的一枝干花，天然亚麻窗帘过滤柔和的晨光，可见纹理的木地板，日式低矮平台床，米色、陶土色和石色的大地中性色调，安静沉思的氛围，广角建筑摄影，Kinfolk杂志美学",
    category_style: "minimalist",
    category_scene: "architecture",
    category_model: "gemini",
    tags: ["极简", "室内", "侘寂", "日式", "建筑"],
    example_image_url: "https://picsum.photos/seed/wabi1/800/550",
    parameters: { model: "gemini-3-pro-image-preview" },
    source_model: "Gemini 3 Pro Image",
    created_at: "2026-02-07",
  },
  {
    id: "fantasy-underwater-kingdom",
    title_zh: "海底王国 · 奇幻水下世界",
    title_en: "Underwater Fantasy Kingdom",
    prompt_text:
      "A breathtaking underwater fantasy kingdom, bioluminescent coral architecture forming grand palace structures, schools of exotic fish swimming through crystal arches, a mermaid queen sitting on a pearl throne, volumetric light rays penetrating the deep ocean, floating jellyfish lanterns, ancient ruins overgrown with sea life, iridescent color palette of teal, gold, and purple, concept art for an animated film",
    prompt_zh:
      "令人叹为观止的海底奇幻王国，生物发光的珊瑚建筑形成宏伟的宫殿结构，成群的异域鱼类穿过水晶拱门，美人鱼女王坐在珍珠王座上，体积光线穿透深海，漂浮的水母灯笼，被海洋生物覆盖的古代遗迹，青蓝、金色和紫色的虹彩色调，动画电影概念艺术",
    category_style: "fantasy",
    category_scene: "concept-art",
    category_model: "midjourney",
    tags: ["奇幻", "海底", "美人鱼", "王国", "概念艺术"],
    example_image_url: "https://picsum.photos/seed/underwater1/800/500",
    parameters: { ar: "16:9", stylize: 800, chaos: 20 },
    source_model: "Midjourney v6",
    created_at: "2026-02-06",
  },
  {
    id: "social-media-gradient-quote",
    title_zh: "渐变引言卡片 · 社交媒体",
    title_en: "Gradient Quote Card for Social Media",
    prompt_text:
      "Modern social media quote card design, clean typography of an inspirational quote centered on a fluid mesh gradient background blending from warm peach to soft lavender to sky blue, minimalist sans-serif font, subtle grain texture overlay, rounded corners, Instagram story format 9:16 aspect ratio, trendy 2026 graphic design style",
    prompt_zh:
      "现代社交媒体引言卡片设计，简洁排版的励志语录居中在流体网格渐变背景上——从暖桃色过渡到柔和薰衣草色到天蓝色，极简无衬线字体，微妙的噪点纹理叠加，圆角，Instagram故事格式9:16比例，2026年流行平面设计风格",
    category_style: "minimalist",
    category_scene: "social-media",
    category_model: "chatgpt-image",
    tags: ["社交媒体", "设计", "渐变", "引言", "Instagram"],
    example_image_url: "https://picsum.photos/seed/social1/450/800",
    parameters: {},
    source_model: "ChatGPT Image (GPT-4o)",
    created_at: "2026-02-05",
  },
  {
    id: "realistic-macro-dewdrop",
    title_zh: "露珠微距 · 自然摄影",
    title_en: "Macro Dewdrop Nature Photography",
    prompt_text:
      "Ultra macro photograph of a single morning dewdrop on a vibrant green leaf, the dewdrop acts as a natural lens refracting a tiny inverted image of the surrounding garden, extreme shallow depth of field, crystal clear water droplet with perfect surface tension, visible microscopic leaf texture, soft diffused natural lighting, Canon MP-E 65mm at 5x magnification, dreamy ethereal background bokeh",
    prompt_zh:
      "翠绿叶片上一颗晨露的超微距摄影，露珠如同天然镜头折射出周围花园的微小倒影，极浅景深，完美表面张力的晶莹水滴，可见的微观叶片纹理，柔和漫射自然光线，Canon MP-E 65mm镜头5倍放大，梦幻空灵的背景虚化",
    category_style: "realistic",
    category_scene: "landscape",
    category_model: "gemini",
    tags: ["微距", "写实", "自然", "露珠", "摄影"],
    example_image_url: "https://picsum.photos/seed/macro1/800/800",
    parameters: { model: "gemini-2.5-flash-image" },
    source_model: "Gemini 2.5 Flash Image",
    created_at: "2026-02-04",
  },
  {
    id: "oil-painting-abstract-emotion",
    title_zh: "情绪抽象 · 表现主义油画",
    title_en: "Abstract Expressionist Emotion",
    prompt_text:
      "Large scale abstract expressionist oil painting capturing the feeling of euphoria, bold sweeping gestural brushstrokes in cadmium red and cobalt blue, thick layers of paint creating dimensional texture, drips and splatters adding chaotic energy, areas of raw canvas showing through, inspired by Willem de Kooning and Franz Kline, gallery exhibition piece, dramatic side lighting emphasizing paint texture",
    prompt_zh:
      "大尺幅抽象表现主义油画——捕捉狂喜的情感，镉红和钴蓝的大胆挥洒笔触，厚重的颜料层次创造立体质感，滴落和飞溅增添混沌能量，局部露出未涂的画布，灵感来自德库宁和弗朗茨·克莱因，画廊展览级作品，戏剧性侧光强调颜料肌理",
    category_style: "oil-painting",
    category_scene: "wallpaper",
    category_model: "dall-e",
    tags: ["油画", "抽象", "表现主义", "情感", "艺术"],
    example_image_url: "https://picsum.photos/seed/abstract1/800/600",
    parameters: { size: "1792x1024", quality: "hd", style: "vivid" },
    source_model: "DALL-E 3",
    created_at: "2026-02-03",
  },
  {
    id: "pixel-art-space-station",
    title_zh: "太空站 · 像素风科幻",
    title_en: "Pixel Art Space Station",
    prompt_text:
      "Detailed pixel art of an orbital space station, visible through a large viewport window showing Earth below and stars beyond, interior with blinking control panels and holographic displays, an astronaut floating weightlessly, 32-bit color depth, subtle CRT scanline effect, sci-fi retro futurism, inspired by classic space simulation games, clean pixel perfect edges",
    prompt_zh:
      "精细的像素风太空空间站，透过大型舷窗可见下方地球和远方星辰，内部有闪烁的控制面板和全息显示屏，一名宇航员失重漂浮，32位色深，微妙的CRT扫描线效果，科幻复古未来主义，灵感来自经典太空模拟游戏，像素边缘干净利落",
    category_style: "pixel-art",
    category_scene: "concept-art",
    category_model: "stable-diffusion",
    tags: ["像素", "太空", "科幻", "游戏", "复古"],
    example_image_url: "https://picsum.photos/seed/space1/800/450",
    parameters: { steps: 30, cfg_scale: 9, sampler: "Euler a" },
    source_model: "SD 1.5 + Pixel LoRA",
    created_at: "2026-02-02",
  },
  {
    id: "retro-vinyl-record-cover",
    title_zh: "复古黑胶唱片封面",
    title_en: "Retro Vinyl Record Album Cover",
    prompt_text:
      "Vintage vinyl record album cover design from the 1970s, psychedelic lettering with rainbow chrome effect, surreal landscape with melting clocks and floating geometric shapes, warm analog color palette with faded edges, visible print texture and slight color misregistration, inspired by Roger Dean and Hipgnosis, square format, authentic vintage print quality",
    prompt_zh:
      "1970年代复古黑胶唱片封面设计，带彩虹镀铬效果的迷幻字体，融化时钟和漂浮几何形状的超现实景观，温暖的模拟色调带褪色边缘，可见印刷纹理和轻微套色偏移，灵感来自Roger Dean和Hipgnosis，正方形格式，真实的复古印刷品质",
    category_style: "retro",
    category_scene: "wallpaper",
    category_model: "midjourney",
    tags: ["复古", "唱片", "迷幻", "70年代", "设计"],
    example_image_url: "https://picsum.photos/seed/vinyl1/800/800",
    parameters: { ar: "1:1", stylize: 750, quality: 2 },
    source_model: "Midjourney v6",
    created_at: "2026-02-01",
  },
  {
    id: "logo-geometric-tech",
    title_zh: "科技公司几何 Logo",
    title_en: "Geometric Tech Company Logo",
    prompt_text:
      "Modern geometric logo mark for an AI technology company, abstract interconnected hexagons forming a neural network pattern, gradient from electric blue to cyan, clean vector style, works on both light and dark backgrounds, silicon valley aesthetic, professional corporate identity, flat design with subtle depth through overlapping transparent shapes",
    prompt_zh:
      "AI科技公司的现代几何Logo标志，抽象互联的六边形构成神经网络图案，从电光蓝到青色的渐变，干净的矢量风格，在亮色和暗色背景上都适用，硅谷美学，专业企业标识，通过重叠透明形状实现微妙深度的扁平设计",
    category_style: "logo",
    category_scene: "product",
    category_model: "chatgpt-image",
    tags: ["Logo", "几何", "科技", "AI", "企业"],
    example_image_url: "https://picsum.photos/seed/techlogo1/800/800",
    parameters: {},
    source_model: "ChatGPT Image (GPT-4o)",
    created_at: "2026-01-31",
  },
  {
    id: "anime-sunset-rooftop",
    title_zh: "屋顶上的夕阳 · 治愈动漫",
    title_en: "Anime Sunset Rooftop Scene",
    prompt_text:
      "Peaceful anime scene of two friends sitting on a school rooftop at sunset, legs dangling over the edge, warm orange and pink sky with scattered clouds, distant city skyline silhouette, empty soda cans beside them, gentle wind blowing their hair, nostalgic summer feeling, Makoto Shinkai color palette and lighting style, detailed cloud formations, emotional and serene atmosphere",
    prompt_zh:
      "宁静的动漫场景——两个朋友日落时坐在学校屋顶上，双腿悬在边缘，温暖的橙粉色天空中散布云朵，远处城市天际线剪影，旁边放着空汽水罐，微风吹动头发，怀旧夏日感觉，新海诚的色彩和光线风格，精细的云层构造，感性而宁静的氛围",
    category_style: "anime",
    category_scene: "landscape",
    category_model: "stable-diffusion",
    tags: ["动漫", "夕阳", "青春", "治愈", "新海诚"],
    example_image_url: "https://picsum.photos/seed/rooftop1/800/450",
    parameters: { steps: 28, cfg_scale: 7, sampler: "DPM++ 2M Karras" },
    source_model: "SDXL + Anime LoRA",
    created_at: "2026-01-30",
  },
  {
    id: "3d-food-donut",
    title_zh: "3D 甜甜圈 · 美食渲染",
    title_en: "3D Donut Food Render",
    prompt_text:
      "Hyper realistic 3D render of a gourmet donut, glossy chocolate glaze dripping down the sides, colorful sprinkles scattered on top, soft dough texture visible where the glaze parts, floating crumbs and sugar particles in the air, dramatic spotlight from above, shallow depth of field, dark moody background, food photography style, Blender Cycles render with subsurface scattering",
    prompt_zh:
      "超写实3D渲染美食甜甜圈，光泽巧克力糖衣沿侧面滴落，顶部散布彩色糖珠，糖衣缝隙处可见柔软面团纹理，空气中漂浮的碎屑和糖粒，从上方打下的戏剧性聚光灯，浅景深，暗调背景，美食摄影风格，Blender Cycles渲染配次表面散射",
    category_style: "3d-render",
    category_scene: "product",
    category_model: "chatgpt-image",
    tags: ["3D", "美食", "甜甜圈", "渲染", "写实"],
    example_image_url: "https://picsum.photos/seed/donut1/800/800",
    parameters: {},
    source_model: "ChatGPT Image (GPT-4o)",
    created_at: "2026-01-29",
  },
  {
    id: "realistic-architecture-brutalist",
    title_zh: "野兽派建筑 · 建筑摄影",
    title_en: "Brutalist Architecture Photography",
    prompt_text:
      "Dramatic architectural photograph of a brutalist concrete building, strong geometric shapes creating deep shadows, late afternoon sunlight casting long diagonal shadows across the raw concrete facade, a single red umbrella providing color contrast, shot from a low angle emphasizing the monumental scale, high contrast black and white with selective red color, Tadao Ando meets Le Corbusier aesthetic",
    prompt_zh:
      "野兽派混凝土建筑的戏剧性建筑摄影，强烈的几何形状创造深邃阴影，午后阳光在清水混凝土立面上投下长长的斜影，一把红色雨伞提供色彩对比，低角度拍摄强调纪念碑般的尺度，高对比黑白照片配选择性红色，安藤忠雄遇见柯布西耶的美学",
    category_style: "realistic",
    category_scene: "architecture",
    category_model: "gemini",
    tags: ["建筑", "野兽派", "摄影", "几何", "混凝土"],
    example_image_url: "https://picsum.photos/seed/brutal1/800/1100",
    parameters: { model: "gemini-3-pro-image-preview" },
    source_model: "Gemini 3 Pro Image",
    created_at: "2026-01-28",
  },
];

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function getPromptsByFilter(filters: {
  style?: string;
  scene?: string;
  model?: string;
  tag?: string;
}): Prompt[] {
  return prompts.filter((p) => {
    if (filters.style && p.category_style !== filters.style) return false;
    if (filters.scene && p.category_scene !== filters.scene) return false;
    if (filters.model && p.category_model !== filters.model) return false;
    if (filters.tag && !p.tags.includes(filters.tag)) return false;
    return true;
  });
}

export function getRelatedPrompts(prompt: Prompt, limit = 4): Prompt[] {
  return prompts
    .filter(
      (p) =>
        p.id !== prompt.id &&
        (p.category_style === prompt.category_style ||
          p.category_scene === prompt.category_scene)
    )
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  prompts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
