import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "InsuCARE - Insurance Broking & Risk Advisory",
    short_name: "InsuCARE",
    description: "InsuCARE provides insurance broking, risk advisory, and claims support for retail and corporate clients in India.",
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
