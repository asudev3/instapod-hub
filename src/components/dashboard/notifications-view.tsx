import { BellRing, Check } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState, SuccessBanner } from "@/components/dashboard/states";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/lib/mock-data";

const kindStyles: Record<string, string> = {
  critical: "bg-destructive/12 text-destructive",
  warning: "bg-warning/18 text-warning-foreground",
  info: "bg-info/12 text-info",
  success: "bg-success/12 text-success",
};

export function NotificationsView({
  items,
  description,
}: {
  items: NotificationItem[];
  description: string;
}) {
  const [list, setList] = useState(items);
  const [tab, setTab] = useState("all");
  const [banner, setBanner] = useState(false);

  const filtered = tab === "unread" ? list.filter((n) => !n.read) : list;

  return (
    <>
      <PageHeader
        title="Notifications"
        description={description}
        actions={
          <Button
            variant="outline"
            onClick={() => {
              setList((prev) => prev.map((n) => ({ ...n, read: true })));
              setBanner(true);
            }}
          >
            <Check className="size-4" /> Mark all as read
          </Button>
        }
      />

      {banner ? <SuccessBanner title="All notifications marked as read" /> : null}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All ({list.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({list.filter((n) => !n.read).length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState
          title="You're all caught up"
          description="New alerts about your account will appear here."
          icon={<BellRing className="size-5" />}
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((n) => (
            <li
              key={n.id}
              className={cn("panel flex items-start gap-3 p-4", !n.read && "border-primary/30 bg-primary-soft/30")}
            >
              <span className={cn("mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg", kindStyles[n.kind])}>
                <BellRing className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {!n.read ? (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                      New
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="whitespace-nowrap text-xs text-muted-foreground">{n.time}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
