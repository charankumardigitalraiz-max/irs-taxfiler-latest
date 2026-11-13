import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  XMarkIcon,
  ChevronDownIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaSlack } from "react-icons/fa";
import logo from "/irs-logo.webp";
import taxAnimationGif from "../assets/tax-consultation-anim.gif";
import consultIllustration from "../assets/cpa-tax-consultation-stats.jpg";
import { submitWebsiteForm } from "../services/formApi";

/* ---------- CRISP SVG COUNTRY FLAGS / LOGOS ---------- */
const UsFlag = ({ className = "w-5 h-3.5 rounded-xs shrink-0" }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="United States Flag">
    <g fillRule="evenodd">
      <path fill="#bd3d44" d="M0 0h640v480H0z" />
      <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129h640M0 203h640M0 277h640M0 351h640M0 424.5h640" />
      <path fill="#192f5d" d="M0 0h260v260H0z" />
      <circle cx="50" cy="50" r="10" fill="#fff" />
      <circle cx="130" cy="50" r="10" fill="#fff" />
      <circle cx="210" cy="50" r="10" fill="#fff" />
      <circle cx="90" cy="90" r="10" fill="#fff" />
      <circle cx="170" cy="90" r="10" fill="#fff" />
      <circle cx="50" cy="130" r="10" fill="#fff" />
      <circle cx="130" cy="130" r="10" fill="#fff" />
      <circle cx="210" cy="130" r="10" fill="#fff" />
      <circle cx="90" cy="170" r="10" fill="#fff" />
      <circle cx="170" cy="170" r="10" fill="#fff" />
      <circle cx="50" cy="210" r="10" fill="#fff" />
      <circle cx="130" cy="210" r="10" fill="#fff" />
      <circle cx="210" cy="210" r="10" fill="#fff" />
    </g>
  </svg>
);

const InFlag = ({ className = "w-5 h-3.5 rounded-xs shrink-0" }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="India Flag">
    <path fill="#ff9933" d="M0 0h640v160H0z" />
    <path fill="#ffffff" d="M0 160h640v160H0z" />
    <path fill="#138808" d="M0 320h640v160H0z" />
    <g transform="translate(320 240)">
      <circle r="44" fill="none" stroke="#000080" strokeWidth="6" />
      <circle r="9" fill="#000080" />
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="-42"
          y1="0"
          x2="42"
          y2="0"
          stroke="#000080"
          strokeWidth="3.2"
          transform={`rotate(${i * 15})`}
        />
      ))}
    </g>
  </svg>
);

const UkFlag = ({ className = "w-5 h-3.5 rounded-xs shrink-0" }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="United Kingdom Flag">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path stroke="#fff" strokeWidth="60" d="M0 0l640 480M640 0L0 480" />
    <path stroke="#c8102e" strokeWidth="36" d="M0 0l640 480M640 0L0 480" />
    <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640" />
    <path stroke="#c8102e" strokeWidth="60" d="M320 0v480M0 240h640" />
  </svg>
);

const AuFlag = ({ className = "w-5 h-3.5 rounded-xs shrink-0" }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="Australia Flag">
    <path fill="#00008b" d="M0 0h640v480H0z" />
    <g transform="scale(0.5)">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path stroke="#fff" strokeWidth="60" d="M0 0l640 480M640 0L0 480" />
      <path stroke="#c8102e" strokeWidth="36" d="M0 0l640 480M640 0L0 480" />
      <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640" />
      <path stroke="#c8102e" strokeWidth="60" d="M320 0v480M0 240h640" />
    </g>
    <circle cx="160" cy="360" r="30" fill="#fff" />
    <circle cx="480" cy="110" r="12" fill="#fff" />
    <circle cx="530" cy="200" r="12" fill="#fff" />
    <circle cx="480" cy="360" r="12" fill="#fff" />
    <circle cx="430" cy="240" r="12" fill="#fff" />
    <circle cx="495" cy="255" r="8" fill="#fff" />
  </svg>
);

const CaFlag = ({ className = "w-5 h-3.5 rounded-xs shrink-0" }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="Canada Flag">
    <path fill="#d80027" d="M0 0h160v480H0zM480 0h160v480H480z" />
    <path fill="#ffffff" d="M160 0h320v480H160z" />
    <path
      fill="#d80027"
      d="M320 110l18 36 26-10-8 30 34 8-16 26 26 18-36 12 6 36-34-18-16 46h-10l-16-46-34 18 6-36-36-12 26-18-16-26 34-8-8-30 26 10z"
    />
  </svg>
);

// Flag Component Dispatcher
const CountryFlag = ({ code, className = "w-5 h-3.5 rounded-xs shrink-0 shadow-2xs" }) => {
  switch (code) {
    case "+1":
      return <UsFlag className={className} />;
    case "+91":
      return <InFlag className={className} />;
    case "+44":
      return <UkFlag className={className} />;
    case "+61":
      return <AuFlag className={className} />;
    case "+1-CA":
      return <CaFlag className={className} />;
    default:
      return <UsFlag className={className} />;
  }
};

