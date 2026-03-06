import { useState, type FC } from "react";

/**
 * ClaimChecker — "Do I have a case?" interactive assessment tool.
 * React island hydrated with client:visible in Astro.
 * All client-side, no data sent anywhere. Privacy-first.
 */

type Situation =
  | "fired"
  | "bullied"
  | "discriminated"
  | "contract"
  | "redundancy"
  | "other";

interface Answers {
  situation: Situation | null;
  whenDate: string;
  details: string[];
  duration: string;
  state: string;
  employerSize: string;
}

const situationLabels: Record<Situation, string> = {
  fired: "I was fired or let go",
  bullied: "I'm being bullied or harassed at work",
  discriminated: "I'm being treated differently because of who I am",
  contract: "My employer wants me to sign something",
  redundancy: "My role has been made redundant",
  other: "Something else is happening at work",
};

const situationFollowUp: Record<Situation, { label: string; options: string[] }> = {
  fired: {
    label: "Which of these apply to your situation?",
    options: [
      "I was not given a reason for my dismissal",
      "I was not given any warnings before being fired",
      "I believe the reason given was not genuine",
      "I was fired during a probation period",
      "I was forced to resign",
      "I was fired after raising a complaint",
    ],
  },
  bullied: {
    label: "What have you experienced?",
    options: [
      "Repeated verbal abuse or intimidation",
      "Being excluded or isolated from the team",
      "Unreasonable work demands or deadlines",
      "Public humiliation or criticism",
      "Having my work sabotaged or undermined",
      "Threats about my job security",
    ],
  },
  discriminated: {
    label: "What do you think the discrimination is based on?",
    options: [
      "Age",
      "Gender or sex",
      "Race, ethnicity or national origin",
      "Disability or medical condition",
      "Pregnancy or parental status",
      "Sexual orientation or gender identity",
      "Religion or political opinion",
    ],
  },
  contract: {
    label: "What are you being asked to sign?",
    options: [
      "A new employment contract",
      "A deed of release or settlement agreement",
      "A variation to my existing contract",
      "A restraint of trade or non-compete clause",
      "A redundancy package",
      "I'm not sure what the document is",
    ],
  },
  redundancy: {
    label: "Which of these apply to your redundancy?",
    options: [
      "My role still seems to exist under a different title",
      "Someone else has been hired to do my job",
      "I was not consulted before the decision was made",
      "I think the selection process was unfair",
      "I have not been offered a fair redundancy payout",
      "I was given very little notice",
    ],
  },
  other: {
    label: "What best describes your concern?",
    options: [
      "Unpaid wages or entitlements",
      "Unsafe working conditions",
      "Breach of my employment contract",
      "Issues with my workplace rights or entitlements",
      "Retaliation for making a complaint",
      "Something not listed here",
    ],
  },
};

const stateOptions = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const resultCopy: Record<Situation, { heading: string; message: string; practiceArea: string; slug: string }> = {
  fired: {
    heading: "You may have grounds for an unfair dismissal claim",
    message: "Based on what you've described, your dismissal may not have been fair. The Fair Work Commission can order reinstatement or compensation.",
    practiceArea: "Unfair Dismissal",
    slug: "unfair-dismissal-lawyers-sydney",
  },
  bullied: {
    heading: "What you're experiencing may constitute workplace bullying",
    message: "Australian law provides protections against repeated unreasonable behaviour at work. The Fair Work Commission can issue orders to stop the bullying.",
    practiceArea: "Workplace Bullying",
    slug: "workplace-bullying-lawyers-sydney",
  },
  discriminated: {
    heading: "You may have a workplace discrimination claim",
    message: "Discrimination based on protected attributes is unlawful under both federal and state legislation. You may be entitled to compensation.",
    practiceArea: "Workplace Discrimination",
    slug: "workplace-discrimination-lawyers-sydney",
  },
  contract: {
    heading: "You should have your document reviewed before signing",
    message: "Employment contracts and settlement agreements can contain terms that significantly affect your rights. A legal review can protect your interests.",
    practiceArea: "Employment Contracts",
    slug: "employment-contract-lawyers-sydney",
  },
  redundancy: {
    heading: "Your redundancy may not be genuine",
    message: "If your role still exists or the process was not fair, you may have a claim for unfair dismissal. You could also be entitled to a larger payout.",
    practiceArea: "Redundancy & Severance",
    slug: "redundancy-severance-lawyers-sydney",
  },
  other: {
    heading: "You may have a workplace rights claim",
    message: "Australian employment law provides broad protections for workers. A conversation with one of our lawyers can help you understand your options.",
    practiceArea: "General Protections",
    slug: "general-protections-lawyers-sydney",
  },
};

