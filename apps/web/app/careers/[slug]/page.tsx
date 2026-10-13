import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { jobs } from "@insucare/domain";
import { ContactForm } from "../../../components/contact-form";
import { Section } from "../../../components/section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

import { absoluteUrl } from "../../../lib/site";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  const pageUrl = absoluteUrl(`/careers/${slug}`);
  return {
    title: job?.title ?? "Career Opportunity",
    description: job?.summary,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title: `${job?.title ?? "Career Opportunity"} | InsuCARE`,
      description: job?.summary,
      url: pageUrl,
      type: "website"
    }
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  return (
    <Section eyebrow="Career Opportunity" title={job.title} intro={`${job.location} · ${job.type}`}>
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-sm">
          <h2 className="font-display text-4xl font-bold">Role Overview</h2>
          <p className="mt-4 leading-8 text-ink/70 dark:text-porcelain/70">{job.summary}</p>
          <h3 className="mt-8 font-display text-3xl font-bold">What we value</h3>
          <ul className="mt-4 grid gap-3 text-ink/70 dark:text-porcelain/70">
            <li>Consultative communication and customer empathy</li>
            <li>Comfort with documentation, follow-ups and ownership</li>
            <li>Ethical insurance advisory mindset</li>
          </ul>
        </div>
        <ContactForm variant="career" />
      </div>
    </Section>
  );
}
