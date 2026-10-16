import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { company } from "@insucare/domain";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { FloatingActions } from "../components/floating-actions";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import { SkipToContent } from "../components/skip-to-content";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans"
});
import { SITE_URL } from "../lib/site";

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? "xxxxxxxxx";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "InsuCARE | Insurance Broking & Risk Advisory",
    template: `%s | ${company.displayName}`
  },
  description:
    "InsuCARE provides insurance broking, risk advisory, and claims support for retail and corporate clients in India.",
  keywords: ["Insurance Broking", "Risk Advisory", "Health Insurance", "Life Insurance", "Motor Insurance", "India", "Corporate Insurance", "Claims Assistance"],
  authors: [{ name: company.displayName, url: SITE_URL }],
  creator: company.displayName,
  publisher: company.displayName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "InsuCARE | Insurance Broking & Risk Advisory",
    description: "InsuCARE provides insurance broking, risk advisory, and claims support for retail and corporate clients in India.",
    url: "https://insucareindia.vercel.app/",
    siteName: "InsuCARE",
    images: [`${SITE_URL}/brand/insucare-logo.jpeg`],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "InsuCARE | Insurance Broking & Risk Advisory",
    description: "InsuCARE provides insurance broking, risk advisory, and claims support for retail and corporate clients in India.",
    images: [`${SITE_URL}/brand/insucare-logo.jpeg`]
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },
  verification: {
    google: "google1d171594fa4b8932",
  }
};

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://insucareindia.vercel.app/#website",
      "url": "https://insucareindia.vercel.app/",
      "name": "InsuCARE",
      "alternateName": [
        "Insucare India Insurance Broking Private Limited",
        "InsuCare",
        "Insucare India Insurance Broking Pvt Ltd",
        "insucareindia.vercel.app"
      ],
      "publisher": {
        "@id": "https://insucareindia.vercel.app/#organization"
      },
      "inLanguage": "en-IN"
    },
    {
      "@type": ["InsuranceAgency", "Organization"],
      "@id": "https://insucareindia.vercel.app/#organization",
      "name": "InsuCARE",
      "legalName": company.legalName,
      "url": "https://insucareindia.vercel.app/",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/brand/insucare-logo.jpeg`,
        "caption": "InsuCARE Logo"
      },
      "image": `${SITE_URL}/brand/insucare-logo.jpeg`,
      "description": "InsuCARE provides insurance broking, risk advisory, and claims support for retail and corporate clients in India.",
      "email": company.email,
      "telephone": company.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1-2-36/2, Goodlife Retreat, 2nd Floor, Kakatiya Nagar",
        "addressLocality": "Hyderabad",
        "postalCode": "500007",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": company.phone,
        "contactType": "customer service",
        "email": company.email
      }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-ink text-ink dark:text-porcelain transition-colors duration-300 overflow-x-clip" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipToContent />
          <Header />
          <main id="main-content" className="overflow-x-hidden min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
        
        {/* Analytics */}
        <GoogleAnalytics gaId={gaId} />
        
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />

        {/* Global Schema Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </body>
    </html>
  );
}
