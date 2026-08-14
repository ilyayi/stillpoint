import type { MetadataRoute } from "next";
import { activeServices } from "@/content/services";
import { BASE_URL } from "@/lib/seo";

/** Regenerated automatically — add a route to `pages` or a service and it appears. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] =
    [
      { path: "/", priority: 1, changeFrequency: "weekly" },
      { path: "/services", priority: 0.9, changeFrequency: "monthly" },
      { path: "/book", priority: 0.9, changeFrequency: "monthly" },
      { path: "/about", priority: 0.8, changeFrequency: "monthly" },
      { path: "/experience", priority: 0.7, changeFrequency: "monthly" },
      { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
      { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    ];

  return [
    ...pages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...activeServices.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
