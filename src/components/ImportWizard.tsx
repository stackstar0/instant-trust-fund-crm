import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export const ImportWizard = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [preview, setPreview] = useState<any[]>([]);
  const [fullData, setFullData] = useState<any[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [validationResult, setValidationResult] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const dbFields = [
    { key: 'name', label: 'Name (Required)' },
    { key: 'phone', label: 'Phone (Required)' },
    { key: 'email', label: 'Email' },
    { key: 'panNumber', label: 'PAN' },
    { key: 'loanType', label: 'Loan Type' },
    { key: 'principalAmount', label: 'Principal Amount' },
    { key: 'emiAmount', label: 'EMI Amount' }
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/import/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setHeaders(data.headers);
      setPreview(data.preview);
      setFullData(data.data);
      setStep(2);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const validateData = async () => {
    setUploading(true);
    try {
      const res = await fetch('/api/import/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: fullData, mappings })
      });
      const data = await res.json();
      setValidationResult(data);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const commitData = async () => {
    setUploading(true);
    try {
      await fetch('/api/import/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ validData: validationResult.validData })
      });
      setStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Bulk Import Wizard - Step {step} of 4</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Upload Excel/CSV File</h3>
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            <Button onClick={uploadFile} disabled={!file || uploading}>
              {uploading ? 'Uploading...' : 'Next: Map Columns'}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Map Columns</h3>
            <div className="grid grid-cols-2 gap-4">
              {dbFields.map(field => (
                <div key={field.key} className="flex flex-col gap-2">
                  <label>{field.label}</label>
                  <select 
                    className="border p-2 rounded"
                    value={mappings[field.key] || ''}
                    onChange={(e) => setMappings({...mappings, [field.key]: e.target.value})}
                  >
                    <option value="">Select Column...</option>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <Button onClick={validateData} disabled={uploading}>
              {uploading ? 'Validating...' : 'Next: Preview & Review'}
            </Button>
          </div>
        )}

        {step === 3 && validationResult && (
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Validation Review</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-100 rounded">
                <div className="text-2xl font-bold">{validationResult.totalRecords}</div>
                <div>Total</div>
              </div>
              <div className="p-4 bg-green-100 rounded text-green-800">
                <div className="text-2xl font-bold">{validationResult.validCount}</div>
                <div>Valid</div>
              </div>
              <div className="p-4 bg-yellow-100 rounded text-yellow-800">
                <div className="text-2xl font-bold">{validationResult.duplicateCount}</div>
                <div>Duplicates</div>
              </div>
              <div className="p-4 bg-red-100 rounded text-red-800">
                <div className="text-2xl font-bold">{validationResult.invalidCount}</div>
                <div>Errors</div>
              </div>
            </div>
            <Button onClick={commitData} disabled={uploading || validationResult.validCount === 0}>
              {uploading ? 'Importing...' : `Import ${validationResult.validCount} Records`}
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4 items-center">
            <h3 className="font-semibold text-2xl text-green-600">Import Successful!</h3>
            <p>Your records have been added to the system.</p>
            <Button onClick={() => {
              setStep(1); setFile(null); setHeaders([]); setPreview([]); setMappings({}); setValidationResult(null);
            }}>Import Another File</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
