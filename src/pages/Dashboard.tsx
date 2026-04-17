import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SidebarLayout from '../components/layout/SidebarLayout';
import { getGPAColor, getGPALabel, getGPABadgeColor } from '../utils/gpa';

function GPABar({ gpa, label }: { gpa: number; label: string }) {
  const pct = Math.min((gpa / 5) * 100, 100);
  const color =
    gpa >= 4.5 ? 'from-emerald-400 to-emerald-500' :
    gpa >= 3.5 ? 'from-blue-400 to-violet-500' :
    gpa >= 2.5 ? 'from-amber-400 to-orange-400' :
    'from-red-400 to-red-500';

  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      <span className={`text-xs font-bold ${getGPAColor(gpa)}`}>{gpa.toFixed(2)}</span>
      <div className="w-full flex flex-col items-center justify-end" style={{ height: '100px' }}>
        <div
          className={`w-full max-w-[36px] bg-gradient-to-t ${color} rounded-t-lg transition-all duration-700 relative group cursor-default`}
          style={{ height: `${Math.max(pct, 4)}%` }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            GPA: {gpa.toFixed(2)}
          </div>
        </div>
      </div>
      <span className="text-xs text-slate-400 leading-tight truncate w-full text-center">{label}</span>
    </div>
  );
}

