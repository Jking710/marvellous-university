import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Images
import toplogo from "../assets/logo.jpeg";
import un1 from "../assets/UN1.png";
import un2 from "../assets/UN2.png";
import un3 from "../assets/UN3.png";
import un4 from "../assets/UN4.png";
import un5 from "../assets/UN7.jpeg";
import un7 from "../assets/UN5.jpeg";
import un8 from "../assets/UN16.png";
import un9 from "../assets/UN15.png";
import un10 from "../assets/UN13.png";
import logo from "../assets/Icon1.png";
import logo2 from "../assets/Icon2.png";
import logo3 from "../assets/Icon3.png";
import logo4 from "../assets/Icon4.png";

// ─── Data (unchanged) ────────────────────────────────────────────────────────
const stats = [
  { logo: <img src={logo} alt="Scholars Enrolled" className="w-10 h-10 mx-auto mb-2" />, value: "100,000+", label: "Scholars Enrolled" },
  { logo: <img src={logo2} alt="Departments & Programs" className="w-10 h-10 mx-auto mb-2" />, value: "100+", label: "Departments & Programs" },
  { logo: <img src={logo3} alt="Graduate Success Rate" className="w-10 h-10 mx-auto mb-2" />, value: "95%", label: "Graduate Success Rate" },
  { logo: <img src={logo4} alt="Reputation" className="w-10 h-10 mx-auto mb-2" />, value: "4.8★", label: "University Reputation Globally" },
];

const faculties = [
  {
    icon: "⚗️",
    name: "Faculty of Science & Technology",
    description: "Pioneering research in Computer Science, Biotechnology, Physics, Chemistry, and Engineering disciplines shaping tomorrow's innovations.",
    departments: ["Computer Science", "Biochemistry", "Physics", "Engineering"],
    color: "from-violet-600 to-indigo-600",
    accent: "border-violet-400",
  },
  {
    icon: "⚖️",
    name: "Faculty of Law & Social Sciences",
    description: "A world-class legal and social sciences faculty developing astute minds for justice, policy, and global governance.",
    departments: ["Law", "Political Science", "Sociology", "Psychology"],
    color: "from-fuchsia-600 to-violet-600",
    accent: "border-fuchsia-400",
  },
  {
    icon: "📊",
    name: "Faculty of Management & Business",
    description: "Grooming future business leaders through cutting-edge MBA programs, entrepreneurship, accounting, and economics studies.",
    departments: ["Business Admin", "Accounting", "Economics", "Marketing"],
    color: "from-indigo-600 to-blue-600",
    accent: "border-indigo-400",
  },
  {
    icon: "🏥",
    name: "Faculty of Medicine & Health Sciences",
    description: "Training compassionate, skilled healthcare professionals with state-of-the-art facilities and clinical partnerships.",
    departments: ["Medicine", "Pharmacy", "Nursing", "Public Health"],
    color: "from-purple-600 to-fuchsia-600",
    accent: "border-purple-400",
  },
  {
    icon: "🎨",
    name: "Faculty of Arts & Humanities",
    description: "Celebrating culture, creativity, and critical thought through literature, fine arts, history, and linguistic studies.",
    departments: ["English", "History", "Fine Arts", "Linguistics"],
    color: "from-blue-600 to-indigo-600",
    accent: "border-blue-400",
  },
  {
    icon: "🌿",
    name: "Faculty of Agriculture & Environment",
    description: "Advancing sustainable farming, environmental conservation, and food security through applied science and research.",
    departments: ["Agronomy", "Forestry", "Environmental Sci.", "Animal Science"],
    color: "from-violet-700 to-purple-600",
    accent: "border-violet-300",
  },
];

const admissionSteps = [
  { step: "01", title: "Create an Account", desc: "Visit our admissions portal and register with your personal details to begin your application journey." },
  { step: "02", title: "Choose Your Programme", desc: "Browse over 100 undergraduate, postgraduate, and diploma programmes across 6 faculties." },
  { step: "03", title: "Submit Documents", desc: "Upload your academic transcripts, identification, and any required supporting documents securely." },
  { step: "04", title: "Pay Application Fee", desc: "Complete your application with a one-time non-refundable fee via our secure payment gateway." },
  { step: "05", title: "Sit Entrance Exam / Interview", desc: "Shortlisted candidates will be invited for our entrance assessment or faculty interview." },
  { step: "06", title: "Receive Admission Letter", desc: "Successful applicants receive their official offer letter and proceed with enrolment." },
];

