import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { inr } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";

export function EmiCalculator({
  defaultAmount = 2500000,
  defaultRate = 8.5,
  defaultYears = 20,
}: {
  defaultAmount?: number;
  defaultRate?: number;
  defaultYears?: number;
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [years, setYears] = useState(defaultYears);

  const { emi, totalInterest, totalPay } = useMemo(() => {
    const n = years * 12;
    const r = rate / 12 / 100;
    const emi = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    return { emi, totalInterest: totalPay - amount, totalPay };
  }, [amount, rate, years]);

  return (
    <Card className="grid gap-6 p-6 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm">
            <label className="font-medium">Loan Amount</label>
            <span className="font-semibold text-primary">{inr(amount)}</span>
          </div>
          <Slider
            value={[amount]}
            min={50000}
            max={20000000}
            step={50000}
            onValueChange={([v]) => setAmount(v)}
            className="mt-3"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <label className="font-medium">Interest Rate (% p.a.)</label>
            <span className="font-semibold text-primary">{rate.toFixed(2)}%</span>
          </div>
          <Slider
            value={[rate]}
            min={6}
            max={22}
            step={0.1}
            onValueChange={([v]) => setRate(v)}
            className="mt-3"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <label className="font-medium">Tenure (years)</label>
            <span className="font-semibold text-primary">{years} yrs</span>
          </div>
          <Slider
            value={[years]}
            min={1}
            max={30}
            step={1}
            onValueChange={([v]) => setYears(v)}
            className="mt-3"
          />
        </div>
      </div>
      <div className="grid content-center gap-3 rounded-xl bg-brand-gradient p-6 text-white">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/70">Monthly EMI</div>
          <div className="mt-1 text-4xl font-black">{inr(Math.round(emi))}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-4 text-sm">
          <div>
            <div className="text-white/70">Total Interest</div>
            <div className="font-semibold">{inr(Math.round(totalInterest))}</div>
          </div>
          <div>
            <div className="text-white/70">Total Payable</div>
            <div className="font-semibold">{inr(Math.round(totalPay))}</div>
          </div>
        </div>
        <p className="text-xs text-white/70">
          Indicative EMI for demo purposes; actual EMI depends on bank policy.
        </p>
      </div>
    </Card>
  );
}
