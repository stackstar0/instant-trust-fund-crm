// Deterministic mock data generators for the CRM demo. No PII, all synthetic.
import { loans, insurance } from "./catalog";

export interface MockCustomer {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  aadhaar: string;
  pan: string;
  productType: string;
  productKind: "loan" | "insurance";
  status: "Pending" | "Approved" | "Rejected" | "In Review";
  appliedOn: string; // ISO
  amount: number;
  branch: string;
}

export interface MockSms {
  id: string;
  customer: string;
  phone: string;
  message: string;
  sentAt: string;
  status: "Sent" | "Scheduled" | "Failed";
}

export interface MockNotification {
  id: string;
  type: "EMI Due" | "Insurance Renewal" | "Loan Approval" | "Pending Documents";
  customer: string;
  dueDate: string;
  amount?: number;
}

// Seeded pseudo-random so numbers are stable across renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Reyansh",
  "Ayaan",
  "Krishna",
  "Ishaan",
  "Rohan",
  "Kabir",
  "Aryan",
  "Advik",
  "Neel",
  "Dev",
  "Yash",
  "Anaya",
  "Diya",
  "Saanvi",
  "Ira",
  "Myra",
  "Aadhya",
  "Prisha",
  "Ananya",
  "Pari",
  "Kiara",
  "Aarohi",
  "Fatima",
  "Zara",
  "Ayesha",
  "Riya",
  "Meera",
  "Nisha",
  "Rekha",
  "Sunita",
  "Priya",
  "Kavya",
  "Sneha",
  "Divya",
  "Neha",
  "Pooja",
  "Rohit",
  "Vikram",
  "Rahul",
  "Amit",
  "Suresh",
  "Ramesh",
  "Karan",
  "Sanjay",
  "Manish",
];
const LAST = [
  "Sharma",
  "Verma",
  "Patel",
  "Reddy",
  "Iyer",
  "Nair",
  "Menon",
  "Khan",
  "Sheikh",
  "Ansari",
  "Gupta",
  "Agarwal",
  "Jain",
  "Bose",
  "Chatterjee",
  "Mukherjee",
  "Das",
  "Roy",
  "Ghosh",
  "Sen",
  "Rao",
  "Kumar",
  "Yadav",
  "Chauhan",
  "Singh",
  "Kaur",
  "Bhat",
  "Shetty",
  "Naidu",
  "Pillai",
  "Mehta",
  "Shah",
  "Desai",
  "Kapoor",
  "Malhotra",
  "Chopra",
  "Bhatia",
  "Sinha",
  "Mishra",
  "Tripathi",
  "Pandey",
  "Dwivedi",
  "Trivedi",
  "Joshi",
  "Patil",
  "Deshpande",
  "Kulkarni",
  "Bhattacharya",
  "Sarkar",
  "Banerjee",
];
const BRANCHES = [
  "Mumbai Fort",
  "Bengaluru MG Road",
  "Hyderabad Banjara Hills",
  "Chennai T Nagar",
  "Delhi Connaught Place",
  "Pune Koregaon Park",
  "Kolkata Park Street",
  "Ahmedabad SG Highway",
  "Jaipur MI Road",
  "Lucknow Hazratganj",
];
const STATUSES: MockCustomer["status"][] = [
  "Pending",
  "Approved",
  "Rejected",
  "In Review",
  "Pending",
  "Approved",
  "Approved",
  "In Review",
];

function pick<T>(arr: T[], r: number) {
  return arr[Math.floor(r * arr.length)];
}
function pad(n: number, len = 2) {
  return n.toString().padStart(len, "0");
}

export function generateCustomers(count = 100): MockCustomer[] {
  const rand = mulberry32(20260708);
  const loanSlugs = loans.map((l) => l.name);
  const insSlugs = insurance.map((i) => i.name);
  const out: MockCustomer[] = [];
  for (let i = 0; i < count; i++) {
    const first = pick(FIRST, rand());
    const last = pick(LAST, rand());
    const kind: "loan" | "insurance" = rand() < 0.45 ? "loan" : "insurance";
    const product = kind === "loan" ? pick(loanSlugs, rand()) : pick(insSlugs, rand());
    const daysAgo = Math.floor(rand() * 180);
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const amount =
      kind === "loan" ? Math.floor(50000 + rand() * 9500000) : Math.floor(3000 + rand() * 197000);
    out.push({
      id: `IFY${(10001 + i).toString()}`,
      fullName: `${first} ${last}`,
      mobile: `+91 ${Math.floor(7 + rand() * 3)}${pad(Math.floor(rand() * 100000000), 8)}`.slice(
        0,
        15,
      ),
      email: `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(rand() * 90 + 10)}@example.com`,
      aadhaar: `${pad(Math.floor(rand() * 9000 + 1000), 4)} ${pad(Math.floor(rand() * 9000 + 1000), 4)} ${pad(Math.floor(rand() * 9000 + 1000), 4)}`,
      pan: `${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${pad(Math.floor(rand() * 9000 + 1000), 4)}${String.fromCharCode(65 + Math.floor(rand() * 26))}`,
      productType: product,
      productKind: kind,
      status: pick(STATUSES, rand()),
      appliedOn: d.toISOString(),
      amount,
      branch: pick(BRANCHES, rand()),
    });
  }
  return out;
}

