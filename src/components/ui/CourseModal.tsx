import React, { useState, useEffect } from 'react';
import { Course, Grade } from '../../types';
import { generateId, GRADE_LABELS } from '../../utils/gpa';

interface CourseModalProps {
  course?: Course | null;
  semesterId: string;
  level: string;
  onSave: (course: Course) => void;
  onClose: () => void;
}

const GRADES: Grade[] = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function CourseModal({ course, semesterId, level, onSave, onClose }: CourseModalProps) {
  const [form, setForm] = useState({
    code: '',
    title: '',
    creditUnit: 3,
    grade: 'B' as Grade,
  });

  useEffect(() => {
    if (course) {
      setForm({
        code: course.code,
        title: course.title,
        creditUnit: course.creditUnit,
        grade: course.grade,
      });
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: course?.id || generateId(),
      ...form,
      semester: semesterId,
      level,
    };
    onSave(newCourse);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">Fill in the course details below</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course Code</label>
            <input
              type="text"
              required
              placeholder="e.g. CSC301"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Software Engineering"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Credit Units</label>
              <select
                value={form.creditUnit}
                onChange={(e) => setForm({ ...form, creditUnit: Number(e.target.value) })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 6].map((u) => (
                  <option key={u} value={u}>{u} Unit{u > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Grade</label>
              <select
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value as Grade })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-400">{GRADE_LABELS[form.grade]}</p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              {course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
