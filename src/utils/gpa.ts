import { Grade, Course, Semester } from '../types';

export const GRADE_POINTS: Record<Grade, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export const GRADE_LABELS: Record<Grade, string> = {
  A: 'Excellent (70-100)',
  B: 'Good (60-69)',
  C: 'Average (50-59)',
  D: 'Below Average (45-49)',
  E: 'Pass (40-44)',
  F: 'Fail (0-39)',
};

export function getGradeColor(grade: Grade): string {
  const colors: Record<Grade, string> = {
    A: 'text-emerald-600 bg-emerald-50',
    B: 'text-blue-600 bg-blue-50',
    C: 'text-amber-600 bg-amber-50',
    D: 'text-orange-600 bg-orange-50',
    E: 'text-red-500 bg-red-50',
    F: 'text-red-700 bg-red-100',
  };
  return colors[grade];
}

export function getGPAColor(gpa: number): string {
  if (gpa >= 4.5) return 'text-emerald-600';
  if (gpa >= 3.5) return 'text-blue-600';
  if (gpa >= 2.5) return 'text-amber-600';
  if (gpa >= 1.5) return 'text-orange-600';
  return 'text-red-600';
}

export function getGPALabel(gpa: number): string {
  if (gpa >= 4.5) return 'First Class';
  if (gpa >= 3.5) return 'Second Class Upper';
  if (gpa >= 2.5) return 'Second Class Lower';
  if (gpa >= 1.5) return 'Third Class';
  if (gpa >= 1.0) return 'Pass';
  return 'Fail';
}

export function getGPABadgeColor(gpa: number): string {
  if (gpa >= 4.5) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (gpa >= 3.5) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (gpa >= 2.5) return 'bg-amber-100 text-amber-800 border-amber-200';
  if (gpa >= 1.5) return 'bg-orange-100 text-orange-800 border-orange-200';
  return 'bg-red-100 text-red-800 border-red-200';
}

export function resolveRepeatedCourses(courses: Course[]): Course[] {
  const courseMap = new Map<string, Course>();
  for (const course of courses) {
    const existing = courseMap.get(course.code);
    if (!existing) {
      courseMap.set(course.code, { ...course });
    } else {
      const existingPoints = GRADE_POINTS[existing.grade];
      const newPoints = GRADE_POINTS[course.grade];
      if (newPoints > existingPoints) {
        courseMap.set(course.code, {
          ...course,
          isRepeated: true,
          originalGrade: existing.grade,
        });
      } else {
        courseMap.set(course.code, {
          ...existing,
          isRepeated: true,
          originalGrade: course.grade,
        });
      }
    }
  }
  return Array.from(courseMap.values());
}

export function calculateGPA(courses: Course[]): number {
  const resolved = resolveRepeatedCourses(courses);
  const totalPoints = resolved.reduce(
    (sum, c) => sum + GRADE_POINTS[c.grade] * c.creditUnit,
    0
  );
  const totalUnits = resolved.reduce((sum, c) => sum + c.creditUnit, 0);
  if (totalUnits === 0) return 0;
  return parseFloat((totalPoints / totalUnits).toFixed(2));
}

export function calculateCGPA(semesters: Semester[]): number {
  const allCourses = semesters.flatMap((s) => s.courses);
  return calculateGPA(allCourses);
}

export function getTotalUnits(courses: Course[]): number {
  return resolveRepeatedCourses(courses).reduce((sum, c) => sum + c.creditUnit, 0);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