const countryOptions = [
  { code: "+1", label: "+1 (US)", country: "United States" },
  { code: "+91", label: "+91 (IN)", country: "India" },
  { code: "+44", label: "+44 (UK)", country: "United Kingdom" },
  { code: "+61", label: "+61 (AU)", country: "Australia" },
  { code: "+1-CA", label: "+1 (CA)", country: "Canada" },
];

/* ---------- CLIENT TESTIMONIALS ---------- */
const reviews = [
  {
    name: "Rahul Sharma",
    role: "IT Professional, Dallas TX",
    comment: "Maximum refund & super smooth filing experience with their CPA team!",
    img: "https://randomuser.me/api/portraits/men/80.jpg",
  },
  {
    name: "Priya Iyer",
    role: "Software Consultant, San Jose CA",
    comment: "Extremely professional team. Handled my FBAR & multi-state taxes seamlessly.",
    img: "https://randomuser.me/api/portraits/women/81.jpg",
  },
  {
    name: "Amit Verma",
    role: "Business Owner, Atlanta GA",
    comment: "Expert CPA tax advisory. Saved our business thousands in tax credits!",
    img: "https://randomuser.me/api/portraits/men/82.jpg",
  },
];

export default function LeadModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [index, setIndex] = useState(0);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);

  // Rotate client reviews
  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [open]);

  // Click outside listener for country dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll and handle Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+1",
    mobileNumber: "",
    timeZone: "EST",
    bestTimeToConnect: "Morning",
    formType: "consultantform",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setSubmitError("Please fill in all required fields (Name & Email).");
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const submitData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        countryCode: formData.countryCode,
        mobileNumber: formData.mobileNumber.trim(),
        preferredTime: `${formData.timeZone} - ${formData.bestTimeToConnect}`,
      };

      await submitWebsiteForm("connect-expert", submitData);
      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          countryCode: "+1",
          mobileNumber: "",
          timeZone: "EST",
          bestTimeToConnect: "Morning",
          formType: "consultantform",
        });
        setSubmitSuccess(false);
        onClose();
      }, 1800);
    } catch (error) {
      setSubmitError(error.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  const review = reviews[index];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="bg-white w-[94%] max-w-4xl rounded-3xl shadow-[0_25px_80px_rgba(10,73,115,0.22)] overflow-hidden flex flex-col md:flex-row relative my-auto max-h-[92vh] border border-slate-100"
      >
        {/* Sleek Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs group"
        >
          <XMarkIcon className="w-4.5 h-4.5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* ================= LEFT SIDE: FULL HEIGHT & WIDTH ANIMATION GIF ================= */}
        <div className="w-full md:w-5/12 relative bg-slate-900 overflow-hidden flex flex-col justify-between shrink-0 min-h-[260px] md:min-h-full">
          {/* Complete Height & Width Animation GIF Image */}
          <img
            src={taxAnimationGif}
            alt="Tax Consultation Animation"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Subtle gradient vignette to blend seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/35 pointer-events-none" />

          {/* Minimal Floating Brand Badge at Top */}
          <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
            <img
              src={logo}
              alt="IRS Tax Filer"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-md bg-white/95 backdrop-blur-md rounded-lg px-2 py-1 shadow-xs"
            />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Certified CPA Advisory</span>
            </span>
          </div>

          {/* Minimal Floating Trust Strip at Bottom */}
          <div className="relative z-10 p-4 sm:p-5">
            <div className="bg-black/55 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2.5 text-white flex items-center justify-between text-xs shadow-lg">
              <span className="font-semibold text-emerald-300">100% Free Consultation</span>
              <span className="text-slate-300 text-[11px]">Zero Obligation</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: COMPACT, SLEEK FORM ================= */}
        <div className="w-full md:w-7/12 p-5 sm:p-6 lg:p-7 bg-white flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header with Brand Gradient */}
            <div className="mb-3 pr-6">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#165479] text-[11px] font-semibold mb-1 border border-sky-100">
                <SparklesIcon className="w-3.5 h-3.5 text-[#749220]" />
                100% Free Consultation • No Obligation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#165479] via-[#1b5e85] to-[#749220] bg-clip-text text-transparent tracking-tight">
                Connect With A Tax Expert
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Leave your details below and a certified CPA will reach out at your convenience.
              </p>
            </div>

            {/* Error & Success Feedback */}
            {submitError && (
              <div className="mb-2.5 p-2 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>{submitError}</span>
              </div>
            )}
            {submitSuccess && (
              <div className="mb-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Form submitted successfully! Our tax expert will contact you shortly.</span>
              </div>
            )}

            {/* Form with Sleek Inset Micro-Labels */}
            <form className="space-y-2.5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-[#165479] focus-within:ring-2 focus-within:ring-[#165479]/15 transition-all shadow-2xs">
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="e.g. Michael Smith"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none"
                />
              </div>

              {/* Flex Row: Email Address & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Email Address */}
                <div className="border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-[#165479] focus-within:ring-2 focus-within:ring-[#165479]/15 transition-all shadow-2xs">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="e.g. michael@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none"
                  />
                </div>

                {/* Mobile Number with Country Flag Selector */}
                <div className="border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-[#165479] focus-within:ring-2 focus-within:ring-[#165479]/15 transition-all shadow-2xs">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-1">
                    Mobile Number
                  </label>
                  <div className="flex items-center gap-1.5">
                    {/* Country Code Trigger */}
                    <div className="relative shrink-0" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-1 py-0.5 pr-1.5 border-r border-slate-200 text-slate-800 hover:text-[#165479] transition-colors cursor-pointer select-none"
                        aria-haspopup="listbox"
                        aria-expanded={isCountryDropdownOpen}
                        title="Select country code"
                      >
                        <CountryFlag
                          code={formData.countryCode}
                          className="w-4 h-3 rounded-xs shrink-0 shadow-2xs"
                        />
                        <span className="text-xs font-semibold text-slate-800">
                          {formData.countryCode === "+1-CA" ? "+1" : formData.countryCode}
                        </span>
                        <ChevronDownIcon
                          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                            isCountryDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Options */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1.5 w-48 sm:w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden animate-fadeIn">
                          {countryOptions.map((opt) => (
                            <button
                              key={opt.code}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, countryCode: opt.code }));
                                setIsCountryDropdownOpen(false);
                              }}
                              className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                                formData.countryCode === opt.code
                                  ? "bg-sky-50 text-[#165479] font-bold"
                                  : "hover:bg-slate-50 text-slate-700"
                              }`}
                            >
                              <CountryFlag
                                code={opt.code}
                                className="w-4.5 h-3 rounded-xs shrink-0 shadow-2xs"
                              />
                              <span className="font-semibold text-slate-900">{opt.label}</span>
                              <span className="text-[11px] text-slate-500 ml-auto truncate">
                                {opt.country}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <input
                      name="mobileNumber"
                      type="tel"
                      placeholder="Phone number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full min-w-0 bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Flex Row: Time Zone & Best Time to Connect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-[#165479] focus-within:ring-2 focus-within:ring-[#165479]/15 transition-all shadow-2xs">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-1">
                    Time Zone
                  </label>
                  <div className="relative">
                    <select
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleChange}
                      className="w-full appearance-none bg-transparent text-xs sm:text-sm text-slate-800 font-medium focus:outline-none cursor-pointer pr-6"
                    >
                      <option value="EST">EST (Eastern Time)</option>
                      <option value="CST">CST (Central Time)</option>
                      <option value="MST">MST (Mountain Time)</option>
                      <option value="PST">PST (Pacific Time)</option>
                      <option value="IST">IST (India Standard)</option>
                      <option value="GMT">GMT (UK / Europe)</option>
                    </select>
                    <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="relative border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-[#165479] focus-within:ring-2 focus-within:ring-[#165479]/15 transition-all shadow-2xs">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider leading-none mb-1">
                    Best Time
                  </label>
                  <div className="relative">
                    <select
                      name="bestTimeToConnect"
                      value={formData.bestTimeToConnect}
                      onChange={handleChange}
                      className="w-full appearance-none bg-transparent text-xs sm:text-sm text-slate-800 font-medium focus:outline-none cursor-pointer pr-6"
                    >
                      <option value="Morning">Morning (9 AM – 12 PM)</option>
                      <option value="Afternoon">Afternoon (12 PM – 4 PM)</option>
                      <option value="Evening">Evening (4 PM – 8 PM)</option>
                      <option value="Anytime">Anytime during hours</option>
                    </select>
                    <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading || submitSuccess}
                className="w-full mt-1 py-2.5 sm:py-3 px-5 rounded-xl font-bold text-white text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg bg-gradient-to-r from-[#165479] via-[#1b5e85] to-[#749220] hover:from-[#114261] hover:to-[#5e7719] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.99]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting Request...</span>
                  </span>
                ) : (
                  <>
                    <span>Get Free Consultation</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ROTATING CLIENT REVIEW CARD */}
          <div className="mt-3 p-2.5 sm:p-3 bg-gradient-to-r from-sky-50/60 to-emerald-50/50 border border-slate-200/80 rounded-2xl overflow-hidden min-h-[64px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 w-full"
              >
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-emerald-400 shrink-0 shadow-2xs"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-3 h-3 text-amber-400" />
                    ))}
                    <span className="text-[10px] text-emerald-700 font-bold ml-1.5">Verified Client</span>
                  </div>
                  <p className="text-xs font-semibold text-[#165479] truncate">
                    "{review.comment}"
                  </p>
                  <span className="text-[11px] text-slate-500 block truncate">
                    — {review.name} <span className="text-[10px] text-slate-400">({review.role})</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Privacy Footnote */}
          <div className="mt-1.5 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <LockClosedIcon className="w-3 h-3 text-slate-400 shrink-0" />
            <span>256-Bit SSL Encrypted • 100% Confidential • Privacy Protected</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
