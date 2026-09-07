import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { MapPin, Star, Zap } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api, currency, type Pod } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/nearby")({
  head: () => ({
    meta: [
      { title: "Nearby InstaPods | InstaPod" },
      { name: "description", content: "Browse InstaPods close to you with live bay availability, pricing, amenities and ratings." },
      { property: "og:title", content: "Nearby InstaPods | InstaPod" },
      { property: "og:description", content: "Live bay availability, pricing and amenities for InstaPods close to you." },
    ],
  }),
  component: NearbyPods,
});

export default function NearbyPods() {
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["pods"], queryFn: () => api.pods() });
  const [sort, setSort] = useState("distance");

  const pods = [...((data ?? []) as Pod[])].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "price") return a.pricePerHour - b.pricePerHour;
    if (sort === "availability") return b.baysFree - a.baysFree;
    return a.distanceKm - b.distanceKm;
  });

  return (
    <>
      <PageHeader
        title="Nearby InstaPods"
        description="Live availability within 15 km of Indiranagar, Bengaluru."
        actions={
          <div className="w-48">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Sort: Distance</SelectItem>
                <SelectItem value="rating">Sort: Rating</SelectItem>
                <SelectItem value="price">Sort: Price</SelectItem>
                <SelectItem value="availability">Sort: Free bays</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      />

      {isPending ? (
        <LoadingState label="Fetching nearby pods" rows={5} />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : pods.length === 0 ? (
        <EmptyState title="No pods nearby" description="We're expanding fast — check again soon." icon={<MapPin className="size-5" />} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pods.map((pod) => (
            <article key={pod.id} className="panel flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">{pod.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {pod.address}, {pod.city}
                  </p>
                </div>
                <StatusBadge status={pod.status} />
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-surface p-3 text-center">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Distance</dt>
                  <dd className="mt-0.5 text-sm font-semibold tabular-nums">{pod.distanceKm} km</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Free bays</dt>
                  <dd className="mt-0.5 text-sm font-semibold tabular-nums">
                    {pod.baysFree}/{pod.bays}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">Price</dt>
                  <dd className="mt-0.5 text-sm font-semibold tabular-nums">{currency(pod.pricePerHour)}</dd>
                </div>
              </dl>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {pod.amenities.map((a) => (
                  <span key={a} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Star className="size-3.5 fill-accent text-accent" />
                  {pod.rating}
                  <span className="text-muted-foreground">({pod.reviews})</span>
                </span>
                <Button size="sm" asChild disabled={pod.status === "offline"}>
                  <Link to="/customer/pods/$podId" params={{ podId: pod.id }}>
                    <Zap className="size-4" /> Book bay
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
