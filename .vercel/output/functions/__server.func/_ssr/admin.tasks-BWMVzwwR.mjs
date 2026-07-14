import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { W as Funnel, at as CircleCheck, i as User, mt as Calendar, w as Plus } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tasks-BWMVzwwR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initialTasks = [
	{
		id: "TSK-101",
		title: "Verify survey record 142/3A",
		desc: "Cross check boundary markings with Bhoomi record for Manjunath Gowda's farm loan application.",
		priority: "High",
		status: "Pending",
		assignedTo: "Bibi Ayesha",
		dueDate: new Date(Date.now() + 864e5).toISOString()
	},
	{
		id: "TSK-102",
		title: "Review Property loan replacement mapping",
		desc: "Align updated SBI/LIC loans mapping rules in the age calculation components.",
		priority: "Medium",
		status: "Completed",
		assignedTo: "R H Adhoni",
		dueDate: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString()
	},
	{
		id: "TSK-103",
		title: "Follow up on pending Aadhaar upload",
		desc: "Contact customer Vikram Sharma (+91 99002 88471) regarding missing signature on form page 3.",
		priority: "High",
		status: "Pending",
		assignedTo: "Bibi Ayesha",
		dueDate: new Date(Date.now() + 1728e5).toISOString()
	},
	{
		id: "TSK-104",
		title: "Audit monthly affiliate payouts",
		desc: "Compile conversions list for REF-101 and ADHONI-20 codes to authorize payouts.",
		priority: "High",
		status: "Pending",
		assignedTo: "R H Adhoni",
		dueDate: new Date(Date.now() + 2592e5).toISOString()
	},
	{
		id: "TSK-105",
		title: "Verify property deed 77/9 dispute status",
		desc: "Contact Bantwal sub-registrar office regarding the Kabaka village property status.",
		priority: "Low",
		status: "Pending",
		assignedTo: "Bibi Ayesha",
		dueDate: new Date(Date.now() + 432e6).toISOString()
	}
];
function TasksPage() {
	const { currentUser } = useAppStore();
	const [tasks, setTasks] = (0, import_react.useState)(initialTasks);
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const [newDesc, setNewDesc] = (0, import_react.useState)("");
	const [newPriority, setNewPriority] = (0, import_react.useState)("Medium");
	const [newAssignee, setNewAssignee] = (0, import_react.useState)("Bibi Ayesha");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("Pending");
	const [assigneeFilter, setAssigneeFilter] = (0, import_react.useState)("All");
	const handleCreateTask = (e) => {
		e.preventDefault();
		if (!newTitle.trim()) {
			toast.error("Please enter a task title");
			return;
		}
		const newTask = {
			id: `TSK-${Math.floor(106 + Math.random() * 900)}`,
			title: newTitle,
			desc: newDesc,
			priority: newPriority,
			status: "Pending",
			assignedTo: newAssignee,
			dueDate: new Date(Date.now() + 1728e5).toISOString()
		};
		setTasks((prev) => [newTask, ...prev]);
		toast.success(`Task ${newTask.id} created successfully!`);
		setNewTitle("");
		setNewDesc("");
		setNewPriority("Medium");
		setNewAssignee("Bibi Ayesha");
		setShowAddForm(false);
	};
	const handleToggleComplete = (id) => {
		setTasks((prev) => prev.map((t) => {
			if (t.id === id) {
				const nextStatus = t.status === "Pending" ? "Completed" : "Pending";
				toast.success(`Task status updated to ${nextStatus}`);
				return {
					...t,
					status: nextStatus
				};
			}
			return t;
		}));
	};
	const handleToggleAssignee = (id) => {
		setTasks((prev) => prev.map((t) => {
			if (t.id === id) {
				const nextAssignee = t.assignedTo === "R H Adhoni" ? "Bibi Ayesha" : "R H Adhoni";
				toast.info(`Task reassigned to ${nextAssignee}`);
				return {
					...t,
					assignedTo: nextAssignee
				};
			}
			return t;
		}));
	};
	const filteredTasks = (0, import_react.useMemo)(() => {
		return tasks.filter((t) => {
			if (statusFilter !== "All" && t.status !== statusFilter) return false;
			if (assigneeFilter === "Mine") return t.assignedTo.toLowerCase() === currentUser?.name?.toLowerCase();
			return true;
		});
	}, [
		tasks,
		statusFilter,
		assigneeFilter,
		currentUser
	]);
	const getPriorityColor = (priority) => {
		switch (priority) {
			case "High": return "bg-rose-500/10 text-rose-600 border-rose-500/20";
			case "Medium": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
			default: return "bg-blue-500/10 text-blue-600 border-blue-500/20";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black md:text-4xl text-brand-navy",
					children: "Task Board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Track daily checklists, assign operations, and resolve verification tickets."
				})] }), currentUser?.role !== "assistant_admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setShowAddForm((v) => !v),
					className: "bg-primary hover:bg-brand-navy text-white flex items-center gap-1.5 self-start sm:self-auto h-9 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
						" ",
						showAddForm ? "Hide Form" : "Create Task"
					]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 p-6 border bg-card shadow-card max-w-xl animate-in fade-in slide-in-from-top-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-brand-navy mb-4",
					children: "New CRM Task"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleCreateTask,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "taskTitle",
							children: "Task Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "taskTitle",
							placeholder: "e.g. Audit documents for IFY1004",
							value: newTitle,
							onChange: (e) => setNewTitle(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "taskDesc",
							children: "Description / Context"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "taskDesc",
							placeholder: "Add background notes...",
							value: newDesc,
							onChange: (e) => setNewDesc(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "taskPriority",
								children: "Priority"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "taskPriority",
								value: newPriority,
								onChange: (e) => setNewPriority(e.target.value),
								className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "High",
										children: "High"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Medium",
										children: "Medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Low",
										children: "Low"
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "taskAssignee",
								children: "Assignee"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "taskAssignee",
								value: newAssignee,
								onChange: (e) => setNewAssignee(e.target.value),
								className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Bibi Ayesha",
									children: "Bibi Ayesha (Assistant)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "R H Adhoni",
									children: "R H Adhoni (Super Admin)"
								})]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full bg-primary hover:bg-brand-navy",
							children: "Add Task to Board"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						"Pending",
						"Completed",
						"All"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: statusFilter === f ? "default" : "outline",
						onClick: () => setStatusFilter(f),
						className: "text-xs h-8 px-3",
						children: [f, " Tasks"]
					}, f))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground mr-1",
							children: "Assignee Scope:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: assigneeFilter === "All" ? "secondary" : "outline",
							onClick: () => setAssigneeFilter("All"),
							className: "text-xs h-8 px-2.5",
							children: "All Staff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: assigneeFilter === "Mine" ? "secondary" : "outline",
							onClick: () => setAssigneeFilter("Mine"),
							className: "text-xs h-8 px-2.5",
							children: "Assigned to Me"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-4",
				children: filteredTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-8 text-center border border-dashed bg-muted/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12 text-muted-foreground opacity-40 mx-auto mb-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-brand-navy",
							children: "Task Board Clear"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "No tasks matching the selected filters."
						})
					]
				}) : filteredTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: `p-5 border bg-card shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:shadow-md ${t.status === "Completed" ? "opacity-60" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleToggleComplete(t.id),
							className: `mt-0.5 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${t.status === "Completed" ? "bg-emerald-500 border-emerald-500 text-white" : "border-muted-foreground/30 hover:border-primary"}`,
							"aria-label": "Toggle Complete",
							children: t.status === "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] font-bold text-muted-foreground",
											children: t.id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: `text-base font-bold text-brand-navy ${t.status === "Completed" ? "line-through text-muted-foreground" : ""}`,
											children: t.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: `text-[9px] font-bold ${getPriorityColor(t.priority)}`,
											children: t.priority
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed max-w-2xl",
									children: t.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground pt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }),
											" Assigned to:",
											" ",
											currentUser?.role === "super_admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												onClick: () => handleToggleAssignee(t.id),
												className: "font-bold text-primary cursor-pointer hover:underline",
												title: "Click to toggle assign",
												children: t.assignedTo
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-muted-foreground",
												children: t.assignedTo
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }),
											" Due:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: new Date(t.dueDate).toLocaleDateString("en-IN", {
													day: "numeric",
													month: "short"
												})
											})
										]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 self-end md:self-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: t.status === "Completed" ? "outline" : "default",
							className: "text-xs h-8 font-semibold",
							onClick: () => handleToggleComplete(t.id),
							children: t.status === "Completed" ? "Mark Pending" : "Resolve Task"
						})
					})]
				}, t.id))
			})
		]
	});
}
//#endregion
export { TasksPage as component };
