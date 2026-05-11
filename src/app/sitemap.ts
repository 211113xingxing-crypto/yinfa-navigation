import { MetadataRoute } from "next";
import { cities } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://navi-resources.com";
  const cityEntries = cities.map((c) => ({
    url: `${baseUrl}/city/${c.pinyin}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    ...cityEntries,
  ];
}
