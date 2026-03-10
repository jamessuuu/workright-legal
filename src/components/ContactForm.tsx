import { useState, type FormEvent } from "react";
import { button } from "@/lib/utils/button-variants";

const FORMSPREE_URL = "https://n8n.liftlegal.com/webhook/workright-contact";

const serviceOptions = [
  "Unfair Dismissal Claims",
  "General Protections Claims",
  "Workplace Discrimination",
  "Workplace Bullying & Harassment",
  "Employment Contracts & Agreements",
  "Redundancy & Severance",
  "Other Employment Matter",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: FormData) {
    const errs: Record<string, string> = {};
    if (!form.get("firstName")) errs.firstName = "First name is required";
    if (!form.get("lastName")) errs.lastName = "Last name is required";
    const email = form.get("email") as string;
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email";
    if (!form.get("message")) errs.message = "Please tell us how we can help";
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    setSubmitError("");
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const payload = {
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        email: form.get("email"),
        phone: form.get("phone"),
        service: form.get("service"),
        message: form.get("message"),
      };
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-6 border border-[var(--color-border)] rounded-xl">
        <div className="text-3xl mb-4">&#10003;</div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thank you
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm">
          We&apos;ve received your enquiry and will respond within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-text)] focus:border-[var(--color-text)] transition-all duration-200 placeholder:text-[var(--color-text-tertiary)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name <span className="text-[var(--color-text-tertiary)]">*</span>
          </label>
          <input type="text" id="firstName" name="firstName" autoComplete="given-name" className={inputClass} aria-required="true" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
          {errors.firstName && <p id="firstName-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name <span className="text-[var(--color-text-tertiary)]">*</span>
          </label>
          <input type="text" id="lastName" name="lastName" autoComplete="family-name" className={inputClass} aria-required="true" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
          {errors.lastName && <p id="lastName-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-[var(--color-text-tertiary)]">*</span>
          </label>
          <input type="email" id="email" name="email" autoComplete="email" className={inputClass} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone <span className="text-[var(--color-text-tertiary)] font-normal">(optional)</span>
          </label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-2">
          Service Interest
        </label>
        <select id="service" name="service" className={inputClass + " bg-white"}>
          <option value="">Select a service...</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          How can we help? <span className="text-[var(--color-text-tertiary)]">*</span>
        </label>
        <textarea id="message" name="message" rows={4} className={inputClass + " resize-y"} aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.message}</p>}
      </div>

      {submitError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
          {submitError}
        </p>
      )}

      <button type="submit" disabled={submitting} className={button() + " w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"}>
        {submitting ? "Sending..." : "Send Enquiry"}
        {!submitting && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>

      <p className="text-xs text-[var(--color-text-tertiary)]">
        Your information is kept strictly confidential.
      </p>
    </form>
  );
}
