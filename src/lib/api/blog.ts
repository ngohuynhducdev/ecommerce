import { MOCK_POSTS } from "@/features/blog/mock-data";
import type { BlogPost } from "@/features/blog/types";

export async function getPosts(): Promise<BlogPost[]> {
  if (process.env.NEXT_PUBLIC_USE_STRAPI === "true") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts?populate=*`);
    const json = (await res.json()) as { data: BlogPost[] };
    return json.data;
  }
  return MOCK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (process.env.NEXT_PUBLIC_USE_STRAPI === "true") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`,
    );
    const json = (await res.json()) as { data: BlogPost[] };
    return json.data[0];
  }
  return MOCK_POSTS.find((p) => p.slug === slug);
}
