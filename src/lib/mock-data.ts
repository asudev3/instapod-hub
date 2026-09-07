/**
 * Mock data layer for InstaPod.
 *
 * Every export here is shaped like a realistic API response so that swapping
 * these functions for real fetch/server-function calls later is a one-file change.
 * All async helpers simulate latency and can simulate failures via `failRate`.
 */

export type PodStatus = "online" | "offline" | "maintenance" | "in-use";
export type CampaignStatus = "active" | "paused" | "pending" | "completed" | "rejected";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
export type TicketStatus = "open" | "in-progress" | "resolved";
export type Severity = "critical" | "warning" | "info";

export interface Pod {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  status: PodStatus;
  bays: number;
  baysFree: number;
  pricePerHour: number;
  rating: number;
  reviews: number;
  distanceKm: number;
  amenities: string[];
  uptime: number;
  monthlyRevenue: number;
  adSlotsFilled: number;
  adSlotsTotal: number;
  openHours: string;
}

export interface ServiceOrder {
  id: string;
  podId: string;
  podName: string;
  service: string;
  date: string;
  durationMin: number;
  amount: number;
  status: "completed" | "cancelled" | "upcoming";
}

export interface Payment {
  id: string;
  reference: string;
  date: string;
  method: string;
  description: string;
  amount: number;
  status: PaymentStatus;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: Severity | "success";
  read: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  advertiser: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  frequencyPerHour: number;
  durationSec: number;
  podIds: string[];
  creative: { type: "image" | "video"; label: string; size: string };
}

export interface Ticket {
  id: string;
  subject: string;
  podId: string;
  status: TicketStatus;
  priority: Severity;
  createdAt: string;
  lastUpdate: string;
  assignee: string;
}

export interface Alert {
  id: string;
  podId: string;
  podName: string;
  issue: string;
  severity: Severity;
  detectedAt: string;
  status: "open" | "acknowledged" | "cleared";
}

export interface WalletTxn {
  id: string;
  date: string;
  type: "credit" | "debit";
  description: string;
  amount: number;
  balanceAfter: number;
  status: PaymentStatus;
}

const inr = (n: number) => n;

export const pods: Pod[] = [
  {
    id: "POD-1042",
    name: "InstaPod Indiranagar Hub",
    address: "100 Ft Road, Indiranagar",
    city: "Bengaluru",
    lat: 12.9719,
    lng: 77.6412,
    status: "online",
    bays: 6,
    baysFree: 2,
    pricePerHour: 120,
    rating: 4.7,
    reviews: 318,
    distanceKm: 1.2,
    amenities: ["Fast charge", "CCTV", "Wi-Fi", "Restroom"],
    uptime: 99.4,
    monthlyRevenue: 184500,
    adSlotsFilled: 7,
    adSlotsTotal: 8,
    openHours: "24 x 7",
  },
  {
    id: "POD-1088",
    name: "InstaPod Koramangala 5th Block",
    address: "80 Ft Road, Koramangala",
    city: "Bengaluru",
    lat: 12.9352,
    lng: 77.6245,
    status: "in-use",
    bays: 4,
    baysFree: 0,
    pricePerHour: 140,
    rating: 4.5,
    reviews: 204,
    distanceKm: 2.8,
    amenities: ["Fast charge", "Cafe", "Wi-Fi"],
    uptime: 98.1,
    monthlyRevenue: 142300,
    adSlotsFilled: 8,
    adSlotsTotal: 8,
    openHours: "06:00 - 23:00",
  },
  {
    id: "POD-1121",
    name: "InstaPod Whitefield Tech Park",
    address: "ITPL Main Road, Whitefield",
    city: "Bengaluru",
    lat: 12.9698,
    lng: 77.75,
    status: "online",
    bays: 8,
    baysFree: 5,
    pricePerHour: 110,
    rating: 4.8,
    reviews: 442,
    distanceKm: 12.4,
    amenities: ["Fast charge", "CCTV", "Lounge", "Restroom"],
    uptime: 99.8,
    monthlyRevenue: 226800,
    adSlotsFilled: 6,
    adSlotsTotal: 10,
    openHours: "24 x 7",
  },
  {
    id: "POD-1150",
    name: "InstaPod HSR Layout Sector 2",
    address: "27th Main, HSR Layout",
    city: "Bengaluru",
    lat: 12.9121,
    lng: 77.6446,
    status: "maintenance",
    bays: 5,
    baysFree: 0,
    pricePerHour: 125,
    rating: 4.2,
    reviews: 156,
    distanceKm: 4.6,
    amenities: ["Fast charge", "CCTV"],
    uptime: 91.2,
    monthlyRevenue: 88400,
    adSlotsFilled: 3,
    adSlotsTotal: 8,
    openHours: "07:00 - 22:00",
  },
  {
    id: "POD-1177",
    name: "InstaPod Jayanagar 4th Block",
    address: "11th Main Road, Jayanagar",
    city: "Bengaluru",
    lat: 12.9299,
    lng: 77.5826,
    status: "online",
    bays: 4,
    baysFree: 3,
    pricePerHour: 100,
    rating: 4.4,
    reviews: 121,
    distanceKm: 6.1,
    amenities: ["CCTV", "Wi-Fi"],
    uptime: 97.6,
    monthlyRevenue: 76200,
    adSlotsFilled: 4,
    adSlotsTotal: 6,
    openHours: "06:00 - 22:00",
  },
  {
    id: "POD-1203",
    name: "InstaPod Hebbal Flyover",
    address: "Bellary Road, Hebbal",
    city: "Bengaluru",
    lat: 13.0358,
    lng: 77.597,
    status: "offline",
    bays: 6,
    baysFree: 0,
    pricePerHour: 130,
    rating: 4.0,
    reviews: 89,
    distanceKm: 9.3,
    amenities: ["Fast charge", "Restroom"],
    uptime: 84.5,
    monthlyRevenue: 41200,
    adSlotsFilled: 2,
    adSlotsTotal: 8,
    openHours: "24 x 7",
  },
];

