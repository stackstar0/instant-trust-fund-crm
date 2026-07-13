import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  FileText,
  IndianRupee,
} from "lucide-react";
import type { CatalogItem } from "@/lib/catalog";
import { findCatalogItem } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApplyDialog } from "@/components/apply-dialog";
import { EmiCalculator } from "@/components/emi-calculator";
import { AgeCalculator } from "@/components/age-calculator";

const SbiLogo = () => (
  <svg viewBox="0 0 100 100" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="36" fill="#005BAC" />
    <line x1="50" y1="50" x2="50" y2="86" stroke="white" strokeWidth="8" />
    <circle cx="50" cy="50" r="10" fill="white" />
  </svg>
);

const LicLogo = () => (
  <svg viewBox="0 0 120 100" className="h-8 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,60 C20,30 50,20 60,10 C70,20 100,30 100,60 C100,90 20,90 20,60 Z" fill="#0054A6" />
    <circle cx="60" cy="50" r="18" fill="#FFD200" />
    <path d="M50,45 C50,30 70,30 70,45 C70,60 50,60 50,45 Z" fill="#E31E24" />
    <path d="M15,50 Q10,75 40,85" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M105,50 Q110,75 80,85" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const HdfcLogo = () => (
  <svg viewBox="0 0 150 40" className="h-8 w-24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="40" rx="4" fill="#004C8F" />
    <rect x="10" y="8" width="8" height="24" fill="#E31E24" />
    <rect x="22" y="8" width="8" height="24" fill="white" />
    <rect x="34" y="8" width="8" height="24" fill="white" />
    <rect x="46" y="8" width="8" height="24" fill="white" />
    <text x="62" y="26" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">HDFC BANK</text>
  </svg>
);

const IciciLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="40" rx="4" fill="#8F2A28" />
    <circle cx="20" cy="20" r="10" fill="#FFC72C" />
    <text x="40" y="25" fill="#FFC72C" fontSize="15" fontWeight="black" fontFamily="sans-serif">ICICI Bank</text>
  </svg>
);

const AxisLogo = () => (
  <svg viewBox="0 0 140 40" className="h-8 w-24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="140" height="40" rx="4" fill="#971B49" />
    <path d="M22,12 L32,28 L27,28 L17,12 Z" fill="white" />
    <path d="M12,28 L22,12 L17,12 L7,28 Z" fill="white" />
    <text x="42" y="26" fill="white" fontSize="16" fontWeight="black" fontFamily="sans-serif">AXIS BANK</text>
  </svg>
);

const MuthootLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="40" rx="4" fill="#E31E24" />
    <circle cx="20" cy="20" r="8" fill="white" />
    <circle cx="34" cy="20" r="8" fill="white" />
    <text x="52" y="25" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">MUTHOOT</text>
  </svg>
);

const IiflLogo = () => (
  <svg viewBox="0 0 140 40" className="h-8 w-24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="140" height="40" rx="4" fill="#F7941D" />
    <text x="15" y="25" fill="white" fontSize="18" fontWeight="black" fontFamily="sans-serif">IIFL</text>
    <text x="60" y="24" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">FINANCE</text>
  </svg>
);

