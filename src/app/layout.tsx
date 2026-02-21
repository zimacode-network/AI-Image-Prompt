import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PromptStudio — AI 绘画提示词工具站",
    template: "%s | PromptStudio",
  },
  description:
    "精选高质量 AI 绘画提示词，支持 Midjourney、Stable Diffusion、FLUX、Gemini、DALL-E 等模型。中英双语，一键复制，选词即出图。",
  keywords: [
    "AI 绘画提示词",
    "AI art prompts",
    "Midjourney 提示词",
    "Stable Diffusion 提示词",
    "AI 画图咒语",
    "提示词大全",
    "prompt gallery",
  ],
  openGraph: {
    title: "PromptStudio — AI 绘画提示词工具站",
    description: "精选高质量 AI 绘画提示词，中英双语，选词即出图。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Header />
        <main className="pt-[60px] min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
