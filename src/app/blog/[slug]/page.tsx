import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/features/shared/components/breadcrumb";
import { BlogCard } from "@/features/blog/components/blog-card";
import { TableOfContents } from "@/features/blog/components/table-of-contents";
import { ShareButtons } from "@/features/blog/components/share-buttons";
import { getPostBySlug, getPosts } from "@/lib/api/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

  const tocItems = post.sections
    .filter((s) => s.type === "h2" && s.id)
    .map((s) => ({ id: s.id!, label: s.content }));

  return (
    <div className="px-8 lg:px-20 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Cover image */}
      <div className="relative w-full h-[480px] rounded-2xl overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Author row */}
      <div className="flex items-center gap-3 mt-4">
        <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <p className="text-sm text-[#807D7E]">
          <span className="font-medium text-[#1C1C1C]">{post.author.name}</span>
          {" · "}
          {formatDate(post.publishedAt)}
          {" · "}
          {post.readTime}
        </p>
      </div>

      {/* Content + TOC */}
      <div className="lg:grid lg:grid-cols-[1fr_240px] gap-16 mt-8">
        {/* Article */}
        <article>
          <h1 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
            {post.title}
          </h1>

          {post.sections.map((section, i) => {
            if (section.type === "h2") {
              return (
                <h2
                  key={i}
                  id={section.id}
                  className="text-2xl font-semibold mt-8 mb-4"
                >
                  {section.content}
                </h2>
              );
            }
            if (section.type === "img") {
              return (
                <div
                  key={i}
                  className="relative w-full aspect-video rounded-xl overflow-hidden my-6"
                >
                  <Image
                    src={section.content}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-cover"
                  />
                </div>
              );
            }
            return (
              <p key={i} className="text-[#807D7E] leading-8 mb-4">
                {section.content}
              </p>
            );
          })}

          <ShareButtons />

          {/* Related posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </article>

        {/* Table of contents */}
        {tocItems.length > 0 && <TableOfContents items={tocItems} />}
      </div>
    </div>
  );
}
