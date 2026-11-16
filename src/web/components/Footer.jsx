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
    <footer className="relative bg-footer border-t border-white/10 text-[#CBD5E1] font-sans antialiased">
      {/* ========================================================= */}
      {/* MAIN FOOTER NAVIGATION COLUMNS                            */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 xl:gap-10">

          {/* Column 1: Company Profile */}
          <div className="text-left font-sans lg:pr-2">
            <Link to="/" className="inline-block mb-3.5 group">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm inline-block transition-transform duration-200 group-hover:scale-[1.02]">
                <img
                  src={Logo}
                  alt="IRS Tax Filer"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-[13px] text-white font-normal leading-relaxed mb-4">
              Your trusted partner for expert tax filing services. We help maximize refunds and ensure compliance with confidence.
            </p>
          </div>

          {/* Column 2: Services Navigation */}
          <div className="text-left font-sans">
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/15">
              <span className="text-[13px] font-semibold text-white tracking-tight uppercase tracking-wider flex items-center gap-2">
                <DocumentTextIcon className="w-4 h-4 text-teal" />
                <span>Services</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            </div>

            <ul className="space-y-2 text-[13px]">
              {[
                {
                  icon: BuildingOfficeIcon,
                  text: "Federal & State Tax Filing",
                  link: "/services/us-individual/federal-state-local",
                  color: "text-teal",
                },
                {
                  icon: BanknotesIcon,
                  text: "FBAR & FATCA Services",
                  link: "/services/us-individual/fbar-fatca",
                  color: "text-teal-soft",
                },
                {
                  icon: UserGroupIcon,
                  text: "Tax Representation",
                  link: "/services/us-individual/representation",
                  color: "text-teal",
                },
                {
                  icon: IdentificationIcon,
                  text: "ITIN Assistance",
                  link: "/services/us-individual/itin",
                  color: "text-coral",
                },
                {
                  icon: BuildingOffice2Icon,
                  text: "US Incorporations",
                  link: "/services/us-business/incorporations",
                  color: "text-teal",
                },
                {
                  icon: GlobeAltIcon,
                  text: "Indian Tax Filing",
                  link: "/services/indian/tax-filing",
                  color: "text-teal-soft",
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2.5 py-1 text-white hover:text-white font-medium transition-all duration-200 hover:translate-x-1"
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
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/15">
              <span className="text-[13px] font-semibold text-white tracking-tight uppercase tracking-wider flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4 text-teal" />
                <span>Resources</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            </div>

            <ul className="space-y-2 text-[13px]">
              {[
                {
                  icon: ClipboardDocumentCheckIcon,
                  text: "Tax Resources",
                  link: "/tax-resources",
                  color: "text-teal",
                },
                {
                  icon: CurrencyDollarIcon,
                  text: "Pricing",
                  link: "/pricing",
                  color: "text-teal-soft",
                },
                {
                  icon: InformationCircleIcon,
                  text: "About Us",
                  link: "/about",
                  color: "text-teal",
                },
                {
                  icon: GiftIcon,
                  text: "Refer & Earn",
                  link: "/referrals",
                  color: "text-coral",
                },
                {
                  icon: ChatBubbleLeftRightIcon,
                  text: "Contact Us",
                  link: "/contact",
                  color: "text-teal-soft",
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2.5 py-1 text-white hover:text-white font-medium transition-all duration-200 hover:translate-x-1"
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
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/15">
              <span className="text-[13px] font-semibold text-white tracking-tight uppercase tracking-wider flex items-center gap-2">
                <QuestionMarkCircleIcon className="w-4 h-4 text-teal" />
                <span>Support</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            </div>

            <ul className="space-y-2 text-[13px]">
              {[
                {
                  icon: LifebuoyIcon,
                  text: "Customer Support",
                  link: "/help/support",
                  color: "text-teal",
                },
                {
                  icon: QuestionMarkCircleIcon,
                  text: "Get Help",
                  link: "/help/contact",
                  color: "text-coral",
                },
                {
                  icon: ShieldCheckIcon,
                  text: "Security",
                  link: "/security",
                  color: "text-teal-soft",
                },
                {
                  icon: ScaleIcon,
                  text: "Terms of Service",
                  link: "/terms",
                  color: "text-teal",
                },
                {
                  icon: LockClosedIcon,
                  text: "Privacy Policy",
                  link: "/privacy",
                  color: "text-coral-muted",
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group flex items-center gap-2.5 py-1 text-white hover:text-white font-medium transition-all duration-200 hover:translate-x-1"
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
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/15">
              <span className="text-[13px] font-semibold text-white tracking-tight uppercase tracking-wider flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-teal" />
                <span>Addresses</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            </div>

            <div className="space-y-3.5 text-[13px]">
              {/* Alpharetta Office */}
              <div className="group">
                <div className="font-semibold text-white flex items-center gap-1.5 mb-1 text-xs">
                  <MapPinIcon className="w-3.5 h-3.5 text-coral shrink-0" />
                  <span>Alpharetta, USA</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/12600+Deerfield+Parkway+Suite+2096,+Alpharetta,+GA+30004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CBD5E1] hover:text-white font-medium transition-colors block pl-5 leading-relaxed text-xs"
                >
                  12600 Deerfield Parkway Suite 2096,<br />
                  Alpharetta 30004
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM LEGAL & COPYRIGHT BAR                              */}
      {/* ========================================================= */}
      <div className="border-t border-white/10 bg-primary-dark py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">

          {/* Copyright */}
          <div className="text-xs text-white/70 font-normal">
            © {currentYear} IRSTax Filer. All Rights Reserved.
          </div>

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 text-xs text-white/70 font-medium">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span className="text-white/40 font-normal">|</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span className="text-white/40 font-normal">|</span>
            <Link to="/glba" className="hover:text-white transition-colors">
              GLBA
            </Link>
            <span className="text-white/40 font-normal">|</span>
            <Link to="/do-not-sell" className="hover:text-white transition-colors">
              Do Not Sell My Info
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
