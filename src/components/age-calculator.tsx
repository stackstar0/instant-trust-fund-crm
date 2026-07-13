import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { loans, insurance, CatalogItem } from "@/lib/catalog";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  GraduationCap,
  Briefcase,
  Home,
  Car,
  Heart,
  Users,
  Compass,
  FileCheck2,
} from "lucide-react";

export function AgeCalculator() {
  const [age, setAge] = useState<number>(30);

  const presets = [
    { label: "Student", age: 19 },
    { label: "Young Pro", age: 24 },
    { label: "Family Stage", age: 35 },
    { label: "Pre-Retiree", age: 58 },
    { label: "Senior", age: 68 },
  ];

  const eligibility = useMemo(() => {
    let eligibleLoanSlugs: string[] = [];
    let eligibleInsuranceSlugs: string[] = [];
    let reasonText = "";

    if (age < 18) {
      eligibleLoanSlugs = ["education-loan"];
      eligibleInsuranceSlugs = ["child-plans", "travel-insurance"];
      reasonText = "Focus on education and child savings benefits.";
    } else if (age >= 18 && age <= 20) {
      eligibleLoanSlugs = ["education-loan", "car-loan"];
      eligibleInsuranceSlugs = [
        "health-insurance",
        "motor-insurance",
        "property-insurance",
        "travel-insurance",
        "business-insurance",
      ];
      reasonText = "Eligible for education funding, vehicle financing, and asset protection.";
    } else if (age >= 21 && age <= 24) {
      eligibleLoanSlugs = [
        "personal-loan",
        "property-loan",
        "car-loan",
        "business-loan",
        "education-loan",
      ];
      eligibleInsuranceSlugs = [
        "health-insurance",
        "family-insurance",
        "life-insurance",
        "motor-insurance",
        "property-insurance",
        "travel-insurance",
      ];
      reasonText = "Broad eligibility starting for young professionals and independent earners.";
    } else if (age >= 25 && age <= 55) {
      eligibleLoanSlugs = [
        "property-loan",
        "loan-against-property",
        "business-loan",
        "car-loan",
        "education-loan",
        "personal-loan",
        "professional-loan",
        "professional-equipment-loan",
        "commercial-loan",
        "hospital-funding",
        "educational-institution-funding",
      ];
      eligibleInsuranceSlugs = [
        "health-insurance",
        "family-insurance",
        "life-insurance",
        "pension-plans",
        "motor-insurance",
        "property-insurance",
        "business-insurance",
        "travel-insurance",
      ];
      reasonText = "Full eligibility for maximum life coverage, asset finance, and business/professional growth.";
    } else if (age >= 56 && age <= 65) {
      eligibleLoanSlugs = [
        "property-loan",
        "loan-against-property",
        "business-loan",
        "car-loan",
        "professional-loan",
        "commercial-loan",
      ];
      eligibleInsuranceSlugs = [
        "health-insurance",
        "family-insurance",
        "life-insurance",
        "pension-plans",
        "property-insurance",
        "travel-insurance",
      ];
      reasonText = "Optimized for retirement planning, security, and senior wealth protection.";
    } else if (age >= 66 && age <= 75) {
      eligibleLoanSlugs = ["loan-against-property", "commercial-loan"];
      eligibleInsuranceSlugs = ["pension-plans", "travel-insurance", "property-insurance"];
      reasonText = "Asset-backed loans and active security features for senior citizens.";
    } else {
      eligibleLoanSlugs = ["loan-against-property"];
      eligibleInsuranceSlugs = ["travel-insurance"];
      reasonText = "Simple asset-backed liquidity and international travel protections.";
    }

    const eligibleLoans = loans.filter((l) => eligibleLoanSlugs.includes(l.slug));
    const eligibleInsurance = insurance.filter((i) => eligibleInsuranceSlugs.includes(i.slug));

    return { eligibleLoans, eligibleInsurance, reasonText };
  }, [age]);

  const getIcon = (slug: string) => {
    switch (slug) {
      case "property-loan":
        return Home;
      case "loan-against-property":
        return TrendingUp;
      case "business-loan":
        return Briefcase;
      case "car-loan":
        return Car;
      case "education-loan":
        return GraduationCap;
      case "personal-loan":
        return FileCheck2;
      case "professional-loan":
        return Briefcase;
      case "professional-equipment-loan":
        return TrendingUp;
      case "commercial-loan":
        return Home;
      case "hospital-funding":
        return Heart;
      case "educational-institution-funding":
        return GraduationCap;
      case "health-insurance":
        return Heart;
      case "family-insurance":
        return Users;
      case "life-insurance":
        return Shield;
      case "child-plans":
        return GraduationCap;
      case "pension-plans":
        return Compass;
      default:
        return Shield;
    }
  };

  return (
    <Card className="p-6 bg-card border shadow-card">
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left Column: Interactive Slider */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-brand-navy">Age eligibility checker</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Find customized financial & protection products based on your age segment.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-muted-foreground">Select Age</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-primary">{age}</span>
                <span className="text-sm font-semibold text-muted-foreground">years</span>
              </div>
            </div>

            <Slider
              value={[age]}
              min={10}
              max={85}
              step={1}
              onValueChange={([v]) => setAge(v)}
              className="py-4"
            />

            <div className="flex flex-wrap gap-1.5 pt-2">
              {presets.map((p) => (
                <Button
                  key={p.label}
                  variant={age === p.age ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAge(p.age)}
                  className="text-xs h-7 px-2.5 rounded-full"
                >
                  {p.label} ({p.age})
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Eligibility Insight
            </span>
            <p className="text-xs font-semibold text-foreground mt-1 leading-relaxed">
              {eligibility.reasonText}
            </p>
          </div>
        </div>

        {/* Right Column: Recommendations Results */}
        <div className="lg:col-span-3 space-y-5">
          {/* Loans */}
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-brand-navy">
                Eligible Loans ({eligibility.eligibleLoans.length})
              </h4>
              <span className="text-[10px] font-bold text-muted-foreground">Instant Application</span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {eligibility.eligibleLoans.map((l) => {
                const Icon = getIcon(l.slug);
                return (
                  <Link
                    key={l.slug}
                    to="/loans/$slug"
                    params={{ slug: l.slug }}
                    className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:bg-primary/5 hover:border-primary/30 transition group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-foreground truncate">{l.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{l.tagline}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-brand-navy">
                Eligible Insurance ({eligibility.eligibleInsurance.length})
              </h4>
              <span className="text-[10px] font-bold text-muted-foreground">Instant Quotes</span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {eligibility.eligibleInsurance.map((i) => {
                const Icon = getIcon(i.slug);
                return (
                  <Link
                    key={i.slug}
                    to="/insurance/$slug"
                    params={{ slug: i.slug }}
                    className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:bg-primary/5 hover:border-primary/30 transition group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-foreground truncate">{i.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{i.tagline}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
