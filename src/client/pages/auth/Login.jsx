import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Loader2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { authService } from '../../services/authService';
import { isAuthenticated } from '../../utils/auth';
import Logo from '/irs-logo.webp';
import featureIllustration from '../../../web/assets/uptik-feature-illustration.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Preserve referral code from URL or sessionStorage
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      sessionStorage.setItem('pendingReferralCode', refCode);
    }
  }, [searchParams]);

  // If user is already authenticated (token in localStorage), skip login and go to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/client/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.sendOTP(email);
      if (response && response.success) {
        sessionStorage.setItem('pendingEmail', email);
        // Mark that user came from login page (not register)
        sessionStorage.setItem('cameFromRegister', 'false');
        navigate('/client/verify-otp');
      } else {
        // Handle error response (authService returns error data instead of throwing)
        setError(response?.message || 'Failed to send OTP');
      }
    } catch (err) {
      // Fallback for unexpected errors
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/70 text-gray-900 font-sans antialiased relative overflow-hidden py-6 px-4 sm:px-6">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-[#165479]/[0.08] via-[#749220]/[0.05] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-[#749220]/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      {/* <header className="relative z-10 w-full max-w-[840px] mx-auto flex items-center justify-between mb-5">
        <Link to="/" className="inline-flex items-center gap-2 group transition-opacity hover:opacity-90">
          <img src={Logo} alt="IRS Tax Filer" className="h-10 sm:h-11 w-auto object-contain" />
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-[#165479] transition-colors"
        >
          <span>Back to Website</span>
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </Link>
      </header> */}

      {/* Center Main Stage: Balanced Ergonomic Card (max-w-[840px]) */}
      <main className="relative z-10 my-auto w-full max-w-[840px] mx-auto">
        <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(22,84,121,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* =========================================================================
              CARD LEFT: ERGONOMIC FORM (comfortably centered at max-w-[340px])
              ========================================================================= */}
          <div className="w-full p-7 sm:p-10 flex flex-col justify-between text-left bg-white">
            <div className="w-full max-w-[275px] mx-auto">
              {/* Eyebrow Badge */}
              {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-2xs mb-3 text-xs font-medium text-[#749220]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
                <span>IRS e-File & Licensed CPAs</span>
              </div> */}

              <Link to="/" className="inline-flex items-center gap-2 group transition-opacity hover:opacity-90 mb-3.5">
                <img src={Logo} alt="IRS Tax Filer" className="h-10 sm:h-11 w-auto object-contain" />
              </Link>

              {/* Title & Subtitle */}
              <h1 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight leading-tight">
                Client Portal{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Login
                </span>
              </h1>
              <p className="mt-1 text-xs text-gray-500 font-normal leading-relaxed">
                Secure passwordless sign-in with email code.
              </p>

              {/* Error Banner */}
              {error && (
                <div className="mt-3 flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl text-xs leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form className="mt-7 sm:mt-8 space-y-3.5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-800 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="name@example.com"
                      required
                      autoFocus
                      className={`w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-[13px] text-gray-900 bg-white border rounded-xl placeholder:text-gray-400 focus:outline-none transition-all ${error && !email.includes('@')
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10'
                        : 'border-slate-200 focus:border-[#165479] focus:ring-3 focus:ring-[#165479]/10'
                        }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-xs sm:text-[13px] shadow-[0_4px_14px_rgba(22,84,121,0.2)] border border-white/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Secure OTP</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-2 text-[11px] text-center text-gray-400 font-normal">
                6-digit code will be sent to your email inbox.
              </p>
            </div>

            {/* Bottom Security Row */}
            <div className="w-full max-w-[275px] mx-auto mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#749220]" />
                <span>256-Bit SSL</span>
              </span>
              <span className="text-slate-200">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#165479]" />
                <span>Zero Password Risk</span>
              </span>
            </div>
          </div>

          {/* =========================================================================
              CARD RIGHT: ANIMATING IMAGE ILLUSTRATOR & TRUST BADGES
              ========================================================================= */}
          <div className="hidden md:flex bg-gradient-to-b from-[#F6F9EE]/90 via-slate-50 to-[#EBF3F8]/80 md:border-l border-slate-200/80 p-7 sm:p-10 flex-col justify-between items-center text-center relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#749220]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#165479]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 w-full flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#165479] bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#749220]" />
                <span>Tax Year 2025-2026</span>
              </span>
              <span className="text-xs font-medium text-gray-500">
                Direct e-File
              </span>
            </div>

            {/* Center: Animating 3D Illustration */}
            <div className="relative my-auto py-3 w-full flex flex-col items-center justify-center z-10">
              <div className="relative w-44 sm:w-48 h-44 sm:h-48 flex items-center justify-center">
                {/* Floating Bobbing Animation */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  <img
                    src={featureIllustration}
                    alt="IRS Tax Filing Illustration"
                    className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(22,84,121,0.18)] select-none pointer-events-none"
                  />

                  {/* Floating Pill Badge: Top Left */}
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -top-1 -left-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-gray-900"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
                    <span>IRS Accepted</span>
                  </motion.div>

                  {/* Floating Pill Badge: Bottom Right */}
                  <motion.div
                    animate={{ y: [3, -3, 3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -bottom-1 -right-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200/90 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-gray-900"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#749220] stroke-[2.2]" />
                    <span>CPA Verified</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Headline & Subtitle under illustration */}
              <div className="mt-3.5 max-w-[250px]">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                  Fast, Accurate &{' '}
                  <span className="bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                    CPA-Certified
                  </span>
                </h3>
                <p className="text-xs text-gray-500 font-normal mt-1 leading-relaxed">
                  Guaranteed deduction optimization and maximum legal refunds.
                </p>
              </div>
            </div>

            {/* Bottom Social Proof */}
            <div className="relative z-10 w-full pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1 font-semibold text-gray-800">
                <span className="text-amber-500">★★★★★</span> 4.9/5
              </span>
              <span>10,000+ Filers</span>
            </div>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 w-full max-w-[840px] mx-auto text-center text-xs text-gray-400 py-3">
        <p>© {new Date().getFullYear()} IRS Tax Filer. Authorized IRS e-File Provider & Licensed CPA Practice.</p>
      </footer>
    </div>
  );
};

export default Login;
