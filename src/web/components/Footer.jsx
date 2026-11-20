import React, { useEffect, useState } from "react";
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
  EyeIcon,
} from "@heroicons/react/24/outline";

/* Brand Social Media Icons */
import { FaInstagram, FaLinkedin, FaSlack, FaWhatsapp } from "react-icons/fa";

import Logo from "/irslogo.webp";
import { publicSettingsService } from "../../client/services/settingsService";

const WEBSITE_TOTAL_VIEWS_KEY = "website-total-views";
const ORIGINAL_VISITS_STORAGE_KEY = "irs_taxfiler_original_visits";
const ORIGINAL_RESET_STORAGE_KEY = "irs_taxfiler_original_reset_at";
const VIEWS_SYNC_STORAGE_KEY = "irs_taxfiler_views_sync_at";
const FALLBACK_BASE_VISITS = 0;

// Module-level guard: counts +1 each time the website is opened/loaded,
// without double-counting when navigating between SPA pages in the same visit.
let hasCountedVisitOnPageLoad = false;

const Footer = () => {
  // const currentYear = new Date().getFullYear();
  const currentYear = "2027";
  const [showTotalVisits, setShowTotalVisits] = useState(false);
  const [totalVisits, setTotalVisits] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const syncVisits = async (shouldIncrement = false) => {
      let enabled = true;
      let mode = "default"; // 'default' (Default + Original) | 'original' (Original Only)
      let baseViews = FALLBACK_BASE_VISITS;
      let savedOriginalViews = 0;
      let resetAt = null;

      // 1. Fetch latest admin-configured Website Total Visits setting dynamically
      try {
        const res = await publicSettingsService.getSetting(WEBSITE_TOTAL_VIEWS_KEY);
        if (res?.success && res?.data?.content) {
          const parsed = JSON.parse(res.data.content);
          if (parsed.enabled === false) {
            enabled = false;
          }
          if (parsed.mode === "original" || parsed.mode === "default") {
            mode = parsed.mode;
          }
          const configuredDefault = Number(parsed.defaultViews);
          if (!Number.isNaN(configuredDefault) && configuredDefault >= 0) {
            baseViews = Math.floor(configuredDefault);
          }
          const configuredOriginal = Number(parsed.originalViews);
          if (!Number.isNaN(configuredOriginal) && configuredOriginal >= 0) {
            savedOriginalViews = Math.floor(configuredOriginal);
          }
          if (parsed.resetAt) {
            resetAt = String(parsed.resetAt);
          }
        }
      } catch {
        // Keep defaults if setting has not been created yet
      }

      if (!isMounted) return;
      setShowTotalVisits(enabled);
      if (!enabled) return;

      // 2. Dynamically record visit via backend if endpoint exists
      let originalVisits = savedOriginalViews;
      let syncedWithBackend = false;

      if (shouldIncrement && !hasCountedVisitOnPageLoad) {
        try {
          const visitRes = await publicSettingsService.recordWebsiteVisit();
          const backendCount = Number(
            visitRes?.data?.originalViews ??
            visitRes?.data?.count ??
            visitRes?.originalViews ??
            visitRes?.count ??
            visitRes?.totalVisits
          );
          if (!Number.isNaN(backendCount) && backendCount >= 0) {
            originalVisits = Math.floor(backendCount);
            hasCountedVisitOnPageLoad = true;
            syncedWithBackend = true;
            try {
              localStorage.setItem(ORIGINAL_VISITS_STORAGE_KEY, String(originalVisits));
            } catch {
              // Ignore storage errors
            }
          }
        } catch {
          // Backend visit increment route not enabled yet — fall back to dynamic client tracking
        }
      }

      // 3. Local dynamic visit tracking fallback (persists across visits & tabs)
      if (!syncedWithBackend) {
        try {
          const localResetAt = localStorage.getItem(ORIGINAL_RESET_STORAGE_KEY);
          let storedOriginal = parseInt(
            localStorage.getItem(ORIGINAL_VISITS_STORAGE_KEY) || "0",
            10
          );
          if (Number.isNaN(storedOriginal) || storedOriginal < 0) {
            storedOriginal = 0;
          }

          if (resetAt && localResetAt !== resetAt) {
            storedOriginal = savedOriginalViews;
            localStorage.setItem(ORIGINAL_RESET_STORAGE_KEY, resetAt);
          } else {
            storedOriginal = Math.max(storedOriginal, savedOriginalViews);
          }

          if (shouldIncrement && !hasCountedVisitOnPageLoad) {
            storedOriginal += 1;
            hasCountedVisitOnPageLoad = true;
          }

          localStorage.setItem(ORIGINAL_VISITS_STORAGE_KEY, String(storedOriginal));
          originalVisits = storedOriginal;
        } catch {
          if (shouldIncrement && !hasCountedVisitOnPageLoad) {
            originalVisits = savedOriginalViews + 1;
            hasCountedVisitOnPageLoad = true;
          }
        }
      }

      if (!isMounted) return;
      setTotalVisits(mode === "original" ? originalVisits : baseViews + originalVisits);
    };

    // Initial load: increment once on website open
    syncVisits(true);

    // Live dynamic sync when admin updates Content Settings in same or another tab
    const handleLiveSync = () => syncVisits(false);
    const handleStorage = (event) => {
      if (
        event.key === VIEWS_SYNC_STORAGE_KEY ||
        event.key === ORIGINAL_VISITS_STORAGE_KEY ||
        event.key === ORIGINAL_RESET_STORAGE_KEY
      ) {
        syncVisits(false);
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        syncVisits(false);
      }
    };

    window.addEventListener("website-total-views-updated", handleLiveSync);
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isMounted = false;
      window.removeEventListener("website-total-views-updated", handleLiveSync);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

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
                  className="h-10 w-auto object-contain"
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
                    <span className="leading-snug text-white/80">{item.text}</span>
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
                    <span className="leading-snug text-white/80">{item.text}</span>
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
                    <span className="leading-snug text-white/80">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Office Addresses & Contact */}
          <div className="text-left font-sans">
            <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-white/15">
              <span className="text-[13px] font-semibold text-white tracking-tight uppercase tracking-wider flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-teal" />
                <span>Contact & Office</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
            </div>

            {/* Unified Compact Contact Card */}
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 space-y-2.5 shadow-sm">
              {/* 1. Corporate Office — Yellow Theme */}
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-white/10 group">
                <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <MapPinIcon className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block leading-none mb-1">
                    Corporate Office
                  </span>
                  <a
                    href="https://www.google.com/maps/place/12600+Deerfield+Parkway+Suite+2096,+Alpharetta,+GA+30004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-100/90 hover:text-amber-200 font-medium transition-colors block text-[11px] leading-snug"
                  >
                    12600 Deerfield Pkwy, Ste 2096, Alpharetta, GA 30004
                  </a>
                </div>
              </div>

              {/* 2. Direct Telephone — Coral Theme */}
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10 group">
                <div className="w-7 h-7 rounded-lg bg-[#EE6450]/20 border border-[#EE6450]/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <PhoneIcon className="w-3.5 h-3.5 text-[#EE6450]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#FF8A65] uppercase tracking-wider block leading-none mb-1">
                    Direct Telephone
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7A66] tracking-wide">
                    <a
                      href="tel:+14044244191"
                      className="hover:text-[#FFA280] transition-colors"
                    >
                      +1 (404) 424-4191
                    </a>
                    <span className="text-[#FF7A66]/50 font-normal">/</span>
                    <a
                      href="tel:+14044244815"
                      className="hover:text-[#FFA280] transition-colors"
                    >
                      4815
                    </a>
                  </div>
                </div>
              </div>

              {/* 3. Email — White Theme */}
              <div className="flex items-center gap-2.5 group">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <EnvelopeIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider block leading-none mb-1">
                    Email Support
                  </span>
                  <a
                    href="mailto:info@irstaxfiler.com"
                    className="text-xs font-semibold text-white hover:text-white/80 transition-colors block truncate"
                  >
                    info@irstaxfiler.com
                  </a>
                </div>
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
            © {currentYear} IRS Tax Adviser Inc. All Rights Reserved.
          </div>

          {/* Total Visits Counter */}
          {showTotalVisits && totalVisits !== null && (
            <div
              className="inline-flex items-center gap-2.5 pl-3.5 pr-2 py-1 rounded-full bg-[#102E4A] border border-[#38BDF8]/45 shadow-[0_0_18px_rgba(18,126,171,0.35)] text-xs"
              aria-label={`Total website visits: ${totalVisits.toLocaleString("en-US")}`}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <EyeIcon className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span className="text-sky-100/90 font-medium">Total Visits</span>
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#127EAB] to-[#0EA5E9] text-white text-[13px] font-semibold tabular-nums tracking-wide shadow-sm">
                {totalVisits.toLocaleString("en-US")}
              </span>
            </div>
          )}

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
