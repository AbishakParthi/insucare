"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useId } from "react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  interest: z.string().min(2, "Please select an insurance interest"),
  message: z.string().min(10, "Please share a few details")
});

type FormValues = z.infer<typeof schema>;

const DEFAULT_WEB3FORMS_KEY = "64515490-6199-484b-8637-3b00a60ae52e";

export function ContactForm({ variant = "contact" }: { variant?: "contact" | "claim" | "career" }) {
  const formId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: variant === "claim" ? "Claims Assistance" : "" }
  });

  async function onSubmit(values: FormValues) {
    try {
      let isSuccess = false;

      // 1. Post to internal Next.js API route (runs directly on Vercel)
      try {
        const res = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, source: variant })
        });
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          if (data.success !== false) {
            isSuccess = true;
          }
        }
      } catch (err) {
        console.warn("Internal API route submission failed, trying direct Web3Forms fallback:", err);
      }

      // 2. Direct fallback to Web3Forms if internal route could not be reached
      if (!isSuccess) {
        const accessKey =
          process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
          DEFAULT_WEB3FORMS_KEY;

        const categoryLabel =
          variant === "claim"
            ? "Claims Assistance Request"
            : variant === "career"
            ? "Career Application"
            : "General Enquiry";

        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            name: values.name,
            email: values.email,
            phone: values.phone,
            interest: values.interest,
            message: values.message,
            source: categoryLabel,
            subject: `New InsuCARE ${categoryLabel}: ${values.interest} (${values.name})`,
            from_name: "InsuCARE Website"
          })
        });

        if (web3Res.ok) {
          const web3Data = await web3Res.json().catch(() => ({}));
          if (web3Data.success || web3Res.status === 200) {
            isSuccess = true;
          }
        }
      }

      if (!isSuccess) {
        throw new Error("Form submission could not be verified");
      }

      reset();
      alert("Thank you. The InsuCARE team will contact you shortly.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting your form. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card grid gap-5 rounded-[2rem] p-6 shadow-premium self-start" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name?.message} id={`${formId}-name`}>
          <input {...register("name")} id={`${formId}-name`} className="input" placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${formId}-name-error` : undefined} />
        </Field>
        <Field label="Email" error={errors.email?.message} id={`${formId}-email`}>
          <input {...register("email")} id={`${formId}-email`} type="email" className="input" placeholder="you@example.com" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${formId}-email-error` : undefined} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message} id={`${formId}-phone`}>
          <input {...register("phone")} id={`${formId}-phone`} type="tel" className="input" placeholder="+91" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${formId}-phone-error` : undefined} />
        </Field>
        <Field label="Insurance interest" error={errors.interest?.message} id={`${formId}-interest`}>
          <select {...register("interest")} id={`${formId}-interest`} className="input" aria-invalid={!!errors.interest} aria-describedby={errors.interest ? `${formId}-interest-error` : undefined}>
            <option value="">Select interest</option>
            <option>Corporate Insurance</option>
            <option>Employee Benefits</option>
            <option>Health Insurance</option>
            <option>Motor Insurance</option>
            <option>Claims Assistance</option>
            <option>Career Application</option>
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message} id={`${formId}-message`}>
        <textarea {...register("message")} id={`${formId}-message`} className="input min-h-32" placeholder="Tell us what you need help with" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${formId}-message-error` : undefined} />
      </Field>
      <button disabled={isSubmitting} className="rounded-full bg-oxblood px-6 py-3 font-bold text-white disabled:opacity-60 focus:ring-4 focus:ring-oxblood/50 outline-none">
        {isSubmitting ? "Sending..." : "Submit Enquiry"}
      </button>
      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(139, 17, 22, 0.14);
          background: white;
          padding: 0.85rem 1rem;
          outline: none;
          color: #1F2937;
        }
        :global(.dark) .input {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          color: #F8FAFC;
        }
        :global(.dark) .input option {
          background: #1F2937;
          color: #F8FAFC;
        }
        .input:focus {
          border-color: #8b1116;
          box-shadow: 0 0 0 4px rgba(139, 17, 22, 0.08);
        }
        :global(.dark) .input:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }
      `}</style>
    </form>
  );
}

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 text-sm font-bold text-ink dark:text-porcelain">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <span id={`${id}-error`} className="text-xs font-semibold text-oxblood dark:text-champagne" role="alert">{error}</span> : null}
    </div>
  );
}
