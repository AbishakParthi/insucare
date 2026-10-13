import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "InsuCARE - Insurance Solutions",
    short_name: "InsuCARE",
    description: "IRDAI registered insurance broking solutions for individuals, families, SMEs, startups and enterprises in India.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
