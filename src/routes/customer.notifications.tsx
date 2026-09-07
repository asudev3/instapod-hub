import { createFileRoute } from "@tanstack/react-router";

import { NotificationsView } from "@/components/dashboard/notifications-view";
import { customerNotifications } from "@/lib/mock-data";

export const Route = createFileRoute("/customer/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | InstaPod Customer" },
      { name: "description", content: "Booking confirmations, pod maintenance updates and payment receipts for your InstaPod account." },
      { property: "og:title", content: "Notifications | InstaPod Customer" },
      { property: "og:description", content: "Booking confirmations, maintenance updates and payment receipts." },
    ],
  }),
  component: () => (
    <NotificationsView items={customerNotifications} description="Booking, pod status and payment updates." />
  ),
});
