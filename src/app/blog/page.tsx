import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/api/blog";
import { BlogContent } from "@/features/blog/components/blog-content";
import { NewsletterSection } from "@/features/shared/components/newsletter-section";

export const metadata: Metadata = {
  title: "Blog",
  description: "Interior design tips, furniture guides, and home inspiration from 3legant.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      {/* Hero — contained within page gutters per design */}
      <div className="px-5 lg:px-20 pt-6">
        <section className="relative h-64 lg:h-80 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&h=640&fit=crop&auto=format&q=80"
            alt="Our Blog"
            fill
            sizes="(max-width: 1024px) 100vw, calc(100vw - 10rem)"
            className="object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
            <nav className="flex items-center gap-2 text-sm text-subtle mb-4">
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-ink font-medium">Blog</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold text-ink">Our Blog</h1>
            <p className="mt-3 text-subtle text-sm lg:text-base">
              Home ideas and design inspiration
            </p>
          </div>
        </section>
      </div>

      {/* Blog content */}
      <div className="px-5 lg:px-20 py-10">
        <BlogContent posts={posts} />
      </div>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}
