import { createFileRoute, Link } from "@tanstack/react-router";
import { insurance } from "@/lib/catalog";

export const Route = createFileRoute("/insurance/")({
  head: () => ({
    meta: [
      { title: "Insurance Plans — Instant Funds for You" },
      {
        name: "description",
        content:
          "Health, Life, Family, Motor, Travel, Child, Pension, Property and Business insurance from India's most trusted advisors.",
      },
    ],
  }),
  component: InsuranceIndex,
});

function InsuranceIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10">
        <h1 className="text-4xl font-black md:text-5xl">All Insurance Plans</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Protect what matters most — your family, your health, your car and your business.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insurance.map((i) => (
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
            <div className="p-6">
              <h3 className="text-xl font-bold">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.tagline}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-primary">
                  {i.premium}
                </span>
                <span className="font-semibold text-primary group-hover:underline">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
