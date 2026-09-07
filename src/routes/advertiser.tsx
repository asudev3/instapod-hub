import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardShell } from "@/components/dashboard/shell";

export const Route = createFileRoute("/advertiser")({
  component: AdvertiserLayout,
});

function AdvertiserLayout() {
  return (
    <DashboardShell role="advertiser">
      <Outlet />
    </DashboardShell>
  );
}
