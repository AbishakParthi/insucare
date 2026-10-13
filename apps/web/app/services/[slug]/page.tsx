import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, company } from "@insucare/domain";
import { CheckCircle2 } from "lucide-react";
import { ContactForm } from "../../../components/contact-form";
import { Section } from "../../../components/section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

import { absoluteUrl, SITE_URL } from "../../../lib/site";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  const serviceUrl = absoluteUrl(`/services/${slug}`);

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: serviceUrl },
    openGraph: {
      title: `${service.title} | InsuCARE`,
      description: service.summary,
      url: serviceUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | InsuCARE`,
      description: service.summary,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const serviceUrl = absoluteUrl(`/services/${slug}`);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    url: serviceUrl,
    provider: {
      "@type": "InsuranceAgency",
      name: company.displayName,
      url: SITE_URL
    },
    description: service.summary
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Section eyebrow={service.category} title={service.title} intro={service.overview}>
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-8">
            <DetailBlock title="Benefits" items={service.benefits} />
            <DetailBlock title="Coverage" items={service.coverage} />
            <DetailBlock title="Claim Process" items={service.claimProcess} />
            <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7">
              <h2 className="font-display text-4xl font-bold">Frequently Asked Questions</h2>
              <div className="mt-5 grid gap-4">
                {service.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl bg-porcelain dark:bg-[#253040] p-5">
                    <h3 className="font-bold">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink/65 dark:text-porcelain/65">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ContactForm />
          </aside>
        </div>
      </Section>
    </>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7">
      <h2 className="font-display text-4xl font-bold">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <p key={item} className="flex gap-3 text-sm leading-7 text-ink/70 dark:text-porcelain/70">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-oxblood dark:text-champagne" />
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
