import { CheckCircle2, Inbox, Loader2, RefreshCw, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LoadingState({ rows = 4, label = "Loading data" }: { rows?: number; label?: string }) {
  return (
    <div className="panel p-6" role="status" aria-live="polite">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        {label}
      </div>
      <div className="mt-5 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

export function KpiSkeletonRow({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="panel p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-7 w-32" />
          <Skeleton className="mt-3 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong while loading this view.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="panel flex flex-col items-center gap-3 p-10 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-5" />
      </span>
      <h3 className="text-base font-semibold">Couldn't load data</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
          <RefreshCw className="size-4" /> Try again
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
  icon,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="panel flex flex-col items-center gap-3 p-12 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <Inbox className="size-5" />}
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action}
    </div>
  );
}

export function SuccessBanner({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-4 text-sm",
        className,
      )}
      role="status"
    >
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        {description ? <p className="mt-0.5 text-muted-foreground">{description}</p> : null}
      </div>
    </div>
  );
}