export const serviceOrders: ServiceOrder[] = [
  { id: "ORD-90142", podId: "POD-1042", podName: "Indiranagar Hub", service: "Fast charge - 22 kW", date: "2026-09-05T18:20:00Z", durationMin: 45, amount: inr(410), status: "completed" },
  { id: "ORD-90118", podId: "POD-1121", podName: "Whitefield Tech Park", service: "Interior detailing", date: "2026-09-01T11:05:00Z", durationMin: 90, amount: inr(1250), status: "completed" },
  { id: "ORD-90087", podId: "POD-1088", podName: "Koramangala 5th Block", service: "Tyre pressure + wash", date: "2026-08-24T09:40:00Z", durationMin: 30, amount: inr(650), status: "completed" },
  { id: "ORD-90061", podId: "POD-1177", podName: "Jayanagar 4th Block", service: "Fast charge - 15 kW", date: "2026-08-17T20:10:00Z", durationMin: 60, amount: inr(360), status: "cancelled" },
  { id: "ORD-90201", podId: "POD-1042", podName: "Indiranagar Hub", service: "Battery health check", date: "2026-09-12T10:00:00Z", durationMin: 40, amount: inr(500), status: "upcoming" },
];

export const customerPayments: Payment[] = [
  { id: "PAY-55021", reference: "ORD-90142", date: "2026-09-05T18:26:00Z", method: "UPI · HDFC", description: "Fast charge at Indiranagar Hub", amount: 410, status: "paid" },
  { id: "PAY-55008", reference: "ORD-90118", date: "2026-09-01T12:40:00Z", method: "Visa ···· 4412", description: "Interior detailing at Whitefield", amount: 1250, status: "paid" },
  { id: "PAY-54977", reference: "ORD-90087", date: "2026-08-24T10:12:00Z", method: "InstaPod Wallet", description: "Tyre pressure + wash", amount: 650, status: "paid" },
  { id: "PAY-54960", reference: "ORD-90061", date: "2026-08-17T20:14:00Z", method: "Visa ···· 4412", description: "Cancelled booking refund", amount: 360, status: "refunded" },
  { id: "PAY-55044", reference: "ORD-90201", date: "2026-09-07T08:02:00Z", method: "UPI · HDFC", description: "Battery health check (pre-auth)", amount: 500, status: "pending" },
];

