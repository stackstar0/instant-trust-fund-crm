import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  FileSpreadsheet, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  Map, 
  Play, 
  ChevronRight, 
  FileText, 
  RefreshCw,
  Info
} from 'lucide-react';

export const BulkImportWizard = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [preview, setPreview] = useState<any[]>([]);
  const [fullData, setFullData] = useState<any[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [importResult, setImportResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dbFields = [
    { key: 'name', label: 'Customer Name *', required: true },
    { key: 'mobile', label: 'Mobile Number *', required: true },
    { key: 'email', label: 'Email Address', required: false },
    { key: 'pan', label: 'PAN Card Number', required: false },
    { key: 'loanType', label: 'Loan Type', required: false },
    { key: 'principal', label: 'Principal Amount', required: false },
    { key: 'emi', label: 'EMI Amount', required: false },
    { key: 'dueDay', label: 'EMI Due Day (1-31)', required: false },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const extension = droppedFile.name.split('.').pop()?.toLowerCase();
      if (['xlsx', 'xls', 'csv'].includes(extension || '')) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Only Excel (.xlsx, .xls) and CSV (.csv) files are supported.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/v1/import/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setHeaders(data.headers || []);
        setPreview(data.preview || []);
        setFullData(data.data || []);
        
        // Auto map matching headers
        const autoMappings: Record<string, string> = {};
        dbFields.forEach((field) => {
          const match = data.headers.find(
            (h: string) =>
              h.toLowerCase().trim() === field.key.toLowerCase().trim() ||
              h.toLowerCase().trim() === field.label.toLowerCase().replace(/[*]/, '').trim()
          );
          if (match) autoMappings[field.key] = match;
        });
        setMappings(autoMappings);
        setStep(2);
      } else {
        setError(data.error || 'Failed to parse file.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error occurred during file parsing.');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessImport = async () => {
    // Validate required mappings
    if (!mappings.name || !mappings.mobile) {
      setError('You must map the required Name and Mobile fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/import/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: fullData,
          mappings,
        }),
      });

      const result = await res.json();
      if (res.ok && result.status === 'success') {
        setImportResult(result.summary);
        setStep(3);
      } else {
        setError(result.error || 'An error occurred while processing bulk records.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Network error during bulk records processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border shadow-md bg-white rounded-2xl overflow-hidden">
      <CardHeader className="bg-slate-50 border-b p-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="h-6 w-6 text-blue-500" /> Excel/CSV Bulk Import Wizard
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">Upload financial records, map headers, and insert into MongoDB</p>
          </div>
          <div className="flex gap-1.5 items-center">
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-sm flex items-start gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">Error:</span> {error}
            </div>
          </div>
        )}

        {/* STEP 1: UPLOAD */}
        {step === 1 && (
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition cursor-pointer flex flex-col items-center justify-center ${
                dragOver ? 'border-blue-500 bg-blue-50/20' : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <UploadCloud className="h-12 w-12 text-slate-400 mb-3" />
              <h4 className="font-bold text-slate-800 text-lg">Drag & Drop file here</h4>
              <p className="text-xs text-slate-500 mt-1 mb-4">Supports .xlsx, .xls, and .csv files up to 10MB</p>
              
              <label className="relative cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                <span>Browse Files</span>
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              {file && (
                <div className="mt-4 p-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-blue-100">
                  <FileText className="h-4 w-4" /> {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Next: Map Columns'}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: MAPPING */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-700 flex gap-2">
              <Info className="h-4 w-4 shrink-0" />
              <div>
                Map your spreadsheet headers to the CRM database columns. Fields marked with <span className="font-bold">*</span> are mandatory. Normalized Indian phone numbers will be automatically validated.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dbFields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1.5 p-3.5 bg-slate-50 border rounded-xl">
                  <label className="text-xs font-bold text-slate-700 flex justify-between">
                    <span>{field.label}</span>
                    {field.required && <span className="text-rose-500">Required</span>}
                  </label>
                  <select
                    className="w-full text-xs bg-white border p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    value={mappings[field.key] || ''}
                    onChange={(e) => setMappings({ ...mappings, [field.key]: e.target.value })}
                  >
                    <option value="">-- Match spreadsheet column --</option>
                    {headers.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {preview && preview.length > 0 && (
              <div className="border rounded-xl overflow-hidden mt-6">
                <div className="bg-slate-50 border-b p-3 text-xs font-bold text-slate-700">
                  Spreadsheet Preview (First 5 Rows)
                </div>
                <div className="overflow-x-auto max-h-[220px]">
                  <table className="w-full text-[11px] text-left">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                        {headers.map((h) => (
                          <th key={h} className="px-4 py-2 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-700">
                      {preview.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          {headers.map((h) => (
                            <td key={h} className="px-4 py-2 max-w-[200px] truncate">
                              {String(row[h] || '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="font-semibold"
              >
                Back to Upload
              </Button>
              <Button
                onClick={handleProcessImport}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <><Play className="h-4 w-4" /> Run Bulk Import</>}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === 3 && importResult && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border rounded-2xl text-center">
              <CheckCircle className="h-12 w-12 text-emerald-500 mb-2 animate-bounce" />
              <h3 className="text-xl font-bold text-slate-800">Bulk Seeding Process Complete!</h3>
              <p className="text-xs text-slate-500 mt-1">Summary of spreadsheet normalization, deduplication & database operations</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-100 border rounded-xl text-center">
                <span className="text-xs text-slate-500 block font-semibold">Total Records</span>
                <strong className="text-2xl text-slate-900 font-black">{importResult.totalFound}</strong>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-100 text-center text-emerald-800 rounded-xl">
                <span className="text-xs text-emerald-600 block font-semibold">Successfully Added</span>
                <strong className="text-2xl font-black">{importResult.validCount}</strong>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 text-center text-amber-800 rounded-xl">
                <span className="text-xs text-amber-600 block font-semibold">Duplicates Skipped</span>
                <strong className="text-2xl font-black">{importResult.duplicateCount}</strong>
              </div>
              <div className="p-4 bg-rose-50 border border-rose-100 text-center text-rose-800 rounded-xl">
                <span className="text-xs text-rose-600 block font-semibold">Invalid / Errors</span>
                <strong className="text-2xl font-black">{importResult.invalidCount}</strong>
              </div>
            </div>

            {importResult.errors && importResult.errors.length > 0 && (
              <div className="border rounded-xl mt-6 overflow-hidden">
                <div className="bg-slate-50 border-b p-3 text-xs font-bold text-slate-700 flex justify-between items-center">
                  <span>Import Warnings / Issues Log</span>
                  <Badge variant="destructive" className="text-[10px]">{importResult.errors.length} Warns</Badge>
                </div>
                <div className="divide-y max-h-[300px] overflow-y-auto">
                  {importResult.errors.map((err: any, idx: number) => (
                    <div key={idx} className="p-3 text-xs hover:bg-slate-50/50 flex flex-col gap-1">
                      <div className="flex justify-between font-bold text-slate-600">
                        <span>Row #{err.row}</span>
                        <span className="text-rose-600">Failed / Duplicate</span>
                      </div>
                      <p className="text-slate-500 font-mono text-[10px]">
                        {JSON.stringify(err.data)}
                      </p>
                      <ul className="text-rose-600 list-disc list-inside mt-1 font-semibold">
                        {err.errors.map((msg: string, mIdx: number) => (
                          <li key={mIdx}>{msg}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setStep(1);
                  setFile(null);
                  setHeaders([]);
                  setPreview([]);
                  setFullData([]);
                  setMappings({});
                  setImportResult(null);
                  setError(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Import Another Spreadsheet
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
