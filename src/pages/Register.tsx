import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toplogo2 from '../assets/logo.jpeg';

interface RegisterForm {
  fullName: string;
  email: string;
  matricNo: string;
  department: string;
  faculty: string;
  level: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const DEPARTMENTS = [
  'Computer Science', 'Computer Engineering', 'Electrical Engineering', 'Mechanical Engineering',
  'Biochemistry', 'Physics', 'Medicine', 'Pharmacy', 'Nursing', 'Public Health',
  'Law', 'Political Science', 'Sociology', 'Psychology',
  'Business Administration', 'Accounting', 'Economics', 'Marketing',
  'English', 'History', 'Fine Arts', 'Linguistics',
  'Agronomy', 'Forestry', 'Environmental Science', 'Animal Science',
];

const FACULTY_MAP: Record<string, string> = {
  'Computer Science': 'Faculty of Science & Technology',
  'Computer Engineering': 'Faculty of Science & Technology',
  'Electrical Engineering': 'Faculty of Science & Technology',
  'Mechanical Engineering': 'Faculty of Science & Technology',
  'Biochemistry': 'Faculty of Science & Technology',
  'Physics': 'Faculty of Science & Technology',
  'Medicine': 'Faculty of Medicine & Health Sciences',
  'Pharmacy': 'Faculty of Medicine & Health Sciences',
  'Nursing': 'Faculty of Medicine & Health Sciences',
  'Public Health': 'Faculty of Medicine & Health Sciences',
  'Law': 'Faculty of Law & Social Sciences',
  'Political Science': 'Faculty of Law & Social Sciences',
  'Sociology': 'Faculty of Law & Social Sciences',
  'Psychology': 'Faculty of Law & Social Sciences',
  'Business Administration': 'Faculty of Management & Business',
  'Accounting': 'Faculty of Management & Business',
  'Economics': 'Faculty of Management & Business',
  'Marketing': 'Faculty of Management & Business',
  'English': 'Faculty of Arts & Humanities',
  'History': 'Faculty of Arts & Humanities',
  'Fine Arts': 'Faculty of Arts & Humanities',
  'Linguistics': 'Faculty of Arts & Humanities',
  'Agronomy': 'Faculty of Agriculture & Environment',
  'Forestry': 'Faculty of Agriculture & Environment',
  'Environmental Science': 'Faculty of Agriculture & Environment',
  'Animal Science': 'Faculty of Agriculture & Environment',
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<RegisterForm>({
    fullName: '', email: '', matricNo: '', department: '',
    faculty: '', level: '', phone: '', password: '', confirmPassword: '',
  });

  const update = (field: keyof RegisterForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = e.target.value;
      if (field === 'department') {
        setForm({ ...form, department: val, faculty: FACULTY_MAP[val] || '' });
      } else {
        setForm({ ...form, [field]: val });
      }
      setError('');
    };

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.matricNo || !form.department || !form.level) {
      setError('Please fill in all required fields.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const success = register({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      matricNo: form.matricNo,
      department: form.department,
      faculty: form.faculty,
      level: form.level,
      phone: form.phone,
    });
    setLoading(false);
    if (success) {
      navigate('/login');
    } else {
      setError('An account with this email already exists.');
      setStep(1);
    }
  };

  const eyeOpen = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
  const eyeOff = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  return (
    <div className="min-h-screen flex">
      {/* LEFT — dark form */}
      <div className="w-full lg:w-1/2 bg-[#111118] flex flex-col justify-between px-8 sm:px-14 py-10 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-800/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <img src={toplogo2} alt="Logo" className="h-10 w-auto rounded-lg" />
          <span className="font-bold text-white text-base">
            <span className="text-violet-400">Marvellous</span> University
          </span>
        </Link>

        <div className="relative z-10 w-full max-w-sm mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
            {step === 1 ? 'Create Account' : 'Set Password'}
          </h1>
          <p className="text-slate-400 text-sm mb-3">
            {step === 1 ? 'Enter your student details to get started' : 'Choose a secure password'}
          </p>

          {/* Step bar */}
          <div className="flex items-center gap-2 mb-7">
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-violet-500' : 'bg-slate-700'}`} />
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-violet-500' : 'bg-slate-700'}`} />
            <span className="text-xs text-slate-500 ml-1">Step {step}/2</span>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">{error}</div>
          )}

          {step === 1 && (
            <form onSubmit={handleStepOne} className="space-y-4">
              {[
                { label: 'Full Name *', field: 'fullName' as const, type: 'text', placeholder: 'e.g. Chukwuemeka Daniel' },
                { label: 'Email Address *', field: 'email' as const, type: 'email', placeholder: 'your@email.com' },
                { label: 'Matric Number *', field: 'matricNo' as const, type: 'text', placeholder: 'e.g. CSC/2024/001' },
                { label: 'Phone Number', field: 'phone' as const, type: 'tel', placeholder: '+234 000 000 0000' },
              ].map(({ label, field, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">{label}</label>
                  <input type={type} value={form[field]} onChange={update(field)} placeholder={placeholder} required={label.includes('*')}
                    className="w-full bg-transparent border-b border-slate-600 focus:border-violet-500 outline-none py-2 text-sm text-white placeholder-slate-600 transition-colors" />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Department *</label>
                <select required value={form.department} onChange={update('department')}
                  className="w-full bg-[#111118] border-b border-slate-600 focus:border-violet-500 outline-none py-2 text-sm text-white transition-colors">
                  <option value="">Select department...</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#1a1a2e]">{d}</option>)}
                </select>
              </div>

              {form.faculty && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Faculty</label>
                  <p className="text-sm text-violet-400 py-2 border-b border-slate-700">{form.faculty}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Level *</label>
                <select required value={form.level} onChange={update('level')}
                  className="w-full bg-[#111118] border-b border-slate-600 focus:border-violet-500 outline-none py-2 text-sm text-white transition-colors">
                  <option value="">Select level...</option>
                  {['100', '200', '300', '400', '500'].map(l => <option key={l} value={l} className="bg-[#1a1a2e]">{l} Level</option>)}
                </select>
              </div>

              <button type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-violet-900/40 text-sm mt-2">
                Continue →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {['password', 'confirmPassword'].map((f) => (
                <div key={f}>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                    {f === 'password' ? 'Password' : 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} required
                      value={form[f as keyof RegisterForm]}
                      onChange={update(f as keyof RegisterForm)}
                      placeholder={f === 'password' ? 'Min. 6 characters' : 'Re-enter password'}
                      className="w-full bg-transparent border-b border-slate-600 focus:border-violet-500 outline-none py-2.5 text-sm text-white placeholder-slate-600 transition-colors pr-8" />
                    {f === 'password' && (
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400">
                        {showPassword ? eyeOff : eyeOpen}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {form.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${form.password.length >= i*3 ? i<=1?'bg-red-500':i<=2?'bg-amber-500':i<=3?'bg-blue-500':'bg-emerald-500' : 'bg-slate-700'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">{form.password.length<4?'Too weak':form.password.length<7?'Fair':form.password.length<10?'Good':'Strong'}</p>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Account Summary</p>
                {[
                  ['Name', form.fullName], ['Email', form.email],
                  ['Matric', form.matricNo], ['Department', form.department],
                  ['Level', form.level ? `${form.level}L` : ''],
                ].map(([k, v]) => (
                  <p key={k} className="text-xs text-slate-300"><span className="text-slate-500">{k}:</span> {v}</p>
                ))}
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 border border-slate-600 text-slate-400 font-semibold py-3.5 rounded-xl hover:border-violet-500 hover:text-violet-400 transition-all text-sm">
                  ← Back
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-violet-900/40 disabled:opacity-50 text-sm">
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="relative z-10">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Login</Link>
          </p>
        </div>
      </div>

      {/* RIGHT — violet panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 relative overflow-hidden flex-col items-center justify-center px-12 text-white">
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-fuchsia-400/20 rounded-full blur-2xl" />
        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-10 w-full max-w-md border border-white/20 shadow-2xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight mb-2">Welcome To<br /><span className="text-white/90">Marvellous University</span></h2>
          <p className="text-violet-100 text-sm mb-10">Register to begin your journey at Marvellous University</p>
          <svg viewBox="0 0 320 220" className="w-64 h-auto mx-auto" fill="none">
            <rect x="90" y="40" width="140" height="150" rx="12" fill="white" fillOpacity="0.92"/>
            <rect x="105" y="60" width="80" height="6" rx="3" fill="#7c3aed" fillOpacity="0.5"/>
            <rect x="105" y="76" width="110" height="3" rx="2" fill="#e2e8f0"/>
            <rect x="105" y="88" width="90" height="3" rx="2" fill="#e2e8f0"/>
            <rect x="105" y="100" width="100" height="3" rx="2" fill="#e2e8f0"/>
            <rect x="105" y="120" width="110" height="3" rx="2" fill="#e2e8f0"/>
            <rect x="105" y="132" width="85" height="3" rx="2" fill="#e2e8f0"/>
            <rect x="105" y="144" width="95" height="3" rx="2" fill="#e2e8f0"/>
            <rect x="180" y="160" width="38" height="18" rx="6" fill="#7c3aed"/>
            <text x="199" y="173" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">4.8</text>
            <circle cx="82" cy="115" r="13" fill="#fde68a"/>
            <rect x="64" y="126" width="36" height="44" rx="10" fill="white" fillOpacity="0.85"/>
            <line x1="64" y1="143" x2="48" y2="155" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <line x1="100" y1="143" x2="116" y2="150" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <line x1="72" y1="168" x2="68" y2="195" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <line x1="88" y1="168" x2="92" y2="195" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <ellipse cx="67" cy="197" rx="7" ry="4" fill="#1e1b4b"/>
            <ellipse cx="93" cy="197" rx="7" ry="4" fill="#1e1b4b"/>
            <text x="58" y="60" fill="white" fillOpacity="0.6" fontSize="14">★</text>
            <text x="248" y="55" fill="white" fillOpacity="0.5" fontSize="10">★</text>
            <text x="255" y="140" fill="white" fillOpacity="0.6" fontSize="14">★</text>
          </svg>
        </div>
        <p className="relative z-10 mt-6 text-violet-200 text-xs tracking-widest uppercase font-semibold">Marvellous University · Est. 1723</p>
      </div>
    </div>
  );
}
