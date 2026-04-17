import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SidebarLayout from '../components/layout/SidebarLayout';
import toplogo4 from "../assets/logo.jpeg";
import { getGradeColor, getGPAColor, getGPALabel, getGPABadgeColor, GRADE_POINTS, resolveRepeatedCourses, calculateGPA } from '../utils/gpa';

export default function Results() {
  const { student } = useAuth();
  const [selectedSemId, setSelectedSemId] = useState<string>('all');

  if (!student) return null;

  const allCourses = student.semesters.flatMap(s => s.courses);
  const resolved = resolveRepeatedCourses(allCourses);
  const displayedSemesters = selectedSemId === 'all' ? student.semesters : student.semesters.filter(s => s.id === selectedSemId);

  return (
    <SidebarLayout>
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Academic Results</h1>
          <p className="text-slate-400 text-sm mt-1">View and export your official result slip</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <select value={selectedSemId} onChange={e => setSelectedSemId(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
            <option value="all">All Semesters</option>
            {student.semesters.map(s => (
              <option key={s.id} value={s.id}>{s.level}L — {s.name} ({s.session})</option>
            ))}
          </select>
          <button onClick={() => window.print()}
            className="px-5 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2 shadow-sm">
            📥 Export PDF
          </button>
        </div>
      </div>

      {/* Result Slip */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-700 via-violet-800 to-fuchsia-800 text-white p-8 text-center">
          <div className='flex justify-center items-center mx-auto mb-2'>
          <img src={toplogo4} alt="University Logo" className='rounded-lg w-40 h-20 '/>
          </div>
          <h1 className="text-xl font-extrabold tracking-wide">MARVELLOUS UNIVERSITY</h1>
          <p className="text-violet-200 text-sm mt-1">Office of the Academic Registrar</p>
          <p className="text-violet-300 text-xs mt-0.5 uppercase tracking-widest">Official Academic Transcript</p>
        </div>

        {/* Student Info */}
        <div className="p-5 border-b border-slate-100 bg-slate-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Student Name', value: student.name },
              { label: 'Matric Number', value: student.matricNo },
              { label: 'Department', value: student.department },
              { label: 'Faculty', value: student.faculty },
            ].map(info => (
              <div key={info.label}>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{info.label}</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CGPA Summary */}
        <div className="grid grid-cols-3 gap-px bg-slate-100 border-b border-slate-200">
          {[
            { label: 'CGPA', value: student.cgpa.toFixed(2), color: getGPAColor(student.cgpa) },
            { label: 'Classification', value: getGPALabel(student.cgpa), color: 'text-slate-800' },
            { label: 'Total Credit Units', value: (student.totalUnits || 0).toString(), color: 'text-violet-600' },
          ].map(s => (
            <div key={s.label} className="bg-white py-4 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">{s.label}</p>
              <p className={`text-xl font-extrabold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Semester Results */}
        <div className="p-5 space-y-8">
          {displayedSemesters.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-medium">No results to display yet.</p>
              <p className="text-sm mt-1">Register courses in the Courses section first.</p>
            </div>
          ) : (
            displayedSemesters.map(sem => {
              const semResolved = resolveRepeatedCourses(sem.courses);
              const semGPA = sem.courses.length > 0 ? calculateGPA(sem.courses) : sem.gpa;
              const semUnits = semResolved.reduce((s, c) => s + c.creditUnit, 0);
              const semPoints = semResolved.reduce((s, c) => s + GRADE_POINTS[c.grade] * c.creditUnit, 0);

              return (
                <div key={sem.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-800 text-sm">{sem.level}L — {sem.name} ({sem.session})</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500 text-xs">Units: <strong>{semUnits}</strong></span>
                      <span className="text-slate-500 text-xs">Points: <strong>{semPoints}</strong></span>
                      <span className={`font-extrabold text-lg ${getGPAColor(semGPA)}`}>GPA: {semGPA.toFixed(2)}</span>
                    </div>
                  </div>

                  {sem.courses.length === 0 ? (
                    <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-400 text-sm border border-slate-200">
                      No courses registered for this semester. GPA is estimated.
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr>
                            {['Code', 'Course Title', 'Units', 'Grade', 'Points', 'Status'].map(h => (
                              <th key={h} className="px-4 py-3 text-left text-xs text-slate-400 font-semibold uppercase tracking-wide">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sem.courses.map(course => {
                            const res = resolved.find(r => r.id === course.id || r.code === course.code);
                            const isActive = res?.id === course.id;
                            return (
                              <tr key={course.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${!isActive && course.isRepeated ? 'opacity-40 line-through' : ''}`}>
                                <td className="px-4 py-3 font-semibold text-slate-700">{course.code}</td>
                                <td className="px-4 py-3 text-slate-600">{course.title}</td>
                                <td className="px-4 py-3 text-slate-600">{course.creditUnit}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getGradeColor(course.grade)}`}>{course.grade}</span>
                                </td>
                                <td className="px-4 py-3 text-slate-600">{GRADE_POINTS[course.grade] * course.creditUnit}</td>
                                <td className="px-4 py-3">
                                  {course.isRepeated
                                    ? <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">Repeated</span>
                                    : <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-200">Normal</span>
                                  }
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="bg-violet-50 border-t-2 border-violet-200">
                          <tr>
                            <td colSpan={2} className="px-4 py-3 font-bold text-violet-700 text-sm">Semester Total</td>
                            <td className="px-4 py-3 font-bold text-violet-700 text-sm">{semUnits}</td>
                            <td />
                            <td className="px-4 py-3 font-bold text-violet-700 text-sm">{semPoints}</td>
                            <td className={`px-4 py-3 font-extrabold text-sm ${getGPAColor(semGPA)}`}>GPA: {semGPA.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-xs text-slate-400">
            Official academic transcript — Marvellous University · {new Date().toLocaleDateString('en-NG', { dateStyle: 'long' })}
          </p>
          <div className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full border text-sm font-semibold ${getGPABadgeColor(student.cgpa)}`}>
            🎓 Final Classification: {getGPALabel(student.cgpa)} — CGPA {student.cgpa.toFixed(2)} / 5.00
          </div>
        </div>
      </div>

      <style>{`@media print { .no-print { display: none !important; } }`}</style>
    </SidebarLayout>
  );
}
