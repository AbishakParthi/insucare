import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Section } from "../../components/section";

import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and personal data protection practices of Insucare India Insurance Broking Pvt Ltd.",
  alternates: {
    canonical: absoluteUrl("/privacy-policy")
  },
  openGraph: {
    title: "Privacy Policy | InsuCARE",
    description: "Privacy policy and personal data protection practices of Insucare India Insurance Broking Pvt Ltd.",
    url: absoluteUrl("/privacy-policy"),
    type: "website"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>{company.legalName} collects enquiry, application and contact information to respond to requests, provide insurance advisory, coordinate claims and improve service quality.</p>
      <p>We handle personal information responsibly and share it only with relevant insurers, service providers or authorities where required for quotation, placement, servicing, claims or legal compliance.</p>
      <p>For privacy requests, contact {company.email}.</p>
    </LegalPage>
  );
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Section eyebrow="Legal" title={title}>
      <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 text-lg leading-9 text-ink/75 dark:text-porcelain/75 shadow-sm">{children}</div>
    </Section>
  );
}