function BankPartners({ slug }: { slug: string }) {
  const getPartners = (slug: string) => {
    switch (slug) {
      case "property-loan":
        return [
          { name: "LIC Housing Finance", logo: LicLogo },
          { name: "HDFC Bank", logo: HdfcLogo },
          { name: "SBI", logo: SbiLogo },
        ];
      case "loan-against-property":
      case "commercial-loan":
        return [
          { name: "HDFC Bank", logo: HdfcLogo },
          { name: "ICICI Bank", logo: IciciLogo },
          { name: "Axis Bank", logo: AxisLogo },
        ];
      case "business-loan":
      case "professional-loan":
      case "professional-equipment-loan":
      case "hospital-funding":
      case "educational-institution-funding":
        return [
          { name: "SBI", logo: SbiLogo },
          { name: "ICICI Bank", logo: IciciLogo },
          { name: "Axis Bank", logo: AxisLogo },
        ];
      case "car-loan":
        return [
          { name: "HDFC Bank", logo: HdfcLogo },
          { name: "SBI", logo: SbiLogo },
          { name: "ICICI Bank", logo: IciciLogo },
        ];
      case "education-loan":
        return [
          { name: "SBI", logo: SbiLogo },
          { name: "HDFC Bank", logo: HdfcLogo },
          { name: "ICICI Bank", logo: IciciLogo },
        ];
      case "personal-loan":
        return [
          { name: "HDFC Bank", logo: HdfcLogo },
          { name: "ICICI Bank", logo: IciciLogo },
          { name: "Axis Bank", logo: AxisLogo },
        ];
      default:
        return [
          { name: "SBI", logo: SbiLogo },
          { name: "HDFC Bank", logo: HdfcLogo },
          { name: "ICICI Bank", logo: IciciLogo },
        ];
    }
  };

  const partners = getPartners(slug);

  return (
    <section className="bg-card border-t border-b py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Associated Banks & Financial Institutions
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Official partnership channels for fast processing & lower rates.
        </p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map(({ name, logo: LogoComponent }) => (
            <div
              key={name}
              className="flex items-center gap-3 bg-background border px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition"
              title={name}
            >
              <LogoComponent />
              <span className="text-xs font-bold text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoryPage({ item }: { item: CatalogItem }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-2 md:py-20">
          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit bg-accent text-accent-foreground hover:bg-accent">
              {item.kind === "loan" ? "Loan Product" : "Insurance Plan"}
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{item.name}</h1>
            <p className="mt-3 text-lg text-white/85">{item.tagline}</p>
            <p className="mt-4 max-w-xl text-sm text-white/75">{item.description}</p>
            {item.kind === "insurance" && (
              <div className="mt-4 rounded-xl border border-white/20 bg-white/10 p-3 text-[11px] text-white/90 backdrop-blur-sm max-w-xl">
                🛡️ **Policybazaar Partner Integration**: In production, real-time premium tables and direct policy comparison depend on official partnership API contracts with Policybazaar and regulatory IRDAI clearances.
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <ApplyDialog productName={item.name} productKind={item.kind}>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </ApplyDialog>
              <a href="#details">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  Learn more
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              {item.rate && (
                <span className="flex items-center gap-1.5">
                  <IndianRupee className="h-4 w-4" />
                  {item.rate}
                </span>
              )}
              {item.tenure && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {item.tenure}
                </span>
              )}
              {item.premium && (
                <span className="flex items-center gap-1.5">
                  <IndianRupee className="h-4 w-4" />
                  {item.premium}
                </span>
              )}
              {item.coverage && (
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  {item.coverage}
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-accent/30 blur-2xl" />
            <img
              src={item.image}
              alt={item.name}
              className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-elevated"
              width={1200}
              height={700}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Key features */}
      <section id="details" className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-4">
          {item.features.map((f) => (
            <Card key={f} className="flex items-start gap-3 p-4">
              <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
              <div className="text-sm font-medium">{f}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Sub-types */}
      {item.subtypes && (
        <section className="bg-secondary/40 py-14 border-t border-b">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold md:text-3xl">Available variants</h2>
            <p className="mt-2 text-muted-foreground">
              Choose the option that best fits your goal.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {item.subtypes.map((s) => (
                <Card key={s.name} className="p-5 transition hover:shadow-elevated">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">
                      <ShieldCheck className="h-full w-full" />
                    </div>
                    <h3 className="font-semibold text-foreground">{s.name}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits / Eligibility / Docs */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-bold">Benefits</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {item.benefits.map((b) => (
                <li key={b} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-bold">Eligibility</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {item.eligibility.map((b) => (
                <li key={b} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-bold">Documents Required</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {item.documents.map((b) => (
                <li key={b} className="flex gap-2">
                  <FileText className="h-5 w-5 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Associated Banks (loans only) */}
      {item.kind === "loan" && <BankPartners slug={item.slug} />}

      {/* EMI Calculator (loans only) */}
      {item.kind === "loan" && (
        <section className="bg-secondary/40 py-14">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold md:text-3xl">EMI Calculator</h2>
            <p className="mt-2 text-muted-foreground">Plan your monthly outgo before you apply.</p>
            <div className="mt-8">
              <EmiCalculator
                defaultRate={parseFloat((item.rate || "9").replace(/[^0-9.]/g, "")) || 9}
                defaultAmount={
                  item.slug === "personal-loan"
                    ? 500000
                    : item.slug === "car-loan"
                      ? 1000000
                      : 2500000
                }
                defaultYears={
                  item.slug === "car-loan" ? 5 : item.slug === "personal-loan" ? 4 : 20
                }
              />
            </div>
          </div>
        </section>
      )}

      {/* Age Eligibility Check (loans only) */}
      {item.kind === "loan" && (
        <section className="py-14 border-t border-b">
          <div className="mx-auto max-w-7xl px-6">
            <AgeCalculator />
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-center text-2xl font-bold md:text-3xl">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-8">
          {item.faqs.map((f, idx) => (
            <AccordionItem key={idx} value={`f-${idx}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Related */}
      {item.related && item.related.length > 0 && (
        <section className="bg-secondary/40 py-14 border-t border-b">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold md:text-3xl">You may also consider</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {item.related.map((slug) => {
                const rel = findCatalogItem(slug);
                if (!rel) return null;
                return (
                  <Link
                    key={slug}
                    to={rel.kind === "loan" ? "/loans/$slug" : "/insurance/$slug"}
                    params={{ slug: rel.slug }}
                    className="group overflow-hidden rounded-xl border bg-card transition hover:shadow-elevated"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                        width={800}
                        height={450}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{rel.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{rel.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-gradient py-14 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold">Ready to move forward?</h2>
          <p className="mt-3 text-white/85">Submit your application in less than 3 minutes.</p>
          <div className="mt-6 flex justify-center">
            <ApplyDialog productName={item.name} productKind={item.kind}>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Apply for {item.name} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </ApplyDialog>
          </div>
        </div>
      </section>
    </div>
  );
}
