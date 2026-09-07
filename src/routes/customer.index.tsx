import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Battery, CalendarClock, MapPin, Receipt, Wallet } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard, axisProps, tooltipStyle } from "@/components/dashboard/chart-card";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { KpiCard, KpiGrid } from "@/components/dashboard/kpi-card";
import { PageHeader, SectionTitle } from "@/components/dashboard/page-header";
import { ErrorState, KpiSkeletonRow, LoadingState } from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { api, currency, dateTime, podUsageSeries, type Pod, type ServiceOrder } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/")({
  head: () => ({
    meta: [
      { title: "Customer Home | InstaPod" },
      { name: "description", content: "Track your InstaPod bookings, charging sessions, payments and nearby pod availability in one place." },
      { property: "og:title", content: "Customer Home | InstaPod" },
      { property: "og:description", content: "Track your InstaPod bookings, charging sessions, payments and nearby pod availability." },
    ],
  }),
  component: CustomerHome,
});

function CustomerHome() {
  const orders = useQuery({ queryKey: ["customer", "orders"], queryFn: () => api.serviceOrders() });
  const podsQuery = useQuery({ queryKey: ["pods"], queryFn: () => api.pods() });

  const columns: Column<ServiceOrder>[] = [
    { key: "id", header: "Order", cell: (r) => <span className="font-medium">{r.id}</span> },
    { key: "pod", header: "InstaPod", cell: (r) => r.podName },
    { key: "service", header: "Service", cell: (r) => r.service },
    { key: "date", header: "Date", cell: (r) => dateTime(r.date) },
    { key: "amount", header: "Amount", align: "right", cell: (r) => currency(r.amount) },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader
        title="Welcome back, Ananya"
        description="Here's what's happening with your InstaPod activity today."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/customer/nearby">
                <MapPin className="size-4" /> Nearby pods
              </Link>
            </Button>
            <Button asChild>
              <Link to="/customer/find">Find an InstaPod</Link>
            </Button>
          </>
        }
      />

      {orders.isPending ? (
        <KpiSkeletonRow />
      ) : (
        <KpiGrid>
          <KpiCard label="Upcoming booking" value="12 Sep, 10:00" icon={CalendarClock} hint="Battery health check" />
          <KpiCard label="Wallet balance" value={currency(2480)} icon={Wallet} delta={12} deltaLabel="vs last month" />
          <KpiCard label="Sessions this month" value="9" icon={Battery} delta={18} deltaLabel="vs last month" />
          <KpiCard label="Spend this month" value={currency(3170)} icon={Receipt} delta={-6} deltaLabel="vs last month" />
        </KpiGrid>
      )}

      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard
          title="Your pod usage by hour"
          description="Sessions across the last 30 days"
          className="xl:col-span-2"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={podUsageSeries}>
              <defs>
                <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="hour" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipStyle} />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                fill="url(#usageFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="panel p-5">
          <SectionTitle
            title="Closest pods"
            action={
              <Link to="/customer/nearby" className="text-xs font-semibold text-primary hover:underline">
                View all
              </Link>
            }
          />
          {podsQuery.isPending ? (
            <p className="text-sm text-muted-foreground">Loading pods…</p>
          ) : podsQuery.isError ? (
            <ErrorState message="Pod availability is unavailable." onRetry={() => podsQuery.refetch()} />
          ) : (
            <ul className="space-y-3">
              {(podsQuery.data as Pod[]).slice(0, 4).map((pod) => (
                <li key={pod.id}>
                  <Link
                    to="/customer/pods/$podId"
                    params={{ podId: pod.id }}
                    className="flex items-start justify-between gap-3 rounded-lg border p-3 transition-colors hover:bg-surface"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{pod.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {pod.distanceKm} km · {pod.baysFree}/{pod.bays} bays free
                      </p>
                    </div>
                    <StatusBadge status={pod.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <SectionTitle
          title="Recent activity"
          action={
            <Link to="/customer/history" className="text-xs font-semibold text-primary hover:underline">
              Full history
            </Link>
          }
        />
        {orders.isPending ? (
          <LoadingState label="Loading your recent orders" />
        ) : orders.isError ? (
          <ErrorState onRetry={() => orders.refetch()} />
        ) : (
          <DataTable
            columns={columns}
            rows={(orders.data as ServiceOrder[]).slice(0, 4)}
            getRowId={(r) => r.id}
            caption="Recent InstaPod orders"
            footer="Showing 4 of 5 orders"
          />
        )}
      </div>
    </>
  );
}
