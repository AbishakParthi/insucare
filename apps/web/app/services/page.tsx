import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, services } from "@insucare/domain";
import { ArrowRight, Shield } from "lucide-react";
import { CtaBand } from "../../components/cta-band";
import { Section } from "../../components/section";

import { absoluteUrl } from "../../lib/site";

const pageUrl = absoluteUrl("/services");

export const metadata: Metadata = {
  title: "Insurance Services",
  description: "Corporate, group, retail and specialized insurance broking services from InsuCARE.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Insurance Services | InsuCARE",
    description: "Corporate, group, retail and specialized insurance broking services from InsuCARE.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insurance Services | InsuCARE",
    description: "Corporate, group, retail and specialized insurance broking services from InsuCARE.",
  }
};

export default function ServicesPage() {
  return (
    <>
      <Section eyebrow="Services" title="Insurance solutions designed around real risk." intro="Explore business, employee-benefit, retail and specialized insurance advisory services with claim support built in.">
        <div className="grid gap-12">
          {serviceCategories.map((category) => (
            <section key={category} aria-labelledby={`category-${category.replace(/\s+/g, '-').toLowerCase()}`}>
              <h2 id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`} className="font-display text-4xl font-bold text-oxblood dark:text-champagne">{category}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {services.filter((service) => service.category === category).map((service) => (
                  <article key={service.slug} className="flex flex-col rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
                    <Link href={`/services/${service.slug}`} className="flex-1 focus:outline-none focus:ring-4 focus:ring-oxblood dark:focus:ring-champagne rounded-xl group" aria-label={`View details for ${service.title}`}>
                      <Shield className="h-8 w-8 text-champagne" aria-hidden="true" />
                      <h3 className="mt-5 font-display text-3xl font-bold">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65">{service.summary}</p>
                      <span className="mt-5 flex items-center gap-2 text-sm font-bold text-oxblood dark:text-champagne group-hover:gap-3 transition-all">
                        View details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