const requirements = [
  {
    label: "Undergraduate",
    items: ["5 O'Level Credits (WAEC/NECO)", "UTME Score (min. 200)", "Passport Photograph", "Birth Certificate"],
  },
  {
    label: "Postgraduate",
    items: ["First Degree (min. Second Class Lower)", "Two References", "Statement of Purpose", "NYSC Certificate"],
  },
];

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Faculties", id: "faculties" },
  { label: "Admissions", id: "admissions" },
  { label: "Contact", id: "contact" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSectionScroll = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={toplogo} alt="University Logo" className="h-10 w-auto" />
            <span className="font-bold text-slate-700 text-base sm:text-lg leading-tight">
              <span className="text-violet-600">Marvellous</span>{" "}
              <span className="hidden sm:inline">University</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={handleSectionScroll(link.id)}
                className="relative group hover:text-violet-600 transition-colors duration-200"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors">
              Login
            </Link>
            <Link to="/login" className="text-sm bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors font-semibold shadow-sm">
              Apply Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 shadow-lg space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={handleSectionScroll(link.id)}
                className="block px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/login" className="block text-center text-sm font-semibold text-slate-600 border border-slate-200 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                Login
              </Link>
              <Link to="/login" className="block text-center text-sm font-bold bg-violet-600 text-white py-2.5 rounded-lg hover:bg-violet-700 transition-colors">
                Register / Apply Now
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative pt-16 overflow-hidden min-h-screen flex flex-col justify-center" id="home">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${un9})` }}
        >
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 py-16 sm:py-20">
          {/* Badge */}
          <span className="inline-block text-xs font-semibold text-black bg-violet-300 border border-violet-200 px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase shadow">
            Welcome To Marvellous University
          </span>

          {/* Swiper */}
          <div className="w-full max-w-5xl mx-auto">
            <Swiper
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper rounded-2xl shadow-2xl overflow-hidden"
            >
              {[un1, un2, un3, un4, un5, un7, un8].map((img, i) => (
                <SwiperSlide key={i}>
                  <div
                    style={{ backgroundImage: `url(${img})` }}
                    className="h-[180px] sm:h-[340px] md:h-[440px] lg:h-[500px] w-full bg-cover bg-center"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Motto */}
          <p className="text-xs sm:text-sm font-semibold text-white/80 italic tracking-widest mt-6 text-center">
            Our Motto — "Empowering Tomorrow's Leaders"
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8 w-full max-w-xs sm:max-w-none">
            <Link
              to="/login"
              className="w-full sm:w-auto text-center text-sm font-bold text-white border border-white/50 px-10 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto text-center text-sm font-bold bg-violet-600 text-white px-10 py-3 rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-900/40 transition-all duration-200 hover:scale-105"
            >
              Register / Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section className="py-14 bg-violet-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className="mb-2">{s.logo}</div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-violet-700 via-fuchsia-600 to-indigo-500 text-white" id="about">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image — centered on mobile, left on desktop */}
          <div className="flex justify-center w-full lg:w-auto flex-shrink-0">
            <img
              src={un10}
              alt="University campus"
              className="w-52 h-52 sm:w-72 sm:h-72 lg:w-[380px] lg:h-[380px] rounded-full shadow-2xl border-4 border-white/20 object-cover"
            />
          </div>
          {/* Text */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-xs font-semibold text-violet-200 border border-violet-300/50 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Est. 1723 · Oxfordshire, UK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 leading-tight">
              About The University
            </h2>
            <p className="text-base sm:text-lg text-slate-100/90 leading-relaxed">
              Marvellous University, founded in 1723, is a prestigious institution based in Oxfordshire, England,
              United Kingdom. With a rich history spanning centuries, it has earned a reputation for academic
              excellence, innovation, and leadership development. Guided by its motto,{" "}
              <em>"Empowering Tomorrow's Leaders,"</em> the university offers a vibrant learning environment that
              combines tradition with cutting-edge research. Marvellous University is renowned for its distinguished
              faculty, diverse programs, and commitment to shaping future leaders in an ever-evolving global society.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACULTIES
      ══════════════════════════════════════════ */}
      <section id="faculties" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Academic Divisions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Our <span className="text-violet-600">Faculties</span>
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              Six world-class faculties. Hundreds of programmes. One university dedicated to your excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 cursor-pointer">
            {faculties.map((faculty) => (
              <div
                key={faculty.name}
                className={`group relative bg-white rounded-2xl border-2 ${faculty.accent} overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${faculty.color}`} />
                <div className="p-5 sm:p-6 flex-1">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${faculty.color} flex items-center justify-center text-xl sm:text-2xl mb-4 shadow-md`}>
                    {faculty.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2 leading-snug group-hover:text-violet-700 transition-colors">
                    {faculty.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{faculty.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {faculty.departments.map((dept) => (
                      <span key={dept} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100">
                  <Link to="/login" className={`text-xs font-semibold bg-gradient-to-r ${faculty.color} bg-clip-text text-transparent hover:underline`}>
                    Explore programmes →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ADMISSIONS
      ══════════════════════════════════════════ */}
      <section id="admissions" className="py-20 sm:py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold text-violet-300 bg-violet-900/60 border border-violet-700 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Join Our Community
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Admissions <span className="text-violet-400">2025/2026</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
              Your journey to academic excellence starts here. Follow our simple six-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {admissionSteps.map((step) => (
              <div
                key={step.step}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:bg-white/10 hover:border-violet-500/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-violet-500/40 group-hover:text-violet-400 transition-colors leading-none">
                    {step.step}
                  </span>
                  <div className="h-px flex-1 bg-white/10 group-hover:bg-violet-500/30 transition-colors" />
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {requirements.map((req) => (
              <div key={req.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                <h4 className="font-bold text-violet-300 text-xs sm:text-sm uppercase tracking-widest mb-4">
                  {req.label} Requirements
                </h4>
                <ul className="space-y-2.5">
                  {req.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-violet-900/50 text-sm"
            >
              Start Your Application →
            </Link>
            <p className="mt-4 text-slate-500 text-xs">
              Applications close <strong className="text-slate-300">31st August 2025</strong>. No late entries accepted.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              We're Here to <span className="text-violet-600">Help</span>
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
              Have a question about admissions, programmes, or campus life? Reach out — our team responds within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Info cards */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: "📍", label: "Campus Address", value: "12 University Avenue, Oxfordshire, OX1 4AU, England, United Kingdom" },
                { icon: "📞", label: "Phone / WhatsApp", value: "+44 1865 000 000" },
                { icon: "✉️", label: "Email", value: "admissions@marvellous.edu.uk" },
                { icon: "🕘", label: "Office Hours", value: "Monday – Friday: 8:00 AM – 5:00 PM (GMT)" },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex gap-4 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-violet-200 hover:bg-violet-50/40 transition-all"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-violet-100 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{info.label}</p>
                    <p className="text-sm text-slate-700 font-medium leading-snug break-words">{info.value}</p>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[<FaXTwitter size={14} className="mx-auto"/>, <FaFacebookF size={14} className="mx-auto"/>, <FaInstagram size={14} className="mx-auto"/>, <FaLinkedin size={14} className="mx-auto"/>].map((s, i) => (
                    <button
                      key={i}
                      className="w-9 h-9 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all text-sm font-bold"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center text-3xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm max-w-xs">
                    Thank you for reaching out. Our admissions team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Emeka Okafor"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-slate-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-slate-300 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select a subject...</option>
                      <option>Undergraduate Admissions</option>
                      <option>Postgraduate Admissions</option>
                      <option>Scholarships & Bursaries</option>
                      <option>Student Portal Support</option>
                      <option>Faculty Information</option>
                      <option>Other Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder-slate-300 resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] shadow-md shadow-violet-200 text-sm"
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <img src={toplogo} alt="University Logo" className="h-10 w-auto rounded" />
            <span className="font-bold text-white text-base">
              <span className="text-violet-400">Marvellous</span> University
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={handleSectionScroll(link.id)}
                className="hover:text-violet-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="w-24 h-px bg-slate-700" />
          <p className="text-xs text-slate-500">© 2026 Marvellous University. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
