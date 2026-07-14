import { i as __toESM } from "../_runtime.mjs";
import { a as loans, i as insurance } from "./catalog-BNgltH_A.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-store-ByBvpnlW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mulberry32(seed) {
	return () => {
		seed |= 0;
		seed = seed + 1831565813 | 0;
		let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var FIRST = [
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
	"Manish"
];
var LAST = [
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
	"Banerjee"
];
var BRANCHES = [
	"Mumbai Fort",
	"Bengaluru MG Road",
	"Hyderabad Banjara Hills",
	"Chennai T Nagar",
	"Delhi Connaught Place",
	"Pune Koregaon Park",
	"Kolkata Park Street",
	"Ahmedabad SG Highway",
	"Jaipur MI Road",
	"Lucknow Hazratganj"
];
var STATUSES = [
	"Pending",
	"Approved",
	"Rejected",
	"In Review",
	"Pending",
	"Approved",
	"Approved",
	"In Review"
];
var MOCK_BANKS = [
	"SBI",
	"HDFC Bank",
	"ICICI Bank",
	"Axis Bank",
	"LIC Housing Finance"
];
var MOCK_INS_TYPES = [
	"Term Life",
	"Health Plan",
	"Motor Guard",
	"Travel Protect",
	"Commercial Property"
];
var MOCK_REF_CODES = [
	"EMP001",
	"EMP002",
	"BROKER101",
	"REF-101",
	"REF-102"
];
function pick(arr, r) {
	return arr[Math.floor(r * arr.length)];
}
function pad(n, len = 2) {
	return n.toString().padStart(len, "0");
}
function generateCustomers(count = 100) {
	const rand = mulberry32(20260708);
	const loanSlugs = loans.map((l) => l.name);
	const insSlugs = insurance.map((i) => i.name);
	const out = [];
	for (let i = 0; i < count; i++) {
		const first = pick(FIRST, rand());
		const last = pick(LAST, rand());
		const kind = rand() < .45 ? "loan" : "insurance";
		const product = kind === "loan" ? pick(loanSlugs, rand()) : pick(insSlugs, rand());
		const daysAgo = Math.floor(rand() * 180);
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - daysAgo);
		const amount = kind === "loan" ? Math.floor(5e4 + rand() * 95e5) : Math.floor(3e3 + rand() * 197e3);
		const bankVal = kind === "loan" ? pick(MOCK_BANKS, rand()) : void 0;
		const insVal = kind === "insurance" ? pick(MOCK_INS_TYPES, rand()) : void 0;
		const refCode = rand() < .3 ? pick(MOCK_REF_CODES, rand()) : void 0;
		const docs = ["Aadhaar_Card.pdf", "PAN_Card.pdf"];
		if (rand() < .7) docs.push("Income_Proof.pdf");
		if (rand() < .4) docs.push("Property_Title.pdf");
		out.push({
			id: `IFY${(10001 + i).toString()}`,
			fullName: `${first} ${last}`,
			mobile: `+91 ${Math.floor(7 + rand() * 3)}${pad(Math.floor(rand() * 1e8), 8)}`.slice(0, 15),
			email: `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(rand() * 90 + 10)}@example.com`,
			aadhaar: `${pad(Math.floor(rand() * 9e3 + 1e3), 4)} ${pad(Math.floor(rand() * 9e3 + 1e3), 4)} ${pad(Math.floor(rand() * 9e3 + 1e3), 4)}`,
			pan: `${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${String.fromCharCode(65 + Math.floor(rand() * 26))}${pad(Math.floor(rand() * 9e3 + 1e3), 4)}${String.fromCharCode(65 + Math.floor(rand() * 26))}`,
			productType: product,
			productKind: kind,
			status: pick(STATUSES, rand()),
			appliedOn: d.toISOString(),
			amount,
			branch: pick(BRANCHES, rand()),
			bank: bankVal,
			insuranceType: insVal,
			referralCode: refCode,
			documents: docs,
			assignedTo: (() => {
				if (refCode) {
					if (refCode === "EMP002" || refCode === "BROKER101") return "Bibi Ayesha";
					return "R H Adhoni";
				}
				return rand() < .3 ? "Bibi Ayesha" : "R H Adhoni";
			})()
		});
	}
	return out;
}
var SMS_TEMPLATES = [
	(n) => `Dear ${n}, your Health Insurance policy expires in 30 days. Renew now to enjoy uninterrupted cover. — Instant Funds for You`,
	(n) => `Hi ${n}, your Home Loan EMI of ₹34,850 is due in 5 days. Kindly maintain sufficient balance. — IFY`,
	(n) => `${n}, congratulations! Your Personal Loan application has been APPROVED. Disbursal will be initiated in 24 hrs.`,
	(n) => `Dear ${n}, special Business Loan offer at 8.50% p.a. Get instant funds today. Call 1800-123-4567.`,
	(n) => `Reminder: ${n}, please submit pending KYC documents by Friday to avoid application delays.`,
	(n) => `${n}, your Motor Insurance is up for renewal. Renew online and get 20% NCB retained. — IFY`,
	(n) => `Alert: ${n}, your Loan sanction letter is ready. Please visit your branch to complete formalities.`,
	(n) => `Dear ${n}, an EMI bounce charge of ₹590 has been debited. Please ensure timely payments.`
];
function generateSmsLogs(count = 300, customers) {
	const rand = mulberry32(778211);
	const out = [];
	for (let i = 0; i < count; i++) {
		const c = customers[Math.floor(rand() * customers.length)];
		const template = SMS_TEMPLATES[Math.floor(rand() * SMS_TEMPLATES.length)];
		const daysAgo = Math.floor(rand() * 30);
		const hoursAgo = Math.floor(rand() * 24);
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - daysAgo);
		d.setHours(d.getHours() - hoursAgo);
		const s = rand();
		const status = s < .83 ? "Sent" : s < .94 ? "Scheduled" : "Failed";
		out.push({
			id: `SMS${1e5 + i}`,
			customer: c.fullName,
			phone: c.mobile,
			message: template(c.fullName.split(" ")[0]),
			sentAt: d.toISOString(),
			status
		});
	}
	return out.sort((a, b) => a.sentAt < b.sentAt ? 1 : -1);
}
function generateNotifications(customers) {
	const rand = mulberry32(51222);
	const types = [
		"EMI Due",
		"Insurance Renewal",
		"Loan Approval",
		"Pending Documents"
	];
	return Array.from({ length: 18 }, (_, i) => {
		const c = customers[Math.floor(rand() * customers.length)];
		const type = types[i % types.length];
		const days = Math.floor(rand() * 30) + 1;
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + days);
		return {
			id: `NT${1e3 + i}`,
			type,
			customer: c.fullName,
			dueDate: d.toISOString(),
			amount: type === "EMI Due" ? Math.floor(5e3 + rand() * 8e4) : void 0
		};
	});
}
var maskAadhaar = (a) => a.replace(/\d(?=\d{4})/g, "•");
var maskPan = (p) => p.slice(0, 3) + "•••" + p.slice(-2);
var inr = (n) => "₹" + n.toLocaleString("en-IN");
function monthlyApplications(customers) {
	const map = /* @__PURE__ */ new Map();
	const now = /* @__PURE__ */ new Date();
	for (let i = 5; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		map.set(d.toLocaleString("en-IN", { month: "short" }), 0);
	}
	customers.forEach((c) => {
		const key = new Date(c.appliedOn).toLocaleString("en-IN", { month: "short" });
		if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
	});
	return Array.from(map, ([month, applications]) => ({
		month,
		applications
	}));
}
function distributionBy(arr, kind) {
	const map = /* @__PURE__ */ new Map();
	arr.filter((c) => c.productKind === kind).forEach((c) => {
		map.set(c.productType, (map.get(c.productType) || 0) + 1);
	});
	return Array.from(map, ([name, value]) => ({
		name,
		value
	}));
}
function smsWeekly(logs) {
	const days = [];
	for (let i = 6; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - i);
		const key = d.toLocaleDateString("en-IN", { weekday: "short" });
		const dayLogs = logs.filter((l) => new Date(l.sentAt).toDateString() === d.toDateString());
		days.push({
			day: key,
			sent: dayLogs.filter((l) => l.status === "Sent").length,
			failed: dayLogs.filter((l) => l.status === "Failed").length
		});
	}
	return days;
}
var StoreCtx = (0, import_react.createContext)(null);
function AppStoreProvider({ children }) {
	const seed = (0, import_react.useMemo)(() => {
		const customers = generateCustomers(100);
		return {
			customers,
			sms: generateSmsLogs(300, customers),
			notifications: generateNotifications(customers)
		};
	}, []);
	const [customers, setCustomers] = (0, import_react.useState)(seed.customers);
	const [sms, setSms] = (0, import_react.useState)(seed.sms);
	const [notifications] = (0, import_react.useState)(seed.notifications);
	const [currentUser, setCurrentUser] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("ify_current_user");
			if (saved) try {
				return JSON.parse(saved);
			} catch (e) {}
		}
		return {
			name: "R H Adhoni",
			role: "super_admin"
		};
	});
	const handleSetCurrentUser = (u) => {
		setCurrentUser(u);
		if (typeof window !== "undefined") if (u) localStorage.setItem("ify_current_user", JSON.stringify(u));
		else localStorage.removeItem("ify_current_user");
	};
	const value = {
		customers,
		sms,
		notifications,
		currentUser,
		setCurrentUser: handleSetCurrentUser,
		addApplication: (a) => {
			let assignedTo = "R H Adhoni";
			if (a.referralCode) {
				const ref = a.referralCode.trim().toUpperCase();
				if (ref.includes("AYESHA") || ref.includes("EMP002") || ref === "BROKER101") assignedTo = "Bibi Ayesha";
			}
			const newCust = {
				...a,
				id: `IFY${(1e4 + customers.length + 1).toString()}`,
				status: "Pending",
				appliedOn: (/* @__PURE__ */ new Date()).toISOString(),
				assignedTo
			};
			setCustomers((prev) => [newCust, ...prev]);
			return newCust;
		},
		updateStatus: (id, status) => setCustomers((prev) => prev.map((c) => c.id === id ? {
			...c,
			status
		} : c)),
		deleteCustomer: (id) => setCustomers((prev) => prev.filter((c) => c.id !== id)),
		resendSms: (id) => setSms((prev) => prev.map((s) => s.id === id ? {
			...s,
			status: "Sent",
			sentAt: (/* @__PURE__ */ new Date()).toISOString()
		} : s)),
		triggerScheduler: () => {
			let sentCount = 0;
			let failedCount = 0;
			sms.forEach((s) => {
				if (s.status === "Scheduled") if (Math.random() > .08) sentCount++;
				else failedCount++;
			});
			setSms((prev) => {
				let localSent = 0;
				return prev.map((s) => {
					if (s.status === "Scheduled") {
						const success = localSent < sentCount;
						localSent++;
						return {
							...s,
							status: success ? "Sent" : "Failed",
							sentAt: (/* @__PURE__ */ new Date()).toISOString()
						};
					}
					return s;
				});
			});
			return {
				sent: sentCount,
				failed: failedCount
			};
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreCtx.Provider, {
		value,
		children
	});
}
function useAppStore() {
	const ctx = (0, import_react.useContext)(StoreCtx);
	if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
	return ctx;
}
//#endregion
export { maskPan as a, useAppStore as c, maskAadhaar as i, distributionBy as n, monthlyApplications as o, inr as r, smsWeekly as s, AppStoreProvider as t };
