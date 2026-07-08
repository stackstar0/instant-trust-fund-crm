import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Instant Funds for You" },
      {
        name: "description",
        content:
          "Terms and conditions governing your use of the Instant Funds for You website and demo services.",
      },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-4xl font-black">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </p>
      <div className="prose prose-slate mt-8 max-w-none space-y-4 text-sm text-muted-foreground">
        <p>
          <strong>1. Demo notice.</strong> This website is a UI/UX prototype. No real financial
          transactions, credit checks, disbursals, or insurance policies are processed. All customer
          names, mobile numbers, PAN, Aadhaar, and SMS content are synthetic and used for
          demonstration only.
        </p>
        <p>
          <strong>2. Website ownership.</strong> This demo website is created and maintained for portfolio and
          prototype demonstration purposes. Any commercial deployment requires appropriate
          regulatory approvals (RBI, IRDAI) which are the sole responsibility of the deploying
          operator.
        </p>
        <p>
          <strong>3. Use of information.</strong> Any information you enter into a form on this demo
          is stored in the browser's memory only, resets on refresh, and is not transmitted to any
          real backend. Do not enter genuine identity data such as your real Aadhaar or PAN.
        </p>
        <p>
          <strong>4. No advisory relationship.</strong> Product descriptions, rates, tenures,
          premiums, and eligibility criteria shown on this site are illustrative sample values. They
          do not constitute financial, tax or investment advice, and do not create any
          advisor–client relationship.
        </p>
        <p>
          <strong>5. Trademarks.</strong> Brand references to SBI, LIC or any other bank/insurer are
          for demonstration only. No affiliation, sponsorship or endorsement is implied.
        </p>
        <p>
          <strong>6. Intellectual property.</strong> Layout, copy, code and generated imagery are
          provided under a demo license. Redistribution requires written permission from the
          creator.
        </p>
        <p>
          <strong>7. Limitation of liability.</strong> The creator is not liable for any decision
          taken by any user on the basis of information shown on this demo.
        </p>
        <p>
          <strong>8. Contact.</strong> For questions about this demo, write to{" "}
          <em>care@instantfundsforyou.demo</em>. Real financial complaints must be addressed to your
          actual regulated service provider.
        </p>
      </div>
    </div>
  ),
});
