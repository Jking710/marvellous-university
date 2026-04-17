import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toplogo2 from '../assets/logo.jpeg';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL — dark form side ── */}
      <div className="w-full lg:w-1/2 bg-[#111118] flex flex-col justify-between px-8 sm:px-14 py-10 relative overflow-hidden">

        {/* subtle background circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-800/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <img src={toplogo2} alt="University Logo" className="h-10 w-auto rounded-lg" />
          <span className="font-bold text-white text-base leading-tight">
            <span className="text-violet-400">Marvellous</span> University
          </span>
        </Link>

        {/* Form area */}
        <div className="relative z-10 w-full max-w-sm mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1">Login</h1>
          <p className="text-slate-400 text-sm mb-8">Enter your account details</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Username / Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@university.edu"
                className="w-full bg-transparent border-b border-slate-600 focus:border-violet-500 outline-none py-2.5 text-sm text-white placeholder-slate-600 transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-slate-600 focus:border-violet-500 outline-none py-2.5 text-sm text-white placeholder-slate-600 transition-colors duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="mt-2 text-right">
                <span className="text-xs text-slate-500 hover:text-violet-400 cursor-pointer transition-colors">
                  Forgot Password?
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-violet-900/40 disabled:opacity-50 text-sm mt-2"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center lg:text-left">
          <p className="text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — violet illustration side ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 relative overflow-hidden flex-col items-center justify-center px-12 text-white">

        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-fuchsia-400/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />

        {/* Inner rounded card effect (like the image) */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-10 w-full max-w-md border border-white/20 shadow-2xl text-center">

          {/* Headline */}
          <h2 className="text-4xl font-extrabold leading-tight mb-2">
            Welcome To<br />
            <span className="text-white/90">Student Portal</span>
          </h2>
          <p className="text-violet-100 text-sm mb-10">Login to access your account</p>

          {/* SVG Illustration — students with document */}
          <div className="flex justify-center">
            <svg viewBox="0 0 320 260" className="w-72 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Document / result slip */}
              <rect x="90" y="60" width="140" height="170" rx="12" fill="white" fillOpacity="0.95"/>
              <rect x="105" y="85" width="80" height="6" rx="3" fill="#7c3aed" fillOpacity="0.4"/>
              <rect x="105" y="100" width="110" height="4" rx="2" fill="#e2e8f0"/>
              <rect x="105" y="112" width="90" height="4" rx="2" fill="#e2e8f0"/>
              <rect x="105" y="124" width="100" height="4" rx="2" fill="#e2e8f0"/>
              <rect x="105" y="136" width="70" height="4" rx="2" fill="#e2e8f0"/>
              <rect x="105" y="155" width="110" height="4" rx="2" fill="#e2e8f0"/>
              <rect x="105" y="167" width="85" height="4" rx="2" fill="#e2e8f0"/>
              <rect x="105" y="179" width="95" height="4" rx="2" fill="#e2e8f0"/>
              {/* GPA badge on doc */}
              <rect x="185" y="195" width="38" height="20" rx="6" fill="#7c3aed"/>
              <text x="204" y="209" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">4.8</text>

              {/* Student 1 — sitting on top of doc (right) */}
              {/* body */}
              <ellipse cx="218" cy="72" rx="14" ry="18" fill="white" fillOpacity="0.9"/>
              {/* head */}
              <circle cx="218" cy="50" r="12" fill="#fde68a"/>
              {/* hair */}
              <path d="M207 46 Q218 38 229 46" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* legs dangling */}
              <line x1="210" y1="86" x2="205" y2="105" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="226" y1="86" x2="231" y2="105" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              {/* shoes */}
              <ellipse cx="204" cy="107" rx="5" ry="3" fill="#1e1b4b"/>
              <ellipse cx="232" cy="107" rx="5" ry="3" fill="#1e1b4b"/>
              {/* laptop on lap */}
              <rect x="206" y="74" width="24" height="15" rx="2" fill="#7c3aed" fillOpacity="0.8"/>
              <rect x="204" y="88" width="28" height="3" rx="1" fill="#5b21b6"/>

              {/* Student 2 — standing left, looking at phone */}
              {/* body */}
              <rect x="68" y="148" width="28" height="50" rx="10" fill="white" fillOpacity="0.85"/>
              {/* head */}
              <circle cx="82" cy="135" r="13" fill="#fde68a"/>
              {/* hair */}
              <path d="M70 131 Q82 122 94 131" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* arm holding phone */}
              <line x1="68" y1="165" x2="52" y2="178" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <rect x="43" y="174" width="12" height="20" rx="3" fill="#7c3aed"/>
              {/* other arm */}
              <line x1="96" y1="165" x2="108" y2="172" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              {/* legs */}
              <line x1="74" y1="196" x2="70" y2="228" stroke="white" strokeWidth="5" strokeLinecap="round"/>
              <line x1="90" y1="196" x2="94" y2="228" stroke="white" strokeWidth="5" strokeLinecap="round"/>
              {/* shoes */}
              <ellipse cx="69" cy="230" rx="7" ry="4" fill="#1e1b4b"/>
              <ellipse cx="95" cy="230" rx="7" ry="4" fill="#1e1b4b"/>

              {/* Decorative leaves */}
              <ellipse cx="270" cy="200" rx="18" ry="30" fill="#a78bfa" fillOpacity="0.5" transform="rotate(-20 270 200)"/>
              <ellipse cx="285" cy="215" rx="12" ry="22" fill="#7c3aed" fillOpacity="0.4" transform="rotate(10 285 215)"/>
              <ellipse cx="50" cy="215" rx="14" ry="26" fill="#a78bfa" fillOpacity="0.45" transform="rotate(15 50 215)"/>
              <ellipse cx="36" cy="228" rx="10" ry="18" fill="#7c3aed" fillOpacity="0.35" transform="rotate(-10 36 228)"/>

              {/* Circular gear/seal on doc */}
              <circle cx="160" cy="175" r="14" stroke="#7c3aed" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
              <circle cx="160" cy="175" r="8" fill="#7c3aed" fillOpacity="0.15"/>
            </svg>
          </div>
        </div>

        {/* Bottom label */}
        <p className="relative z-10 mt-6 text-violet-200 text-xs tracking-widest uppercase font-semibold">
          Marvellous University · Est. 1723
        </p>
      </div>

    </div>
  );
}
