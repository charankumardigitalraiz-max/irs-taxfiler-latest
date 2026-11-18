import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { submitWebsiteForm } from "../services/formApi";
import { gettoken } from "../helper/Token";

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "";
  const parsed = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const padTwo = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");

const calculateCountdown = (startDateStr, untilDateStr) => {
  if (!untilDateStr) {
    return { status: "none", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const now = Date.now();
  const startTarget = startDateStr
    ? new Date(`${startDateStr}T00:00:00`).getTime()
    : null;
  const endTarget = new Date(`${untilDateStr}T23:59:59`).getTime();

  if (Number.isNaN(endTarget)) {
    return { status: "none", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let status = "active";
  let diff = endTarget - now;

  if (startTarget && !Number.isNaN(startTarget) && now < startTarget) {
    status = "upcoming";
    diff = startTarget - now;
  } else if (diff <= 0) {
    return { status: "expired", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { status, days, hours, minutes, seconds };
};

const AdvancedFilingModal = ({ isOpen, onClose, offerData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    filingType: "Individual Tax Return (Form 1040)",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(offerData?.startDate, offerData?.untilDate)
  );

  const offerPercentage = Number(offerData?.offerPercentage) || 0;
  const startDate = formatDisplayDate(offerData?.startDate);
  const untilDate = formatDisplayDate(offerData?.untilDate);
  const isExpired = countdown.status === "expired";

  // Live 1-second countdown tick while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const updateTimer = () => {
      setCountdown(
        calculateCountdown(offerData?.startDate, offerData?.untilDate)
      );
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [isOpen, offerData?.startDate, offerData?.untilDate]);

  const handleClose = useCallback(() => {
    setSubmitError("");
    setSubmitSuccess(false);
    setErrors({});
    onClose();
  }, [onClose]);

  // Close on ESC and lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, handleClose]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9+\-\s()]/g, "");
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length > 15) return;
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Valid email address is required";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      newErrors.phone = "Valid phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isExpired) {
      setSubmitError("This offer has expired.");
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const offerSummary =
        offerPercentage > 0
          ? `${offerPercentage}% OFF Express Tax Filing Offer`
          : "Express Tax Filing Slot";
      const dateRange =
        startDate || untilDate
          ? `${startDate || "Now"} to ${untilDate || "End of Season"}`
          : "Active Window";

      await submitWebsiteForm("contact-message", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: `Express Tax Filing (${offerSummary})`,
        message: `Express Tax Filing Reservation — Category: ${formData.filingType} | Offer: ${offerSummary} | Window: ${dateRange}`,
      });

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        filingType: "Individual Tax Return (Form 1040)",
      });
    } catch (err) {
      setSubmitError(
        err.message || "Unable to submit right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const timerUnits = [
    { label: "Days", value: padTwo(countdown.days) },
    { label: "Hrs", value: padTwo(countdown.hours) },
    { label: "Min", value: padTwo(countdown.minutes) },
    { label: "Sec", value: padTwo(countdown.seconds) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-5 font-sans antialiased"
          role="dialog"
          aria-modal="true"
          aria-labelledby="advanced-filing-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#152F4A]/65 backdrop-blur-xs"
          />

          {/* Compact Horizontal Split Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[740px] max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-slate-200/90 shadow-[0_24px_65px_rgba(21,47,74,0.30)] grid grid-cols-1 md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 md:bg-slate-100 hover:bg-white/30 md:hover:bg-slate-200 text-white md:text-slate-600 flex items-center justify-center transition-colors cursor-pointer z-20"
            >
              <XMarkIcon className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* LEFT COLUMN: ONLY OFFER TITLE, DISCOUNT, DATE & LIVE TIMER */}
            <div className="md:col-span-5 relative bg-gradient-to-br from-[#16314A] via-[#1F4264] to-[#127EAB] p-6 sm:p-7 text-white flex flex-col justify-center overflow-hidden">
              <div className="absolute -top-16 -right-14 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-14 w-44 h-44 bg-[#EE6450]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {offerPercentage > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EE6450] text-white text-xs font-semibold shadow-xs mb-3.5">
                    {offerPercentage}% OFF
                  </span>
                )}

                <h2
                  id="advanced-filing-modal-title"
                  className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-snug pr-8 md:pr-0"
                >
                  Express Tax Filing
                </h2>

                {(startDate || untilDate) && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-sky-100/90 font-medium mt-2">
                    <CalendarDaysIcon className="w-4 h-4 text-[#7DD3FC] shrink-0" />
                    <span>
                      {startDate ? `${startDate}` : "Now"}
                      {untilDate ? ` – ${untilDate}` : ""}
                    </span>
                  </div>
                )}

                {/* Live Countdown Timer */}
                {countdown.status !== "none" && (
                  <div className="mt-5 p-3.5 rounded-2xl bg-white/[0.09] border border-white/15 backdrop-blur-xs">
                    {isExpired ? (
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-200">
                        <ClockIcon className="w-4 h-4 shrink-0" />
                        <span>This offer has ended.</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-sky-100/90 mb-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#EE6450] animate-pulse" />
                          <span>
                            {countdown.status === "upcoming"
                              ? "Offer Starts In"
                              : "Offer Ends In"}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {timerUnits.map((unit) => (
                            <div
                              key={unit.label}
                              className="py-2.5 px-1 rounded-xl bg-white/15 border border-white/20 text-center"
                            >
                              <div className="font-mono text-base font-semibold text-white leading-none tabular-nums">
                                {unit.value}
                              </div>
                              <div className="text-[9.5px] uppercase tracking-wider text-sky-100/80 font-medium mt-1 leading-none">
                                {unit.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: CLEAN COMPACT FORM */}
            <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-center bg-white">
              {submitSuccess ? (
                <div className="text-center py-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3.5">
                    <CheckCircleIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F4264] mb-1.5">
                    Slot Reserved!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F7F8E] font-medium leading-relaxed max-w-xs mx-auto mb-5">
                    Your{" "}
                    {offerPercentage > 0 ? (
                      <span className="text-[#127EAB] font-semibold">
                        {offerPercentage}% discount
                      </span>
                    ) : (
                      "express filing slot"
                    )}{" "}
                    is locked in. Our CPA team will contact you shortly.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {gettoken() === true ? (
                      <Link
                        to="/client/dashboard"
                        onClick={handleClose}
                        className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#1F4264] hover:bg-[#152F4A] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
                      >
                        <span>Go to Dashboard</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          handleClose();
                          window.dispatchEvent(new CustomEvent("openLoginModal"));
                        }}
                        className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#1F4264] hover:bg-[#152F4A] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        <span>Sign In</span>
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleClose}
                      className="h-10 px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-1 md:pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="adv-name"
                        className="block text-xs font-semibold text-[#1F4264] mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="adv-name"
                          type="text"
                          disabled={isExpired}
                          value={formData.name}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                            if (errors.name)
                              setErrors((prev) => ({ ...prev, name: "" }));
                          }}
                          placeholder="Your full name"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400 transition-all disabled:opacity-60"
                        />
                      </div>
                      {errors.name && (
                        <span className="text-[11px] text-red-500 mt-0.5 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="adv-phone"
                        className="block text-xs font-semibold text-[#1F4264] mb-1"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="adv-phone"
                          type="tel"
                          disabled={isExpired}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="+1 (404) 424-4191"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400 transition-all disabled:opacity-60"
                        />
                      </div>
                      {errors.phone && (
                        <span className="text-[11px] text-red-500 mt-0.5 block">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="adv-email"
                      className="block text-xs font-semibold text-[#1F4264] mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="adv-email"
                        type="email"
                        disabled={isExpired}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                          if (errors.email)
                            setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400 transition-all disabled:opacity-60"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-[11px] text-red-500 mt-0.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Filing Type */}
                  <div>
                    <label
                      htmlFor="adv-filing-type"
                      className="block text-xs font-semibold text-[#1F4264] mb-1"
                    >
                      Filing Category
                    </label>
                    <div className="relative">
                      <DocumentTextIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="adv-filing-type"
                        disabled={isExpired}
                        value={formData.filingType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            filingType: e.target.value,
                          }))
                        }
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 font-medium bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] transition-all disabled:opacity-60"
                      >
                        <option value="Individual Tax Return (Form 1040)">
                          Individual Tax Return (Form 1040)
                        </option>
                        <option value="Non-Resident Return (Form 1040-NR)">
                          Non-Resident Return (Form 1040-NR)
                        </option>
                        <option value="Small Business / LLC / Corp">
                          Small Business / LLC / Corp
                        </option>
                        <option value="FBAR & FATCA Compliance">
                          FBAR &amp; FATCA Compliance
                        </option>
                        <option value="Indian & NRI Tax Filing">
                          Indian &amp; NRI Tax Filing
                        </option>
                      </select>
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {submitError}
                    </div>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={submitting || isExpired}
                    className="w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-[#1F4264] via-[#194E72] to-[#127EAB] hover:from-[#16314A] hover:to-[#0E668B] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                  >
                    <span>
                      {isExpired
                        ? "Offer Ended"
                        : submitting
                        ? "Reserving..."
                        : offerPercentage > 0
                        ? `Claim ${offerPercentage}% Off`
                        : "Reserve Express Filing"}
                    </span>
                    {!submitting && !isExpired && (
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedFilingModal;
