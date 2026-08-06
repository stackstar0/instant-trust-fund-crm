import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface CibilGaugeProps {
  score: number;
}

export function CibilGauge({ score }: CibilGaugeProps) {
  // CIBIL range is 300 to 900. Total span = 600
  const minScore = 300;
  const maxScore = 900;
  const clampedScore = Math.max(minScore, Math.min(maxScore, score));
  
  // Calculate value relative to the 300-900 range
  const scoreValue = clampedScore - minScore;
  const remainingValue = maxScore - clampedScore;

  // Determine color and status label
  let color = "#ef4444"; // Red
  let status = "Poor";
  let statusText = "Requires attention. Higher interest rates may apply.";

  if (clampedScore >= 750) {
    color = "#22c55e"; // Green
    status = "Excellent";
    statusText = "Pre-approved for premium loan offers & best rates!";
  } else if (clampedScore >= 600) {
    color = "#eab308"; // Yellow/Amber
    status = "Good";
    statusText = "Fair credit health. Eligible for standard credit offers.";
  }

  // Data for the gauge
  const data = [
    { name: "Score", value: scoreValue, fill: color },
    { name: "Remaining", value: remainingValue, fill: "var(--color-muted-foreground) / 10%" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card border rounded-2xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }} />
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
        Credit Bureau Score
      </h3>
      
      <div className="relative w-64 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius="75%"
              outerRadius="95%"
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-0" fill={color} />
              <Cell key="cell-1" fill="#f1f5f9" className="dark:fill-slate-800" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Central Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-5xl font-black tracking-tighter text-brand-navy dark:text-white">
            {clampedScore}
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">
            Out of 900
          </span>
        </div>
      </div>

      <div className="text-center mt-4 space-y-1">
        <span 
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          {status} Health
        </span>
        <p className="text-xs text-slate-500 max-w-xs mt-2 font-medium leading-relaxed">
          {statusText}
        </p>
      </div>
    </div>
  );
}
