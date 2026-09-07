import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Shield, Star, Zap } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartCard, axisProps, tooltipStyle } from "@/components/dashboard/chart-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState, ErrorState, LoadingState, SuccessBanner } from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api, currency, podUsageSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/pods/$podId")({
  head: () => ({
    meta: [
      { title: "InstaPod details & availability | InstaPod" },
      { name: "description", content: "See bay availability, pricing, amenities, uptime and hourly demand for an individual InstaPod before you book." },
      { property: "og:title", content: "InstaPod details & availability | InstaPod" },
      { property: "og:description", content: "Bay availability, pricing, amenities and hourly demand for a single InstaPod." },
    ],
  }),
  component: PodDetails,
});

const slots = ["08:00", "09:30", "11:00", "13:30", "15:00", "17:30", "19:00", "21:00"];

function PodDetails() {
  const { podId } = Route.useParams();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pod", podId],
    queryFn: () => api.pod(podId),
  });
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  if (isPending) return <LoadingState label="Loading pod details" rows={6} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data)
    return (
      <EmptyState
        title="Pod not found"
        description={`We couldn't find ${podId}. It may have been decommissioned.`}
        icon={<MapPin className="size-5" />}
        action={
          <Button variant="outline" size="sm" asChild>
            <Link to="/customer/nearby">Back to nearby pods</Link>
          </Button>
        }
      />
    );

  const pod = data;

  return (
    <>
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link to="/customer/nearby">
          <ArrowLeft className="size-4" /> Nearby pods
        </Link>
      </Button>

      <PageHeader
        title={pod.name}
        description={`${pod.address}, ${pod.city} · ${pod.id}`}
        actions={<StatusBadge status={pod.status} />}
      />

      {booked ? (
        <SuccessBanner
          title={`Bay reserved for ${slot}`}
          description={`We'll hold your bay at ${pod.name} for 15 minutes after your slot begins.`}
        />
      ) : null}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="panel p-5">
            <h2 className="text-sm font-semibold">Availability today</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {pod.baysFree} of {pod.bays} bays free · {pod.openHours}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((s, i) => {
                const disabled = pod.status !== "online" || i % 4 === 2;
                return (
                  <button
                    key={s}
                    disabled={disabled}
                    onClick={() => setSlot(s)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      slot === s ? "border-primary bg-primary text-primary-foreground" : "hover:bg-surface"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {pod.status !== "online" ? (
              <p className="mt-3 rounded-lg bg-warning/12 px-3 py-2 text-xs text-warning-foreground">
                This pod is currently {pod.status}. Slot booking is temporarily disabled.
              </p>
            ) : null}
          </div>

          <ChartCard title="Typical demand by hour" description="Helps you pick a quieter slot" height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={podUsageSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="hour" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="sessions" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="space-y-5">
          <div className="panel p-5">
            <h2 className="text-sm font-semibold">Book this pod</h2>
            <div className="mt-3 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Service
                </label>
                <Select defaultValue="fast-charge">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast-charge">Fast charge · 22 kW</SelectItem>
                    <SelectItem value="wash">Wash + tyre pressure</SelectItem>
                    <SelectItem value="detailing">Interior detailing</SelectItem>
                    <SelectItem value="battery">Battery health check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-semibold tabular-nums">{currency(pod.pricePerHour)}/hr</span>
              </div>
              <Button
                className="w-full"
                disabled={!slot || pod.status !== "online"}
                onClick={() => setBooked(true)}
              >
                <Zap className="size-4" /> {slot ? `Reserve ${slot}` : "Select a slot"}
              </Button>
            </div>
          </div>

          <div className="panel space-y-3 p-5">
            <h2 className="text-sm font-semibold">Pod facts</h2>
            <div className="flex items-center gap-2 text-sm">
              <Star className="size-4 fill-accent text-accent" />
              {pod.rating} rating · {pod.reviews} reviews
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="size-4 text-primary" /> {pod.uptime}% uptime last 90 days
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="size-4 text-primary" /> {pod.openHours}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="size-4 text-primary" /> {pod.distanceKm} km from you
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pod.amenities.map((a) => (
                <span key={a} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
