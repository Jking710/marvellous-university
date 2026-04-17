import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SidebarLayout from '../components/layout/SidebarLayout';
import { getGPABadgeColor, getGPALabel } from '../utils/gpa';

export default function Profile() {
  const { student, updateStudent } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    phone: student?.phone || '',
    level: student?.level || '',
  });

  if (!student) return null;

  const handleSave = () => {
    updateStudent({ ...student, phone: form.phone, level: form.level });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { label: 'Full Name', value: student.name },
    { label: 'Email Address', value: student.email },
    { label: 'Matric Number', value: student.matricNo },
    { label: 'Department', value: student.department },
    { label: 'Faculty', value: student.faculty },
    { label: 'Current Level', value: `${student.level} Level` },
    { label: 'Phone Number', value: student.phone || 'Not provided' },
    { label: 'Registered', value: student.registeredAt ? new Date(student.registeredAt).toLocaleDateString('en-GB', { dateStyle: 'long' }) : 'N/A' },
  ];

  return (
    <SidebarLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-slate-800">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">View and manage your personal information</p>
      </div>

      {saved && (
        <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-medium flex items-center gap-2">
          ✅ Profile updated successfully
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white text-3xl font-extrabold mx-auto mb-4 shadow-lg shadow-violet-200">
              {student.name[0]}
            </div>
            <h2 className="font-extrabold text-slate-800 text-lg">{student.name}</h2>
            <p className="text-slate-400 text-sm mt-1">{student.matricNo}</p>
            <p className="text-slate-500 text-sm">{student.department}</p>
            <div className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-bold border ${getGPABadgeColor(student.cgpa)}`}>
              🎓 {getGPALabel(student.cgpa)}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">CGPA</p>
                <p className="text-xl font-extrabold text-violet-600 mt-0.5">{student.cgpa.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Level</p>
                <p className="text-xl font-extrabold text-fuchsia-600 mt-0.5">{student.level}L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800">Personal Information</h2>
            {!editing ? (
              <button onClick={() => setEditing(true)}
                className="text-sm text-violet-600 border border-violet-200 px-4 py-2 rounded-xl hover:bg-violet-50 font-semibold transition-colors">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="text-sm text-slate-500 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 font-semibold transition-colors">Cancel</button>
                <button onClick={handleSave} className="text-sm bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 font-semibold transition-colors">Save Changes</button>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {fields.map(f => (
              <div key={f.label}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{f.label}</p>
                {editing && f.label === 'Phone Number' ? (
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500" />
                ) : editing && f.label === 'Current Level' ? (
                  <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500">
                    {['100','200','300','400','500'].map(l => <option key={l} value={l}>{l} Level</option>)}
                  </select>
                ) : (
                  <p className="text-sm text-slate-700 font-medium">{f.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Academic Standing</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Semesters', value: student.semesters.length },
                { label: 'Courses Taken', value: student.semesters.flatMap(s=>s.courses).length },
                { label: 'Credit Units', value: student.totalUnits || 0 },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                  <p className="text-xl font-extrabold text-violet-700">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
