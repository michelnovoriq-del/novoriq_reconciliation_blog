import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
  ];
  const pages = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date("2026-06-22"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const posts = blogPosts.map((post) => ({
    url: `${siteConfig.url}${post.href}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: post.href === "/blog/reconcile-payment-exports-with-bank-deposits" ? 0.9 : 0.8,
  }));

  return [...pages, ...posts];
}
