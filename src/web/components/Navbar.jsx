import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/irs-logo.png";
import { useNavigate } from "react-router-dom";
import LeadModal from "../components/popup";

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  ArrowLeftIcon,
  ClockIcon,
  DocumentTextIcon,
  BanknotesIcon,
  UserGroupIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CreditCardIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import "./Navbar.css";

import { gettoken, getuser } from "../helper/Token";

/* ---------- CRISP SVG FLAGS ---------- */
const UsFlag = ({ className = "w-4 h-3 rounded-xs shrink-0" }) => (
  <svg viewBox="0 0 640 480" className={className} aria-label="USA Flag">
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

const InFlag = ({ className = "w-4 h-3 rounded-xs shrink-0" }) => (
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [activeServiceTab, setActiveServiceTab] = useState("individual");
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  // const user = useSelector((state) => state.auth.user);

  const [isContactStripOpen, setIsContactStripOpen] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    navigate("/login"); // redirect to logi};
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Using solid primary color instead of gradient
  const navTextColor = `text-[#165479]`; /* Primary color - solid, no gradient */

  return (
    <>
      {/* Full-Width Bottom Contact & Quick Utilities Bar */}
      <div className="fixed bottom-0 inset-x-0 w-full z-50 font-sans pointer-events-auto">
        <AnimatePresence mode="wait">
          {isContactStripOpen ? (
            <motion.div
              key="contact-bar-full"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#0A4973] text-white border-t border-white/20  py-2 px-3 sm:px-6"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
                {/* Left: Contact Numbers & Channels */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {/* US Phone */}
                  <a
                    href="tel:+14044244191"
                    className="h-9 px-3 rounded-full bg-[#749220] hover:bg-[#84a724] text-white flex items-center gap-2 transition-all duration-200 shadow-sm font-semibold text-xs sm:text-sm shrink-0 group/call cursor-pointer"
                    title="Call US: +1 (404) 424-4191"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover/call:scale-110 transition-transform">
                      <PhoneIcon className="w-3.5 h-3.5 group-hover/call:rotate-12 transition-transform" />
                    </div>
                    {/* <UsFlag className="w-4.5 h-3 rounded-xs shrink-0 shadow-2xs" /> */}
                    <span className="tracking-tight whitespace-nowrap">US: +1 (404) 424-4191</span>
                  </a>

                  {/* India Phone */}
                  <a
                    href="tel:+919052333667"
                    className="h-9 px-3 rounded-full  hover:bg-[#749220] text-white flex items-center gap-2 transition-all duration-200 shadow-sm font-semibold text-xs sm:text-sm shrink-0 group/in cursor-pointer "
                    title="Call India: +91 9052 333 667/668"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover/in:scale-110 transition-transform">
                      <PhoneIcon className="w-3.5 h-3.5 group-hover/in:rotate-12 transition-transform" />
                    </div>
                    {/* <InFlag className="w-4.5 h-3 rounded-xs shrink-0 shadow-2xs" /> */}
                    <span className="tracking-tight whitespace-nowrap">India: +91 9052 333 667/668</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919052333667?text=Hi%20IRS%20Tax%20Filer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 px-3 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center gap-1.5 transition-all duration-200 shadow-sm font-semibold text-xs shrink-0 border border-white/15"
                    title="WhatsApp Support: +91 9052 333 667/668"
                  >
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    <span className="hidden md:inline">WhatsApp</span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:contact@irstaxfiler.com"
                    className="hidden xl:inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white font-medium transition-colors ml-1"
                    title="Email: contact@irstaxfiler.com"
                  >
                    <EnvelopeIcon className="w-4 h-4 text-lime-300" />
                    <span>contact@irstaxfiler.com</span>
                  </a>
                </div>

                {/* Right: Actions & Close */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                  {/* Schedule Consultation */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="h-9 px-3.5 sm:px-4 rounded-full bg-gradient-to-r from-[#749220] to-[#5e7719] hover:from-[#84a724] hover:to-[#749220] text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>Free Consultation</span>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => window.open('https://www.paypal.com/ncp/payment/9AWG5USG2AUDU', '_blank')}
                    className="h-9 px-3 sm:px-4 rounded-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <CreditCardIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Pay with</span> PayPal
                  </button>

                  {/* Close Bar */}
                  <button
                    onClick={() => setIsContactStripOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white/80 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer ml-1"
                    title="Minimize bar"
                    aria-label="Minimize bar"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact-bar-collapsed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pb-3 flex justify-center"
            >
              <div className="bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] text-white p-1.5 sm:p-2 pl-3 pr-4 rounded-full shadow-[0_8px_30px_rgba(10,73,115,0.45)] border border-white/25 transition-all flex items-center gap-3">
                <a
                  href="tel:+14044244191"
                  className="flex items-center gap-2 group/us cursor-pointer"
                  title="Call US: +1 (404) 424-4191"
                >
                  <div className="w-7 h-7 rounded-full bg-[#749220] group-hover/us:bg-[#84a724] text-white flex items-center justify-center transition-all group-hover/us:scale-110 shadow-sm">
                    <PhoneIcon className="w-3.5 h-3.5" />
                  </div>
                  <UsFlag className="w-4.5 h-3 rounded-xs shrink-0 shadow-2xs" />
                  <span className="text-xs sm:text-sm font-bold tracking-tight text-white whitespace-nowrap">
                    US: +1 (404) 424-4191
                  </span>
                </a>

                <div className="h-4 w-[1px] bg-white/25 hidden sm:block" />

                <a
                  href="tel:+919052333667"
                  className="hidden sm:flex items-center gap-2 group/in cursor-pointer"
                  title="Call India: +91 9052 333 667/668"
                >
                  <InFlag className="w-4.5 h-3 rounded-xs shrink-0 shadow-2xs" />
                  <span className="text-xs font-semibold text-lime-200 whitespace-nowrap">
                    India: +91 9052 333 667/668
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsContactStripOpen(true)}
                  className="text-[11px] font-semibold bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full text-white transition-all cursor-pointer whitespace-nowrap ml-1 flex items-center gap-1"
                >
                  <span>Quick Bar</span>
                  <span>&uarr;</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LeadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Main Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`main-nav z-[1000] transition-all duration-300 ${isScrolled
          ? "shadow-md bg-white border-b border-gray-100"
          : "bg-white shadow-none border-b border-transparent"
          }`}
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/"
                className="flex items-center cursor-pointer space-x-2"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {/* Oirstax Logo - Using actual image file */}
                <img
                  src={Logo}
                  alt="Oirstax Logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4 font-sans">
              {/* Services Dropdown - Modern Lightweight Mega-Menu */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown("services")}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link
                  to="/services"
                  className={`group relative inline-flex items-center gap-1.5 py-1.5 px-2 text-sm font-medium transition-colors duration-200 ${location.pathname.startsWith("/services") || showDropdown === "services"
                    ? "text-[#749220]"
                    : "text-gray-700 hover:text-[#749220]"
                    }`}
                >
                  <span>Services</span>
                  <ChevronDownIcon
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${showDropdown === "services" ? "rotate-180 text-[#749220]" : "text-gray-400 group-hover:text-[#749220]"
                      }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#749220] rounded-full transition-all duration-200 ${location.pathname.startsWith("/services") || showDropdown === "services"
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left"
                      }`}
                  />
                </Link>

                <AnimatePresence>
                  {showDropdown === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.99 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-full -left-16 lg:-left-24 mt-2 bg-white rounded-2xl shadow-[0_20px_60px_rgba(22,84,121,0.12),0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sm:p-7 z-[1100] w-[900px] lg:w-[940px]"
                      style={{ backgroundColor: "#ffffff" }}
                      onMouseEnter={() => setShowDropdown("services")}
                      onMouseLeave={() => setShowDropdown(null)}
                    >
                      <div className="grid grid-cols-3 gap-7 lg:gap-8">
                        {/* Column 1: US Individual Tax */}
                        <div>
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100">
                            <span className="text-xs font-semibold text-gray-900 tracking-tight">Individual Tax</span>
                            <span className="text-[10px] text-sky-700 bg-sky-50 border border-sky-200/60 px-2 py-0.5 rounded-full font-medium">Form 1040</span>
                          </div>

                          <div className="space-y-1">
                            <Link
                              to="/services/us-individual/federal-state-local"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl  hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-sky-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="2.5" width="14" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <rect x="5.5" y="4.5" width="4.5" height="1.8" rx="0.5" fill="currentColor" />
                                  <line x1="5.5" y1="8.5" x2="14.5" y2="8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <line x1="5.5" y1="11.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <circle cx="14" cy="14" r="3" fill="#10B981" />
                                  <path d="M12.8 14L13.6 14.8L15.2 13.2" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-sky-700 transition-colors leading-tight">
                                Federal, State & Local Tax Filing
                              </span>
                            </Link>

                            <Link
                              to="/services/us-individual/fbar-fatca"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-indigo-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
                                  <ellipse cx="10" cy="10" rx="3.5" ry="7.5" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
                                  <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="currentColor" strokeWidth="1.1" />
                                  <circle cx="14" cy="6" r="2.8" fill="#06B6D4" />
                                  <text x="14" y="8" fill="white" fontSize="4" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">$</text>
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-indigo-700 transition-colors leading-tight">
                                FBAR & FATCA Services
                              </span>
                            </Link>

                            <Link
                              to="/services/us-individual/representation"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-amber-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <path d="M10 2L16.5 4.5V9.5C16.5 13.5 10 17.5 10 17.5C10 17.5 3.5 13.5 3.5 9.5V4.5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                  <circle cx="10" cy="9.5" r="3.2" fill="#F59E0B" />
                                  <path d="M8.5 9.5L9.5 10.5L11.8 8.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-amber-700 transition-colors leading-tight">
                                Representation Services
                              </span>
                            </Link>

                            <Link
                              to="/services/us-individual/itin"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-purple-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="2.5" y="4" width="15" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <circle cx="6.5" cy="8.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
                                  <path d="M4.5 13C4.5 11.8 5.4 11 6.5 11C7.6 11 8.5 11.8 8.5 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                  <rect x="11" y="7" width="4.5" height="2.5" rx="0.5" fill="#F59E0B" />
                                  <line x1="11" y1="12" x2="15.5" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-purple-700 transition-colors leading-tight">
                                ITIN Assistance
                              </span>
                            </Link>

                            <Link
                              to="/services/us-individual/extension"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-orange-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="3.5" width="14" height="13.5" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <path d="M3 7H17" stroke="currentColor" strokeWidth="1.2" />
                                  <circle cx="6.5" cy="2.5" r="1" fill="currentColor" />
                                  <circle cx="13.5" cy="2.5" r="1" fill="currentColor" />
                                  <circle cx="12.5" cy="12.5" r="4" fill="#EA580C" />
                                  <path d="M12.5 10.5V12.5L14 12.5" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-orange-700 transition-colors leading-tight">
                                Extension Filing
                              </span>
                            </Link>

                            <Link
                              to="/services/us-individual/extension"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-rose-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="2.5" width="14" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                  <line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                  <circle cx="14" cy="14" r="3.2" fill="#E11D48" />
                                  <path d="M13 14.5L13.8 13.8L15 15" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
                                  <path d="M14.8 12.2L15.8 13.2" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-rose-700 transition-colors leading-tight">
                                Amendment Filing
                              </span>
                            </Link>
                          </div>
                        </div>

                        {/* Column 2: US Business Tax */}
                        <div>
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100">
                            <span className="text-xs font-semibold text-gray-900 tracking-tight">Business Tax</span>
                            <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full font-medium">LLC & Corp</span>
                          </div>

                          <div className="space-y-1">
                            <Link
                              to="/services/us-business/incorporations"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-blue-700 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="8" width="5.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                  <rect x="8.5" y="3" width="7" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                                  <rect x="10.5" y="5.5" width="1.2" height="1.2" fill="currentColor" />
                                  <rect x="12.5" y="5.5" width="1.2" height="1.2" fill="currentColor" />
                                  <rect x="10.5" y="8.5" width="1.2" height="1.2" fill="currentColor" />
                                  <rect x="12.5" y="8.5" width="1.2" height="1.2" fill="currentColor" />
                                  <circle cx="15.5" cy="14.5" r="2.8" fill="#3B82F6" stroke="white" strokeWidth="1" />
                                  <path d="M14.5 14.5L15.2 15.2L16.5 13.8" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-blue-800 transition-colors leading-tight">
                                US Incorporations
                              </span>
                            </Link>

                            <Link
                              to="/services/us-business/smb-tax-filing"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-emerald-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="11" width="3" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.2" />
                                  <rect x="7.5" y="8" width="3" height="9" rx="0.75" stroke="currentColor" strokeWidth="1.2" />
                                  <rect x="12" y="4" width="3" height="13" rx="0.75" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
                                  <path d="M4.5 9L9 6L14 3M14 3H11M14 3V6" stroke="#059669" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-emerald-700 transition-colors leading-tight">
                                Small & Medium Business Tax Filing
                              </span>
                            </Link>

                            <Link
                              to="/services/us-business/smb-tax-filing"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-teal-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
                                  <path d="M4 16.5C4 13.5 6.7 11.5 10 11.5C13.3 11.5 16 13.5 16 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                  <circle cx="15.5" cy="5.5" r="2.5" fill="#0D9488" />
                                  <path d="M14.8 5.5L15.3 6L16.2 5.1" stroke="white" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-teal-700 transition-colors leading-tight">
                                Consulting with Tax Expert (CPA)
                              </span>
                            </Link>
                          </div>

                          {/* Minimalist Corporate Consultation Card */}
                          <div className="mt-4 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-between gap-3 shadow-2xs">
                            <div className="text-left">
                              <div className="text-xs font-semibold text-gray-900 leading-tight">Corporate CPA Advisory</div>
                              <div className="text-[11px] text-gray-500 font-normal mt-0.5">Free 15-min discovery call</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setShowDropdown(null);
                                setIsModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#165479] hover:bg-[#0A4973] text-white text-[11px] font-medium transition-colors cursor-pointer shrink-0 shadow-2xs"
                            >
                              Book Call
                            </button>
                          </div>
                        </div>

                        {/* Column 3: Indian Tax Services */}
                        <div>
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100">
                            <span className="text-xs font-semibold text-gray-900 tracking-tight">Indian Tax Services</span>
                            <span className="text-[10px] text-orange-700 bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded-full font-medium">ITR & NRI</span>
                          </div>

                          <div className="space-y-1">
                            <Link
                              to="/services/indian/tax-filing"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-orange-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="2.5" width="14" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <rect x="5.5" y="4.5" width="4.5" height="1.8" rx="0.5" fill="currentColor" />
                                  <line x1="5.5" y1="8.5" x2="14.5" y2="8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <line x1="5.5" y1="11.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <circle cx="14" cy="14" r="3" fill="#EA580C" />
                                  <path d="M12.8 14L13.6 14.8L15.2 13.2" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-orange-700 transition-colors leading-tight">
                                Indian Tax Filing
                              </span>
                            </Link>

                            <Link
                              to="/services/indian/representation"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="w-8 h-8 flex items-center justify-center shrink-0 text-red-600 group-hover:scale-110 transition-transform">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <path d="M10 2L16.5 4.5V9.5C16.5 13.5 10 17.5 10 17.5C10 17.5 3.5 13.5 3.5 9.5V4.5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                  <circle cx="10" cy="9.5" r="3.2" fill="#DC2626" />
                                  <path d="M8.5 9.5L9.5 10.5L11.8 8.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-red-700 transition-colors leading-tight">
                                Representation Services
                              </span>
                            </Link>
                          </div>

                          {/* Minimalist NRI Consultation Card */}
                          <div className="mt-4 p-3.5 rounded-xl bg-[#F6F9EE] border border-[#749220]/25 flex items-center justify-between gap-3 shadow-2xs">
                            <div className="text-left">
                              <div className="text-xs font-semibold text-gray-900 leading-tight">NRI & Tax Advisory</div>
                              <div className="text-[11px] text-gray-500 font-normal mt-0.5">Free 15-min discovery call</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setShowDropdown(null);
                                setIsModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#165479] hover:bg-[#0A4973] text-white text-[11px] font-medium transition-colors cursor-pointer shrink-0 shadow-2xs"
                            >
                              Book Call
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Bottom Bar - Clean & Minimal */}
                      <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-normal">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
                          <span>IRS & ITD Authorized e-File Provider • 100% CPA & CA Verified</span>
                        </div>
                        <Link
                          to="/services"
                          onClick={() => setShowDropdown(null)}
                          className="font-medium text-[#165479] hover:text-[#749220] flex items-center gap-1 transition-colors"
                        >
                          <span>Explore All Services</span>
                          <ArrowRightIcon className="w-3.5 h-3.5 stroke-[1.8]" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Tax Resources */}
              <Link
                to="/tax-resources"
                className={`group relative py-1.5 px-2 text-sm font-medium transition-colors duration-200 ${location.pathname === "/tax-resources"
                  ? "text-[#749220]"
                  : "text-gray-700 hover:text-[#749220]"
                  }`}
              >
                <span>Tax Resources</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#749220] rounded-full transition-all duration-200 ${location.pathname === "/tax-resources"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left"
                    }`}
                />
              </Link>

              {/* Pricing */}
              <Link
                to="/pricing"
                className={`group relative py-1.5 px-2 text-sm font-medium transition-colors duration-200 ${location.pathname === "/pricing"
                  ? "text-[#749220]"
                  : "text-gray-700 hover:text-[#749220]"
                  }`}
              >
                <span>Pricing</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#749220] rounded-full transition-all duration-200 ${location.pathname === "/pricing"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left"
                    }`}
                />
              </Link>

              {/* About Us */}
              <Link
                to="/about"
                className={`group relative py-1.5 px-2 text-sm font-medium transition-colors duration-200 ${location.pathname === "/about"
                  ? "text-[#749220]"
                  : "text-gray-700 hover:text-[#749220]"
                  }`}
              >
                <span>About Us</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#749220] rounded-full transition-all duration-200 ${location.pathname === "/about"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left"
                    }`}
                />
              </Link>

              {/* Refer & Earn */}
              <Link
                to="/referrals"
                className={`group relative inline-flex items-center gap-1.5 py-1.5 px-2 text-sm font-medium transition-colors duration-200 ${location.pathname === "/referrals"
                  ? "text-[#749220]"
                  : "text-gray-700 hover:text-[#749220]"
                  }`}
              >
                <GiftIcon className="w-4 h-4 text-[#749220]" />
                <span>Refer & Earn</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#749220] rounded-full transition-all duration-200 ${location.pathname === "/referrals"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left"
                    }`}
                />
              </Link>

              {/* Contact Us */}
              <Link
                to="/contact"
                className={`group relative py-1.5 px-2 text-sm font-medium transition-colors duration-200 ${location.pathname === "/contact"
                  ? "text-[#749220]"
                  : "text-gray-700 hover:text-[#749220]"
                  }`}
              >
                <span>Contact Us</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#749220] rounded-full transition-all duration-200 ${location.pathname === "/contact"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left"
                    }`}
                />
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2" ref={ref}>
              {/* Logged Out UI */}
              {gettoken() === false && (
                <div className="flex hover:underline items-center gap-1 sm:gap-2 font-sans">
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-[#749220] transition-colors"
                  >
                    Sign In / Sign Up
                  </Link>

                </div>
              )}

              {/* ================= LOGGED IN UI ================= */}
              {gettoken() === true && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <button
                      onClick={() => setOpen(!open)}
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#749220] shadow-sm flex items-center justify-center overflow-hidden">
                        {getuser()?.image ? (
                          <img
                            src={baseUrl + "/" + getuser().image}
                            alt={getuser().fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-semibold text-[#749220] text-sm">
                            {getuser()?.fullName?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <span className="text-sm font-medium text-[#EB4149]">
                        {getuser()?.fullName}
                      </span>
                    </button>
                  </motion.div>

                  {/* USER DROPDOWN */}
                  {open && (
                    <div className="absolute right-0 top-14 w-40 bg-white rounded-md shadow-lg border z-50">
                      <Link
                        to="/client/dashboard"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-[#749220]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6 text-[#749220]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6 text-[#749220]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mobile-menu md:hidden left-0 right-0 border-t border-gray-200 z-50"
            style={{ backgroundColor: "#eff6ff" }}
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {/* Services with Collapsible Submenu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg">
                  <Link
                    to="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-base font-medium hover:opacity-70 transition-all duration-200"
                    style={{ color: "#165479" }}
                  >
                    Services
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileServicesOpen(!isMobileServicesOpen);
                    }}
                    className="ml-2 p-1 hover:opacity-70 transition-all duration-200"
                    aria-label="Toggle services submenu"
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""
                        }`}
                      style={{ color: "#165479" }}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pr-2 pt-2 pb-2 space-y-1">
                        {/* US Individual Tax Services */}
                        <div className="mb-3">
                          <h4
                            className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
                            style={{ color: "#6B7280" }}
                          >
                            US Individual Tax Services
                          </h4>
                          <div className="space-y-1">
                            <Link
                              to="/services/us-individual/federal-state-local"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sky-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="2.5" width="14" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <rect x="5.5" y="4.5" width="4.5" height="1.8" rx="0.5" fill="currentColor" />
                                  <line x1="5.5" y1="8.5" x2="14.5" y2="8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <line x1="5.5" y1="11.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <circle cx="14" cy="14" r="3" fill="#10B981" />
                                  <path d="M12.8 14L13.6 14.8L15.2 13.2" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Federal, State & Local Tax Filing
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/fbar-fatca"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-indigo-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
                                  <ellipse cx="10" cy="10" rx="3.5" ry="7.5" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1.5 1.5" />
                                  <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="currentColor" strokeWidth="1.1" />
                                  <circle cx="14" cy="6" r="2.8" fill="#06B6D4" />
                                  <text x="14" y="8" fill="white" fontSize="4" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">$</text>
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                FBAR & FATCA Services
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/representation"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-amber-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <path d="M10 2L16.5 4.5V9.5C16.5 13.5 10 17.5 10 17.5C10 17.5 3.5 13.5 3.5 9.5V4.5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                  <circle cx="10" cy="9.5" r="3.2" fill="#F59E0B" />
                                  <path d="M8.5 9.5L9.5 10.5L11.8 8.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Representation Services
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/itin"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-purple-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="2.5" y="4" width="15" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <circle cx="6.5" cy="8.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
                                  <path d="M4.5 13C4.5 11.8 5.4 11 6.5 11C7.6 11 8.5 11.8 8.5 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                  <rect x="11" y="7" width="4.5" height="2.5" rx="0.5" fill="#F59E0B" />
                                  <line x1="11" y1="12" x2="15.5" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                ITIN Assistance
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/extension"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-orange-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="3.5" width="14" height="13.5" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <path d="M3 7H17" stroke="currentColor" strokeWidth="1.2" />
                                  <circle cx="6.5" cy="2.5" r="1" fill="currentColor" />
                                  <circle cx="13.5" cy="2.5" r="1" fill="currentColor" />
                                  <circle cx="12.5" cy="12.5" r="4" fill="#EA580C" stroke="white" strokeWidth="1" />
                                  <path d="M12.5 10.5V12.5L14 12.5" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Extension Filing
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/extension"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-rose-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="2.5" width="14" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                  <line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                  <circle cx="14" cy="14" r="3.2" fill="#E11D48" />
                                  <path d="M13 14.5L13.8 13.8L15 15" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
                                  <path d="M14.8 12.2L15.8 13.2" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Amendment Filing
                              </span>
                            </Link>
                          </div>
                        </div>

                        {/* US Business Tax Services */}
                        <div className="mb-3">
                          <h4
                            className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
                            style={{ color: "#6B7280" }}
                          >
                            US Business Tax Services
                          </h4>
                          <div className="space-y-1">
                            <Link
                              to="/services/us-business/incorporations"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-blue-700">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="8" width="5.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
                                  <rect x="8.5" y="3" width="7" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                                  <rect x="10.5" y="5.5" width="1.2" height="1.2" fill="currentColor" />
                                  <rect x="12.5" y="5.5" width="1.2" height="1.2" fill="currentColor" />
                                  <rect x="10.5" y="8.5" width="1.2" height="1.2" fill="currentColor" />
                                  <rect x="12.5" y="8.5" width="1.2" height="1.2" fill="currentColor" />
                                  <circle cx="15.5" cy="14.5" r="2.8" fill="#3B82F6" stroke="white" strokeWidth="1" />
                                  <path d="M14.5 14.5L15.2 15.2L16.5 13.8" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                US Incorporations
                              </span>
                            </Link>
                            <Link
                              to="/services/us-business/smb-tax-filing"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-emerald-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="11" width="3" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.2" />
                                  <rect x="7.5" y="8" width="3" height="9" rx="0.75" stroke="currentColor" strokeWidth="1.2" />
                                  <rect x="12" y="4" width="3" height="13" rx="0.75" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
                                  <path d="M4.5 9L9 6L14 3M14 3H11M14 3V6" stroke="#059669" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Small & Medium Business Tax Filing
                              </span>
                            </Link>
                            <Link
                              to="/services/us-business/smb-tax-filing"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-teal-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
                                  <path d="M4 16.5C4 13.5 6.7 11.5 10 11.5C13.3 11.5 16 13.5 16 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                  <circle cx="15.5" cy="5.5" r="2.5" fill="#0D9488" />
                                  <path d="M14.8 5.5L15.3 6L16.2 5.1" stroke="white" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Consulting with Tax Expert (CPA)
                              </span>
                            </Link>
                          </div>
                        </div>

                        {/* Indian Tax Services */}
                        <div className="mb-3">
                          <h4
                            className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
                            style={{ color: "#6B7280" }}
                          >
                            Indian Tax Services
                          </h4>
                          <div className="space-y-1">
                            <Link
                              to="/services/indian/tax-filing"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-orange-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <rect x="3" y="2.5" width="14" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                                  <rect x="5.5" y="4.5" width="4.5" height="1.8" rx="0.5" fill="currentColor" />
                                  <line x1="5.5" y1="8.5" x2="14.5" y2="8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <line x1="5.5" y1="11.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                  <circle cx="14" cy="14" r="3" fill="#EA580C" />
                                  <path d="M12.8 14L13.6 14.8L15.2 13.2" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Indian Tax Filing
                              </span>
                            </Link>
                            <Link
                              to="/services/indian/representation"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-red-600">
                                <svg className="w-5.5 h-5.5" viewBox="0 0 20 20" fill="none">
                                  <path d="M10 2L16.5 4.5V9.5C16.5 13.5 10 17.5 10 17.5C10 17.5 3.5 13.5 3.5 9.5V4.5L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                                  <circle cx="10" cy="9.5" r="3.2" fill="#DC2626" />
                                  <path d="M8.5 9.5L9.5 10.5L11.8 8.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                Representation Services
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/tax-resources"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium hover:opacity-70 transition-all duration-200"
                  style={{ color: "#165479" }}
                >
                  Tax Resources
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  to="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium hover:opacity-70 transition-all duration-200"
                  style={{ color: "#165479" }}
                >
                  Pricing
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium hover:opacity-70 transition-all duration-200"
                  style={{ color: "#165479" }}
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  to="/referrals"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium hover:opacity-70 transition-all duration-200"
                  style={{ color: "#165479" }}
                >
                  <GiftIcon className="h-5 w-5" style={{ color: "#165479" }} />
                  <span>Refer & Earn</span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium hover:opacity-70 transition-all duration-200"
                  style={{ color: "#165479" }}
                >
                  Get Help
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