interface ClaimCheckerProps {
  mini?: boolean;
}

const ClaimChecker: FC<ClaimCheckerProps> = ({ mini = false }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    situation: null,
    whenDate: "",
    details: [],
    duration: "",
    state: "",
    employerSize: "",
  });

  const totalSteps = 5;

  const getDaysAgo = (dateStr: string): number | null => {
    if (!dateStr) return null;
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const deadlineDays = answers.whenDate ? getDaysAgo(answers.whenDate) : null;
  const isUrgent = deadlineDays !== null && deadlineDays <= 21 && (answers.situation === "fired" || answers.situation === "redundancy");
  const isPastDeadline = deadlineDays !== null && deadlineDays > 21 && (answers.situation === "fired" || answers.situation === "redundancy");

  const toggleDetail = (detail: string) => {
    setAnswers((prev) => ({
      ...prev,
      details: prev.details.includes(detail)
        ? prev.details.filter((d) => d !== detail)
        : [...prev.details, detail],
    }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return answers.situation !== null;
      case 1: return answers.whenDate !== "";
      case 2: return answers.details.length > 0;
      case 3: return answers.duration !== "" && answers.state !== "" && answers.employerSize !== "";
      default: return true;
    }
  };

  const next = () => {
    if (canProceed() && step < totalSteps - 1) setStep(step + 1);
  };
  const back = () => { if (step > 0) setStep(step - 1); };
  const restart = () => { setStep(0); setAnswers({ situation: null, whenDate: "", details: [], duration: "", state: "", employerSize: "" }); };

  const result = answers.situation ? resultCopy[answers.situation] : null;

  // Mini variant only shows step 0
  if (mini && step === 0) {
    return (
      <div style={{ maxWidth: "36rem" }}>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {(Object.entries(situationLabels) as [Situation, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setAnswers({ ...answers, situation: key }); }}
              className={`claim-option ${answers.situation === key ? "selected" : ""}`}
              style={{ textAlign: "left", fontFamily: "var(--font-body)", fontSize: "0.9375rem" }}
              aria-pressed={answers.situation === key}
              aria-label={`Select situation: ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
        {answers.situation && (
          <div style={{ marginTop: "1.25rem" }}>
            <a
              href="/check-my-case"
              className="btn btn-primary"
              style={{ fontSize: "0.875rem" }}
            >
              Continue your assessment
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "40rem", margin: mini ? "0" : "0 auto" }}>
      {/* Progress bar */}
      {step < totalSteps - 1 && (
        <div className="claim-checker-progress" style={{ marginBottom: "2rem" }}>
          {Array.from({ length: totalSteps - 1 }).map((_, i) => (
            <div
              key={i}
              className={`step-dot ${i === step ? "active" : ""} ${i < step ? "completed" : ""}`}
            />
          ))}
        </div>
      )}

      {/* Step 0: What happened? */}
      {step === 0 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            What happened?
          </h3>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
            Select the option that best describes your situation.
          </p>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {(Object.entries(situationLabels) as [Situation, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setAnswers({ ...answers, situation: key })}
                className={`claim-option ${answers.situation === key ? "selected" : ""}`}
                style={{ textAlign: "left", fontFamily: "var(--font-body)", fontSize: "0.9375rem" }}
                aria-pressed={answers.situation === key}
                aria-label={`Select situation: ${label}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: When did this happen? */}
      {step === 1 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            When did this happen?
          </h3>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
            An approximate date is fine. This helps us understand any time limits.
          </p>
          <input
            type="date"
            value={answers.whenDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setAnswers({ ...answers, whenDate: e.target.value })}
            style={{
              padding: "0.875rem 1rem",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              width: "100%",
              maxWidth: "20rem",
              background: "var(--color-surface)",
            }}
          />
          {isUrgent && (
            <div className="deadline-card" style={{ marginTop: "1rem", padding: "1rem 1.25rem", borderRadius: "var(--radius-lg)" }}>
              <p style={{ fontWeight: 600, color: "var(--color-accent)", fontSize: "0.875rem" }}>
                Time-sensitive: You have {21 - (deadlineDays || 0)} days remaining to lodge a Fair Work Commission application.
              </p>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.8125rem", marginTop: "0.25rem" }}>
                The sooner you act, the stronger your position.
              </p>
            </div>
          )}
          {isPastDeadline && (
            <div style={{ marginTop: "1rem", padding: "1rem 1.25rem", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-lg)" }}>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>
                The 21-day deadline may have passed, but there can be exceptions. It is still worth talking to us about your options.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Tell us more */}
      {step === 2 && answers.situation && (
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Tell us more
          </h3>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.25rem", fontSize: "0.9375rem" }}>
            {situationFollowUp[answers.situation].label}
          </p>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {situationFollowUp[answers.situation].options.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleDetail(opt)}
                className={`claim-option ${answers.details.includes(opt) ? "selected" : ""}`}
                style={{ textAlign: "left", fontFamily: "var(--font-body)", fontSize: "0.9375rem" }}
                role="checkbox"
                aria-checked={answers.details.includes(opt)}
                aria-label={opt}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: "1.125rem",
                      height: "1.125rem",
                      borderRadius: "0.25rem",
                      border: answers.details.includes(opt) ? "none" : "1.5px solid var(--color-border)",
                      background: answers.details.includes(opt) ? "var(--color-accent)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {answers.details.includes(opt) && (
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Quick details */}
      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            A few quick details
          </h3>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
            This helps us understand which protections apply to you.
          </p>
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                How long have you worked for this employer?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {["Less than 6 months", "6 months to 1 year", "1 to 5 years", "More than 5 years"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, duration: opt })}
                    className={`claim-option ${answers.duration === opt ? "selected" : ""}`}
                    style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.8125rem", padding: "0.75rem 0.5rem" }}
                    aria-pressed={answers.duration === opt}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Which state do you work in?
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {stateOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setAnswers({ ...answers, state: s })}
                    className={`claim-option ${answers.state === s ? "selected" : ""}`}
                    style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.8125rem", padding: "0.5rem 1rem", minWidth: "3.5rem" }}
                    aria-pressed={answers.state === s}
                    aria-label={`Select state: ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                How many employees does your employer have?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                {["Under 15", "15 to 100", "More than 100"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, employerSize: opt })}
                    className={`claim-option ${answers.employerSize === opt ? "selected" : ""}`}
                    style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.8125rem", padding: "0.75rem 0.5rem" }}
                    aria-pressed={answers.employerSize === opt}
                    aria-label={`Select employer size: ${opt} employees`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 4 && result && (
        <div>
          <div style={{
            padding: "2rem",
            borderRadius: "var(--radius-xl)",
            background: "var(--color-accent-subtle)",
            border: "1.5px solid var(--color-accent-muted)",
            marginBottom: "1.5rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{
                width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                background: "var(--color-accent)", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span style={{ fontWeight: 600, color: "var(--color-accent)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Assessment complete
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }}>
              {result.heading}
            </h3>
            <p style={{ marginTop: "0.75rem", color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
              {result.message}
            </p>
          </div>

          {isUrgent && (
            <div className="deadline-card" style={{ padding: "1rem 1.25rem", borderRadius: "var(--radius-lg)", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 600, color: "var(--color-accent)", fontSize: "0.875rem" }}>
                You have approximately {21 - (deadlineDays || 0)} days remaining to act.
              </p>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <a
              href="/contact"
              className="btn btn-primary"
              style={{ fontSize: "0.9375rem" }}
            >
              Talk to Sarah about this
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`/services/${result.slug}`}
              className="btn btn-outline"
              style={{ fontSize: "0.9375rem" }}
            >
              Learn about {result.practiceArea}
            </a>
          </div>

          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>
            This assessment is private. We have not stored any of your answers. This is general information only and does not constitute legal advice. For advice specific to your situation, book a free consultation.
          </p>

          <button
            onClick={restart}
            style={{
              marginTop: "1.25rem",
              fontSize: "0.8125rem",
              color: "var(--color-accent)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              padding: 0,
            }}
          >
            Start over
          </button>
        </div>
      )}

      {/* Navigation */}
      {step < 4 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
          {step > 0 ? (
            <button
              onClick={back}
              aria-label="Back to previous step"
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
              </svg>
              Back
            </button>
          ) : <div />}
          <button
            onClick={next}
            disabled={!canProceed()}
            className="btn btn-primary"
            style={{
              fontSize: "0.875rem",
              opacity: canProceed() ? 1 : 0.4,
              cursor: canProceed() ? "pointer" : "not-allowed",
            }}
          >
            {step === 3 ? "See your assessment" : "Continue"}
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ClaimChecker;
