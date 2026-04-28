import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prompt.hiapi.ai"),
  title: {
    default: "PromptStudio — AI 图像风格提示词工具站",
    template: "%s | PromptStudio",
  },
  description:
    "精选 34 种 AI 图像风格模板与 170+ 示例提示词。选择风格，搭配你的创意内容，一键生成精美图片。面向 Gemini、Midjourney、Stable Diffusion 等模型。",
  keywords: [
    "AI 图像提示词",
    "AI art prompts",
    "AI 绘画风格",
    "风格模板",
    "提示词模板",
    "AI image styles",
    "prompt templates",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "PromptStudio — AI 图像风格提示词工具站",
    description: "精选 34 种 AI 图像风格模板，选择风格搭配创意内容即可生成精美图片。",
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
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
