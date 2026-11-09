import React from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  UserGroupIcon,
  IdentificationIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  LifebuoyIcon,
  LockClosedIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

/* Brand Social Media Icons */
import { FaInstagram, FaLinkedin, FaSlack, FaWhatsapp } from "react-icons/fa";

import Logo from "../assets/irs-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-slate-200/80 text-gray-600 font-sans antialiased">
      {/* ========================================================= */}
      {/* MAIN FOOTER NAVIGATION COLUMNS                            */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 xl:gap-10">

          {/* Column 1: Company Profile */}
          <div className="text-left font-sans lg:pr-2">
            <Link to="/" className="inline-block mb-3.5 group">
              <img
                src={Logo}
                alt="IRS Tax Filer"
                className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-[13px] text-gray-500 font-normal leading-relaxed mb-4">
              Your trusted partner for expert tax filing services. We help maximize refunds and ensure compliance with confidence.
            </p>

            {/* Direct Contact Numbers & Email (Commented by user) */}
            {/* <div className="space-y-2.5 text-xs text-slate-700 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#165479] flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-3.5 h-3.5" />
                </div>
                <a
                  href="tel:+14157876190"
                  className="hover:text-[#165479] font-medium transition-colors"
                >
                  +1 (415) 787-6190
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#165479] flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-3.5 h-3.5" />
                </div>
                <a
                  href="tel:+919052333668"
                  className="hover:text-[#165479] font-medium transition-colors"
                >
                  +91 9052 333 667/668
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-[#165479] flex items-center justify-center shrink-0">
                  <EnvelopeIcon className="w-3.5 h-3.5" />
                </div>
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="hover:text-[#165479] font-medium transition-colors"
                >
                  contact@irstaxfiler.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/irs-tax-filer/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-[#0077B5] hover:border-[#0077B5] flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.instagram.com/irs_tax_filers/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/919052333667?text=Hi"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://irstaxfilerworkspace.slack.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Slack"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-[#4A154B] hover:border-[#4A154B] flex items-center justify-center transition-all hover:scale-105 shadow-2xs"
              >
                <FaSlack className="w-3.5 h-3.5" />
              </a>
            </div> */}
          </div>

          {/* Column 2: Services Navigation */}
          <div className="text-left font-sans">
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-gray-100">
              <span className="text-[13px] font-semibold text-gray-900 tracking-tight uppercase tracking-wider flex items-center gap-2">
                <DocumentTextIcon className="w-4 h-4 text-[#165479]" />
                <span>Services</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
            </div>

            <ul className="space-y-2 text-[13px]">
              {[
                {
                  icon: BuildingOfficeIcon,
                  text: "Federal & State Tax Filing",
                  link: "/services/us-individual/federal-state-local",
                  color: "text-sky-600",
                },
                {
                  icon: BanknotesIcon,
                  text: "FBAR & FATCA Services",
                  link: "/services/us-individual/fbar-fatca",
                  color: "text-emerald-600",
                },
                {
                  icon: UserGroupIcon,
                  text: "Tax Representation",
                  link: "/services/us-individual/representation",
                  color: "text-indigo-600",
                },
                {
                  icon: IdentificationIcon,
                  text: "ITIN Assistance",
                  link: "/services/us-individual/itin",
                  color: "text-amber-600",
                },
                {
                  icon: BuildingOffice2Icon,
                  text: "US Incorporations",
                  link: "/services/us-business/incorporations",
                  color: "text-[#165479]",
                },
                {
                  icon: GlobeAltIcon,
                  text: "Indian Tax Filing",
                  link: "/services/indian/tax-filing",
                  color: "text-[#749220]",
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2.5 py-1 text-gray-700 hover:text-[#165479] font-medium transition-all duration-200 hover:translate-x-1"
                  >
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0 transition-transform duration-200 group-hover:scale-125`} />
                    <span className="leading-snug">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources Navigation */}
          <div className="text-left font-sans">
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-gray-100">
              <span className="text-[13px] font-semibold text-gray-900 tracking-tight uppercase tracking-wider flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4 text-[#749220]" />
                <span>Resources</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
            </div>

            <ul className="space-y-2 text-[13px]">
              {[
                {
                  icon: ClipboardDocumentCheckIcon,
                  text: "Tax Resources",
                  link: "/tax-resources",
                  color: "text-blue-600",
                },
                {
                  icon: CurrencyDollarIcon,
                  text: "Pricing",
                  link: "/pricing",
                  color: "text-emerald-600",
                },
                {
                  icon: InformationCircleIcon,
                  text: "About Us",
                  link: "/about",
                  color: "text-cyan-600",
                },
                {
                  icon: GiftIcon,
                  text: "Refer & Earn",
                  link: "/referrals",
                  color: "text-rose-500",
                },
                {
                  icon: ChatBubbleLeftRightIcon,
                  text: "Contact Us",
                  link: "/contact",
                  color: "text-[#749220]",
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2.5 py-1 text-gray-700 hover:text-[#165479] font-medium transition-all duration-200 hover:translate-x-1"
                  >
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0 transition-transform duration-200 group-hover:scale-125`} />
                    <span className="leading-snug">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support Navigation */}
          <div className="text-left font-sans">
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-gray-100">
              <span className="text-[13px] font-semibold text-gray-900 tracking-tight uppercase tracking-wider flex items-center gap-2">
                <QuestionMarkCircleIcon className="w-4 h-4 text-sky-600" />
                <span>Support</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
            </div>

            <ul className="space-y-2 text-[13px]">
              {[
                {
                  icon: LifebuoyIcon,
                  text: "Customer Support",
                  link: "/help/support",
                  color: "text-blue-600",
                },
                {
                  icon: QuestionMarkCircleIcon,
                  text: "Get Help",
                  link: "/help/contact",
                  color: "text-amber-500",
                },
                {
                  icon: ShieldCheckIcon,
                  text: "Security",
                  link: "/security",
                  color: "text-emerald-600",
                },
                {
                  icon: ScaleIcon,
                  text: "Terms of Service",
                  link: "/terms",
                  color: "text-purple-600",
                },
                {
                  icon: LockClosedIcon,
                  text: "Privacy Policy",
                  link: "/privacy",
                  color: "text-rose-500",
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2.5 py-1 text-gray-700 hover:text-[#165479] font-medium transition-all duration-200 hover:translate-x-1"
                  >
                    <item.icon className={`w-4 h-4 ${item.color} shrink-0 transition-transform duration-200 group-hover:scale-125`} />
                    <span className="leading-snug">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Office Addresses */}
          <div className="text-left font-sans">
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-gray-100">
              <span className="text-[13px] font-semibold text-gray-900 tracking-tight uppercase tracking-wider flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-rose-500" />
                <span>Addresses</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#749220]" />
            </div>

            <div className="space-y-3.5 text-[13px]">
              {/* Dallas Office */}
              <div className="group">
                <div className="font-semibold text-gray-900 flex items-center gap-1.5 mb-1 text-xs">
                  <MapPinIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Dallas, USA</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/13610+Floyd+Cir,+Dallas,+TX+75243"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#165479] font-medium transition-colors block pl-5 leading-relaxed text-xs"
                >
                  13610 Floyd Cir, Dallas,<br />
                  TX 75243
                </a>
              </div>

              {/* Hyderabad Office */}
              {/* <div className="group pt-2 border-t border-gray-100/80">
                <div className="font-semibold text-gray-900 flex items-center gap-1.5 mb-1 text-xs">
                  <BuildingOffice2Icon className="w-3.5 h-3.5 text-[#749220] shrink-0" />
                  <span>Hyderabad, India</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/Manjeera+Majestic+Commercial,+803,+JNTU+-+Hitech+City+Rd,+K+P+H+B+Phase+1,+Kukatpally,+Hyderabad,+Telangana+500072"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#165479] font-medium transition-colors block pl-5 leading-relaxed text-xs"
                >
                  # 801, Manjeera Majestic Commercial,<br />
                  Hitech City Rd, Hyderabad 500072
                </a>
              </div> */}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM LEGAL & COPYRIGHT BAR                              */}
      {/* ========================================================= */}
      <div className="border-t border-gray-100 bg-slate-50/70 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">

          {/* Copyright */}
          <div className="text-xs text-gray-500 font-normal">
            © {currentYear} IRSTax Filer. All Rights Reserved.
          </div>

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 text-xs text-gray-600 font-medium">
            <Link to="/terms" className="hover:text-[#165479] transition-colors">
              Terms
            </Link>
            <span className="text-gray-300 font-normal">|</span>
            <Link to="/privacy" className="hover:text-[#165479] transition-colors">
              Privacy
            </Link>
            <span className="text-gray-300 font-normal">|</span>
            <Link to="/glba" className="hover:text-[#165479] transition-colors">
              GLBA
            </Link>
            <span className="text-gray-300 font-normal">|</span>
            <Link to="/do-not-sell" className="hover:text-[#165479] transition-colors">
              Do Not Sell My Info
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
