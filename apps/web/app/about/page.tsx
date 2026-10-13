import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Award, Compass, Eye, HeartHandshake, Scale } from "lucide-react";
import { CtaBand } from "../../components/cta-band";
import { Section } from "../../components/section";

import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Insucare India Insurance Broking Pvt Ltd, leadership, mission, values and IRDAI compliance.",
  alternates: {
    canonical: absoluteUrl("/about")
  },
  openGraph: {
    title: "About Us | InsuCARE",
    description: "Learn about Insucare India Insurance Broking Pvt Ltd, leadership, mission, values and IRDAI compliance.",
    url: absoluteUrl("/about"),
    type: "website"
  }
};

export default function AboutPage() {
  const values = ["Transparency", "Customer Commitment", "Professional Integrity", "Claims Ownership", "Risk-Led Thinking"];

  return (
    <>
      <Section
        eyebrow="About InsuCARE"
        title="A risk advisory partner for families, founders, SMEs and enterprises."
        intro={`${company.legalName} is an IRDAI registered insurance broker focused on transparent advice, tailored insurance solutions and dependable claims assistance.`}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
          <div className="rounded-[2rem] bg-oxblood p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-champagne">Managing Director Message</p>
            <h2 className="mt-4 font-display text-4xl font-bold">{company.managingDirector}</h2>
            <p className="mt-5 text-lg leading-9 text-white/80">
              At Insucare India Insurance Broking, our mission is to help individuals and businesses make informed insurance decisions through transparent advice, tailored solutions, and unwavering customer support. We believe insurance is not merely a financial product but a promise of security and peace of mind.
            </p>
          </div>
          <div className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-porcelain dark:bg-[#253040] p-8">
            <div className="mx-auto grid aspect-[4/5] max-w-sm place-items-center rounded-[2rem] bg-gradient-to-br from-oxblood via-garnet to-ink text-center text-white shadow-premium">
              <div>
                <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-champagne/60 bg-white/10 font-display text-5xl font-bold">SA</div>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.24em] text-champagne">Executive Profile</p>
                <p className="mt-2 font-display text-3xl font-bold">{company.managingDirector}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Vision, Mission and Compliance" className="bg-porcelain dark:bg-[#253040]">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Eye, title: "Vision", text: "To become a trusted insurance broking partner known for clarity, responsiveness and ethical advisory." },
            { icon: Compass, title: "Mission", text: "To protect clients through suitable insurance solutions, strong insurer coordination and claims support." },
            { icon: Scale, title: "Compliance", text: `${company.legalName} operates under ${company.license}.` }
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] bg-white dark:bg-white/5 p-7 shadow-sm">
              <item.icon className="h-9 w-9 text-oxblood dark:text-champagne" />
              <h3 className="mt-5 font-display text-3xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Core Values" title="The principles behind every recommendation.">
        <div className="grid gap-4 md:grid-cols-5">
          {values.map((value) => (
            <div key={value} className="rounded-2xl border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-5 text-center font-bold">
              <Award className="mx-auto mb-3 h-7 w-7 text-champagne" />
              {value}
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-[2rem] border border-oxblood/10 dark:border-white/10 p-8">
          <HeartHandshake className="h-10 w-10 text-oxblood dark:text-champagne" />
          <h3 className="mt-4 font-display text-3xl font-bold">Customer Commitment</h3>
          <p className="mt-3 leading-8 text-ink/70 dark:text-porcelain/70">
            We help clients understand what is covered, what is excluded, how claims work and how renewals should be reviewed. Our goal is to make insurance decisions simpler, safer and more accountable.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
