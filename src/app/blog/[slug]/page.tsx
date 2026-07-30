import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafeImage } from "@/components/ui/safe-image";
import { BlogCard } from "@/features/blog/components/blog-card";
import { ShareButtons } from "@/features/blog/components/share-buttons";
import { TableOfContents } from "@/features/blog/components/table-of-contents";
import { NewsletterSection } from "@/features/shared/components/newsletter-section";
import { getPostBySlug, getPosts } from "@/lib/api/blog";
import type { ArticleSection } from "@/features/blog/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.error("Failed to fetch posts for static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ArticleSections({ sections }: { sections: ArticleSection[] }) {
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < sections.length) {
    const section = sections[i];

    if (section.type === "img") {
      const next = sections[i + 1];
      if (next?.type === "img") {
        result.push(
          <div key={i} className="grid grid-cols-2 gap-4 my-6">
            <div className="relative aspect-4/3 overflow-hidden">
              <Image src={section.content} alt={section.alt ?? ""} fill sizes="50vw" className="object-cover" />
            </div>
            <div className="relative aspect-4/3 overflow-hidden">
              <Image src={next.content} alt={next.alt ?? ""} fill sizes="50vw" className="object-cover" />
            </div>
          </div>
        );
        i += 2;
        continue;
      }
      result.push(
        <div key={i} className="relative w-full aspect-video overflow-hidden my-6">
          <Image src={section.content} alt={section.alt ?? ""} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
        </div>
      );
    } else if (section.type === "h2") {
      result.push(
        // scroll-mt-36 keeps anchor jumps from landing behind the sticky header.
        <h2 key={i} id={section.id} className="text-2xl font-semibold text-ink mt-10 mb-4 scroll-mt-36">
          {section.content}
        </h2>
      );
    } else {
      result.push(
        <p key={i} className="text-subtle leading-8 mb-4">
          {section.content}
        </p>
      );
    }
    i++;
  }

  return <>{result}</>;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Headings carry their own anchor ids, so the outline comes straight from
  // the sections — no parsing of rendered markup.
  const tocItems = post.sections
    .filter((s) => s.type === "h2" && s.id)
    .map((s) => ({ id: s.id as string, label: s.content }));

  return (
    <div>
      <div className="px-5 lg:px-20 py-8">
        {/* Article column stays 896px (max-w-6xl - 13rem sidebar - 3rem gap),
            so widening the shell for the outline leaves the body untouched. */}
        {/* No items-start here: the outline column has to stretch the full row
            height, otherwise its sticky child has no room to travel. */}
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-12">
        <div className="min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-subtle mb-6 flex-wrap">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
          <span>›</span>
          <span className="text-ink line-clamp-1">{post.title}</span>
        </nav>

        <div className="max-w-4xl">
          {/* Article label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-subtle mb-4">
            Article
          </p>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-bold text-ink leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author + date */}
          <div className="flex items-center gap-6 text-sm text-subtle mb-8">
            <span className="flex items-center gap-1.5">
              <PersonIcon />
              {post.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarIcon />
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>

        {/* Cover image — same column width as the article text */}
        <div className="max-w-4xl">
          <div className="relative w-full h-72 lg:h-120 overflow-hidden mb-8">
            <SafeImage
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-4xl">
          {post.excerpt && (
            <p className="text-subtle leading-8 mb-4">{post.excerpt}</p>
          )}
          <ArticleSections sections={post.sections} />
          <ShareButtons />
        </article>

        {/* You might also like */}
        <div className="mt-20 pt-10 border-t border-line">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-ink">You might also like</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-ink border-b border-ink pb-0.5 hover:text-gold hover:border-gold transition-colors"
            >
              More Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </div>
        </div>

        {/* Outline — desktop only; on narrow screens the headings are close
            enough together that a sticky sidebar earns nothing. */}
        {tocItems.length > 0 && (
          <div className="hidden lg:block">
            <TableOfContents items={tocItems} />
          </div>
        )}
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterSection />
      </div>
    </div>
  );
}
