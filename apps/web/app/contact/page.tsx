import type { Metadata } from "next";
import { company } from "@insucare/domain";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "../../components/contact-form";
import { Section } from "../../components/section";

import { absoluteUrl, SITE_URL } from "../../lib/site";

const pageUrl = absoluteUrl("/contact");

export const metadata: Metadata = {
  title: "Contact Us | InsuCARE",
  description: "Contact InsuCARE for insurance consultation, claims assistance, corporate risk advisory and career enquiries.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Contact Us | InsuCARE",
    description: "Contact InsuCARE for insurance consultation, claims assistance, corporate risk advisory and career enquiries.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | InsuCARE",
    description: "Contact InsuCARE for insurance consultation, claims assistance, corporate risk advisory and career enquiries.",
  }
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: company.displayName,
    image: `${SITE_URL}/brand/insucare-logo.jpeg`,
    "@id": pageUrl,
    url: pageUrl,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kakatiya Nagar",
      addressLocality: "Hyderabad",
      postalCode: "500007",
      addressCountry: "IN"
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      opens: "09:00",
      closes: "18:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Section eyebrow="Contact Us" title="Talk to InsuCARE." intro="Share your requirement and the advisory team will respond with the next practical step.">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid gap-5">
            <ContactCard icon={<Phone aria-hidden="true" />} title="Phone" value={company.phone} href={`tel:${company.phone.replace(/\s/g, "")}`} />
            <ContactCard icon={<MessageCircle aria-hidden="true" />} title="WhatsApp" value={company.whatsapp} href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`} />
            <ContactCard icon={<Mail aria-hidden="true" />} title="Email" value={company.email} href={`mailto:${company.email}`} />
            <address className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm not-italic">
              <MapPin className="h-8 w-8 text-oxblood dark:text-champagne" aria-hidden="true" />
              <h2 className="mt-4 font-display text-3xl font-bold">Office Address</h2>
              <p className="mt-3 leading-8 text-ink/70 dark:text-porcelain/70">{company.addressLines.join(", ")}</p>
            </address>
            <div className="rounded-[2rem] bg-porcelain dark:bg-[#253040] p-7">
              <Clock className="h-8 w-8 text-oxblood dark:text-champagne" aria-hidden="true" />
              <h2 className="mt-4 font-display text-3xl font-bold">Business Hours</h2>
              <p className="mt-3 text-ink/70 dark:text-porcelain/70">{company.businessHours}</p>
            </div>
          </div>
          <div>
            <ContactForm />
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-porcelain dark:bg-[#253040]">
              <iframe
                title="InsuCARE Hyderabad Office Map"
                src="https://maps.google.com/maps?q=Goodlife%20Retreat%20Kakatiya%20Nagar%20Hyderabad%20500007&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-80 w-full border-0 dark:invert-[90%] dark:hue-rotate-180 dark:brightness-90 dark:contrast-125 dark:opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactCard({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href: string }) {
  return (
    <a 
      href={href} 
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-oxblood dark:focus:ring-champagne block"
    >
      <div className="text-oxblood dark:text-champagne [&>svg]:h-8 [&>svg]:w-8">{icon}</div>
      <h2 className="mt-4 font-display text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-ink/70 dark:text-porcelain/70">{value}</p>
    </a>
  );
}
