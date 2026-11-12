import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Loader2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { authService } from '../../services/authService';
import { setAuthToken, setUser } from '../../utils/auth';
import Logo from '/irs-logo.png';
import featureIllustration from '../../../web/assets/uptik-feature-illustration.png';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('pendingEmail');
    if (!storedEmail) {
      navigate('/login');
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp.slice(0, 6));
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyOTP(email, otpString);

      if (response.success) {
        setAuthToken(response.token);
        setUser(response.user);
        sessionStorage.removeItem('pendingEmail');

        // Check if user came from register page (not login)
        const cameFromRegister = sessionStorage.getItem('cameFromRegister') === 'true';
        sessionStorage.removeItem('cameFromRegister');

        if (cameFromRegister) {
          sessionStorage.removeItem('pendingReferralCode');
          navigate('/client/dashboard');
        } else if (response.isExistingUser) {
          sessionStorage.removeItem('pendingReferralCode');
          navigate('/client/dashboard');
        } else {
          const refCode = sessionStorage.getItem('pendingReferralCode');
          sessionStorage.setItem('prefillEmail', email);

          if (refCode) {
            navigate(`/client/register?ref=${refCode}`);
          } else {
            navigate('/client/register');
          }
        }
      } else {
        setError(response.message || 'Invalid OTP code. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    try {
      const response = await authService.sendOTP(email);
      if (response && response.success) {
        setResendTimer(60);
        setError('');
      } else {
        setError(response?.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to resend OTP. Please try again.';
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

      {/* Center Main Stage: Balanced Ergonomic Card (max-w-[840px]) */}
      <main className="relative z-10 my-auto w-full max-w-[840px] mx-auto">
        <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(22,84,121,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* =========================================================================
              CARD LEFT: ERGONOMIC FORM (comfortably centered at max-w-[275px])
              ========================================================================= */}
          <div className="w-full p-7 sm:p-10 flex flex-col justify-between text-left bg-white">
            <div className="w-full max-w-[275px] mx-auto">
              <Link to="/" className="inline-flex items-center gap-2 group transition-opacity hover:opacity-90 mb-3.5">
                <img src={Logo} alt="IRS Tax Filer" className="h-10 sm:h-11 w-auto object-contain" />
              </Link>

              {/* Title & Subtitle */}
              <h1 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight leading-tight">
                Verify Your{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Email
                </span>
              </h1>
              <p className="mt-1 text-xs text-gray-500 font-normal leading-relaxed">
                We sent a verification code to <br />
                <span className="font-semibold text-gray-800 break-all">{email}</span>
              </p>

              {/* Error Banner */}
              {error && (
                <div className="mt-3 flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl text-xs leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form
                className="mt-7 sm:mt-8 space-y-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerify();
                }}
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-2">
                    Enter Verification Code
                  </label>
                  <div className="flex justify-between items-center gap-1 sm:gap-1.5">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-9 sm:w-10 h-10 sm:h-11 text-center text-base sm:text-lg font-bold text-gray-900 bg-white border border-slate-200 rounded-xl focus:border-[#165479] focus:ring-3 focus:ring-[#165479]/10 focus:outline-none transition-all shadow-2xs"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-xs sm:text-[13px] shadow-[0_4px_14px_rgba(22,84,121,0.2)] border border-white/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Resend Code Section & Use Different Email */}
              <div className="mt-3.5 text-center space-y-1">
                {/* <p className="text-[11px] text-gray-400">Didn't receive the code?</p> */}
                <div>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || loading}
                    className="text-xs text-[#165479] hover:text-[#0A4973] font-semibold disabled:text-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {resendTimer > 0 ? `Resend new code in ${resendTimer}s` : 'Resend Verification Code'}
                  </button>
                </div>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#165479] font-medium transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3 stroke-[2]" />
                    <span>Use a different email</span>
                  </button>
                </div>
              </div>
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

export default VerifyOTP;
