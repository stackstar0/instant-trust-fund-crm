import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const SmsDashboard = () => {
  const [stats, setStats] = useState<any>({
    sent: 0,
    delivered: 0,
    failed: 0,
    scrubbed: 0,
    templates: 0,
    approvedTemplates: 0,
    headersCount: 0,
    dltStatus: "PENDING",
    peTmChainStatus: "UNCONFIGURED",
    peTmChainId: "PE-TM-1100223344",
  });
  const [templates, setTemplates] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Test Dispatch Modal state
  const [showTestModal, setShowTestModal] = useState<boolean>(false);
  const [testPhone, setTestPhone] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [testCustomerName, setTestCustomerName] = useState<string>("Ramesh Kumar");
  const [testEmiAmount, setTestEmiAmount] = useState<string>("12500");
  const [testSending, setTestSending] = useState<boolean>(false);
  const [testFeedback, setTestFeedback] = useState<string>("");

  useEffect(() => {
    fetchSmsOverview();
  }, []);

  const fetchSmsOverview = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/sms/overview", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        setStats(data.stats);
        setTemplates(data.templates || []);
        setLogs(data.logs || []);
        if (data.templates && data.templates.length > 0) {
          setSelectedTemplateId(data.templates[0].dltTemplateId);
        }
      }
    } catch (err) {
      console.error("Failed to fetch SMS overview:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone) return;

    setTestSending(true);
    setTestFeedback("");

    try {
      const res = await fetch("/api/sms/test-single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: testPhone,
          dltTemplateId: selectedTemplateId,
          variableMap: {
            customer_name: testCustomerName,
            emi_amount: `₹${testEmiAmount}`,
            due_date: new Date().toLocaleDateString("en-IN"),
          },
        }),
      });

      const result = await res.json();
      if (result.status === "success") {
        setTestFeedback("✅ Test SMS Dispatched Successfully!");
        fetchSmsOverview();
        setTimeout(() => {
          setShowTestModal(false);
          setTestFeedback("");
        }, 2000);
      } else {
        setTestFeedback(`❌ Dispatch Failed: ${result.message}`);
      }
    } catch (err: any) {
      setTestFeedback(`❌ Error: ${err.message}`);
    } finally {
      setTestSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">✅ Delivered</span>;
      case "SENT":
        return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-semibold">🚀 Sent</span>;
      case "QUEUED":
        return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-semibold">⏳ Queued</span>;
      case "SCRUBBED_LOCAL":
        return <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs font-semibold">🛡️ DLT Scrubbed</span>;
      case "REJECTED_DND":
        return <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-xs font-semibold">🛑 TRAI Window</span>;
      case "FAILED":
      default:
        return <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-xs font-semibold">❌ Failed</span>;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading SMS Communications Hub...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-slate-950 text-slate-100 min-h-screen rounded-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            📱 SMS & Communications Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            TRAI TCCCPR Compliant • PE-TM Chain Traceability • BullMQ Queue Engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              stats.dltStatus === "VERIFIED" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            }`}
          >
            DLT Status: {stats.dltStatus}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            PE-TM: {stats.peTmChainId} ({stats.peTmChainStatus})
          </span>
          <button
            onClick={() => setShowTestModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md"
          >
            🧪 Test Dispatch
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-400">TODAY SENT</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-extrabold text-blue-400">{stats.sent}</div></CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-400">DELIVERED</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-extrabold text-emerald-400">{stats.delivered}</div></CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-400">FAILED</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-extrabold text-rose-400">{stats.failed}</div></CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-400">DLT SCRUBBED</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-extrabold text-purple-400">{stats.scrubbed}</div></CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-400">TEMPLATES</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-extrabold text-amber-400">{stats.templates}</div></CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-400">HEADERS</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-extrabold text-cyan-400">{stats.headersCount}</div></CardContent>
        </Card>
      </div>

      {/* DLT Templates Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-200">
            📑 Approved DLT Content Templates & Suffix Mapping
          </CardTitle>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No DLT templates registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-300 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Template Name</th>
                    <th className="p-3">DLT ID</th>
                    <th className="p-3">Header (Suffix)</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Variable Tags</th>
                    <th className="p-3">DLT Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {templates.map((tmpl: any) => (
                    <tr key={tmpl._id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-100">{tmpl.templateName}</td>
                      <td className="p-3 font-mono text-xs text-slate-400">{tmpl.dltTemplateId}</td>
                      <td className="p-3">
                        <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded text-cyan-300">
                          {tmpl.header}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {tmpl.category}
                        </span>
                      </td>
                      <td className="p-3 text-xs">
                        {tmpl.variableTags && tmpl.variableTags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {tmpl.variableTags.map((v: any, idx: number) => (
                              <span key={idx} className="bg-slate-800 text-purple-300 px-1.5 py-0.5 rounded text-[11px] font-mono">
                                {v.varName}: {v.tagType}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-500">None</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          tmpl.dltStatus === "APPROVED" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {tmpl.dltStatus === "APPROVED" ? "✅ Approved" : "🟡 Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Dispatch & Delivery Audit Logs */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-200">
            📊 Live Dispatch & DLT Delivery Audit Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No SMS logs recorded today.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800/80 text-slate-300 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Header</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Message Text</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {logs.map((log: any) => (
                    <tr key={log._id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-xs text-slate-200">{log.phone}</td>
                      <td className="p-3 font-mono text-xs text-cyan-400">{log.headerUsed}</td>
                      <td className="p-3 text-xs text-slate-400">{log.category}</td>
                      <td className="p-3 text-slate-300 max-w-sm truncate text-xs" title={log.messageText}>
                        {log.messageText}
                      </td>
                      <td className="p-3">{getStatusBadge(log.status)}</td>
                      <td className="p-3 text-xs text-slate-400">
                        {new Date(log.createdAt).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactive Test Dispatch Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                🧪 Trigger Sandbox Test Dispatch
              </h3>
              <button
                onClick={() => setShowTestModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTestDispatch} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Recipient Mobile Number (10 digits)
                </label>
                <input
                  type="text"
                  required
                  placeholder="9876543210"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Select Approved DLT Template
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {templates.map((t: any) => (
                    <option key={t._id} value={t.dltTemplateId}>
                      {t.templateName} ({t.dltTemplateId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Customer Name (#alphanumeric#)
                  </label>
                  <input
                    type="text"
                    value={testCustomerName}
                    onChange={(e) => setTestCustomerName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    EMI Amount (#number#)
                  </label>
                  <input
                    type="text"
                    value={testEmiAmount}
                    onChange={(e) => setTestEmiAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {testFeedback && (
                <div className="p-3 rounded-lg bg-slate-800 text-xs font-medium border border-slate-700">
                  {testFeedback}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={testSending}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-50"
                >
                  {testSending ? "Sending..." : "Dispatch SMS"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmsDashboard;
