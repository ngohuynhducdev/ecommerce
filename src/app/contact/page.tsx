import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/features/contact/components/contact-form";
import { FeaturesStrip } from "@/features/shared/components/features-strip";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the 3legant team.",
};

function LocationIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5 19.79 19.79 0 0 1 1.61 2.84 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.5 6.5l.95-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

const INFO_CARDS = [
  {
    icon: <LocationIcon />,
    label: "ADDRESS",
    value: "234 Hai Trieu, Ho Chi Minh City,\nViet Nam",
  },
  {
    icon: <PhoneIcon />,
    label: "CONTACT US",
    value: "+84 234 567 890",
  },
  {
    icon: <MailIcon />,
    label: "EMAIL",
    value: "hello@3legant.com",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="px-8 lg:px-20 py-4 flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>›</span>
        <span className="text-primary font-medium">Contact Us</span>
      </nav>

      {/* Hero */}
      <section className="bg-white px-8 lg:px-20 pt-8 pb-14">
        <h1 className="text-4xl lg:text-6xl font-bold text-primary leading-tight max-w-3xl">
          We believe in sustainable decor. We&apos;re passionate about life at home.
        </h1>
        <p className="mt-6 text-muted leading-relaxed max-w-2xl">
          Our features timeless furniture, with natural fabrics, curved lines, plenty of mirrors and classic design, which can be incorporated into any decor project. The pieces enchant for their sobriety, to last for generations, faithful to the shapes of each period, with a touch of the present
        </p>
      </section>

      {/* About Us card */}
      <section className="bg-white px-8 lg:px-20 pb-16">
        <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-border">
          <div className="relative h-72 lg:h-auto min-h-72">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&auto=format&q=80"
              alt="3legant showroom"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="bg-subtle flex flex-col justify-center px-10 py-12 lg:px-16">
            <h2 className="text-2xl lg:text-3xl font-semibold text-primary">About Us</h2>
            <p className="text-muted mt-4 leading-relaxed">
              3legant is a gift &amp; decorations store based in HCMC, Vietnam. Est since 2019.<br />
              Our customer service is always prepared to support you 24/7
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 mt-6 text-sm font-medium text-primary border-b border-primary pb-0.5 self-start hover:text-accent hover:border-accent transition-colors"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="bg-white px-8 lg:px-20 py-16">
        <h2 className="text-3xl font-semibold text-primary text-center">Contact Us</h2>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 border border-border rounded-2xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-border">
          {INFO_CARDS.map(({ icon, label, value }) => (
            <div key={label} className="py-10 px-6 flex flex-col items-center text-center">
              <span className="text-primary mb-5">{icon}</span>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
              <p className="font-bold text-primary mt-3 whitespace-pre-line leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-white px-8 lg:px-20 pt-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form — right on mobile (order-2), left on desktop */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>
          {/* Map — top on mobile (order-1), right on desktop */}
          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden h-72 lg:h-full min-h-72 lg:min-h-120">
            <iframe
              src="https://maps.google.com/maps?q=Ho+Chi+Minh+City,+Vietnam&hl=en&z=13&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="3legant store location"
            />
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <FeaturesStrip />
    </div>
  );
}