const SMS_TEMPLATES = [
  (n: string) =>
    `Dear ${n}, your Health Insurance policy expires in 30 days. Renew now to enjoy uninterrupted cover. — Instant Funds for You`,
  (n: string) =>
    `Hi ${n}, your Home Loan EMI of ₹34,850 is due in 5 days. Kindly maintain sufficient balance. — IFY`,
  (n: string) =>
    `${n}, congratulations! Your Personal Loan application has been APPROVED. Disbursal will be initiated in 24 hrs.`,
  (n: string) =>
    `Dear ${n}, special Gold Loan offer at 8.50% p.a. Get instant funds today. Call 1800-123-4567.`,
  (n: string) =>
    `Reminder: ${n}, please submit pending KYC documents by Friday to avoid application delays.`,
  (n: string) =>
    `${n}, your Motor Insurance is up for renewal. Renew online and get 20% NCB retained. — IFY`,
  (n: string) =>
    `Alert: ${n}, your Loan sanction letter is ready. Please visit your branch to complete formalities.`,
  (n: string) =>
    `Dear ${n}, an EMI bounce charge of ₹590 has been debited. Please ensure timely payments.`,
];

export function generateSmsLogs(count = 300, customers: MockCustomer[]): MockSms[] {
  const rand = mulberry32(778211);
  const out: MockSms[] = [];
  for (let i = 0; i < count; i++) {
    const c = customers[Math.floor(rand() * customers.length)];
    const template = SMS_TEMPLATES[Math.floor(rand() * SMS_TEMPLATES.length)];
    const daysAgo = Math.floor(rand() * 30);
    const hoursAgo = Math.floor(rand() * 24);
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    d.setHours(d.getHours() - hoursAgo);
    const s = rand();
    const status: MockSms["status"] = s < 0.83 ? "Sent" : s < 0.94 ? "Scheduled" : "Failed";
    out.push({
      id: `SMS${100000 + i}`,
      customer: c.fullName,
      phone: c.mobile,
      message: template(c.fullName.split(" ")[0]),
      sentAt: d.toISOString(),
      status,
    });
  }
  return out.sort((a, b) => (a.sentAt < b.sentAt ? 1 : -1));
}

export function generateNotifications(customers: MockCustomer[]): MockNotification[] {
  const rand = mulberry32(51222);
  const types: MockNotification["type"][] = [
    "EMI Due",
    "Insurance Renewal",
    "Loan Approval",
    "Pending Documents",
  ];
  return Array.from({ length: 18 }, (_, i) => {
    const c = customers[Math.floor(rand() * customers.length)];
    const type = types[i % types.length];
    const days = Math.floor(rand() * 30) + 1;
    const d = new Date();
    d.setDate(d.getDate() + days);
    return {
      id: `NT${1000 + i}`,
      type,
      customer: c.fullName,
      dueDate: d.toISOString(),
      amount: type === "EMI Due" ? Math.floor(5000 + rand() * 80000) : undefined,
    };
  });
}

// Utility masking
export const maskAadhaar = (a: string) => a.replace(/\d(?=\d{4})/g, "•");
export const maskPan = (p: string) => p.slice(0, 3) + "•••" + p.slice(-2);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

// Aggregations for charts
export function monthlyApplications(customers: MockCustomer[]) {
  const map = new Map<string, number>();
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    map.set(d.toLocaleString("en-IN", { month: "short" }), 0);
  }
  customers.forEach((c) => {
    const d = new Date(c.appliedOn);
    const key = d.toLocaleString("en-IN", { month: "short" });
    if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map, ([month, applications]) => ({ month, applications }));
}

export function distributionBy<T extends { productType: string; productKind: string }>(
  arr: T[],
  kind: "loan" | "insurance",
) {
  const map = new Map<string, number>();
  arr
    .filter((c) => c.productKind === kind)
    .forEach((c) => {
      map.set(c.productType, (map.get(c.productType) || 0) + 1);
    });
  return Array.from(map, ([name, value]) => ({ name, value }));
}

export function smsWeekly(logs: MockSms[]) {
  const days: { day: string; sent: number; failed: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString("en-IN", { weekday: "short" });
    const dayLogs = logs.filter((l) => new Date(l.sentAt).toDateString() === d.toDateString());
    days.push({
      day: key,
      sent: dayLogs.filter((l) => l.status === "Sent").length,
      failed: dayLogs.filter((l) => l.status === "Failed").length,
    });
  }
  return days;
}
