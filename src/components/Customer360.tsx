import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const Customer360 = ({ customerId }: { customerId: string }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch360 = async () => {
      try {
        const res = await fetch(`/api/customers/360/${customerId}`, {
          // Assume auth token is handled via cookies or interceptors in real app
        });
        const result = await res.json();
        if (result.status === 'success') {
          setData(result.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (customerId) fetch360();
  }, [customerId]);

  if (loading) return <div>Loading Customer Profile...</div>;
  if (!data) return <div>Failed to load customer data.</div>;

  const { profile, loans, payments, insurance, smsLogs, analytics } = data;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ACTIVE': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded">🟢 Active</span>;
      case 'DUE_SOON': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">🟡 Due Soon</span>;
      case 'OVERDUE': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded">🔴 Overdue</span>;
      case 'CLOSED': return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">⚪ Closed</span>;
      default: return <span className="px-2 py-1 bg-gray-100 rounded">{status}</span>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{profile.name}'s 360° Profile</h2>
        {analytics && (
          <div className="text-sm bg-blue-50 p-2 rounded">
            <strong>Total Loans:</strong> {analytics.totalLoans} | <strong>Outstanding:</strong> ₹{analytics.totalOutstanding}
          </div>
        )}
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="sms">SMS Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle>Personal Details</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Phone:</strong> {profile.phone}</div>
                <div><strong>Email:</strong> {profile.email || 'N/A'}</div>
                <div><strong>Address:</strong> {profile.address || 'N/A'}</div>
                {/* Redacted fields will be undefined for AssistantAdmin */}
                {profile.panNumber !== undefined && <div><strong>PAN:</strong> {profile.panNumber || 'N/A'}</div>}
                {profile.aadhaarNumber !== undefined && <div><strong>Aadhaar:</strong> {profile.aadhaarNumber || 'N/A'}</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans">
          <div className="space-y-4">
            {loans.map((loan: any) => (
              <Card key={loan._id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{loan.loanType} - {loan.loanId}</span>
                    {getStatusBadge(loan.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div><strong>Principal:</strong> ₹{loan.principalAmount}</div>
                    <div><strong>Outstanding:</strong> ₹{loan.outstandingAmount}</div>
                    <div><strong>EMI:</strong> ₹{loan.emiAmount} (Due: {loan.emiDueDate}th)</div>
                    <div><strong>Next Due:</strong> {new Date(loan.nextEmiDate).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
            <CardContent>
              <ul>
                {payments.map((p: any) => (
                  <li key={p._id} className="border-b py-2 flex justify-between">
                    <span>{new Date(p.paymentDate).toLocaleDateString()} - {p.paymentMethod}</span>
                    <span className="font-bold">₹{p.amountPaid} ({p.status})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance">
           {/* Similar structure for insurance */}
           <Card><CardHeader><CardTitle>Insurance Policies</CardTitle></CardHeader><CardContent>Policies List</CardContent></Card>
        </TabsContent>
        
        <TabsContent value="sms">
          <Card>
            <CardHeader><CardTitle>SMS Audit Trail</CardTitle></CardHeader>
            <CardContent>
              <ul>
                {smsLogs.map((s: any) => (
                  <li key={s._id} className="border-b py-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">{new Date(s.sentAt).toLocaleString()}</span>
                      <span className={`text-sm ${s.status === 'FAILED' ? 'text-red-500' : 'text-green-500'}`}>{s.status}</span>
                    </div>
                    <p className="text-sm mt-1">{s.messageText}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
