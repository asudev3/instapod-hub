import { createFileRoute } from "@tanstack/react-router";

import { NotificationsView } from "@/components/dashboard/notifications-view";
import { franchiseeNotifications } from "@/lib/mock-data";

export const Route = createFileRoute("/franchisee/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | InstaPod Franchisee" },
      { name: "description", content: "Pod downtime alerts, payout releases and campaign assignments for your InstaPod franchise." },
      { property: "og:title", content: "Notifications | InstaPod Franchisee" },
      { property: "og:description", content: "Pod downtime alerts, payout releases and campaign assignments." },
    ],
  }),
  component: () => (
    <NotificationsView items={franchiseeNotifications} description="Pod alerts, payouts and campaign assignments." />
  ),
});
