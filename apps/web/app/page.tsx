import type { Metadata } from "next";
import Link from "next/link";
import { brand, blogs, claimSteps, partners, services, stats, testimonials, whyChooseUs } from "@insucare/domain";
import { ArrowRight, BadgeCheck, BarChart3, Building2, FileCheck, Handshake, ShieldCheck, Sparkles } from "lucide-react";
import { CtaBand } from "../components/cta-band";
import { Section } from "../components/section";
import { FadeIn, FadeInStagger, FadeInStaggerItem, ScaleInHover } from "../components/animated";
import { PartnerLogo } from "../components/partner-logo";

import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "InsuCARE | Insurance Broking & Risk Advisory",
  description: "InsuCARE provides insurance broking, risk advisory, and claims support for retail and corporate clients in India.",
  alternates: {
    canonical: "https://insucareindia.vercel.app/"
  },
  openGraph: {
    title: "InsuCARE | Insurance Broking & Risk Advisory",
    description: "InsuCARE provides insurance broking, risk advisory, and claims support for retail and corporate clients in India.",
    url: "https://insucareindia.vercel.app/",
    siteName: "InsuCARE",
    type: "website"
  }
};

export default function HomePage() {
  const featured = services.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white" aria-label="Hero Section">
        <div className="absolute inset-0 bg-insurance-grid insurance-pattern opacity-20" aria-hidden="true" />
        <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-champagne/20 blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute -left-16 bottom-8 h-80 w-80 rounded-full bg-oxblood/60 blur-3xl animate-pulse" aria-hidden="true" />
        <FadeInStagger className="container-padded relative grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <FadeInStaggerItem>
              <p className="inline-flex rounded-full border border-champagne/40 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.3em] text-champagne">
                InsuCARE &bull; IRDAI Registered Insurance Broker
              </p>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <h1 className="mt-7 max-w-4xl font-display text-6xl font-bold leading-[0.95] text-balance md:text-8xl">
                <span className="text-champagne block text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold uppercase tracking-wider mb-3">InsuCARE</span>
                {brand.tagline}
              </h1>
            </FadeInStaggerItem>
            <FadeInStaggerItem>
              <p className="mt-7 max-w-2xl text-xl leading-9 text-white/90">{brand.subheadline}</p>
            </FadeInStaggerItem>
            <FadeInStaggerItem className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-champagne px-7 py-4 font-extrabold text-ink dark:text-ink transition-transform hover:scale-105 active:scale-95 shadow-glow">
                Get Free Consultation
              </Link>
              <Link href="/services" className="rounded-full border border-white/20 px-7 py-4 font-extrabold text-white transition-all hover:bg-white/10 hover:border-white hover:scale-105 active:scale-95">
                Explore Insurance Solutions
              </Link>
            </FadeInStaggerItem>
            <FadeInStaggerItem className="mt-10 grid gap-3 sm:grid-cols-2">
              {["IRDAI Registered", "Expert Insurance Advisors", "Claims Assistance", "Corporate Risk Specialists"].map((badge) => (
                <div key={badge} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
                  <BadgeCheck className="h-5 w-5 text-champagne" aria-hidden="true" />
                  <span className="text-sm font-bold">{badge}</span>
                </div>
              ))}
            </FadeInStaggerItem>
          </div>
          <FadeInStaggerItem className="relative">
            <div className="glass-card rounded-[2.5rem] border-white/15 bg-white/10 p-6 text-white shadow-premium">
              <div className="rounded-[2rem] bg-white dark:bg-ink/80 p-6 text-ink dark:text-porcelain transition-shadow duration-500 hover:shadow-premium-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-oxblood dark:text-champagne">Risk Command View</p>
                    <h2 className="mt-2 font-display text-4xl font-bold">Insurance clarity, not complexity.</h2>
                  </div>
                  <ShieldCheck className="h-12 w-12 text-oxblood dark:text-champagne" aria-hidden="true" />
                </div>
                <div className="mt-8 grid gap-4">
                  {["Coverage gap review", "Multi-insurer comparison", "Claims desk coordination"].map((item, index) => (
                    <div key={item} className="rounded-2xl border border-oxblood/10 dark:border-white/10 bg-porcelain dark:bg-white/5 p-5 transition-transform hover:-translate-y-1 hover:shadow-sm">
                      <div className="flex items-center gap-4">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-oxblood text-sm font-bold text-white shadow-glow">0{index + 1}</span>
                        <p className="font-bold">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInStaggerItem>
        </FadeInStagger>
      </section>

      <Section title="Trusted Numbers" intro="Built for individuals and businesses who want transparent advice, responsive service and confident claims support.">
        <div className="grid gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm">
              <p className="font-display text-5xl font-bold text-oxblood dark:text-champagne">{stat.value}</p>
              <p className="mt-2 font-semibold text-ink/70 dark:text-porcelain/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why InsuCARE" title="Advice before policy. Support after purchase.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <ScaleInHover key={item}>
              <div className="group h-full rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm transition-all hover:shadow-premium-hover hover:border-champagne/50">
                <Sparkles className="h-8 w-8 text-champagne" aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-bold">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65">
                  Practical insurance guidance delivered with clear documentation, transparent recommendations and responsive service.
                </p>
              </div>
            </ScaleInHover>
          ))}
        </div>
      </Section>

      <Section eyebrow="Featured Services" title="Insurance programs for business and life." className="bg-porcelain dark:bg-[#253040]">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ScaleInHover key={service.slug}>
              <Link href={`/services/${service.slug}`} className="flex flex-col h-full rounded-[2rem] bg-white dark:bg-white/5 dark:border-white/10 border border-transparent p-7 shadow-sm transition-all hover:shadow-premium-hover focus:outline-none focus:ring-4 focus:ring-oxblood dark:focus:ring-champagne">
                <Building2 className="h-9 w-9 text-oxblood dark:text-champagne" aria-hidden="true" />
                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.24em] text-oxblood dark:text-champagne">{service.category}</p>
                <h3 className="mt-3 font-display text-3xl font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65 flex-1">{service.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-oxblood dark:text-champagne group-hover:gap-3 transition-all">
                  Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </ScaleInHover>
          ))}
        </div>
      </Section>

      <Section eyebrow="Claims Assistance" title="A guided claims workflow from notification to closure.">
        <div className="grid gap-4 md:grid-cols-3">
          {claimSteps.map((step, index) => (
            <div key={step} className="rounded-[1.6rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-6">
              <span className="text-sm font-extrabold text-oxblood dark:text-champagne">Step {index + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Client Voices" title="Trusted by business owners, HR leaders and families." className="bg-ink dark:bg-[#1a222e] text-white">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((item) => (
            <div key={item.name} className="rounded-[2rem] border border-white/10 bg-white dark:bg-white/5 p-7">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-champagne font-display text-2xl font-bold text-ink dark:text-porcelain" aria-hidden="true">
                {item.name.charAt(0)}
              </div>
              <p className="mt-5 text-sm leading-7 text-ink/80 dark:text-white/80">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-5 font-bold text-ink dark:text-white">{item.name}</p>
              <p className="text-sm text-champagne">{item.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Insurance Partners" title="Multi-insurer access for better comparison." className="overflow-hidden">
        <div className="relative flex w-full flex-col gap-4 overflow-hidden mask-fade-edges py-4" aria-label="Our Partners Carousel">
          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.slug}-${index}`}
                className="flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 text-center text-sm font-extrabold text-ink/75 dark:text-porcelain/75 transition-all hover:border-oxblood/30 hover:shadow-md"
              >
                <PartnerLogo partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Latest Blogs" title="Insurance insights for better decisions." className="bg-porcelain dark:bg-[#253040]">
        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map((post) => (
            <ScaleInHover key={post.slug}>
              <Link href={`/blogs/${post.slug}`} className="flex flex-col h-full rounded-[2rem] bg-white dark:bg-white/5 dark:border-white/10 border border-transparent p-7 shadow-sm transition-all hover:shadow-premium-hover focus:outline-none focus:ring-4 focus:ring-oxblood dark:focus:ring-champagne">
                <BarChart3 className="h-8 w-8 text-oxblood dark:text-champagne" aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.24em] text-oxblood dark:text-champagne">{post.category}</p>
                <h3 className="mt-3 font-display text-3xl font-bold">{post.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65 flex-1">{post.excerpt}</p>
              </Link>
            </ScaleInHover>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
