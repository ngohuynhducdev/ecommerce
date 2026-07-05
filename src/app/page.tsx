import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { getPosts } from "@/lib/api/blog";
import { SafeImage } from "@/components/ui/safe-image";
import { CategoryCard } from "@/features/products/components/category-card";
import { OurProducts } from "@/features/products/components/our-products";
import { NewsletterSection } from "@/features/shared/components/newsletter-section";
import { HeroCarousel } from "@/features/shared/components/hero-carousel";
import { FeaturesStrip } from "@/features/shared/components/features-strip";


export default async function HomePage() {
  const [allProducts, categories, blogPosts] = await Promise.all([
    getProducts(),
    getCategories(),
    getPosts(),
  ]);

  const showcaseCategories = categories.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ── Hero Carousel ── */}
      <HeroCarousel />

      {/* ── Hero Text ── */}
      <section className="px-5 lg:px-20 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
        <h1 className="font-bold text-[2.5rem] lg:text-7xl leading-[1.1] text-[#1C1C1C]">
          Simply Unique/<br />Simply Better.
        </h1>
        <div>
          <p className="text-[#807D7E] text-base lg:text-lg leading-relaxed">
            <span className="font-semibold text-[#1C1C1C]">3legant</span> is a gift &amp; decorations store based in HCMC, Vietnam. Est since 2019.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 mt-6 text-sm font-medium text-[#1C1C1C] border-b border-[#1C1C1C] pb-0.5 hover:text-[#B88E2F] hover:border-[#B88E2F] transition-colors"
          >
            Shop Now →
          </Link>
        </div>
      </section>

      {/* ── Category Showcase ── */}
      <section className="px-5 lg:px-20 pb-16 lg:pb-24">
        <div className="grid gap-6 md:grid-cols-2 md:h-155">
          {showcaseCategories[0] && (
            <div className="h-96 md:h-full">
              <CategoryCard category={showcaseCategories[0]} large />
            </div>
          )}
          <div className="grid gap-6 md:grid-rows-2 md:h-full">
            {showcaseCategories.slice(1, 3).map((category) => (
              <div key={category.id} className="h-56 md:h-full">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Products ── */}
      <OurProducts products={allProducts} />

      {/* ── Features Strip ── */}
      <FeaturesStrip />

      {/* ── Sale Banner ── */}
      <section className="grid lg:grid-cols-2 bg-[#F3F5F7] lg:min-h-140">
        {/* Image */}
        <div className="relative h-80 lg:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&auto=format&q=80"
            alt="Room inspiration"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-10 py-14 lg:px-16 lg:py-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#377DFF] mb-4">
            Sale up to 35% off
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#1C1C1C] leading-tight">
            HUNDREDS of<br />New lower prices!
          </h2>
          <p className="text-[#807D7E] mt-5 max-w-sm leading-relaxed">
            It&apos;s more affordable than ever to give every room in your home a stylish makeover.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 mt-8 text-sm font-medium text-[#1C1C1C] border-b border-[#1C1C1C] pb-0.5 self-start hover:text-[#B88E2F] hover:border-[#B88E2F] transition-colors"
          >
            Shop Now →
          </Link>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section className="py-16 lg:py-20 px-5 lg:px-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold text-[#1C1C1C]">Articles</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#1C1C1C] border-b border-[#1C1C1C] pb-0.5 hover:text-[#B88E2F] hover:border-[#B88E2F] transition-colors"
          >
            More Articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-3/2 overflow-hidden">
                <SafeImage
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="font-semibold text-lg mt-4 line-clamp-2 group-hover:text-[#B88E2F] transition-colors">
                {post.title}
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#1C1C1C] border-b border-[#1C1C1C] pb-0.5 group-hover:text-[#B88E2F] group-hover:border-[#B88E2F] transition-colors">
                Read More →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSection />
    </div>
  );
}
