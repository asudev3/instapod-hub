import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardShell } from "@/components/dashboard/shell";

export const Route = createFileRoute("/customer")({
  component: CustomerLayout,
});

function CustomerLayout() {
  return (
    <DashboardShell role="customer">
      <Outlet />
    </DashboardShell>
  );
}
