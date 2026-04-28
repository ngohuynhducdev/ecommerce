import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog",
  description: "Interior design tips, furniture guides, and home inspiration from 3legant.",
};

export const revalidate = 3600;
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/features/shared/components/breadcrumb";
import { BlogCard } from "@/features/blog/components/blog-card";
import { getPosts } from "@/lib/api/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="px-8 lg:px-20 py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      {/* Featured post */}
      <div className="lg:flex gap-10 items-center mb-16">
        <div className="lg:w-1/2 aspect-video relative rounded-2xl overflow-hidden shrink-0">
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-6 lg:mt-0">
          <span className="text-xs font-medium bg-[#F3F5F7] text-[#1C1C1C] px-2.5 py-1 rounded capitalize">
            {featured.category}
          </span>
          <h1 className="text-3xl font-semibold mt-4 leading-snug">{featured.title}</h1>
          <p className="text-[#807D7E] mt-3 leading-relaxed">{featured.excerpt}</p>
          <p className="text-sm text-[#807D7E] mt-4">
            {featured.author.name} · {formatDate(featured.publishedAt)} · {featured.readTime}
          </p>
          <Link
            href={`/blog/${featured.slug}`}
            className="inline-block mt-6 text-sm font-medium text-[#1C1C1C] hover:text-[#B88E2F] transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>

      {/* Latest articles */}
      <h2 className="text-2xl font-semibold mb-8">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rest.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-12">
        <button
          className="w-9 h-9 flex items-center justify-center border border-[#E8ECEF] rounded-lg text-[#807D7E] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === 1
                ? "bg-[#1C1C1C] text-white"
                : "border border-[#E8ECEF] text-[#807D7E] hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
            }`}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}
        <button
          className="w-9 h-9 flex items-center justify-center border border-[#E8ECEF] rounded-lg text-[#807D7E] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
