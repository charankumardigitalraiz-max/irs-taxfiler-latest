import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, GiftIcon, TagIcon, ClockIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { authService } from "../../client/services/authService";

const WelcomeDialog = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time until Feb 10, 2026
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-03-30T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Preserve referral code from URL or sessionStorage
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      sessionStorage.setItem('pendingReferralCode', refCode);
    }
  }, [searchParams]);

  // Check if dialog should be shown (once per session)
  useEffect(() => {
    const hasauth = localStorage.getItem('authToken') ? true : false;
    if (hasauth) {
      return;
    }
    // Show dialog after a short delay for better UX
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('welcomeDialogShown', 'true');
    }, 1000);
    return () => clearTimeout(timer);

  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!email || !email.includes('@')) {
      setLoginError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.sendOTP(email);
      if (response && response.success) {
        sessionStorage.setItem('pendingEmail', email);
        // Mark that user came from login page (not register)
        sessionStorage.setItem('cameFromRegister', 'false');
        // Close dialog and navigate to OTP verification
        handleClose();
        navigate('/client/verify-otp');
      } else {
        // Handle error response (authService now returns error data instead of throwing)
        setLoginError(response?.message || 'Failed to send OTP');
      }
    } catch (err) {
      // Fallback for unexpected errors
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong. Please try again.';
      setLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[9999] flex items-center justify-center overflow-y-auto py-4 px-3 sm:py-8 sm:px-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-2xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden relative my-4 sm:my-8 mx-2 sm:mx-0"
            style={{
              background: "linear-gradient(135deg, #EC4899 0%, #DB2777 50%, #BE185D 100%)",
              minHeight: 'auto',
              maxHeight: '95vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Decorative Pattern Background */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0 opacity-10"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px',
                pointerEvents: 'none',
              }}
            ></div>

            {/* CLOSE BUTTON */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 sm:w-4 sm:h-4 text-white" />
            </button>

            <div className="relative z-10 p-4 sm:p-6 md:p-8" style={{ position: 'relative', zIndex: 10 }}>
              {/* Main Offer */}
              <div className="text-center mb-4 sm:mb-5">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none mb-1">
                  20% OFF
                </h2>
                <p className="text-white/90 text-xs sm:text-sm md:text-base font-semibold">
                  Tax Savings Special
                </p>
              </div>

              {/* Countdown Timer - Compact Box Style */}
              <div className="mb-4 sm:mb-6">
                <p className="text-white/95 text-center text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-3 px-2">
                  Sign Up Before The Offer Expires...
                </p>
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
                  {/* Days */}
                  <div className="flex gap-0.5 sm:gap-1">
                    {String(timeLeft.days).padStart(2, '0').split('').map((digit, idx) => (
                      <div key={`days-${idx}`} className="w-7 h-9 sm:w-9 sm:h-12 md:w-10 md:h-14 bg-white rounded sm:rounded-md flex items-center justify-center shadow-md">
                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#EC4899]">{digit}</span>
                      </div>
                    ))}
                  </div>

                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold mx-0.5">:</span>

                  {/* Hours */}
                  <div className="flex gap-0.5 sm:gap-1">
                    {String(timeLeft.hours).padStart(2, '0').split('').map((digit, idx) => (
                      <div key={`hours-${idx}`} className="w-7 h-9 sm:w-9 sm:h-12 md:w-10 md:h-14 bg-white rounded sm:rounded-md flex items-center justify-center shadow-md">
                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#EC4899]">{digit}</span>
                      </div>
                    ))}
                  </div>

                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold mx-0.5">:</span>

                  {/* Minutes */}
                  <div className="flex gap-0.5 sm:gap-1">
                    {String(timeLeft.minutes).padStart(2, '0').split('').map((digit, idx) => (
                      <div key={`minutes-${idx}`} className="w-7 h-9 sm:w-9 sm:h-12 md:w-10 md:h-14 bg-white rounded sm:rounded-md flex items-center justify-center shadow-md">
                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#EC4899]">{digit}</span>
                      </div>
                    ))}
                  </div>

                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold mx-0.5">:</span>

                  {/* Seconds */}
                  <div className="flex gap-0.5 sm:gap-1">
                    {String(timeLeft.seconds).padStart(2, '0').split('').map((digit, idx) => (
                      <div key={`seconds-${idx}`} className="w-7 h-9 sm:w-9 sm:h-12 md:w-10 md:h-14 bg-white rounded sm:rounded-md flex items-center justify-center shadow-md">
                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#EC4899]">{digit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center justify-center px-2">
                  <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-5 sm:py-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg shadow-md">
                    <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white/90" />
                    <p className="text-white/95 text-xs sm:text-sm font-semibold whitespace-nowrap">
                      Valid till <span className="text-white font-bold text-sm sm:text-base"> March 30th, 2026</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Login Section */}
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-xl">
                {/* Login Form */}
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 text-center">
                    Offer Expires Soon – Limited Time Only
                  </h3>
                  <p className="text-xs text-gray-600 text-center mb-3 sm:mb-4">Offer closes when timer hits zero</p>

                  {loginError && (
                    <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                      {loginError}
                    </div>
                  )}

                  <form className="space-y-3" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address <span className="text-[#EB4149]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          autoFocus
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#EC4899] focus:border-[#EC4899] focus:outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-lg font-bold text-white text-sm md:text-base transition-all duration-200 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] bg-gradient-to-r from-[#EC4899] via-[#DB2777] to-[#BE185D] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending OTP...
                        </span>
                      ) : (
                        "Send OTP"
                      )}
                    </button>

                    {/* Info Text */}
                    <div className="pt-2">
                      <p className="text-xs text-center text-gray-500">
                        We'll send a one-time password to your email address. No password required.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeDialog;

