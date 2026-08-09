import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const SmsDashboard = () => {
  // Placeholder for SMS dashboard analytics and template management
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-4">
      <h2 className="text-3xl font-bold">SMS Automation Dashboard</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Sent</CardTitle></CardHeader>
          <CardContent><div className="text-4xl font-bold text-blue-600">12,450</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Delivered</CardTitle></CardHeader>
          <CardContent><div className="text-4xl font-bold text-green-600">12,100</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Failed</CardTitle></CardHeader>
          <CardContent><div className="text-4xl font-bold text-red-600">350</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>DLT Templates Management</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border p-4 rounded">
              <h4 className="font-bold">EMI_REMINDER</h4>
              <p className="text-sm text-gray-600">Dear {'{{customer_name}}'}, your EMI of {'{{emi_amount}}'} for loan {'{{loan_number}}'} is due on {'{{due_date}}'}.</p>
            </div>
            {/* Template management UI would go here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
