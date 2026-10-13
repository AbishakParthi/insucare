import type { Metadata } from "next";
import { partners } from "@insucare/domain";
import { SearchablePartners } from "../../components/searchable-partners";
import { Section } from "../../components/section";

import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Insurance Partners",
  description: "Search InsuCARE insurance partners across life, general, health and corporate insurance categories.",
  alternates: {
    canonical: absoluteUrl("/insurance-partners")
  },
  openGraph: {
    title: "Insurance Partners | InsuCARE",
    description: "Search InsuCARE insurance partners across life, general, health and corporate insurance categories.",
    url: absoluteUrl("/insurance-partners"),
    type: "website"
  }
};

export default function PartnersPage() {
  return (
    <Section
      eyebrow="Insurance Partners"
      title="Access to leading insurance companies for informed comparison."
      intro="Search partner insurers by name or category. Final recommendations depend on suitability, underwriting, pricing and policy terms."
    >
      <SearchablePartners partners={partners} />
    </Section>
  );
}
