import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Crosshair, Loader2, LocateFixed, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState, ErrorState, LoadingState, SuccessBanner } from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { api, currency, type Pod } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customer/find")({
  head: () => ({
    meta: [
      { title: "Find an InstaPod | InstaPod" },
      { name: "description", content: "Use GPS to locate InstaPods around you, filter by availability and distance, then book a bay instantly." },
      { property: "og:title", content: "Find an InstaPod | InstaPod" },
      { property: "og:description", content: "Locate InstaPods around you with GPS, filter by availability and book a bay." },
    ],
  }),
  component: FindPod,
});

function FindPod() {
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["pods"], queryFn: () => api.pods() });
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [radius, setRadius] = useState([15]);
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const pods = (data ?? []) as Pod[];
  const results = useMemo(
    () =>
      pods
        .filter((p) => (status === "all" ? true : p.status === status))
        .filter((p) => p.distanceKm <= (radius[0] ?? 15))
        .filter((p) =>
          `${p.name} ${p.address} ${p.city}`.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .sort((a, b) => a.distanceKm - b.distanceKm),
    [pods, status, radius, query],
  );

  const active = results.find((p) => p.id === selected) ?? results[0];

  function detectLocation() {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setLocated(true);
    }, 900);
  }

  return (
    <>
      <PageHeader
        title="Find an InstaPod"
        description="Search by area or use your live location to see pods on the map."
        actions={
          <Button onClick={detectLocation} disabled={locating}>
            {locating ? <Loader2 className="size-4 animate-spin" /> : <LocateFixed className="size-4" />}
            {locating ? "Locating…" : "Use my location"}
          </Button>
        }
      />

      {located ? (
        <SuccessBanner
          title="Location detected — Indiranagar, Bengaluru"
          description="Results are sorted by distance from your current position."
        />
      ) : null}

      <div className="panel flex flex-col gap-4 p-4 md:flex-row md:items-end">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area, landmark or pod name"
            className="pl-9"
          />
        </div>
        <div className="w-full md:w-44">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Availability
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-use">In use</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-56">
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <SlidersHorizontal className="size-3.5" /> Radius · {radius[0]} km
          </label>
          <Slider value={radius} onValueChange={setRadius} min={1} max={20} step={1} />
        </div>
      </div>

      {isPending ? (
        <LoadingState label="Locating InstaPods near you" rows={5} />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : results.length === 0 ? (
        <EmptyState
          title="No pods match your filters"
          description="Try widening the radius or clearing the availability filter."
          icon={<MapPin className="size-5" />}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setStatus("all");
                setRadius([20]);
              }}
            >
              Reset filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-5">
          <div className="panel relative grid-canvas overflow-hidden lg:col-span-3 min-h-[380px]">
            <div className="absolute inset-0">
              {results.map((pod, i) => (
                <button
                  key={pod.id}
                  onClick={() => setSelected(pod.id)}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs font-semibold shadow-md transition-transform hover:scale-105",
                    active?.id === pod.id && "border-primary bg-primary text-primary-foreground",
                  )}
                  style={{ left: `${14 + ((i * 137) % 72)}%`, top: `${18 + ((i * 91) % 64)}%` }}
                  aria-label={`Select ${pod.name}`}
                >
                  <MapPin className="size-3.5" />
                  {pod.distanceKm} km
                </button>
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/15">
              <Crosshair className="size-5 text-primary" />
            </div>
            <p className="absolute bottom-3 left-3 rounded-md bg-card/90 px-2 py-1 text-[11px] text-muted-foreground">
              Live map preview · {results.length} pods within {radius[0]} km
            </p>
          </div>

          <div className="space-y-3 lg:col-span-2">
            {results.map((pod) => (
              <div
                key={pod.id}
                className={cn(
                  "panel p-4 transition-colors",
                  active?.id === pod.id && "border-primary/50 ring-1 ring-primary/20",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{pod.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{pod.address}</p>
                  </div>
                  <StatusBadge status={pod.status} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{pod.distanceKm} km away</span>
                  <span>
                    {pod.baysFree}/{pod.bays} bays free
                  </span>
                  <span>{currency(pod.pricePerHour)}/hr</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelected(pod.id)}>
                    Show on map
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/customer/pods/$podId" params={{ podId: pod.id }}>
                      View details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
