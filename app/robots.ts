import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/*?_rsc=",
      },
    ],
    sitemap: "https://totalsportek.world/sitemap.xml",
  };
}
