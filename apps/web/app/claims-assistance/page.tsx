import type { Metadata } from "next";
import { claimSteps } from "@insucare/domain";
import { FileCheck2 } from "lucide-react";
import { ContactForm } from "../../components/contact-form";
import { Section } from "../../components/section";

import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Claims Assistance",
  description: "Claim notification, documentation, insurer coordination, survey support and settlement follow-up.",
  alternates: {
    canonical: absoluteUrl("/claims-assistance")
  },
  openGraph: {
    title: "Claims Assistance | InsuCARE",
    description: "Claim notification, documentation, insurer coordination, survey support and settlement follow-up.",
    url: absoluteUrl("/claims-assistance"),
    type: "website"
  }
};

export default function ClaimsPage() {
  return (
    <Section
      eyebrow="Claims Assistance"
      title="A steady hand when claims become urgent."
      intro="InsuCARE supports clients through documentation, insurer coordination, survey assistance and settlement follow-up."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5">
          {claimSteps.map((step, index) => (
            <div key={step} className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm">
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-oxblood font-bold text-white">{index + 1}</span>
                <div>
                  <h2 className="font-display text-3xl font-bold">{step}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65 dark:text-porcelain/65">
                    Our team guides the next action, helps organize documents and coordinates with insurers or appointed representatives so you are not left guessing.
                  </p>
                </div>
                <FileCheck2 className="ml-auto hidden h-8 w-8 text-champagne md:block" />
              </div>
            </div>
          ))}
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <ContactForm variant="claim" />
        </aside>
      </div>
    </Section>
  );
}