export const campaigns: Campaign[] = [
  {
    id: "CMP-3301",
    name: "Monsoon Tyre Sale",
    advertiser: "Velocity Tyres",
    status: "active",
    startDate: "2026-08-20",
    endDate: "2026-09-20",
    budget: 250000,
    spend: 164200,
    impressions: 812400,
    clicks: 9820,
    frequencyPerHour: 6,
    durationSec: 15,
    podIds: ["POD-1042", "POD-1121", "POD-1088"],
    creative: { type: "video", label: "monsoon-tyre-15s.mp4", size: "8.4 MB" },
  },
  {
    id: "CMP-3288",
    name: "EV Insurance Launch",
    advertiser: "SafeDrive Insure",
    status: "active",
    startDate: "2026-09-01",
    endDate: "2026-10-01",
    budget: 400000,
    spend: 98600,
    impressions: 402100,
    clicks: 5310,
    frequencyPerHour: 4,
    durationSec: 20,
    podIds: ["POD-1121", "POD-1177"],
    creative: { type: "image", label: "safedrive-hero.png", size: "1.2 MB" },
  },
  {
    id: "CMP-3260",
    name: "Weekend Cafe Combo",
    advertiser: "Brew Bros",
    status: "paused",
    startDate: "2026-07-15",
    endDate: "2026-09-15",
    budget: 90000,
    spend: 61400,
    impressions: 288900,
    clicks: 3120,
    frequencyPerHour: 3,
    durationSec: 10,
    podIds: ["POD-1088"],
    creative: { type: "image", label: "brewbros-combo.jpg", size: "820 KB" },
  },
  {
    id: "CMP-3312",
    name: "Festive Accessory Drop",
    advertiser: "AutoTrend",
    status: "pending",
    startDate: "2026-09-15",
    endDate: "2026-10-15",
    budget: 180000,
    spend: 0,
    impressions: 0,
    clicks: 0,
    frequencyPerHour: 5,
    durationSec: 15,
    podIds: ["POD-1042", "POD-1150", "POD-1177"],
    creative: { type: "video", label: "festive-drop-15s.mp4", size: "11.9 MB" },
  },
  {
    id: "CMP-3199",
    name: "Summer Road Trip",
    advertiser: "Velocity Tyres",
    status: "completed",
    startDate: "2026-05-01",
    endDate: "2026-06-30",
    budget: 300000,
    spend: 300000,
    impressions: 1421000,
    clicks: 18240,
    frequencyPerHour: 6,
    durationSec: 20,
    podIds: ["POD-1042", "POD-1088", "POD-1121", "POD-1177"],
    creative: { type: "video", label: "roadtrip-20s.mp4", size: "9.6 MB" },
  },
];

export const franchiseeAlerts: Alert[] = [
  { id: "ALT-771", podId: "POD-1203", podName: "Hebbal Flyover", issue: "Power module offline — no grid response", severity: "critical", detectedAt: "2026-09-07T06:12:00Z", status: "open" },
  { id: "ALT-769", podId: "POD-1150", podName: "HSR Layout Sector 2", issue: "Scheduled maintenance overrun (18h)", severity: "warning", detectedAt: "2026-09-06T21:40:00Z", status: "acknowledged" },
  { id: "ALT-764", podId: "POD-1088", podName: "Koramangala 5th Block", issue: "Display brightness sensor drift", severity: "info", detectedAt: "2026-09-05T14:02:00Z", status: "open" },
  { id: "ALT-758", podId: "POD-1042", podName: "Indiranagar Hub", issue: "Bay 3 card reader retry loop", severity: "warning", detectedAt: "2026-09-03T09:31:00Z", status: "cleared" },
];

export const tickets: Ticket[] = [
  { id: "TKT-2091", subject: "Ad screen flickering after firmware update", podId: "POD-1088", status: "in-progress", priority: "warning", createdAt: "2026-09-06T08:15:00Z", lastUpdate: "2026-09-07T07:02:00Z", assignee: "Ops · Nikhil" },
  { id: "TKT-2085", subject: "Grid outage escalation for Hebbal", podId: "POD-1203", status: "open", priority: "critical", createdAt: "2026-09-07T06:20:00Z", lastUpdate: "2026-09-07T06:20:00Z", assignee: "Unassigned" },
  { id: "TKT-2070", subject: "Payout mismatch for August cycle", podId: "POD-1042", status: "resolved", priority: "info", createdAt: "2026-08-30T12:00:00Z", lastUpdate: "2026-09-02T16:44:00Z", assignee: "Finance · Reema" },
];

