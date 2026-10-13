import type { MetadataRoute } from "next";
import { blogs, jobs, services } from "@insucare/domain";
import { SITE_URL } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  
  type RouteDef = {
    url: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  };

  const staticPaths: RouteDef[] = [
    { url: "", priority: 1.0, changeFrequency: "daily" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" },
    { url: "/claims-assistance", priority: 0.8, changeFrequency: "monthly" },
    { url: "/insurance-partners", priority: 0.7, changeFrequency: "monthly" },
    { url: "/blogs", priority: 0.8, changeFrequency: "daily" },
    { url: "/careers", priority: 0.6, changeFrequency: "weekly" },
    { url: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { url: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
    { url: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
    { url: "/brochure", priority: 0.5, changeFrequency: "monthly" }
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    ...route,
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date()
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...jobRoutes];
}
