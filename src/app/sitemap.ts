import type { MetadataRoute } from "next";
import { site, nav } from "@/lib/site";
import { flagships } from "@/lib/projects";
import { deepDives } from "@/lib/deepdives";
import { articles } from "@/lib/articles";

// Static export: the site is fully prerendered, so a build-time timestamp is an
// honest lastModified for every route.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const home: MetadataRoute.Sitemap[number] = {
    url: base,
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
  };

  const sections: MetadataRoute.Sitemap = nav.map((item) => ({
    url: `${base}${item.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/projects" ? 0.9 : 0.7,
  }));

  const caseStudies: MetadataRoute.Sitemap = flagships.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const dives: MetadataRoute.Sitemap = deepDives.map((d) => ({
    url: `${base}/architecture/${d.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const essays: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [home, ...sections, ...caseStudies, ...dives, ...essays];
}
