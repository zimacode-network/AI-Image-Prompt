import { MetadataRoute } from "next";
import { getAllStyles, getAllExamples } from "@/lib/data";
import { getAwesomePromptCases } from "@/lib/awesome-prompts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prompt.hiapi.ai";

  const stylePages = getAllStyles().map((s) => ({
    url: `${baseUrl}/style/${s.id}`,
    lastModified: new Date(s.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const examplePages = getAllExamples().map((e) => ({
    url: `${baseUrl}/prompt/${e.id}`,
    lastModified: new Date(e.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const awesomeCases = getAwesomePromptCases();
  const gptImage2CasePages = awesomeCases.flatMap((item) => [
    {
      url: `${baseUrl}/gpt-image-2/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/gpt-image-2/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/styles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gpt-image-2`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/en/gpt-image-2`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    ...stylePages,
    ...examplePages,
    ...gptImage2CasePages,
  ];
}
