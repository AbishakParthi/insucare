import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Section } from "../../components/section";

import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the InsuCARE website and advisory services.",
  alternates: {
    canonical: absoluteUrl("/terms-and-conditions")
  },
  openGraph: {
    title: "Terms & Conditions | InsuCARE",
    description: "Terms and conditions for using the InsuCARE website and advisory services.",
    url: absoluteUrl("/terms-and-conditions"),
    type: "website"
  }
};

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms & Conditions">
      <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 text-lg leading-9 text-ink/75 dark:text-porcelain/75 shadow-sm">
        <p>Website information is provided for general awareness and should be evaluated with policy wordings, insurer terms, underwriting requirements and professional advice.</p>
        <p>{company.legalName} provides insurance broking and risk advisory services under {company.license}. Product availability and premium depend on insurer underwriting and applicable regulation.</p>
        <p>Using this website or submitting an enquiry does not create an insurance contract. Coverage begins only after insurer acceptance and premium realization as per policy terms.</p>
      </div>
    </Section>
  );
}
