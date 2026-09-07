import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  description,
  actions,
  children,
  className,
  height = 280,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  height?: number;
}) {
  return (
    <div className={cn("panel p-5", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {actions}
      </div>
      <div className="mt-4 w-full" style={{ height }}>
        {children}
      </div>
    </div>
  );
}

export const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export const axisProps = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

export const tooltipStyle = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--color-popover-foreground)",
    boxShadow: "var(--shadow-pop)",
  },
  labelStyle: { color: "var(--color-muted-foreground)", fontWeight: 600 },
} as const;