export default function Dashboard() {
  const { student } = useAuth();
  if (!student) return null;

  const allCourses = student.semesters.flatMap(s => s.courses);
  const latestSem = student.semesters[student.semesters.length - 1];
  const cgpa = student.cgpa || 0;
  const badgeColor = getGPABadgeColor(cgpa);

  const statCards = [
    { label: 'CGPA', value: cgpa.toFixed(2), sub: getGPALabel(cgpa), color: getGPAColor(cgpa), bg: 'bg-violet-50', border: 'border-violet-200',
      icon: <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
    },
    { label: 'Total Units', value: student.totalUnits || allCourses.reduce((s,c)=>s+c.creditUnit,0), sub: 'Credit units earned', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200',
      icon: <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    },
    { label: 'Semesters', value: student.semesters.length, sub: 'Completed', color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', border: 'border-fuchsia-200',
      icon: <svg className="w-5 h-5 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    { label: 'Courses', value: allCourses.length, sub: 'Registered total', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
      icon: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
  ];

  return (
    <SidebarLayout>
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-violet-600 via-violet-700 to-fuchsia-700 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-fuchsia-500/10 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-extrabold backdrop-blur-sm border border-white/20">
              {student.name[0]}
            </div>
            <div>
              <p className="text-violet-200 text-xs font-semibold uppercase tracking-widest">Welcome back</p>
              <h1 className="text-xl sm:text-2xl font-extrabold mt-0.5">{student.name}</h1>
              <p className="text-violet-200 text-sm">{student.matricNo} · {student.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${badgeColor}`}>
              {getGPALabel(cgpa)}
            </div>
            <Link to="/results" className="bg-white text-violet-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors shadow-lg">
              View Results →
            </Link>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map(card => (
          <div key={card.label} className={`bg-white rounded-2xl border ${card.border} p-4 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 ${card.bg} rounded-xl flex items-center justify-center`}>{card.icon}</div>
              <span className="text-xs text-slate-400 font-medium">{card.label}</span>
            </div>
            <p className={`text-2xl font-extrabold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts + Info row */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* GPA Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800">GPA Performance</h2>
              <p className="text-xs text-slate-400 mt-0.5">Semester-by-semester overview</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getGPABadgeColor(cgpa)}`}>
              CGPA: {cgpa.toFixed(2)}
            </span>
          </div>
          {student.semesters.length > 0 ? (
            <div className="flex items-end gap-3 px-2" style={{ height: '140px' }}>
              {student.semesters.map(sem => (
                <GPABar
                  key={sem.id}
                  gpa={sem.gpa}
                  label={`${sem.level}L ${sem.name.split(' ')[0].substring(0, 3)}`}
                />
              ))}
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-slate-400 text-sm">No semester data yet</div>
          )}
          {/* GPA scale */}
          <div className="flex justify-between mt-3 px-2">
            <span className="text-xs text-slate-300">0.0</span>
            <span className="text-xs text-slate-300">2.5</span>
            <span className="text-xs text-slate-300">5.0</span>
          </div>
          <div className="flex gap-3 mt-3 flex-wrap">
            {[['First Class', 'bg-emerald-400'], ['2:1', 'bg-blue-400'], ['2:2', 'bg-amber-400'], ['Below', 'bg-red-400']].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                <span className="text-xs text-slate-400">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Info card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Student Info</h2>
          <div className="space-y-3">
            {[
              { label: 'Full Name', value: student.name },
              { label: 'Matric No.', value: student.matricNo },
              { label: 'Department', value: student.department },
              { label: 'Faculty', value: student.faculty },
              { label: 'Level', value: `${student.level} Level` },
              { label: 'Email', value: student.email },
            ].map(info => (
              <div key={info.label} className="flex flex-col gap-0.5">
                <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold">{info.label}</span>
                <span className="text-sm text-slate-700 font-medium truncate">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest semester + Quick links */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Latest semester courses */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Latest Semester</h2>
              {latestSem && <p className="text-xs text-slate-400 mt-0.5">{latestSem.level}L — {latestSem.name} ({latestSem.session})</p>}
            </div>
            {latestSem && (
              <div className="text-right">
                <p className="text-xs text-slate-400">GPA</p>
                <p className={`text-xl font-extrabold ${getGPAColor(latestSem.gpa)}`}>{latestSem.gpa.toFixed(2)}</p>
              </div>
            )}
          </div>
          {latestSem?.courses.length ? (
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {['Code', 'Course Title', 'Units', 'Grade'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-semibold uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {latestSem.courses.slice(0, 5).map(c => (
                  <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-slate-700">{c.code}</td>
                    <td className="px-4 py-2.5 text-slate-600 truncate max-w-[160px]">{c.title}</td>
                    <td className="px-4 py-2.5 text-slate-500">{c.creditUnit}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        c.grade === 'A' ? 'bg-emerald-100 text-emerald-700' :
                        c.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                        c.grade === 'C' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>{c.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p className="text-3xl mb-2">📚</p>
              No courses registered yet.{' '}
              <Link to="/courses" className="text-violet-600 hover:underline font-medium">Add courses</Link>
            </div>
          )}
          {latestSem && latestSem.courses.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
              <Link to="/courses" className="text-xs text-violet-600 font-semibold hover:underline">Manage all courses →</Link>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { to: '/courses', label: 'Register a Course', icon: '➕', color: 'hover:border-violet-300 hover:bg-violet-50' },
              { to: '/results', label: 'View Result Slip', icon: '📄', color: 'hover:border-blue-300 hover:bg-blue-50' },
              { to: '/profile', label: 'Update Profile', icon: '👤', color: 'hover:border-fuchsia-300 hover:bg-fuchsia-50' },
              { to: '/payment', label: 'Pay School Fees', icon: '💳', color: 'hover:border-emerald-300 hover:bg-emerald-50' },
            ].map(action => (
              <Link
                key={action.to}
                to={action.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition-all ${action.color}`}
              >
                <span className="text-lg">{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>

          {/* GPA classification guide */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">GPA Scale</p>
            <div className="space-y-1.5">
              {[
                { label: 'First Class', range: '4.50 – 5.00', color: 'text-emerald-600', dot: 'bg-emerald-400' },
                { label: 'Second Upper', range: '3.50 – 4.49', color: 'text-blue-600', dot: 'bg-blue-400' },
                { label: 'Second Lower', range: '2.50 – 3.49', color: 'text-amber-600', dot: 'bg-amber-400' },
                { label: 'Third Class', range: '1.50 – 2.49', color: 'text-orange-600', dot: 'bg-orange-400' },
                { label: 'Pass', range: '1.00 – 1.49', color: 'text-red-500', dot: 'bg-red-400' },
              ].map(g => (
                <div key={g.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${g.dot}`} />
                    <span className={`text-xs font-medium ${g.color}`}>{g.label}</span>
                  </div>
                  <span className="text-xs text-slate-400">{g.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
