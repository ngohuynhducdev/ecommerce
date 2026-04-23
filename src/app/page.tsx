import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { CategoryCard } from "@/features/products/components/category-card";
import { formatPrice } from "@/lib/utils";

function TruckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

const features = [
  {
    icon: <TruckIcon />,
    label: "Free Shipping",
    description: "Order over $150",
  },
  {
    icon: <ShieldIcon />,
    label: "Money-back Guarantee",
    description: "30 days return policy",
  },
  {
    icon: <LockIcon />,
    label: "Secure Payment",
    description: "100% protected transactions",
  },
  {
    icon: <HeadphonesIcon />,
    label: "24/7 Support",
    description: "Dedicated support team",
  },
];

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  const heroProduct = featuredProducts[0];
  const showcaseCategories = categories.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="min-h-screen grid lg:grid-cols-2 items-center">
        {/* Left */}
        <div className="px-8 lg:px-20 py-20 lg:py-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#1C1C1C]" />
            <span className="text-xs uppercase tracking-widest text-[#807D7E]">
              New Arrivals
            </span>
          </div>
          <h1 className="font-bold text-5xl lg:text-7xl leading-tight text-[#1C1C1C]">
            Simply Unique/
            <br />
            Simply Better.
          </h1>
          <p className="text-[#807D7E] text-lg max-w-md mt-4 mb-8">
            3legant is a gift &amp; decorations store based in HCMC, Vietnam.
            Unique pieces to make every space feel like home.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="bg-[#1C1C1C] text-white px-8 py-4 text-sm font-medium rounded-sm hover:bg-[#333] transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/shop"
              className="border border-[#1C1C1C] text-[#1C1C1C] px-8 py-4 text-sm font-medium rounded-sm hover:bg-[#1C1C1C] hover:text-white transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative overflow-hidden h-[60vh] lg:h-screen">
          <Image
            src="https://picsum.photos/seed/hero-chair/800/900"
            alt="Featured furniture"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {heroProduct && (
            <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg w-52">
              <span className="text-xs bg-[#2EC1AC] text-white px-2 py-0.5 rounded inline-block mb-2">
                New
              </span>
              <p className="font-medium text-sm text-[#1C1C1C] leading-snug">
                {heroProduct.name}
              </p>
              <p className="text-[#B88E2F] font-semibold text-sm mt-1">
                {formatPrice(heroProduct.price)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section className="border-y border-[#E8ECEF] py-7 px-8 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E8ECEF]">
          {features.map((feature) => (
            <div key={feature.label} className="flex items-center gap-4 px-6 first:pl-0 last:pr-0">
              <span className="text-[#1C1C1C] shrink-0">{feature.icon}</span>
              <div>
                <p className="font-medium text-sm text-[#1C1C1C]">{feature.label}</p>
                <p className="text-xs text-[#807D7E] mt-0.5">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse The Range ── */}
      <section className="py-20 px-8 lg:px-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#1C1C1C]">Browse The Range</h2>
          <p className="text-[#807D7E] mt-2">
            Explore the possibilities of our diverse furniture collection
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {showcaseCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
