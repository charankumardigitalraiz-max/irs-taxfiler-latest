import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ClockIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../client/services/authService";
import featureIllustration from "../assets/uptik-feature-illustration.png";

const WelcomeDialog = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 9,
    minutes: 32,
    seconds: 45,
  });

  // Calculate live countdown timer (persists in localStorage so it ticks down accurately)
  useEffect(() => {
    const getTargetTime = () => {
      const stored = localStorage.getItem("welcomeOfferDeadline");
      if (stored) {
        const time = parseInt(stored, 10);
        if (time > Date.now()) {
          return time;
        }
      }
      // Set to 14 days, 9 hours, 32 minutes from current visit
      const newTarget = Date.now() + (14 * 24 * 3600 + 9 * 3600 + 32 * 60 + 45) * 1000;
      localStorage.setItem("welcomeOfferDeadline", newTarget.toString());
      return newTarget;
    };

    const targetTime = getTargetTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        // Automatically renew a 7-day grace window so it never stays at zero
        const renewed = Date.now() + (7 * 24 * 3600 + 5 * 3600 + 15 * 60) * 1000;
        localStorage.setItem("welcomeOfferDeadline", renewed.toString());
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Preserve referral code from URL or sessionStorage
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      sessionStorage.setItem("pendingReferralCode", refCode);
    }
  }, [searchParams]);

  // Check if dialog should be shown (once per session)
  useEffect(() => {
    const hasauth = localStorage.getItem("authToken") ? true : false;
    if (hasauth) {
      return;
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("welcomeDialogShown", "true");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!email || !email.includes("@")) {
      setLoginError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.sendOTP(email);
      if (response && response.success) {
        sessionStorage.setItem("pendingEmail", email);
        sessionStorage.setItem("cameFromRegister", "false");
        handleClose();
        navigate("/client/verify-otp");
      } else {
        setLoginError(response?.message || "Failed to send OTP");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative bg-white w-full max-w-[480px] md:max-w-[780px] rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(10,40,70,0.25)] border border-gray-100 overflow-hidden my-auto font-sans grid grid-cols-1 md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <XMarkIcon className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Main Conversion Panel: 20% Offer & Email Claim Form (Left - White) */}
            <div className="w-full md:col-span-7 bg-white p-5 sm:p-7 md:p-8 flex flex-col justify-between text-left">
              <div>
                {/* Mobile-Only Countdown Timer (Placed at top on mobile view, hidden on desktop) */}
                <div className="block md:hidden mb-4 p-3 rounded-2xl bg-gradient-to-r from-[#F6F9EE] via-slate-50 to-[#F6F9EE] border border-gray-200/90 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-2">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 text-[#749220] stroke-[2.2]" />
                      <span>Offer expires in:</span>
                    </span>
                    <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-[#749220] text-white tracking-wider">
                      Ending Soon
                    </span>
                  </div>

                  {/* 4 Digital Clock Cards for Mobile */}
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-white rounded-xl py-1.5 px-1 border border-gray-200/90 shadow-2xs">
                      <span className="block text-lg font-medium text-[#165479] tracking-tight leading-none font-sans tabular-nums">
                        {timeLeft.days}
                      </span>
                      <span className="block text-[9px] uppercase font-normal text-gray-500 tracking-wider mt-0.5 font-sans">
                        Days
                      </span>
                    </div>

                    <div className="bg-white rounded-xl py-1.5 px-1 border border-gray-200/90 shadow-2xs">
                      <span className="block text-lg font-medium text-[#165479] tracking-tight leading-none font-sans tabular-nums">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="block text-[9px] uppercase font-normal text-gray-500 tracking-wider mt-0.5 font-sans">
                        Hours
                      </span>
                    </div>

                    <div className="bg-white rounded-xl py-1.5 px-1 border border-gray-200/90 shadow-2xs">
                      <span className="block text-lg font-medium text-[#165479] tracking-tight leading-none font-sans tabular-nums">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="block text-[9px] uppercase font-normal text-gray-500 tracking-wider mt-0.5 font-sans">
                        Mins
                      </span>
                    </div>

                    <div className="bg-[#749220] rounded-xl py-1.5 px-1 text-white shadow-2xs">
                      <span className="block text-lg font-medium text-white tracking-tight leading-none font-sans tabular-nums">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="block text-[9px] uppercase font-normal text-white/90 tracking-wider mt-0.5 font-sans">
                        Secs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#165479] uppercase tracking-wider mb-2">
                  <SparklesIcon className="w-4 h-4 text-[#749220]" />
                  <span>Early Filer Special</span>
                </div>

                {/* 20% OFF Offer Header */}
                <div className="mt-1">
                  <div className="text-3xl sm:text-4xl font-normal text-[#0A4973] tracking-tight leading-none flex items-baseline gap-2">
                    20% <span className="text-xl sm:text-2xl font-medium text-[#749220]">OFF</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight leading-snug mt-1.5">
                    Your CPA Tax Filing
                  </h2>
                  <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed mt-2">
                    Certified CPA preparation and maximum IRS refunds for US taxpayers, expats & SMBs worldwide.
                  </p>
                </div>

                {/* Error Banner */}
                {loginError && (
                  <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                {/* Claim Form */}
                <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <EnvelopeIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      autoFocus
                      className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl bg-gray-50/50 focus:bg-white text-gray-900 focus:ring-2 focus:ring-[#165479]/20 focus:border-[#165479] focus:outline-none transition-all placeholder:text-gray-400 font-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl font-medium text-white text-sm bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#12496a] hover:from-[#09324a] hover:to-[#0f405c] shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending code...</span>
                      </span>
                    ) : (
                      <>
                        <span>Claim 20% Off & Start Filing</span>
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  {/* Below Button Notice */}
                  <p className="text-xs text-center text-gray-600 font-medium pt-1.5">
                    🔒 Passwordless sign-in • One-time verification code sent to your email
                  </p>
                </form>
              </div>

              {/* Bottom Security Row */}
              <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-normal">
                <span>Zero filing obligation</span>
                <span className="text-[#165479] font-medium">Licensed CPAs</span>
              </div>
            </div>

            {/* Right Side: Digital Countdown Timer & Illustration Showcase (Hidden on Mobile) */}
            <div className="hidden md:flex md:col-span-5 bg-gradient-to-b from-[#F6F9EE]/90 via-slate-50 to-[#F6F9EE]/60 md:border-l border-gray-100 p-6 sm:p-7 flex-col justify-between items-center text-center relative overflow-hidden">
              {/* Ambient Glows */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#749220]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#165479]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Top Countdown Timer (Moved from Left Side) */}
              <div className="w-full relative z-10">
                <div className="flex items-center justify-between text-xs text-gray-700 font-medium mb-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4 text-[#749220] stroke-[2.2]" />
                    <span>Offer expires in:</span>
                  </span>
                  <span className="text-[10px] font-medium uppercase px-2.5 py-0.5 rounded-full bg-[#749220] text-white tracking-wider">
                    Ending Soon
                  </span>
                </div>

                {/* 4 Digital Clock Cards */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  <div className="bg-white rounded-xl py-2 px-1 border border-gray-200/90 text-center shadow-2xs">
                    <span className="block text-xl sm:text-2xl font-medium text-[#165479] tracking-tight leading-none font-sans tabular-nums">
                      {timeLeft.days}
                    </span>
                    <span className="block text-[9px] uppercase font-normal text-gray-500 tracking-wider mt-1 font-sans">
                      Days
                    </span>
                  </div>

                  <div className="bg-white rounded-xl py-2 px-1 border border-gray-200/90 text-center shadow-2xs">
                    <span className="block text-xl sm:text-2xl font-medium text-[#165479] tracking-tight leading-none font-sans tabular-nums">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="block text-[9px] uppercase font-normal text-gray-500 tracking-wider mt-1 font-sans">
                      Hours
                    </span>
                  </div>

                  <div className="bg-white rounded-xl py-2 px-1 border border-gray-200/90 text-center shadow-2xs">
                    <span className="block text-xl sm:text-2xl font-medium text-[#165479] tracking-tight leading-none font-sans tabular-nums">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="block text-[9px] uppercase font-normal text-gray-500 tracking-wider mt-1 font-sans">
                      Mins
                    </span>
                  </div>

                  <div className="bg-[#749220] rounded-xl py-2 px-1 text-center shadow-2xs text-white">
                    <span className="block text-xl sm:text-2xl font-medium text-white tracking-tight leading-none font-sans tabular-nums">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="block text-[9px] uppercase font-normal text-white/90 tracking-wider mt-1 font-sans">
                      Secs
                    </span>
                  </div>
                </div>
              </div>

              {/* Central Illustration Area */}
              <div className="relative my-auto py-3 w-full flex flex-col items-center justify-center z-10">
                <div className="relative w-36 sm:w-44 h-36 sm:h-44 flex items-center justify-center">
                  <img
                    src={featureIllustration}
                    alt="U.S. Tax Filing Illustration"
                    className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(22,84,121,0.18)] hover:scale-105 transition-transform duration-300"
                  />

                  {/* Floating Glassmorphic Refund Badge */}
                  <div className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-gray-200/90 shadow-md flex items-center gap-1.5">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-[#749220] stroke-[2.5]" />
                    <span className="text-[10px] font-medium text-gray-700">Max Refund</span>
                  </div>

                  {/* Floating CPA Verified Stamp */}
                  <div className="absolute -top-1 -right-2 bg-[#165479] text-white px-2 py-0.5 rounded-lg shadow-sm text-[9px] font-medium uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheckIcon className="w-3 h-3 text-[#cbf056]" />
                    <span>CPA Verified</span>
                  </div>
                </div>

                {/* Caption / Voucher Tag */}
                <div className="mt-3 text-center">
                  <span className="text-sm font-medium text-gray-800 block">
                    Guaranteed 100% Accuracy
                  </span>
                  <span className="text-[13px] text-gray-500 font-normal leading-tight block mt-0.5">
                    Certified CPAs & dual-status compliance
                  </span>
                </div>
              </div>

              {/* Bottom Voucher Applied Tag */}
              <div className="pt-2.5 border-t border-gray-200/70 w-full flex items-center justify-center gap-1.5 text-[10px] text-gray-600 font-medium z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
                <span>Instant 20% discount applied at checkout</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeDialog;
