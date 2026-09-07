import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, Zap } from "lucide-react";
import { useState, type ReactNode } from "react";

import { roleConfigs, roleSwitcher, type Role } from "@/components/dashboard/nav-config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function Brand({ subtitle }: { subtitle: string }) {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <span className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
        <Zap className="size-5" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-sidebar-accent-foreground">InstaPod</p>
        <p className="text-[11px] text-sidebar-foreground/70">{subtitle}</p>
      </div>
    </div>
  );
}

function NavLinks({ role, onNavigate }: { role: Role; onNavigate?: (() => void) | undefined }) {
  const config = roleConfigs[role];
  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto py-2">
      {config.nav.map((group) => (
        <div key={group.group}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            {group.group}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  activeOptions={{ exact: item.exact ?? false }}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-primary/15 data-[status=active]:text-sidebar-accent-foreground"
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarBody({ role, onNavigate }: { role: Role; onNavigate?: (() => void) | undefined }) {
  const config = roleConfigs[role];
  return (
    <div className="flex h-full flex-col gap-4 bg-sidebar p-4">
      <Brand subtitle={config.title} />
      <NavLinks role={role} onNavigate={onNavigate} />
      <div className="rounded-xl bg-sidebar-accent/70 p-3">
        <p className="text-xs font-semibold text-sidebar-accent-foreground">{config.accountName}</p>
        <p className="mt-0.5 text-[11px] text-sidebar-foreground/70">{config.accountMeta}</p>
      </div>
    </div>
  );
}

export function DashboardShell({ role, children }: { role: Role; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const config = roleConfigs[role];
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const crumb =
    config.nav
      .flatMap((g) => g.items)
      .filter((i) => (i.exact ? pathname === i.to : pathname.startsWith(i.to)))
      .sort((a, b) => b.to.length - a.to.length)[0]?.label ?? "Overview";

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border lg:block">
        <SidebarBody role={role} />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SidebarBody role={role} onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {config.title}
              </p>
              <p className="truncate text-sm font-semibold">{crumb}</p>
            </div>

            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search pods, orders, campaigns" className="w-64 pl-9" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <span className="hidden sm:inline">Switch portal</span>
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Role-based portals</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {roleSwitcher.map((r) => (
                  <DropdownMenuItem key={r.role} asChild>
                    <Link to={r.to} className={cn("gap-2", r.role === role && "font-semibold text-primary")}>
                      <r.icon className="size-4" />
                      {r.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" asChild aria-label="Notifications">
              <Link
                to={
                  role === "customer"
                    ? "/customer/notifications"
                    : role === "franchisee"
                      ? "/franchisee/notifications"
                      : "/advertiser/notifications"
                }
                className="relative"
              >
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account menu">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                    {config.accountName
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{config.accountName}</p>
                  <p className="text-xs font-normal text-muted-foreground">{config.accountMeta}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="size-4" /> Account settings
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/">
                    <LogOut className="size-4" /> Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
