import type { Metadata } from "next";
import Link from "next/link";
import { blogCategories, blogs, company } from "@insucare/domain";
import { Section } from "../../components/section";

import { absoluteUrl } from "../../lib/site";

const pageUrl = absoluteUrl("/blogs");

export const metadata: Metadata = {
  title: "Insurance Insights",
  description: "Insurance education, risk advisory and employee benefits insights from InsuCARE.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Blogs | Insurance Insights",
    description: "Insurance education, risk advisory and employee benefits insights from InsuCARE.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Insurance Insights",
    description: "Insurance education, risk advisory and employee benefits insights from InsuCARE.",
  }
};

export default function BlogsPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "InsuCARE Insurance Blog",
    url: pageUrl,
    description: "Insurance education and insights from InsuCARE.",
    publisher: {
      "@type": "Organization",
      name: company.displayName
    },
    blogPost: blogs.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blogs/${post.slug}`),
      datePublished: post.publishedAt
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Section eyebrow="Blogs" title="Insurance knowledge that helps you decide better.">
        <div className="mb-8 flex flex-wrap gap-3" aria-label="Blog Categories">
          {blogCategories.map((category) => (
            <span key={category} className="rounded-full border border-oxblood/10 dark:border-white/10 px-4 py-2 text-sm font-bold text-oxblood dark:text-champagne">
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map((post) => (
            <article key={post.slug} className="flex flex-col rounded-[2rem] border border-oxblood/10 dark:border-white/10 bg-white dark:bg-white/5 p-7 shadow-sm transition-all hover:shadow-premium-hover">
              <Link href={`/blogs/${post.slug}`} className="flex-1 focus:outline-none focus:ring-4 focus:ring-oxblood dark:focus:ring-champagne rounded-xl" aria-label={`Read article: ${post.title}`}>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-champagne">{post.category}</p>
                <h2 className="mt-4 font-display text-3xl font-bold">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-porcelain/65">{post.excerpt}</p>
                <p className="mt-5 text-sm font-bold text-oxblood dark:text-champagne">{post.readingTime}</p>
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
