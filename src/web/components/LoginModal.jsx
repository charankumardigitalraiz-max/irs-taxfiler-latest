import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  TicketIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Loader2, AlertCircle } from "lucide-react";
import { authService } from "../../client/services/authService";
import { setAuthToken, setUser } from "../../client/utils/auth";
import { speakWelcome } from "../../client/utils/voiceAssistant";
import Logo from "/irs-logo.webp";
import loginAnimGif from "../../assets/admin-login-anim.gif";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // 'email' | 'otp' | 'register'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [regData, setRegData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef([]);

  const resetAndClose = useCallback(() => {
    setError("");
    setLoading(false);
    setStep("email");
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(0);
    onClose();
  }, [onClose]);

  // ESC close & body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const storedRef = sessionStorage.getItem("pendingReferralCode");
    if (storedRef) {
      setRegData((prev) => ({ ...prev, referralCode: storedRef }));
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") resetAndClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, resetAndClose]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.sendOTP(trimmed);
      if (response && response.success) {
        sessionStorage.setItem("pendingEmail", trimmed);
        setStep("otp");
        setResendTimer(60);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(response?.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // OTP input handlers
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError("");
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = pasted.split("").concat(Array(6 - pasted.length).fill(""));
    setOtp(next.slice(0, 6));
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await authService.verifyOTP(email.trim(), otpString);
      if (response && response.success) {
        setAuthToken(response.token);
        setUser(response.user);
        sessionStorage.removeItem("pendingEmail");

        if (response.isExistingUser) {
          sessionStorage.setItem("justLoggedIn", "true");
          sessionStorage.removeItem("isNewUser");
          sessionStorage.removeItem("pendingReferralCode");
          const displayName = response.user?.firstName || response.user?.fullName || response.user?.name || '';
          speakWelcome(displayName, false);
          resetAndClose();
          navigate("/client/dashboard");
        } else {
          setStep("register");
        }
      } else {
        setError(response?.message || "Invalid OTP code. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await authService.sendOTP(email.trim());
      if (response && response.success) {
        setResendTimer(60);
      } else {
        setError(response?.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete Registration (New Users)
  const handleCompleteRegister = async (e) => {
    e.preventDefault();
    setError("");
    const digits = regData.mobileNumber.replace(/\D/g, "");
    if (!regData.firstName.trim() || !regData.lastName.trim()) {
      setError("First and last name are required.");
      return;
    }
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register({
        firstName: regData.firstName.trim(),
        lastName: regData.lastName.trim(),
        email: email.trim(),
        mobileNumber: digits,
        referralCode: regData.referralCode.trim(),
      });
      if (response && response.success) {
        setAuthToken(response.token);
        setUser(response.user);
        sessionStorage.setItem("justLoggedIn", "true");
        sessionStorage.setItem("isNewUser", "true");
        sessionStorage.removeItem("pendingReferralCode");
        const displayName = response.user?.firstName || regData.firstName || '';
        speakWelcome(displayName, true);
        resetAndClose();
        navigate("/client/dashboard");
      } else {
        setError(response?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 font-sans antialiased"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-[#152F4A]/65 backdrop-blur-xs"
          />

          {/* Horizontal Split Modal (Clean, Zero Top Border) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[740px] max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-[0_24px_70px_rgba(21,47,74,0.30)] grid grid-cols-1 md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Close login modal"
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-primary shadow-xs border border-slate-200/80 flex items-center justify-center transition-colors cursor-pointer"
            >
              <XMarkIcon className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* LEFT COLUMN: AUTH FORM */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                {/* Logo */}
                <img
                  src={Logo}
                  alt="IRS Tax Filer"
                  className="h-9 w-auto object-contain mb-5"
                />

                {/* Title & Subtitle */}
                <h2
                  id="login-modal-title"
                  className="text-xl sm:text-[22px] font-semibold text-[#1F4264] tracking-tight leading-snug"
                >
                  {step === "email" && (
                    <>
                      Client Portal{" "}
                      <span className="text-[#127EAB]">Sign In</span>
                    </>
                  )}
                  {step === "otp" && (
                    <>
                      Verify <span className="text-[#127EAB]">Email Code</span>
                    </>
                  )}
                  {step === "register" && (
                    <>
                      Complete <span className="text-[#127EAB]">Profile</span>
                    </>
                  )}
                </h2>
                <p className="text-[13px] text-slate-500 font-medium mt-1 leading-relaxed">
                  {step === "email" &&
                    "Sign in securely using a 6-digit email verification code."}
                  {step === "otp" && (
                    <>
                      Code sent to{" "}
                      <span className="text-[#1F4264] font-semibold break-all">
                        {email}
                      </span>
                    </>
                  )}
                  {step === "register" &&
                    "Complete your details to access your dashboard."}
                </p>

                {/* Error Banner */}
                {error && (
                  <div className="mt-4 flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                {/* STEP 1: EMAIL */}
                {step === "email" && (
                  <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor="modal-login-email"
                        className="block text-xs font-semibold text-[#1F4264] mb-1.5"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="modal-login-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                          }}
                          placeholder="name@example.com"
                          required
                          autoFocus
                          className="w-full pl-10 pr-3.5 py-2.5 text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-xs placeholder:font-normal placeholder:text-slate-400 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#1F4264] hover:bg-[#127EAB] text-white text-sm font-semibold shadow-xs transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Code...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Secure OTP</span>
                          <ArrowRightIcon className="w-4 h-4 stroke-[2.2]" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 2: VERIFY OTP */}
                {step === "otp" && (
                  <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                    <div className="grid grid-cols-6 gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={handleOtpPaste}
                          className="w-full h-11 text-center text-base font-semibold text-[#1F4264] bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:border-[#127EAB] focus:ring-2 focus:ring-[#127EAB]/20 focus:outline-none transition-all"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.join("").length !== 6}
                      className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#1F4264] hover:bg-[#127EAB] text-white text-sm font-semibold shadow-xs transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify &amp; Continue</span>
                          <ArrowRightIcon className="w-4 h-4 stroke-[2.2]" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between pt-1 text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("email");
                          setOtp(["", "", "", "", "", ""]);
                          setError("");
                        }}
                        className="inline-flex items-center gap-1 text-slate-500 hover:text-[#1F4264] transition-colors cursor-pointer"
                      >
                        <ArrowLeftIcon className="w-3.5 h-3.5" />
                        <span>Change email</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || loading}
                        className="text-[#127EAB] hover:text-[#1F4264] font-semibold disabled:text-slate-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        {resendTimer > 0
                          ? `Resend in ${resendTimer}s`
                          : "Resend Code"}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: NEW USER REGISTRATION */}
                {step === "register" && (
                  <form
                    onSubmit={handleCompleteRegister}
                    className="mt-5 space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#1F4264] mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={regData.firstName}
                            onChange={(e) =>
                              setRegData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            placeholder="First name"
                            required
                            className="w-full pl-9 pr-2.5 py-2 text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-xs placeholder:font-normal placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1F4264] mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={regData.lastName}
                          onChange={(e) =>
                            setRegData((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          placeholder="Last name"
                          required
                          className="w-full px-3 py-2 text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-xs placeholder:font-normal placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1F4264] mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          value={regData.mobileNumber}
                          onChange={(e) =>
                            setRegData((prev) => ({
                              ...prev,
                              mobileNumber: e.target.value,
                            }))
                          }
                          placeholder="10-digit mobile number"
                          required
                          className="w-full pl-9 pr-3 py-2 text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-xs placeholder:font-normal placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1F4264] mb-1">
                        Referral Code{" "}
                        <span className="text-slate-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <div className="relative">
                        <TicketIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={regData.referralCode}
                          onChange={(e) =>
                            setRegData((prev) => ({
                              ...prev,
                              referralCode: e.target.value,
                            }))
                          }
                          placeholder="Enter referral code"
                          className="w-full pl-9 pr-3 py-2 text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-xs placeholder:font-normal placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#1F4264] hover:bg-[#127EAB] text-white text-sm font-semibold shadow-xs transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Setting up account...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete Sign Up</span>
                          <ArrowRightIcon className="w-4 h-4 stroke-[2.2]" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Quiet Security Line */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium">
                <ShieldCheckIcon className="w-4 h-4 text-[#127EAB] shrink-0" />
                <span>256-Bit SSL Encrypted • Passwordless Sign-In</span>
              </div>
            </div>

            {/* RIGHT COLUMN: CLEAN ANIMATED VISUAL */}
            <div className="hidden md:flex md:col-span-6 bg-[#EEF6FA] items-center justify-center p-5 relative overflow-hidden">
              <img
                src={loginAnimGif}
                alt="IRS Tax Filer Secure Portal"
                className="w-full h-full max-h-[340px] object-contain rounded-2xl select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
