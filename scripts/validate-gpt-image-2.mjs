#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const pageFiles = [
  "src/app/gpt-image-2/page.tsx",
  "src/app/en/gpt-image-2/page.tsx",
];

for (const file of pageFiles) {
  const content = read(file);

  // Check for forbidden imports and usage (not as substring)
  if (content.includes("from \"@/components/PromptCard\"") || content.includes("from '@/components/PromptCard'")) {
    fail(`${file} still mixes GPT Image 2 gallery with PromptStudio style-template flow: PromptCard import`);
  }
  if (content.match(/<PromptCard\s/)) {
    fail(`${file} still mixes GPT Image 2 gallery with PromptStudio style-template flow: PromptCard usage`);
  }

  for (const forbidden of [
    "StyleCarousel",
    "CATEGORY_TEXT",
    "curatedExampleIds",
    "getAllExamples",
    "getFeaturedStyles",
    "/styles?category=",
  ]) {
    if (content.includes(forbidden)) {
      fail(`${file} still mixes GPT Image 2 gallery with PromptStudio style-template flow: ${forbidden}`);
    }
  }

  for (const required of [
    "getAwesomePromptCases",
    "getAwesomePromptCategories",
    "AwesomePromptCard",
    "buildGptImage2HomeMetadata",
    "buildGptImage2HomeJsonLd",
    "searchParams",
    "category",
    ".filter((item)",
  ]) {
    if (!content.includes(required)) {
      fail(`${file} is missing the image2 gallery source: ${required}`);
    }
  }
}

for (const route of [
  "src/app/gpt-image-2/[id]/page.tsx",
  "src/app/en/gpt-image-2/[id]/page.tsx",
]) {
  if (!exists(route)) {
    fail(`Missing GPT Image 2 case detail route: ${route}`);
  }
  const content = read(route);
  for (const required of [
    "buildGptImage2CaseMetadata",
    "buildGptImage2CaseJsonLd",
    "buildGptImage2CaseBreadcrumbJsonLd",
  ]) {
    if (!content.includes(required)) {
      fail(`${route} is missing GPT Image 2 case SEO helper: ${required}`);
    }
  }
}

const seo = read("src/lib/gpt-image-2-seo.ts");
for (const required of [
  "openGraph",
  "twitter",
  "alternates",
  "languages",
  "CreativeWork",
  "BreadcrumbList",
  "CollectionPage",
  "SoftwareApplication",
]) {
  if (!seo.includes(required)) {
    fail(`gpt-image-2-seo.ts is missing SEO coverage: ${required}`);
  }
}

const card = read("src/components/AwesomePromptCard.tsx");
if (!card.includes("/gpt-image-2") || !card.includes("/${item.id}")) {
  fail("AwesomePromptCard primary link must point to /gpt-image-2/[id], not the external source.");
}
if (!card.includes("item.source_url")) {
  fail("AwesomePromptCard must keep a secondary source link.");
}

const awesomePrompts = read("src/lib/awesome-prompts.ts");
const categoryOrderIndex = awesomePrompts.indexOf("const CATEGORY_ORDER");
const posterIndex = awesomePrompts.indexOf("\"poster-illustration\"", categoryOrderIndex);
const portraitIndex = awesomePrompts.indexOf("\"portrait-photography\"", categoryOrderIndex);
if (categoryOrderIndex === -1 || posterIndex === -1 || portraitIndex === -1 || portraitIndex < posterIndex) {
  fail("GPT Image 2 gallery category order must keep portrait-photography after more general categories.");
}
for (const required of ["getAwesomePromptCategories", "getAwesomePromptCases", "categoryRank"]) {
  if (!awesomePrompts.includes(required)) {
    fail(`awesome-prompts.ts is missing sorted gallery helper: ${required}`);
  }
}

const sitemap = read("src/app/sitemap.ts");
for (const required of ["getAwesomePromptCases", "/gpt-image-2", "/${item.id}"]) {
  if (!sitemap.includes(required)) {
    fail(`sitemap.ts is missing GPT Image 2 coverage: ${required}`);
  }
}

if (process.exitCode) {
  process.exit();
}

console.log("Validated GPT Image 2 gallery routes and source separation.");
