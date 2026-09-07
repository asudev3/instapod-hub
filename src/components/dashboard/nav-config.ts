import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  Megaphone,
  Navigation,
  PieChart,
  Receipt,
  ServerCog,
  Signal,
  TriangleAlert,
  User,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Role = "customer" | "franchisee" | "advertiser";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  exact?: boolean;
}

export interface RoleConfig {
  role: Role;
  title: string;
  subtitle: string;
  accountName: string;
  accountMeta: string;
  home: string;
  nav: { group: string; items: NavItem[] }[];
}

export const roleConfigs: Record<Role, RoleConfig> = {
  customer: {
    role: "customer",
    title: "Customer Portal",
    subtitle: "Find, book and pay at any InstaPod",
    accountName: "Ananya Rao",
    accountMeta: "Bengaluru · Member since 2024",
    home: "/customer",
    nav: [
      {
        group: "Overview",
        items: [
          { label: "Home", to: "/customer", icon: LayoutDashboard, exact: true },
          { label: "Find InstaPod", to: "/customer/find", icon: Navigation },
          { label: "Nearby InstaPods", to: "/customer/nearby", icon: MapPin },
        ],
      },
      {
        group: "Activity",
        items: [
          { label: "Service history", to: "/customer/history", icon: Receipt },
          { label: "Payments", to: "/customer/payments", icon: CreditCard },
          { label: "Notifications", to: "/customer/notifications", icon: Bell },
          { label: "Profile", to: "/customer/profile", icon: User },
        ],
      },
    ],
  },
  franchisee: {
    role: "franchisee",
    title: "Franchisee Console",
    subtitle: "Operate your pods, revenue and payouts",
    accountName: "Kiran Deshpande",
    accountMeta: "Dealer ID FR-2214 · South Zone",
    home: "/franchisee",
    nav: [
      {
        group: "Operations",
        items: [
          { label: "Dashboard", to: "/franchisee", icon: LayoutDashboard, exact: true },
          { label: "My InstaPods", to: "/franchisee/pods", icon: Signal },
          { label: "Troubleshooting", to: "/franchisee/alerts", icon: TriangleAlert },
          { label: "Support tickets", to: "/franchisee/support", icon: LifeBuoy },
        ],
      },
      {
        group: "Finance",
        items: [
          { label: "Ad revenue", to: "/franchisee/ad-revenue", icon: Megaphone },
          { label: "Revenue & payout", to: "/franchisee/revenue", icon: PieChart },
          { label: "Wallet", to: "/franchisee/wallet", icon: Wallet },
          { label: "Reports", to: "/franchisee/reports", icon: FileText },
          { label: "Notifications", to: "/franchisee/notifications", icon: Bell },
        ],
      },
    ],
  },
  advertiser: {
    role: "advertiser",
    title: "Advertiser Studio",
    subtitle: "Plan, launch and measure pod campaigns",
    accountName: "Velocity Tyres",
    accountMeta: "Brand account · AD-5567",
    home: "/advertiser",
    nav: [
      {
        group: "Campaigns",
        items: [
          { label: "Dashboard", to: "/advertiser", icon: LayoutDashboard, exact: true },
          { label: "Campaigns", to: "/advertiser/campaigns", icon: Megaphone },
          { label: "Create campaign", to: "/advertiser/campaigns/new", icon: ServerCog },
          { label: "Analytics", to: "/advertiser/analytics", icon: BarChart3 },
        ],
      },
      {
        group: "Billing",
        items: [
          { label: "Wallet", to: "/advertiser/wallet", icon: Wallet },
          { label: "Payment history", to: "/advertiser/payments", icon: Receipt },
          { label: "Notifications", to: "/advertiser/notifications", icon: Bell },
        ],
      },
    ],
  },
};

export const roleSwitcher: { role: Role; label: string; to: string; icon: LucideIcon }[] = [
  { role: "customer", label: "Customer", to: "/customer", icon: User },
  { role: "franchisee", label: "Franchisee", to: "/franchisee", icon: Gauge },
  { role: "advertiser", label: "Advertiser", to: "/advertiser", icon: Megaphone },
];
