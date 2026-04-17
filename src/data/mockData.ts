import { Student, User, MockStudent } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    email: 'student@university.edu',
    password: 'student123',
    role: 'student',
    studentId: 's1',
  },
  {
    id: 'u2',
    email: 'admin@university.edu',
    password: 'admin123',
    role: 'admin',
  },
];

export const MOCK_STUDENT: Student = {
  id: 's1',
  name: 'Chukwuemeka Daniel',
  matricNo: 'CSC/2021/001',
  department: 'Computer Science',
  faculty: 'Science & Technology',
  level: '300',
  email: 'student@university.edu',
  phone: '+234 812 345 6789',
  cgpa: 0,
  totalUnits: 0,
  semesters: [
    {
      id: 'sem1',
      name: 'First Semester',
      level: '100',
      session: '2021/2022',
      gpa: 0,
      courses: [
        { id: 'c1', code: 'CSC101', title: 'Intro to Computer Science', creditUnit: 3, grade: 'A', semester: 'sem1', level: '100' },
        { id: 'c2', code: 'MTH101', title: 'Elementary Mathematics I', creditUnit: 3, grade: 'B', semester: 'sem1', level: '100' },
        { id: 'c3', code: 'PHY101', title: 'General Physics I', creditUnit: 3, grade: 'A', semester: 'sem1', level: '100' },
        { id: 'c4', code: 'CHM101', title: 'General Chemistry I', creditUnit: 3, grade: 'C', semester: 'sem1', level: '100' },
        { id: 'c5', code: 'GST101', title: 'Use of English I', creditUnit: 2, grade: 'B', semester: 'sem1', level: '100' },
        { id: 'c6', code: 'GST102', title: 'Nigerian Peoples & Culture', creditUnit: 2, grade: 'A', semester: 'sem1', level: '100' },
      ],
    },
    {
      id: 'sem2',
      name: 'Second Semester',
      level: '100',
      session: '2021/2022',
      gpa: 0,
      courses: [
        { id: 'c7', code: 'CSC102', title: 'Intro to Programming', creditUnit: 3, grade: 'A', semester: 'sem2', level: '100' },
        { id: 'c8', code: 'MTH102', title: 'Elementary Mathematics II', creditUnit: 3, grade: 'B', semester: 'sem2', level: '100' },
        { id: 'c9', code: 'PHY102', title: 'General Physics II', creditUnit: 3, grade: 'B', semester: 'sem2', level: '100' },
        { id: 'c10', code: 'CHM102', title: 'General Chemistry II', creditUnit: 3, grade: 'C', semester: 'sem2', level: '100' },
        { id: 'c11', code: 'CSC103', title: 'Logic & Problem Solving', creditUnit: 2, grade: 'A', semester: 'sem2', level: '100' },
      ],
    },
    {
      id: 'sem3',
      name: 'First Semester',
      level: '200',
      session: '2022/2023',
      gpa: 0,
      courses: [
        { id: 'c12', code: 'CSC201', title: 'Data Structures', creditUnit: 3, grade: 'A', semester: 'sem3', level: '200' },
        { id: 'c13', code: 'CSC202', title: 'Object Oriented Programming', creditUnit: 3, grade: 'B', semester: 'sem3', level: '200' },
        { id: 'c14', code: 'MTH201', title: 'Mathematical Methods', creditUnit: 3, grade: 'B', semester: 'sem3', level: '200' },
        { id: 'c15', code: 'CSC203', title: 'Computer Organization', creditUnit: 3, grade: 'C', semester: 'sem3', level: '200' },
        { id: 'c16', code: 'STA201', title: 'Statistics for Computing', creditUnit: 2, grade: 'A', semester: 'sem3', level: '200' },
      ],
    },
    {
      id: 'sem4',
      name: 'Second Semester',
      level: '200',
      session: '2022/2023',
      gpa: 0,
      courses: [
        { id: 'c17', code: 'CSC204', title: 'Algorithms & Complexity', creditUnit: 3, grade: 'A', semester: 'sem4', level: '200' },
        { id: 'c18', code: 'CSC205', title: 'Database Systems', creditUnit: 3, grade: 'B', semester: 'sem4', level: '200' },
        { id: 'c19', code: 'CSC206', title: 'Web Technologies', creditUnit: 3, grade: 'A', semester: 'sem4', level: '200' },
        { id: 'c20', code: 'MTH202', title: 'Linear Algebra', creditUnit: 3, grade: 'C', semester: 'sem4', level: '200' },
        { id: 'c21', code: 'CSC207', title: 'Operating Systems', creditUnit: 3, grade: 'B', semester: 'sem4', level: '200' },
      ],
    },
  ],
};

export const MOCK_ALL_STUDENTS: MockStudent[] = [
  { id: 's1', name: 'Chukwuemeka Daniel', matricNo: 'CSC/2021/001', department: 'Computer Science', cgpa: 4.21, level: '300', status: 'active' },
  { id: 's2', name: 'Adaeze Okonkwo', matricNo: 'CSC/2021/002', department: 'Computer Science', cgpa: 3.87, level: '300', status: 'active' },
  { id: 's3', name: 'Babatunde Afolabi', matricNo: 'EEE/2021/005', department: 'Electrical Engineering', cgpa: 4.65, level: '300', status: 'active' },
  { id: 's4', name: 'Ngozi Eze', matricNo: 'MCB/2020/010', department: 'Microbiology', cgpa: 3.12, level: '400', status: 'active' },
  { id: 's5', name: 'Emeka Okafor', matricNo: 'LAW/2019/003', department: 'Law', cgpa: 3.95, level: '500', status: 'active' },
  { id: 's6', name: 'Fatima Suleiman', matricNo: 'MED/2018/007', department: 'Medicine', cgpa: 4.44, level: '600', status: 'active' },
  { id: 's7', name: 'Chidi Nwosu', matricNo: 'ACC/2022/015', department: 'Accounting', cgpa: 2.85, level: '200', status: 'inactive' },
  { id: 's8', name: 'Aisha Mohammed', matricNo: 'CSC/2018/042', department: 'Computer Science', cgpa: 4.80, level: '500', status: 'graduated' },
];
