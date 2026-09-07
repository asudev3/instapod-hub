import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

const toneClass: Record<Tone, string> = {
  success: "bg-success/12 text-success border-success/25",
  warning: "bg-warning/15 text-warning-foreground border-warning/35",
  danger: "bg-destructive/12 text-destructive border-destructive/25",
  info: "bg-info/12 text-info border-info/25",
  primary: "bg-primary-soft text-primary border-primary/25",
  neutral: "bg-muted text-muted-foreground border-border",
};

const statusTone: Record<string, Tone> = {
  online: "success",
  "in-use": "primary",
  offline: "danger",
  maintenance: "warning",
  active: "success",
  paused: "warning",
  pending: "info",
  completed: "neutral",
  rejected: "danger",
  paid: "success",
  failed: "danger",
  refunded: "info",
  open: "danger",
  "in-progress": "warning",
  resolved: "success",
  acknowledged: "info",
  cleared: "neutral",
  critical: "danger",
  info: "info",
  warning: "warning",
  upcoming: "primary",
  cancelled: "neutral",
  credit: "success",
  debit: "warning",
};

const labels: Record<string, string> = {
  "in-use": "In use",
  "in-progress": "In progress",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = statusTone[status] ?? "neutral";
  const label = labels[status] ?? status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        toneClass[tone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
