export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface Course {
  id: string;
  code: string;
  title: string;
  creditUnit: number;
  grade: Grade;
  semester: string;
  level: string;
  isRepeated?: boolean;
  originalGrade?: Grade;
}

export interface Semester {
  id: string;
  name: string;
  level: string;
  session: string;
  courses: Course[];
  gpa: number;
}

export interface Student {
  id: string;
  name: string;
  matricNo: string;
  department: string;
  faculty: string;
  level: string;
  email: string;
  phone?: string;
  cgpa: number;
  totalUnits: number;
  semesters: Semester[];
  registeredAt?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  studentId?: string;
}

export interface MockStudent {
  id: string;
  name: string;
  matricNo: string;
  department: string;
  cgpa: number;
  level: string;
  status: 'active' | 'inactive' | 'graduated';
}
