import { SafeImage } from "@/components/ui/safe-image";
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
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="aspect-4/3 relative overflow-hidden bg-mist">
        <SafeImage
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="font-semibold text-base text-ink mt-3 leading-snug line-clamp-2 group-hover:text-gold transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-subtle mt-1.5">{formatDate(post.publishedAt)}</p>
    </Link>
  );
}
