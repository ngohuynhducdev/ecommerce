import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/features/blog/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  post: BlogPost;
}

export function BlogCard({ post }: Props) {
  return (
    <div>
      <div className="aspect-video relative rounded-xl overflow-hidden">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      <p className="text-xs text-[#807D7E] mt-4">{formatDate(post.publishedAt)}</p>
      <span className="inline-block text-xs bg-[#F3F5F7] text-[#1C1C1C] px-2 py-0.5 rounded capitalize mt-1">
        {post.category}
      </span>
      <h3 className="font-semibold text-lg mt-2 leading-snug line-clamp-2">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-[#B88E2F] transition-colors"
        >
          {post.title}
        </Link>
      </h3>
      <p className="text-[#807D7E] text-sm mt-2 line-clamp-3">{post.excerpt}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="inline-block text-sm font-medium text-[#1C1C1C] hover:text-[#B88E2F] transition-colors mt-3"
      >
        Read More →
      </Link>
    </div>
  );
}
