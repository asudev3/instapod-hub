import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Receipt } from "lucide-react";
import { useState } from "react";

import { DataTable, type Column } from "@/components/dashboard/data-table";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/dashboard/states";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api, currency, dateTime, type ServiceOrder } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/history")({
  head: () => ({
    meta: [
      { title: "Service & order history | InstaPod" },
      { name: "description", content: "Review every InstaPod booking, charging session and service order with amounts, duration and status." },
      { property: "og:title", content: "Service & order history | InstaPod" },
      { property: "og:description", content: "Every InstaPod booking and service order with amounts, duration and status." },
    ],
  }),
  component: History,
});

function History() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["customer", "orders"],
    queryFn: () => api.serviceOrders(),
  });
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");

  const rows = ((data ?? []) as ServiceOrder[])
    .filter((r) => (status === "all" ? true : r.status === status))
    .filter((r) => `${r.id} ${r.podName} ${r.service}`.toLowerCase().includes(query.toLowerCase()));

  const columns: Column<ServiceOrder>[] = [
    { key: "id", header: "Order", cell: (r) => <span className="font-medium">{r.id}</span> },
    { key: "pod", header: "InstaPod", cell: (r) => r.podName },
    { key: "service", header: "Service", cell: (r) => r.service },
    { key: "date", header: "Date & time", cell: (r) => dateTime(r.date) },
    { key: "duration", header: "Duration", align: "right", cell: (r) => `${r.durationMin} min` },
    { key: "amount", header: "Amount", align: "right", cell: (r) => currency(r.amount) },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader
        title="Service & order history"
        description="Every booking, charge and service you've had at an InstaPod."
        actions={
          <Button variant="outline">
            <Download className="size-4" /> Export CSV
          </Button>
        }
      />

      <div className="panel flex flex-col gap-3 p-4 sm:flex-row">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search order ID, pod or service"
          className="sm:max-w-xs"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isPending ? (
        <LoadingState label="Loading your history" rows={5} />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No orders match your filters"
          description="Try a different status or clear the search box."
          icon={<Receipt className="size-5" />}
        />
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(r) => r.id}
          caption="Service and order history"
          footer={`Showing ${rows.length} of ${(data ?? []).length} orders`}
        />
      )}
    </>
  );
}
