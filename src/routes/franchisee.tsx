import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DashboardShell } from "@/components/dashboard/shell";

export const Route = createFileRoute("/franchisee")({
  component: FranchiseeLayout,
});

function FranchiseeLayout() {
  return (
    <DashboardShell role="franchisee">
      <Outlet />
    </DashboardShell>
  );
}
