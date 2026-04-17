import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Student, Semester } from "../types";
import { calculateGPA, calculateCGPA, getTotalUnits } from "../utils/gpa";
import { MOCK_USERS, MOCK_STUDENT } from "../data/mockData";

interface AuthContextType {
  user: User | null;
  student: Student | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: RegisterData) => boolean;
  updateStudent: (student: Student) => void;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  matricNo: string;
  department: string;
  faculty: string;
  level: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Faculty lookup
const FACULTY_MAP: Record<string, string> = {
  "Computer Science": "Faculty of Science & Technology",
  "Computer Engineering": "Faculty of Science & Technology",
  "Electrical Engineering": "Faculty of Science & Technology",
  "Mechanical Engineering": "Faculty of Science & Technology",
  Biochemistry: "Faculty of Science & Technology",
  Physics: "Faculty of Science & Technology",
  Medicine: "Faculty of Medicine & Health Sciences",
  Pharmacy: "Faculty of Medicine & Health Sciences",
  Nursing: "Faculty of Medicine & Health Sciences",
  "Public Health": "Faculty of Medicine & Health Sciences",
  Law: "Faculty of Law & Social Sciences",
  "Political Science": "Faculty of Law & Social Sciences",
  Sociology: "Faculty of Law & Social Sciences",
  Psychology: "Faculty of Law & Social Sciences",
  "Business Administration": "Faculty of Management & Business",
  Accounting: "Faculty of Management & Business",
  Economics: "Faculty of Management & Business",
  Marketing: "Faculty of Management & Business",
  English: "Faculty of Arts & Humanities",
  History: "Faculty of Arts & Humanities",
  "Fine Arts": "Faculty of Arts & Humanities",
  Linguistics: "Faculty of Arts & Humanities",
  Agronomy: "Faculty of Agriculture & Environment",
  Forestry: "Faculty of Agriculture & Environment",
  "Environmental Science": "Faculty of Agriculture & Environment",
  "Animal Science": "Faculty of Agriculture & Environment",
};

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function seedMockData() {
  const storedUsers = safeParse<User[]>(localStorage.getItem("mu_users"));
  const storedStudents = safeParse<Student[]>(localStorage.getItem("mu_students"));

  if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
    localStorage.setItem("mu_users", JSON.stringify(MOCK_USERS));
  }

  if (!Array.isArray(storedStudents) || storedStudents.length === 0) {
    localStorage.setItem("mu_students", JSON.stringify([MOCK_STUDENT]));
  }
}

// Generate random seeded GPA semesters for demo feel
function generateSeedSemesters(level: string): Semester[] {
  const rand = (min: number, max: number) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(1));
  const levels = ["100", "200", "300", "400", "500"];
  const maxLevel = parseInt(level);
  const completed = levels.filter((l) => parseInt(l) < maxLevel);

  return completed.map((lvl, idx) => {
    const gpa = rand(2.8, 4.9);
    return {
      id: `seed-sem-${lvl}-${idx}`,
      name: idx % 2 === 0 ? "First Semester" : "Second Semester",
      level: lvl,
      session: `${2019 + idx}/${2020 + idx}`,
      gpa,
      courses: [],
    };
  });
}

function enrichStudent(s: Student): Student {
  const semesters = s.semesters.map((sem) => ({
    ...sem,
    gpa: sem.courses.length > 0 ? calculateGPA(sem.courses) : sem.gpa,
  }));
  const allCourses = semesters.flatMap((sem) => sem.courses);
  const liveCGPA =
    allCourses.length > 0
      ? calculateCGPA(semesters.filter((s) => s.courses.length > 0))
      : parseFloat(
          (
            semesters.reduce((sum, s) => sum + s.gpa, 0) /
            Math.max(semesters.length, 1)
          ).toFixed(2),
        );

  return {
    ...s,
    semesters,
    cgpa: liveCGPA || 0,
    totalUnits: allCourses.length > 0 ? getTotalUnits(allCourses) : 0,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    seedMockData();
  }

  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("mu_session_user");
    if (savedUser) {
      const u: User = JSON.parse(savedUser);
      setUser(u);
      if (u.studentId) {
        const allStudents: Student[] = JSON.parse(
          localStorage.getItem("mu_students") || "[]",
        );
        const found = allStudents.find((s) => s.id === u.studentId);
        if (found) setStudent(enrichStudent(found));
      }
    }
  }, []);

  function register(data: RegisterData): boolean {
    const allUsers: User[] = JSON.parse(
      localStorage.getItem("mu_users") || "[]",
    );
    const allStudents: Student[] = JSON.parse(
      localStorage.getItem("mu_students") || "[]",
    );

    // Check duplicate email
    if (allUsers.find((u) => u.email === data.email)) return false;

    const studentId = `stu-${Date.now()}`;
    const userId = `usr-${Date.now()}`;

    const newStudent: Student = {
      id: studentId,
      name: data.fullName,
      matricNo: data.matricNo,
      department: data.department,
      faculty:
        data.faculty ||
        FACULTY_MAP[data.department] ||
        "Faculty of Science & Technology",
      level: data.level,
      email: data.email,
      phone: data.phone || "",
      cgpa: 0,
      totalUnits: 0,
      semesters: generateSeedSemesters(data.level),
      registeredAt: new Date().toISOString(),
    };

    const newUser: User = {
      id: userId,
      email: data.email,
      password: data.password,
      role: "student",
      studentId,
    };

    localStorage.setItem(
      "mu_students",
      JSON.stringify([...allStudents, newStudent]),
    );
    localStorage.setItem("mu_users", JSON.stringify([...allUsers, newUser]));
    return true;
  }

  function login(email: string, password: string): boolean {
    const allUsers: User[] = safeParse<User[]>(localStorage.getItem("mu_users")) || [];
    const found = allUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found || found.role !== "student" || !found.studentId) return false;

    setUser(found);
    localStorage.setItem("mu_session_user", JSON.stringify(found));

    const allStudents: Student[] = safeParse<Student[]>(
      localStorage.getItem("mu_students"),
    ) || [];
    const stu = allStudents.find((s) => s.id === found.studentId);
    if (stu) {
      const enriched = enrichStudent(stu);
      setStudent(enriched);
    }

    return true;
  }

  function logout() {
    setUser(null);
    setStudent(null);
    localStorage.removeItem("mu_session_user");
  }

  function updateStudent(updated: Student) {
    const enriched = enrichStudent(updated);
    setStudent(enriched);
    const allStudents: Student[] = JSON.parse(
      localStorage.getItem("mu_students") || "[]",
    );
    const newList = allStudents.map((s) =>
      s.id === enriched.id ? enriched : s,
    );
    localStorage.setItem("mu_students", JSON.stringify(newList));
  }

  return (
    <AuthContext.Provider
      value={{ user, student, login, logout, register, updateStudent }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
