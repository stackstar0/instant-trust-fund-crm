import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { loans, insurance } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Users,
  IndianRupee,
  FileCheck2,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Instant Funds for You — Loans, Insurance & Financial Advisory" },
      {
        name: "description",
        content:
          "Home, Business, Vehicle, Education, Personal & Gold Loans plus Health, Life, Motor, Travel & Family Insurance. Apply online in minutes.",
      },
    ],
  }),
  component: LandingPage,
});

const stats = [
  { label: "Happy Customers", value: "1.2 L+", icon: Users },
  { label: "Loans Processed", value: "₹8,500 Cr+", icon: IndianRupee },
  { label: "Insurance Policies", value: "80,000+", icon: ShieldCheck },
  { label: "Cities Covered", value: "150+", icon: MapPin },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Home Loan customer",
    quote:
      "Got my home loan sanctioned in 5 days. The team walked me through every step — no hidden charges, no runaround.",
  },
  {
    name: "Rohit Mehta",
    role: "Business Loan customer",
    quote:
      "My MSME loan was approved without collateral in 72 hours. It saved my seasonal business — highly recommended.",
  },
  {
    name: "Anaya Verma",
    role: "Health Insurance customer",
    quote:
      "Their family floater plan gave us peace of mind during my mother's surgery. Cashless claim in under 4 hours.",
  },
];

function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img src={heroImg} alt="" className="h-full w-full object-cover" loading="eager" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit bg-accent text-accent-foreground hover:bg-accent">
              Trusted since 2012
            </Badge>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Loans & Insurance,
              <br />
              <span className="text-accent">simplified for you.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              Home, business, vehicle and personal loans. Health, life, motor and travel insurance.
              One trusted partner, powered by technology.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/loans">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Explore Loans <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/insurance">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  Explore Insurance
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-6 text-sm">
              {[
                { l: "Sanction in", v: "24 hrs" },
                { l: "Interest from", v: "8.35%" },
                { l: "Cities", v: "150+" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold text-accent">{s.v}</div>
                  <div className="text-xs text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center">
            <Card className="w-full max-w-md p-6 shadow-elevated">
              <h3 className="text-lg font-bold text-foreground">Quick Loan Enquiry</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get a call back in 15 minutes.</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <FileCheck2 className="h-5 w-5 text-primary" /> 100% online paperwork
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <Zap className="h-5 w-5 text-primary" /> Same-day sanction
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Bank-grade security
                </div>
              </div>
              <Link to="/loans/personal-loan">
                <Button className="mt-5 w-full bg-primary text-primary-foreground hover:bg-brand-navy">
                  Apply for a Personal Loan
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Loans */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Featured Loans</h2>
            <p className="mt-2 text-muted-foreground">Solutions for every stage of your life.</p>
          </div>
          <Link
            to="/loans"
            className="hidden text-sm font-semibold text-primary hover:underline md:block"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {loans.slice(0, 4).map((l) => (
            <Link
              key={l.slug}
              to="/loans/$slug"
              params={{ slug: l.slug }}
              className="group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={l.image}
                  alt={l.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  width={800}
                  height={500}
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold">{l.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{l.tagline}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-secondary px-2 py-1 font-semibold text-primary">
                    {l.rate}
                  </span>
                  <span className="text-primary group-hover:underline">Explore →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Insurance */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Featured Insurance</h2>
              <p className="mt-2 text-muted-foreground">
                Protection for you, your family, and your assets.
              </p>
            </div>
            <Link
              to="/insurance"
              className="hidden text-sm font-semibold text-primary hover:underline md:block"
            >
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {insurance.slice(0, 4).map((i) => (
              <Link
                key={i.slug}
                to="/insurance/$slug"
                params={{ slug: i.slug }}
                className="group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    width={800}
                    height={500}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{i.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{i.tagline}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="rounded-full bg-secondary px-2 py-1 font-semibold text-primary">
                      {i.premium}
                    </span>
                    <span className="text-primary group-hover:underline">Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Why choose Instant Funds for You</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Built by financial specialists who obsess about your outcome — not paperwork.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Lightning-fast approvals",
              body: "Digital KYC, algorithmic underwriting and sanctions in as little as 24 hours.",
            },
            {
              icon: ShieldCheck,
              title: "Transparent, secure, trusted",
              body: "Bank-grade encryption, RBI-compliant partners, and zero hidden fees — ever.",
            },
            {
              icon: Award,
              title: "Award-winning advisory",
              body: "Rated 4.8/5 by 40,000+ customers across India for service and clarity.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-gradient py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto h-8 w-8 text-accent" />
              <div className="mt-3 text-3xl font-black md:text-4xl">{value}</div>
              <div className="text-sm text-white/75">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Loved by customers across India</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{t.quote}"</p>
              <div className="mt-4 border-t pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Talk to an advisor</h2>
            <p className="mt-3 text-muted-foreground">
              Our loan and insurance specialists are available 9am–9pm, seven days a week.
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" /> 1800-123-4567 (toll-free)
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" /> care@instantfundsforyou.demo
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" /> 150+ branches across India
              </div>
            </div>
            <ul className="mt-6 grid gap-2 text-sm">
              {[
                "Free eligibility check",
                "No obligation quote",
                "Doorstep documentation",
                "Post-disbursal support",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-6">
            <h3 className="text-lg font-bold">Send us a message</h3>
            <div className="mt-4 space-y-3">
              <input
                placeholder="Your name"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <input
                placeholder="Mobile number"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <input
                placeholder="Email address"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <textarea
                placeholder="How can we help?"
                rows={4}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button className="w-full bg-primary hover:bg-brand-navy">Request Callback</Button>
              <p className="text-center text-xs text-muted-foreground">
                By submitting you agree to our Terms & Privacy Policy.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
