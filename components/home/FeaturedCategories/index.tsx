import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api/categories";
import { MOCK_CATEGORIES } from "@/lib/mock/data";

export async function FeaturedCategories() {
  let categories: Awaited<ReturnType<typeof getCategories>>["data"] = [];
  try {
    const res = await getCategories();
    categories = res.data ?? [];
  } catch {
    // Strapi not running — use mock data
  }

  const displayCategories =
    categories.length > 0 ? categories : MOCK_CATEGORIES;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800">
          Khám phá theo danh mục
        </h2>
        <p className="mt-2 text-muted-foreground">
          Tìm phong cách phù hợp cho từng không gian sống
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayCategories.map((cat) => {
          const rawUrl = cat.attributes.image?.data?.attributes?.url ?? "";
          const imageUrl = rawUrl.startsWith("http")
            ? rawUrl
            : rawUrl
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`
              : null;
          const altText =
            cat.attributes.image?.data?.attributes?.alternativeText ??
            cat.attributes.name;

          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.attributes.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-warm-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-warm-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  {cat.attributes.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
