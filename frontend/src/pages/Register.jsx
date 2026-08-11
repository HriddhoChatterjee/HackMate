import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  // Simulates the neo-brutalist button press shadow mechanics cleanly in React
  useEffect(() => {
    const handleMouseDown = (e) => {
      const btn = e.target.closest('.neobrutalist-shadow');
      if (btn) {
        btn.style.transform = 'translate(2px, 2px)';
        btn.style.boxShadow = '0px 0px 0px 0px rgba(99,14,212,1)';
      }
    };

    const handleMouseUp = (e) => {
      const btn = e.target.closest('.neobrutalist-shadow');
      if (btn) {
        btn.style.transform = 'translate(-2px, -2px)';
        btn.style.boxShadow = '4px 4px 0px 0px rgba(99,14,212,1)';
      }
    };

    const handleMouseLeave = (e) => {
      const btn = e.target.closest('.neobrutalist-shadow');
      if (btn) {
        btn.style.transform = '';
        btn.style.boxShadow = '';
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Strong'][passwordStrength];
  const strengthColor = ['bg-[#ba1a1a]', 'bg-[#7d3d00]', 'bg-[#2170e4]', 'bg-[#0a7c3a]', 'bg-[#0a7c3a]'][passwordStrength];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8) next.password = 'Use at least 8 characters';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match';
    if (!agreed) next.agreed = 'You must accept the terms to continue';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      // Replace with real registration call, e.g.:
      // const res = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      // });
      // if (!res.ok) throw new Error('Could not create account');
      await new Promise((resolve) => setTimeout(resolve, 800));
      navigate('/edit-profile');
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fef7ff] text-[#1d1a24] font-['Inter'] min-h-screen selection:bg-[#eaddff] selection:text-[#25005a]">
      <Navbar />
      <main className="px-8 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#630ed4] text-[#fefcff] font-['JetBrains_Mono'] px-4 py-1 rounded-full border-2 border-[#1d1a24] rotate-3 text-sm font-medium mb-6">
              $ hackmate init --new-hacker
            </div>
            <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl text-[#630ed4] font-bold leading-none mb-3">
              Create Your<br />Account.
            </h1>
            <p className="text-[#4a4455] text-lg">
              Join 50,000+ builders shipping projects together.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white p-8 rounded-3xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] space-y-6"
          >
            {serverError && (
              <div className="bg-[#ffdad4] text-[#410001] border-2 border-[#1d1a24] rounded-xl px-4 py-3 font-['JetBrains_Mono'] text-sm">
                [ERROR] {serverError}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fef7ff] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow ${
                  errors.name ? 'border-[#ba1a1a]' : 'border-[#1d1a24]'
                }`}
              />
              {errors.name && <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@hackmate.io"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fef7ff] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow ${
                  errors.email ? 'border-[#ba1a1a]' : 'border-[#1d1a24]'
                }`}
              />
              {errors.email && <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 bg-[#fef7ff] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow ${
                    errors.password ? 'border-[#ba1a1a]' : 'border-[#1d1a24]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4455] text-xl"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'visibility_off' : 'visibility'}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="h-2 w-full bg-[#e8dfee] rounded-full border border-[#1d1a24] overflow-hidden">
                    <div
                      className={`h-full ${strengthColor} transition-all`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs font-['JetBrains_Mono'] text-[#4a4455] mt-1">{strengthLabel} password</p>
                </div>
              )}
              {errors.password && (
                <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fef7ff] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow ${
                  errors.confirmPassword ? 'border-[#ba1a1a]' : 'border-[#1d1a24]'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setErrors((prev) => ({ ...prev, agreed: '' }));
                  }}
                  className="mt-1 w-5 h-5 accent-[#630ed4] border-2 border-[#1d1a24] rounded"
                />
                <span className="text-sm text-[#4a4455]">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#630ed4] font-bold hover:underline">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#630ed4] font-bold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.agreed && <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.agreed}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="neobrutalist-shadow w-full bg-[#630ed4] text-white font-['Space_Grotesk'] text-xl px-10 py-4 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating account…' : '🚀 Create Account'}
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#7b7487]"></div>
              <span className="text-[#7b7487] text-sm font-['JetBrains_Mono']">or</span>
              <div className="flex-1 h-px bg-[#7b7487]"></div>
            </div>

            <button
              type="button"
              className="neobrutalist-shadow w-full flex items-center justify-center gap-3 bg-white text-[#1d1a24] font-['Space_Grotesk'] text-lg px-10 py-3 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold transition-all"
            >
              <span className="material-symbols-outlined">code</span>
              Continue with GitHub
            </button>
          </form>

          <p className="text-center text-[#4a4455] mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-[#630ed4] font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-Components (shared shell, matches Landing.jsx)
// ----------------------------------------------------------------------

function Navbar() {
  return (
    <nav className="bg-[#fef7ff] border-b-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-8">
          <Link className="font-['Space_Grotesk'] text-2xl text-[#630ed4] tracking-tighter font-bold" to="/">
            HackMate
          </Link>
          <div className="hidden md:flex gap-6">
            {['Discovery', 'Teams', 'Workspace'].map((link) => (
              <Link
                key={link}
                className="text-[#4a4455] font-medium hover:translate-y-[-2px] hover:translate-x-[-2px] transition-transform active:translate-y-0 active:translate-x-0"
                to={`/${link.toLowerCase()}`}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 bg-[#630ed4] text-white px-6 py-2 rounded-lg border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-bold hover:translate-y-[-2px] hover:translate-x-[-2px] transition-transform active:translate-y-0 active:translate-x-0"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1d1a24] w-full mt-16 border-t-4 border-[#630ed4]">
      <div className="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-['Space_Grotesk'] text-2xl text-white font-bold">HackMate</span>
          <p className="font-['JetBrains_Mono'] text-sm text-[#e8dfee] max-w-sm text-center md:text-left">
            © 2024 HackMate. Built with ☕️ and 💻 by student builders.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {['Privacy', 'Terms', 'API Docs', 'Support'].map((item) => (
            <Link
              key={item}
              className="font-['JetBrains_Mono'] text-sm text-[#e8dfee] hover:text-[#eaddff] transition-colors"
              to={`/${item.toLowerCase().replace(' ', '-')}`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1d1a24] transition-colors">
            <span className="material-symbols-outlined text-sm">terminal</span>
          </button>
          <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1d1a24] transition-colors">
            <span className="material-symbols-outlined text-sm">groups</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
