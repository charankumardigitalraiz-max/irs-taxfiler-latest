import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/irsLogo.png";
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
  const navTextColor = `text-primary`; /* Primary color - solid, no gradient */

  return (
    <>
      {/* Right-Side Attached Contact Strip with Close/Toggle Option */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end">
        <AnimatePresence mode="wait">
          {isContactStripOpen ? (
            <motion.div
              key="contact-strip-expanded"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-primary text-white shadow-[-4px_4px_24px_rgba(var(--color-primary-rgb),0.35)] rounded-l-2xl border-y border-l border-white/20 py-2.5 px-2 flex flex-col items-center gap-2 backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsContactStripOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25 text-white/70 hover:text-white flex items-center justify-center transition-all duration-150 mb-0.5 cursor-pointer"
                title="Close sidebar"
                aria-label="Close sidebar"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>

              {/* US Phone */}
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  Call US: +1 (415) 223-1315
                </div>
                <a
                  href="tel:+14152231315"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Call US: +1 (415) 223-1315"
                >
                  <PhoneIcon className="w-5 h-5" />
                </a>
              </div>

              {/* India Phone */}
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  Call India: +91 9052 333 667/668
                </div>
                <a
                  href="tel:+919052333667"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Call India: +91 9052 333 667/668"
                >
                  <span className="text-xs font-semibold tracking-tighter">IN</span>
                </a>
              </div>

              {/* Email */}
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  Email: contact@irstaxfiler.com
                </div>
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-primary flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Email: contact@irstaxfiler.com"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                </a>
              </div>

              <div className="w-6 h-[1px] bg-white/20 my-0.5" />

              {/* Schedule a Meet */}
              <div className="relative group/tip flex items-center">
                <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover/tip:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                  Schedule a Meet
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold flex items-center justify-center shadow-md transition-all duration-200"
                  title="Schedule a Meet"
                >
                  <CalendarDaysIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Payments */}
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
              className="bg-primary hover:bg-primary-700 text-white p-2.5 rounded-l-xl shadow-[-3px_3px_16px_rgba(var(--color-primary-rgb),0.35)] border-y border-l border-white/20 transition-all flex items-center gap-1.5 group cursor-pointer"
              title="Open Quick Contact & Payments"
              aria-label="Open Quick Contact & Payments"
            >
              <PhoneIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium hidden group-hover:inline pr-1 transition-all">Quick Contact</span>
            </motion.button>
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
                  className="h-7 w-auto object-contain"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 font-sans">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown("services")}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link
                  to="/services"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname.startsWith("/services") || showDropdown === "services"
                    ? "text-primary bg-purple-50"
                    : "text-gray-700 hover:text-primary hover:bg-purple-50/70"
                    }`}
                >
                  <span>Services</span>
                  <ChevronDownIcon
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${showDropdown === "services" ? "rotate-180 text-primary" : "text-gray-400 group-hover:text-primary"
                      }`}
                  />
                </Link>

                <AnimatePresence>
                  {showDropdown === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200/90 p-5 z-[1100] w-[820px]"
                      style={{ backgroundColor: "#ffffff" }}
                      onMouseEnter={() => setShowDropdown("services")}
                      onMouseLeave={() => setShowDropdown(null)}
                    >
                      <div className="grid grid-cols-3 gap-5">
                        {/* Column 1: US Individual Tax */}
                        <div>
                          <div className="flex items-center gap-2 pb-2.5 mb-2 border-b border-gray-100">
                            <div className="w-5 h-5 rounded-md bg-purple-100/70 text-primary flex items-center justify-center">
                              <UserGroupIcon className="w-3.5 h-3.5" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                              US Individual Tax
                            </h3>
                          </div>

                          <div className="space-y-0.5">
                            <Link
                              to="/services/us-individual/federal-state-local"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <DocumentTextIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                Federal & State Filing
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                1040
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            <Link
                              to="/services/us-individual/fbar-fatca"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <BanknotesIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                FBAR & FATCA Compliance
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                FinCEN
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            <Link
                              to="/services/us-individual/representation"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <UserGroupIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                IRS Audit Representation
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                Notice
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            <Link
                              to="/services/us-individual/itin"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <IdentificationIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                ITIN Application
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                W-7
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            <Link
                              to="/services/us-individual/extension"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <CalendarDaysIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                Extensions & Amendments
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                4868
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>
                          </div>
                        </div>

                        {/* Column 2: US Business Tax */}
                        <div>
                          <div className="flex items-center gap-2 pb-2.5 mb-2 border-b border-gray-100">
                            <div className="w-5 h-5 rounded-md bg-purple-100/70 text-primary flex items-center justify-center">
                              <BuildingOfficeIcon className="w-3.5 h-3.5" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                              US Business Tax
                            </h3>
                          </div>

                          <div className="space-y-0.5">
                            <Link
                              to="/services/us-business/incorporations"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <BuildingOfficeIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                US Incorporations
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                LLC/Corp
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            <Link
                              to="/services/us-business/smb-tax-filing"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <BriefcaseIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                SMB Tax Filing
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                1120-S
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            <Link
                              to="/services/us-business/smb-tax-filing"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <UserGroupIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                CPA Advisory & Planning
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                Advisory
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>
                          </div>

                          {/* Business Benefit Callout */}
                          <div className="mt-3.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100 flex items-start gap-2.5">
                            <SparklesIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div className="text-[11px] text-gray-600 leading-snug">
                              <span className="font-semibold text-gray-900 block">Corporate Tax Strategy</span>
                              Entity structuring, franchise tax & multi-state compliance.
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Indian Tax Services & Action Hub */}
                        <div>
                          <div className="flex items-center gap-2 pb-2.5 mb-2 border-b border-gray-100">
                            <div className="w-5 h-5 rounded-md bg-purple-100/70 text-primary flex items-center justify-center">
                              <GlobeAltIcon className="w-3.5 h-3.5" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                              Indian Tax Services
                            </h3>
                          </div>

                          <div className="space-y-0.5">
                            <Link
                              to="/services/indian/tax-filing"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <DocumentTextIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                Indian Tax Filing
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                ITR 1-7
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            <Link
                              to="/services/indian/representation"
                              onClick={() => setShowDropdown(null)}
                              className="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-purple-50/70 transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0 shadow-2xs">
                                <CheckCircleIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors flex-1">
                                Notice & Representation
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-primary transition-colors">
                                148A
                              </span>
                              <ChevronRightIcon className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>
                          </div>

                          {/* Focused Visual Hero Consultation Card */}
                          <div className="mt-3.5 p-3.5 rounded-xl bg-purple-50/90 border border-purple-100/90 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                Free Consultation
                              </span>
                              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-full">
                                15 Min Call
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-gray-900 mt-0.5">
                              Talk to a Certified Tax CPA
                            </h4>
                            <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                              Get matched with an expert for US individual, corporate, or NRI Indian returns.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setShowDropdown(null);
                                setIsModalOpen(true);
                              }}
                              className="mt-3 w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                            >
                              <span>Book Free Call</span>
                              <ArrowRightIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Bottom Bar */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-500">
                          <ShieldCheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>IRS Authorized E-File Provider • 100% Confidential & Secure</span>
                        </div>
                        <Link
                          to="/services"
                          onClick={() => setShowDropdown(null)}
                          className="font-semibold text-primary hover:text-primary-700 flex items-center gap-1 transition-colors"
                        >
                          <span>Explore All Services</span>
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tax Resources */}
              <Link
                to="/tax-resources"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === "/tax-resources"
                  ? "text-primary bg-purple-50"
                  : "text-gray-700 hover:text-primary hover:bg-purple-50/70"
                  }`}
              >
                Tax Resources
              </Link>

              {/* Pricing */}
              <Link
                to="/pricing"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === "/pricing"
                  ? "text-primary bg-purple-50"
                  : "text-gray-700 hover:text-primary hover:bg-purple-50/70"
                  }`}
              >
                Pricing
              </Link>

              {/* About Us */}
              <Link
                to="/about"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === "/about"
                  ? "text-primary bg-purple-50"
                  : "text-gray-700 hover:text-primary hover:bg-purple-50/70"
                  }`}
              >
                About Us
              </Link>

              {/* Refer & Earn */}
              <Link
                to="/referrals"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === "/referrals"
                  ? "text-primary bg-purple-100/80 border border-purple-200/80"
                  : "text-primary bg-purple-50 hover:bg-purple-100/70 border border-purple-200/60"
                  }`}
              >
                <GiftIcon className="w-4 h-4 text-primary" />
                <span>Refer & Earn</span>
              </Link>

              {/* Contact Us */}
              <Link
                to="/contact"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === "/contact"
                  ? "text-primary bg-purple-50"
                  : "text-gray-700 hover:text-primary hover:bg-purple-50/70"
                  }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2" ref={ref}>
              {/* Logged Out UI */}
              {gettoken() === false && (
                <div className="flex items-center gap-1 sm:gap-2 font-sans">
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-primary rounded-full hover:bg-purple-50/60 transition-colors"
                  >
                    Sign In
                  </Link>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <button
                      onClick={() => navigate("/login")}
                      className="px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium rounded-full bg-primary text-white shadow-xs hover:bg-primary-700 hover:shadow-md transition-all flex items-center gap-1.5"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-white/90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span>Log In / Sign Up</span>
                    </button>
                  </motion.div>
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
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-primary shadow-sm flex items-center justify-center overflow-hidden">
                        {getuser()?.image ? (
                          <img
                            src={baseUrl + "/" + getuser().image}
                            alt={getuser().fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-semibold text-primary text-sm">
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
              className="md:hidden p-2 text-primary"
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
                    <XMarkIcon className="h-6 w-6 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6 text-primary" />
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
                    style={{ color: "var(--color-primary)" }}
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
                      style={{ color: "var(--color-primary)" }}
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
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#EFF6FF" }}
                              >
                                <DocumentTextIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                Federal, State & Local Tax Filing
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/fbar-fatca"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#F0FDF4" }}
                              >
                                <BanknotesIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                FBAR & FATCA Services
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/representation"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#FEF3C7" }}
                              >
                                <UserGroupIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                Representation Services
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/itin"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#F3E8FF" }}
                              >
                                <IdentificationIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                ITIN Assistance
                              </span>
                            </Link>
                            <Link
                              to="/services/us-individual/extension"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#FCE7F3" }}
                              >
                                <CalendarDaysIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                Extension Filing
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
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#EFF6FF" }}
                              >
                                <BuildingOfficeIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                US Incorporations
                              </span>
                            </Link>
                            <Link
                              to="/services/us-business/smb-tax-filing"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#F0FDF4" }}
                              >
                                <BriefcaseIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                Small & Medium Business Tax Filing
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
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#FEF3C7" }}
                              >
                                <DocumentTextIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
                                Indian Tax Filing
                              </span>
                            </Link>
                            <Link
                              to="/services/indian/representation"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                              className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div
                                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: "#F3E8FF" }}
                              >
                                <CheckCircleIcon
                                  className="w-4 h-4"
                                  style={{ color: "#EB4149" }}
                                />
                              </div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#111827" }}
                              >
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
                  style={{ color: "var(--color-primary)" }}
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
                  style={{ color: "var(--color-primary)" }}
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
                  style={{ color: "var(--color-primary)" }}
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
                  style={{ color: "var(--color-primary)" }}
                >
                  <GiftIcon className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
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
                  style={{ color: "var(--color-primary)" }}
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


