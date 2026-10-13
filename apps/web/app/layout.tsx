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
    default: "InsuCARE | Insurance Solutions",
    template: `%s | ${company.displayName}`
  },
  description:
    "IRDAI registered insurance broking solutions for individuals, families, SMEs, startups and enterprises in India.",
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
    title: "InsuCARE | Insurance Solutions",
    description: "Trusted insurance broking, risk advisory and claims assistance.",
    url: "https://insucareindia.vercel.app/",
    siteName: "InsuCARE",
    images: [`${SITE_URL}/brand/insucare-logo.jpeg`],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "InsuCARE | Insurance Solutions",
    description: "Transparent insurance advisory and claims support.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: company.displayName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/insucare-logo.jpeg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: company.phone,
    contactType: "customer service"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "InsuCARE",
  alternateName: [
    "InsuCare",
    "InsuCARE India Insurance Broking"
  ],
  url: "https://insucareindia.vercel.app/"
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

        {/* Global Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
