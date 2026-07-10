import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero_new.png";
import founderPhoto from "@/assets/founder.png";
import { loans, insurance } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AgeCalculator } from "@/components/age-calculator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const detailedTestimonials = [
  {
    name: "Priya Sharma",
    amount: "₹45 Lakhs",
    purpose: "Home Purchase",
    institution: "LIC Housing Finance",
    quote: "Got my home loan sanctioned in 5 days. The team walked me through every step — no hidden charges, no runaround.",
    location: "Mumbai",
    rating: 5,
  },
  {
    name: "Rohit Mehta",
    amount: "₹18 Lakhs",
    purpose: "MSME Business Expansion",
    institution: "SBI",
    quote: "My MSME loan was approved without collateral in 72 hours. It saved my seasonal business — highly recommended.",
    location: "Delhi",
    rating: 5,
  },
  {
    name: "Anaya Verma",
    amount: "₹5 Lakhs",
    purpose: "Family Health Floater Plan",
    institution: "HDFC Bank",
    quote: "Their family floater plan gave us peace of mind during my mother's surgery. Cashless claim in under 4 hours.",
    location: "Bengaluru",
    rating: 5,
  },
];

function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img src={heroImg} alt="" className="h-full w-full object-cover" loading="eager" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            {/* Leadership Prominent Banner */}
            <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md shadow-elevated w-fit">
              <div className="flex items-center gap-2.5">
                <Avatar className="h-9 w-9 shrink-0 ring-2 ring-accent">
                  <AvatarImage src={founderPhoto} alt="Founder R H Adhoni" />
                  <AvatarFallback className="bg-primary text-white text-xs font-bold">RA</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Founder & MD</div>
                  <div className="text-xs font-bold text-white">R H Adhoni</div>
                </div>
              </div>
              <div className="hidden h-6 w-px bg-white/20 sm:block" />
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/25 ring-2 ring-accent text-accent font-black text-xs">
                  BA
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">Chief Administrator</div>
                  <div className="text-xs font-bold text-white">Bibi Ayesha</div>
                </div>
              </div>
            </div>

            <Badge className="mb-4 w-fit bg-accent text-accent-foreground hover:bg-accent font-semibold">
              Trusted since 2012
            </Badge>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Instant Funds for You
            </h1>
            <p className="mt-3 text-lg font-bold text-accent md:text-xl">
              Loans & Insurance, simplified for you.
            </p>
            <p className="mt-3 max-w-lg text-sm text-white/80 leading-relaxed">
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
              <h3 className="text-lg font-bold text-brand-navy">Quick Loan Enquiry</h3>
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
              <Link to="/loans/$slug" params={{ slug: "personal-loan" }}>
                <Button className="mt-5 w-full bg-primary text-primary-foreground hover:bg-brand-navy">
                  Apply for a Personal Loan
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Instant Loans */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl text-brand-navy">Instant Loans</h2>
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
                <h3 className="font-bold text-brand-navy">{l.name}</h3>
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

      {/* Instant Insurance */}
      <section className="bg-secondary/40 py-16 border-t border-b">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl text-brand-navy">Instant Insurance</h2>
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
                  <h3 className="font-bold text-brand-navy">{i.name}</h3>
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
          <h2 className="text-3xl font-bold md:text-4xl text-brand-navy">Why choose Instant Funds for You</h2>
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
              <h3 className="mt-4 text-lg font-bold text-brand-navy">{title}</h3>
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

      {/* Age Calculator Tool Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-b border-t border-dashed border-primary/20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold md:text-4xl text-brand-navy">Check your loan & insurance eligibility by age</h2>
          <p className="mt-2 text-muted-foreground">Adjust the slider to discover personalized financial matches in seconds.</p>
        </div>
        <AgeCalculator />
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-brand-navy">Loved by customers across India</h2>
          <p className="mt-2 text-muted-foreground">Hear from our clients who achieved their financial goals.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {detailedTestimonials.map((t) => (
            <Card key={t.name} className="p-6 shadow-card hover:shadow-elevated transition border-l-4 border-l-primary flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold text-xs px-2 py-0.5">
                    {t.amount}
                  </Badge>
                </div>
                <div className="mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Purpose of Loan</span>
                  <p className="text-xs font-bold text-foreground mt-0.5">{t.purpose} · {t.institution}</p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="mt-6 border-t pt-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl text-brand-navy">Talk to an advisor</h2>
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
            <h3 className="text-lg font-bold text-brand-navy">Send us a message</h3>
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
