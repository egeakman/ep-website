import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { h } from "hastscript";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import metaTags from "astro-meta-tags";

console.log("🔍 Build Environment:");
console.log("READTHEDOCS:", process.env.READTHEDOCS || "Not on RTD");
console.log("READTHEDOCS_VERSION:", process.env.READTHEDOCS_VERSION || "Not on RTD");

// https://astro.build/config
export default defineConfig({
  base: process.env.READTHEDOCS ? `/${process.env.READTHEDOCS_VERSION}/` : '/',
  site: process.env.READTHEDOCS ? `https://ep-website-demo.readthedocs.io/${process.env.READTHEDOCS_VERSION}/` : 'https://ep2025.europython.eu',
  markdown: {
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "contents",
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content() {
            return [h("span.heading-link", "#")];
          },
        },
      ],
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind({
      nesting: true,
    }),
    metaTags(),
  ],
  output: "static",
});