export const franchiseeWallet: WalletTxn[] = [
  { id: "TXN-8801", date: "2026-09-05", type: "credit", description: "Ad revenue share — Aug cycle", amount: 128400, balanceAfter: 412600, status: "paid" },
  { id: "TXN-8794", date: "2026-09-01", type: "credit", description: "Service revenue settlement", amount: 96200, balanceAfter: 284200, status: "paid" },
  { id: "TXN-8781", date: "2026-08-28", type: "debit", description: "Payout to HDFC ···· 8891", amount: 150000, balanceAfter: 188000, status: "paid" },
  { id: "TXN-8770", date: "2026-08-22", type: "debit", description: "Maintenance parts — POD-1150", amount: 18400, balanceAfter: 338000, status: "paid" },
  { id: "TXN-8762", date: "2026-08-18", type: "credit", description: "Ad revenue share — mid cycle", amount: 74800, balanceAfter: 356400, status: "pending" },
];

export const advertiserWallet: WalletTxn[] = [
  { id: "AWT-4410", date: "2026-09-06", type: "debit", description: "Daily spend — CMP-3301", amount: 12400, balanceAfter: 186500, status: "paid" },
  { id: "AWT-4402", date: "2026-09-04", type: "credit", description: "Wallet reload via NetBanking", amount: 200000, balanceAfter: 198900, status: "paid" },
  { id: "AWT-4396", date: "2026-09-02", type: "debit", description: "Daily spend — CMP-3288", amount: 9800, balanceAfter: 8900, status: "paid" },
  { id: "AWT-4388", date: "2026-08-29", type: "debit", description: "Daily spend — CMP-3260", amount: 6200, balanceAfter: 18700, status: "paid" },
  { id: "AWT-4380", date: "2026-08-25", type: "credit", description: "Wallet reload via UPI", amount: 50000, balanceAfter: 24900, status: "failed" },
];

export const advertiserPayments: Payment[] = [
  { id: "INV-7741", reference: "CMP-3301", date: "2026-09-04", method: "NetBanking · ICICI", description: "Wallet reload — 2,00,000", amount: 200000, status: "paid" },
  { id: "INV-7728", reference: "CMP-3288", date: "2026-08-25", method: "UPI · advertiser@icici", description: "Wallet reload — 50,000", amount: 50000, status: "failed" },
  { id: "INV-7710", reference: "CMP-3199", date: "2026-06-30", method: "Card ···· 7712", description: "Campaign settlement — Summer Road Trip", amount: 300000, status: "paid" },
  { id: "INV-7702", reference: "CMP-3260", date: "2026-07-15", method: "NetBanking · ICICI", description: "Campaign advance — Weekend Cafe Combo", amount: 90000, status: "paid" },
  { id: "INV-7760", reference: "CMP-3312", date: "2026-09-07", method: "Card ···· 7712", description: "Campaign advance — Festive Accessory Drop", amount: 180000, status: "pending" },
];

export const revenueSeries = [
  { month: "Mar", service: 148000, ads: 96000, payout: 171600 },
  { month: "Apr", service: 162000, ads: 104000, payout: 186200 },
  { month: "May", service: 171000, ads: 121000, payout: 204400 },
  { month: "Jun", service: 158000, ads: 133000, payout: 203700 },
  { month: "Jul", service: 184000, ads: 142000, payout: 228200 },
  { month: "Aug", service: 196000, ads: 158400, payout: 248080 },
];

export const impressionSeries = [
  { day: "Mon", impressions: 118400, clicks: 1420 },
  { day: "Tue", impressions: 126800, clicks: 1580 },
  { day: "Wed", impressions: 131200, clicks: 1690 },
  { day: "Thu", impressions: 122900, clicks: 1480 },
  { day: "Fri", impressions: 148600, clicks: 2040 },
  { day: "Sat", impressions: 164200, clicks: 2380 },
  { day: "Sun", impressions: 152700, clicks: 2110 },
];

