import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  delta?: number;
  deltaLabel?: string;
  hint?: string;
  className?: string;
}

export function KpiCard({ label, value, icon: Icon, delta, deltaLabel, hint, className }: KpiCardProps) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className={cn("panel group relative overflow-hidden p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight tabular-nums">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== undefined ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
              up ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(delta)}%
          </span>
        ) : null}
        <span className="text-muted-foreground">{deltaLabel ?? hint}</span>
      </div>
    </div>
  );
}

export function KpiGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}
