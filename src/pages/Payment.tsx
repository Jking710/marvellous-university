import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SidebarLayout from '../components/layout/SidebarLayout';

const FEES = [
  { id: 'tuition', label: 'Tuition Fee', amount: 250000, session: '2024/2025', due: '31 Jan 2025', status: 'unpaid' },
  { id: 'accommodation', label: 'Accommodation Fee', amount: 80000, session: '2024/2025', due: '31 Jan 2025', status: 'unpaid' },
  { id: 'library', label: 'Library Fee', amount: 15000, session: '2024/2025', due: '31 Jan 2025', status: 'paid' },
  { id: 'sport', label: 'Sports & Recreation', amount: 10000, session: '2024/2025', due: '31 Jan 2025', status: 'paid' },
  { id: 'medical', label: 'Medical Fee', amount: 12000, session: '2024/2025', due: '31 Jan 2025', status: 'paid' },
];

const HISTORY = [
  { id: 'h1', desc: 'Library Fee — 2024/2025', amount: 15000, date: '12 Nov 2024', ref: 'MU-2024-LIB-001', status: 'success' },
  { id: 'h2', desc: 'Sports & Recreation — 2024/2025', amount: 10000, date: '12 Nov 2024', ref: 'MU-2024-SPT-001', status: 'success' },
  { id: 'h3', desc: 'Medical Fee — 2024/2025', amount: 12000, date: '13 Nov 2024', ref: 'MU-2024-MED-001', status: 'success' },
  { id: 'h4', desc: 'Tuition Fee — 2023/2024', amount: 230000, date: '10 Jan 2024', ref: 'MU-2023-TUI-001', status: 'success' },
];

function fmt(n: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(n);
}

export default function Payment() {
  const { student } = useAuth();
  const [paying, setPaying] = useState<string | null>(null);
  const [paidIds, setPaidIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<typeof FEES[0] | null>(null);

  if (!student) return null;

  const fees = FEES.map(f => ({ ...f, status: paidIds.includes(f.id) ? 'paid' : f.status }));
  const unpaid = fees.filter(f => f.status === 'unpaid');
  const totalOwed = unpaid.reduce((s, f) => s + f.amount, 0);
  const totalPaid = fees.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount, 0);

  const handlePay = async (fee: typeof FEES[0]) => {
    setPaying(fee.id);
    await new Promise(r => setTimeout(r, 1500));
    setPaidIds(prev => [...prev, fee.id]);
    setPaying(null);
    setShowModal(false);
    setSelectedFee(null);
  };

  return (
    <SidebarLayout>
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-800">Payment</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your school fees and payment history</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-2xl p-5 shadow-sm">
          <p className="text-violet-200 text-xs font-semibold uppercase tracking-wide">Outstanding Balance</p>
          <p className="text-2xl font-extrabold mt-1">{fmt(totalOwed)}</p>
          <p className="text-violet-200 text-xs mt-1">{unpaid.length} item{unpaid.length !== 1 ? 's' : ''} pending</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Total Paid</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{fmt(totalPaid)}</p>
          <p className="text-slate-400 text-xs mt-1">This session</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Session</p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">2024/25</p>
          <p className="text-slate-400 text-xs mt-1">{student.level} Level</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Fee items */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-sm">Fee Schedule — 2024/2025</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {fees.map(fee => (
              <div key={fee.id} className="px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{fee.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Due: {fee.due}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-700">{fmt(fee.amount)}</p>
                </div>
                <div className="flex-shrink-0">
                  {fee.status === 'paid' ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">Paid</span>
                  ) : (
                    <button
                      onClick={() => { setSelectedFee(fee as typeof FEES[0]); setShowModal(true); }}
                      disabled={paying === fee.id}
                      className="px-3 py-1 bg-violet-600 text-white rounded-full text-xs font-bold hover:bg-violet-700 transition-colors disabled:opacity-50"
                    >
                      {paying === fee.id ? 'Processing...' : 'Pay Now'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {unpaid.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Total Outstanding</span>
              <span className="text-sm font-extrabold text-red-600">{fmt(totalOwed)}</span>
            </div>
          )}
        </div>

        {/* Payment history */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-sm">Payment History</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {[...HISTORY, ...paidIds.map(id => {
              const fee = FEES.find(f => f.id === id);
              if (!fee) return null;
              return { id: `new-${id}`, desc: `${fee.label} — 2024/2025`, amount: fee.amount, date: new Date().toLocaleDateString('en-GB', { dateStyle: 'medium' }), ref: `MU-2024-${id.toUpperCase().slice(0,3)}-${Math.floor(Math.random()*900+100)}`, status: 'success' };
            }).filter(Boolean)].map((h: any) => (
              <div key={h.id} className="px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-700 truncate">{h.desc}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{h.date} · {h.ref}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-emerald-600">+{fmt(h.amount)}</p>
                    <span className="text-xs text-emerald-500">✓ Success</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pay modal */}
      {showModal && selectedFee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-extrabold text-slate-800 text-lg mb-1">Confirm Payment</h3>
            <p className="text-slate-400 text-sm mb-5">You are about to pay for:</p>
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-5">
              <p className="font-bold text-violet-800">{selectedFee.label}</p>
              <p className="text-xs text-violet-500 mt-1">Session: {selectedFee.session}</p>
              <p className="text-2xl font-extrabold text-violet-700 mt-2">{fmt(selectedFee.amount)}</p>
            </div>
            <p className="text-xs text-slate-400 mb-5 text-center">This is a simulated payment. No real transaction will occur.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); setSelectedFee(null); }}
                className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => handlePay(selectedFee)} disabled={paying !== null}
                className="flex-1 bg-violet-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors disabled:opacity-50">
                {paying ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
