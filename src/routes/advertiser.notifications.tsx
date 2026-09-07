import { createFileRoute } from "@tanstack/react-router";

import { NotificationsView } from "@/components/dashboard/notifications-view";
import { advertiserNotifications } from "@/lib/mock-data";

export const Route = createFileRoute("/advertiser/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | InstaPod Advertiser" },
      { name: "description", content: "Campaign approvals, wallet reminders and performance milestones for your InstaPod ad campaigns." },
      { property: "og:title", content: "Notifications | InstaPod Advertiser" },
      { property: "og:description", content: "Campaign approvals, wallet reminders and performance milestones." },
    ],
  }),
  component: () => (
    <NotificationsView items={advertiserNotifications} description="Campaign approvals, wallet and performance updates." />
  ),
});
