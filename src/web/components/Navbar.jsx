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
      {/* Right-Side Attached Contact Strip with Close/Toggle Option */}
      {/* <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end font-sans">
        <AnimatePresence mode="wait">
          {isContactStripOpen ? (
            <motion.div
              key="contact-strip-expanded"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-gradient-to-b from-[#0A4973] via-[#165479] to-[#0A4973] text-white shadow-[-6px_8px_32px_rgba(10,73,115,0.4)] rounded-l-2xl border-y border-l border-white/20 py-3 px-2 flex flex-col items-center gap-2 backdrop-blur-xl"
            >
             
              <button
                onClick={() => setIsContactStripOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25 text-white/70 hover:text-white flex items-center justify-center transition-all duration-150 mb-0.5 cursor-pointer"
                title="Close sidebar"
                aria-label="Close sidebar"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>

        
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  Call US: +1 (415) 223-1315
                </div>
                <a
                  href="tel:+14152231315"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#749220] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Call US: +1 (415) 223-1315"
                >
                  <PhoneIcon className="w-5 h-5" />
                </a>
              </div>


              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  WhatsApp Support: +91 9052 333 667
                </div>
                <a
                  href="https://wa.me/919052333667?text=Hi%20IRS%20Tax%20Filer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="WhatsApp Support: +91 9052 333 667"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                </a>
              </div>

   
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  Email: contact@irstaxfiler.com
                </div>
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#749220] text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Email: contact@irstaxfiler.com"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                </a>
              </div>

              <div className="w-6 h-[1px] bg-white/20 my-0.5" />

       
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  Schedule Free Consultation
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#749220] to-[#5e7719] hover:from-[#84a724] hover:to-[#749220] text-white font-semibold flex items-center justify-center shadow-md transition-all duration-200"
                  title="Schedule Free Consultation"
                >
                  <CalendarDaysIcon className="w-5 h-5" />
                </button>
              </div>

     
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  PayPal Payments
                </div>
                <button
                  onClick={() => window.open('https://www.paypal.com/ncp/payment/9AWG5USG2AUDU', '_blank')}
                  className="w-10 h-10 rounded-xl bg-[#0070ba] hover:bg-[#005ea6] text-white flex items-center justify-center shadow-md transition-all duration-200"
                  title="Make Payment"
                >
                  <CreditCardIcon className="w-5 h-5" />
                </button>
              </div>

            </motion.div>
          ) : (
            <motion.button
              key="contact-strip-collapsed"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsContactStripOpen(true)}
              className="bg-gradient-to-r from-[#165479] to-[#749220] hover:from-[#0A4973] hover:to-[#637D1A] text-white py-2.5 px-3 rounded-l-2xl shadow-[-4px_4px_20px_rgba(22,84,121,0.35)] border-y border-l border-white/20 transition-all flex items-center gap-2 group cursor-pointer"
              title="Open Quick Contact & Payments"
              aria-label="Open Quick Contact & Payments"
            >
              <div className="relative flex items-center">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </div>
              <PhoneIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium tracking-wide hidden group-hover:inline transition-all">
                Quick Contact
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div> */}

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
                <div className="flex items-center gap-1 sm:gap-2 font-sans">
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


