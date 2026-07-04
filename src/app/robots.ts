import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // No SEO value in transactional/private pages
      disallow: ["/cart", "/checkout", "/order-success", "/account", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
