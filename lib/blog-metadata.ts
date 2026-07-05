import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog-posts";

export function createBlogMetadata(post: BlogPost): Metadata {
  return {
    title: { absolute: `${post.title} | Novoriq` },
    description: post.description,
    alternates: { canonical: post.href },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: post.href,
      publishedTime: post.publishedAt,
      authors: ["Novoriq"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}
