import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Instant Funds for You" },
      {
        name: "description",
        content: "How we handle information on the Instant Funds for You demo website.",
      },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-4xl font-black">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </p>
      <div className="mt-8 space-y-4 text-sm text-muted-foreground">
        <p>
          <strong>1. Demo-only processing.</strong> This is a demonstration website. Form submissions,
          application data, and SMS content are all held only in your browser session and are never
          transmitted to any real server or third party.
        </p>
        <p>
          <strong>2. What we would collect in production.</strong> If deployed with a real backend,
          the site would collect: your name, contact details, PAN, Aadhaar, employment/income
          details, and uploaded KYC documents — solely for the purpose of processing your loan or
          insurance application through regulated partner banks and insurers.
        </p>
        <p>
          <strong>3. Security.</strong> Any production deployment would use industry-standard
          encryption in transit (TLS 1.3) and at rest, RBI-mandated data localisation, and
          role-based access. This demo does not process real data.
        </p>
        <p>
          <strong>4. Cookies and analytics.</strong> This demo does not set marketing cookies and
          does not integrate any advertising or analytics tracker.
        </p>
        <p>
          <strong>5. Your rights.</strong> Under Indian data-protection law you may request access,
          correction, or erasure of any personal data held. Since this demo holds no persistent
          personal data, no such request is applicable here.
        </p>
        <p>
          <strong>6. Grievances.</strong> Any question about this demo may be sent to{" "}
          <em>care@instantfundsforyou.demo</em>. For real financial grievances, contact your actual
          regulated bank, insurer, or the RBI / IRDAI ombudsman.
        </p>
        <p>
          <strong>7. Updates.</strong> This policy may be revised at any time; the updated date at
          the top of this page reflects the latest version.
        </p>
      </div>
    </div>
  ),
});
