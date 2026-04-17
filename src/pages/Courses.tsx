import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SidebarLayout from '../components/layout/SidebarLayout';
import CourseModal from '../components/ui/CourseModal';
import { Course, Semester } from '../types';
import { generateId, getGradeColor, getGPAColor, calculateGPA, GRADE_POINTS } from '../utils/gpa';

export default function Courses() {
  const { student, updateStudent } = useAuth();
  const [activeSemId, setActiveSemId] = useState(student?.semesters[0]?.id || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [showAddSem, setShowAddSem] = useState(false);
  const [newSem, setNewSem] = useState({ name: 'First Semester', level: '100', session: '2024/2025' });

  if (!student) return null;
  const activeSem = student.semesters.find(s => s.id === activeSemId);

  const handleSaveCourse = (course: Course) => {
    const updatedSemesters = student.semesters.map(sem => {
      if (sem.id !== activeSemId) return sem;
      const existing = sem.courses.find(c => c.id === course.id);
      const courses = existing ? sem.courses.map(c => c.id === course.id ? course : c) : [...sem.courses, course];
      return { ...sem, courses, gpa: calculateGPA(courses) };
    });
    updateStudent({ ...student, semesters: updatedSemesters });
    setModalOpen(false);
    setEditCourse(null);
  };

  const handleDelete = (courseId: string) => {
    if (!window.confirm('Delete this course?')) return;
    const updatedSemesters = student.semesters.map(sem => {
      if (sem.id !== activeSemId) return sem;
      const courses = sem.courses.filter(c => c.id !== courseId);
      return { ...sem, courses, gpa: calculateGPA(courses) };
    });
    updateStudent({ ...student, semesters: updatedSemesters });
  };

  const handleAddSemester = () => {
    const sem: Semester = { id: generateId(), name: newSem.name, level: newSem.level, session: newSem.session, courses: [], gpa: 0 };
    const updated = { ...student, semesters: [...student.semesters, sem] };
    updateStudent(updated);
    setActiveSemId(sem.id);
    setShowAddSem(false);
  };

  const handleDeleteSemester = (semId: string) => {
    if (!window.confirm('Delete this entire semester?')) return;
    const semesters = student.semesters.filter(s => s.id !== semId);
    updateStudent({ ...student, semesters });
    setActiveSemId(semesters[0]?.id || '');
  };

  const totalUnits = activeSem?.courses.reduce((s, c) => s + c.creditUnit, 0) || 0;
  const totalPoints = activeSem?.courses.reduce((s, c) => s + GRADE_POINTS[c.grade] * c.creditUnit, 0) || 0;

  return (
    <SidebarLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Course Management</h1>
          <p className="text-slate-400 text-sm mt-1">Register and manage your courses by semester</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAddSem(true)}
            className="px-4 py-2 text-sm border border-violet-200 text-violet-600 rounded-xl hover:bg-violet-50 font-semibold transition-colors">
            + New Semester
          </button>
          <button onClick={() => { setEditCourse(null); setModalOpen(true); }} disabled={!activeSem}
            className="px-4 py-2 text-sm bg-violet-600 text-white rounded-xl hover:bg-violet-700 font-semibold transition-colors disabled:opacity-50">
            + Add Course
          </button>
        </div>
      </div>

      {/* Add semester form */}
      {showAddSem && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 text-sm">Add New Semester</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Semester', key: 'name', type: 'select', options: ['First Semester', 'Second Semester'] },
              { label: 'Level', key: 'level', type: 'select', options: ['100', '200', '300', '400', '500'] },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1 block">{label}</label>
                <select value={(newSem as any)[key]} onChange={e => setNewSem({ ...newSem, [key]: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                  {options?.map(o => <option key={o} value={o}>{key === 'level' ? `${o}L` : o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1 block">Session</label>
              <input type="text" value={newSem.session} onChange={e => setNewSem({ ...newSem, session: e.target.value })} placeholder="2024/2025"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setShowAddSem(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleAddSemester} className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg hover:bg-violet-700 font-semibold">Create Semester</button>
          </div>
        </div>
      )}

      {/* Semester tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {student.semesters.map(sem => (
          <button key={sem.id} onClick={() => setActiveSemId(sem.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSemId === sem.id ? 'bg-violet-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300'
            }`}>
            {sem.level}L {sem.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {activeSem ? (
        <div className="grid lg:grid-cols-4 gap-5">
          {/* Summary cards */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Courses', value: activeSem.courses.length, color: 'text-violet-600', bg: 'bg-violet-50' },
              { label: 'Credit Units', value: totalUnits, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Grade Points', value: totalPoints, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
              { label: 'Semester GPA', value: activeSem.gpa.toFixed(2), color: getGPAColor(activeSem.gpa), bg: 'bg-slate-50' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-2xl border border-slate-200 p-4 shadow-sm`}>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{s.label}</p>
                <p className={`text-2xl font-extrabold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-800 text-sm">{activeSem.level}L — {activeSem.name} ({activeSem.session})</h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeSem.courses.length} courses registered</p>
              </div>
              <button onClick={() => handleDeleteSemester(activeSem.id)}
                className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors self-start sm:self-auto">
                Delete Semester
              </button>
            </div>

            {activeSem.courses.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3">📚</p>
                <p className="text-slate-500 font-medium text-sm">No courses yet</p>
                <p className="text-xs text-slate-400 mt-1">Click "+ Add Course" to register your first course</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      {['Course Code', 'Course Title', 'Units', 'Grade', 'Points', 'Actions'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs text-slate-400 font-semibold uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeSem.courses.map(course => (
                      <tr key={course.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5 font-semibold text-slate-700 text-sm">{course.code}</td>
                        <td className="px-5 py-3.5 text-slate-600 text-sm max-w-[200px] truncate">{course.title}</td>
                        <td className="px-5 py-3.5 text-slate-500 text-sm">{course.creditUnit}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getGradeColor(course.grade)}`}>{course.grade}</span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 text-sm">{GRADE_POINTS[course.grade] * course.creditUnit}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <button onClick={() => { setEditCourse(course); setModalOpen(true); }} className="text-xs text-violet-600 hover:underline font-semibold">Edit</button>
                            <button onClick={() => handleDelete(course.id)} className="text-xs text-red-500 hover:underline font-semibold">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-violet-50 border-t-2 border-violet-200">
                    <tr>
                      <td colSpan={2} className="px-5 py-3 font-bold text-violet-700 text-sm">Semester Total</td>
                      <td className="px-5 py-3 font-bold text-violet-700 text-sm">{totalUnits}</td>
                      <td className="px-5 py-3" />
                      <td className="px-5 py-3 font-bold text-violet-700 text-sm">{totalPoints}</td>
                      <td className={`px-5 py-3 font-extrabold text-sm ${getGPAColor(activeSem.gpa)}`}>GPA: {activeSem.gpa.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-200">
          <p className="text-4xl mb-3">📂</p>
          <p className="font-medium">No semesters yet. Create one to get started.</p>
        </div>
      )}

      {modalOpen && activeSem && (
        <CourseModal
          course={editCourse}
          semesterId={activeSemId}
          level={activeSem.level}
          onSave={handleSaveCourse}
          onClose={() => { setModalOpen(false); setEditCourse(null); }}
        />
      )}
    </SidebarLayout>
  );
}