export const podUsageSeries = [
  { hour: "00", sessions: 4 },
  { hour: "03", sessions: 2 },
  { hour: "06", sessions: 9 },
  { hour: "09", sessions: 22 },
  { hour: "12", sessions: 18 },
  { hour: "15", sessions: 24 },
  { hour: "18", sessions: 31 },
  { hour: "21", sessions: 17 },
];

export const adMixSeries = [
  { name: "Video", value: 48 },
  { name: "Static image", value: 32 },
  { name: "Interactive", value: 12 },
  { name: "House ads", value: 8 },
];

export const customerNotifications: NotificationItem[] = [
  { id: "N-01", title: "Booking confirmed", body: "Battery health check at Indiranagar Hub on 12 Sep, 10:00 AM.", time: "2h ago", kind: "success", read: false },
  { id: "N-02", title: "Pod under maintenance", body: "HSR Layout Sector 2 is offline until 8 Sep. We moved your slot suggestions.", time: "1d ago", kind: "warning", read: false },
  { id: "N-03", title: "Payment receipt", body: "410 charged to UPI · HDFC for ORD-90142.", time: "2d ago", kind: "info", read: true },
];

export const franchiseeNotifications: NotificationItem[] = [
  { id: "FN-01", title: "Critical: Hebbal pod offline", body: "POD-1203 lost grid response at 06:12. Field team dispatched.", time: "35m ago", kind: "critical", read: false },
  { id: "FN-02", title: "August payout released", body: "1,28,400 credited to your wallet for the August ad cycle.", time: "2d ago", kind: "success", read: false },
  { id: "FN-03", title: "New campaign assigned", body: "Festive Accessory Drop will run on 3 of your pods from 15 Sep.", time: "3d ago", kind: "info", read: true },
];

export const advertiserNotifications: NotificationItem[] = [
  { id: "AN-01", title: "Campaign pending approval", body: "Festive Accessory Drop is in review. Typical turnaround is 6 hours.", time: "1h ago", kind: "info", read: false },
  { id: "AN-02", title: "Low wallet balance", body: "Balance will cover ~9 days at current spend. Reload to avoid pauses.", time: "6h ago", kind: "warning", read: false },
  { id: "AN-03", title: "Monsoon Tyre Sale hit 800K impressions", body: "CTR is 1.21%, up 0.18 pts week over week.", time: "1d ago", kind: "success", read: true },
];

/* ---------------------------------------------------------------------------
 * Async accessors — replace bodies with real API calls later.
 * ------------------------------------------------------------------------- */

export interface FetchOptions {
  /** 0-1 chance the request rejects, used to demo error states. */
  failRate?: number;
  delayMs?: number;
}

export async function mockFetch<T>(data: T, opts: FetchOptions = {}): Promise<T> {
  const { failRate = 0, delayMs = 550 } = opts;
  await new Promise((r) => setTimeout(r, delayMs));
  if (Math.random() < failRate) {
    throw new Error("InstaPod service is unreachable. Please retry.");
  }
  return data;
}

export const api = {
  pods: (o?: FetchOptions) => mockFetch(pods, o),
  pod: (id: string, o?: FetchOptions) => mockFetch(pods.find((p) => p.id === id) ?? null, o),
  serviceOrders: (o?: FetchOptions) => mockFetch(serviceOrders, o),
  customerPayments: (o?: FetchOptions) => mockFetch(customerPayments, o),
  campaigns: (o?: FetchOptions) => mockFetch(campaigns, o),
  campaign: (id: string, o?: FetchOptions) => mockFetch(campaigns.find((c) => c.id === id) ?? null, o),
  alerts: (o?: FetchOptions) => mockFetch(franchiseeAlerts, o),
  tickets: (o?: FetchOptions) => mockFetch(tickets, o),
  franchiseeWallet: (o?: FetchOptions) => mockFetch(franchiseeWallet, o),
  advertiserWallet: (o?: FetchOptions) => mockFetch(advertiserWallet, o),
  advertiserPayments: (o?: FetchOptions) => mockFetch(advertiserPayments, o),
};

export const currency = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const compact = (n: number) =>
  new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export const dateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export const dateOnly = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
