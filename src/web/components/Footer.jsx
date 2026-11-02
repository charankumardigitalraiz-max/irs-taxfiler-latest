import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { createSitevisitandcount } from "../Redux/Slices/siteVisitSlice";
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

/* ✅ Social Media Icons */
import { FaInstagram, FaLinkedin, FaSlack, FaWhatsapp } from "react-icons/fa";

import footerLogo from "../assets/footerlogo.png";
import { useEffect } from "react";

const SEGMENTS = {
  0: ["a", "b", "c", "d", "e", "f"],
  1: ["b", "c"],
  2: ["a", "b", "g", "e", "d"],
  3: ["a", "b", "c", "d", "g"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "e", "d", "c", "g"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

const Segment = ({ on, className }) => (
  <div
    className={`${className} ${on
        ? "bg-slate-100 shadow-[0_0_4px_rgba(255,255,255,0.35)]"
        : "bg-slate-600/40"
      }`}
  />
);

const Digit = ({ value }) => {
  const active = SEGMENTS[value] || [];

  return (
    <div className="relative w-7 h-11 mx-[2px]">
      <Segment on={active.includes("a")} className="absolute top-0 left-2 w-4 h-[2.5px] rounded-sm" />
      <Segment on={active.includes("b")} className="absolute top-1 right-0 w-[2.5px] h-4 rounded-sm" />
      <Segment on={active.includes("c")} className="absolute bottom-1 right-0 w-[2.5px] h-4 rounded-sm" />
      <Segment on={active.includes("d")} className="absolute bottom-0 left-2 w-4 h-[2.5px] rounded-sm" />
      <Segment on={active.includes("e")} className="absolute bottom-1 left-0 w-[2.5px] h-4 rounded-sm" />
      <Segment on={active.includes("f")} className="absolute top-1 left-0 w-[2.5px] h-4 rounded-sm" />
      <Segment
        on={active.includes("g")}
        className="absolute top-1/2 left-2 w-4 h-[2.5px] rounded-sm -translate-y-1/2"
      />
    </div>
  );
};

const SevenSegmentCounter = ({ value }) => {
  const digits = value.toString().padStart(6, "0").split("");

  return (
    <div className="flex flex-col items-center">
      <span className="text-[9px] tracking-[0.3em] text-slate-400 uppercase mb-1">
        Site Visits
      </span>

      <div className="flex bg-[#0a0f18] px-4 py-2 rounded-md border border-white/15">
        {digits.map((d, i) => (
          <Digit key={i} value={Number(d)} />
        ))}
      </div>
    </div>
  );
};

const renderDigitalCounter = (value = 0) => {
  const digits = value.toString().padStart(5, "0").split("");

  return (
    <div className="flex items-center gap-1 font-mono">
      {digits.map((digit, i) => (
        <span
          key={i}
          className="
            w-7 h-9 flex items-center justify-center
            rounded-md
            bg-black/70
            border border-cyan-400/30
            text-cyan-400 text-sm font-semibold
            shadow-[inset_0_0_12px_rgba(34,211,238,0.35)]
          "
        >
          {digit}
        </span>
      ))}
    </div>
  );
};

const Footer = () => {
  // const dispatch = useDispatch();
  // const { count } = useSelector((state) => state.siteVisit);
  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   dispatch(createSitevisitandcount());
  // }, [dispatch]);

  return (
    <footer className="relative overflow-hidden bg-[#0b1626] text-slate-200">
      {/* ================= TOP ================= */}
      <div className="relative">
        {/* Animated glow background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* ================= GRID ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* ================= COMPANY ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={footerLogo}
                alt="IRSTax Filer Logo"
                className="h-11 w-auto mb-4 brightness-125 drop-shadow-[0_0_12px_rgba(255,255,255,0.45)] bg-white/10 backdrop-blur-md rounded-lg px-3 py-2"
              />

              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Your trusted partner for expert tax filing services. We help
                maximize refunds and ensure compliance with confidence.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-4 w-4 text-slate-300" />
                  <a
                    href="tel:+14157876190"
                    className="hover:text-white transition"
                  >
                    +1 (415) 787-6190
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-4 w-4 text-slate-300" />
                  <a
                    href="tel:+919052333668"
                    className="hover:text-white transition"
                  >
                    +91 9052 333 667/668
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="h-4 w-4 text-slate-300" />
                  <a
                    href="mailto:contact@irstaxfiler.com"
                    className="hover:text-white transition"
                  >
                    contact@irstaxfiler.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.instagram.com/irs_tax_filers/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 border-2 border-white rounded-full bg-white flex items-center justify-center text-2xl text-pink-500 transition transform hover:scale-110 aspect-square"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.linkedin.com/company/irs-tax-filer/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 border-2 border-white rounded-full bg-white flex items-center justify-center text-2xl text-blue-600 transition transform hover:scale-110 aspect-square"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://irstaxfilerworkspace.slack.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Slack"
                  className="w-9 h-9 border-2 border-white rounded-full bg-white flex items-center justify-center text-2xl text-purple-500 transition transform hover:scale-110 aspect-square"
                >
                  <FaSlack />
                </a>

                <a
                  href="https://wa.me/919052333667?text=Hi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 border-2 border-white rounded-full bg-white flex items-center justify-center text-2xl text-green-500 transition transform hover:scale-110 aspect-square"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </motion.div>

            {/* ================= SERVICES ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-blue-300" /> Services
              </h3>

              <ul className="space-y-3 text-sm">
                {[
                  {
                    icon: BuildingOfficeIcon,
                    text: "Federal & State Tax Filing",
                    link: "/services/us-individual/federal-state-local",
                  },
                  {
                    icon: BanknotesIcon,
                    text: "FBAR & FATCA Services",
                    link: "/services/us-individual/fbar-fatca",
                  },
                  {
                    icon: UserGroupIcon,
                    text: "Tax Representation",
                    link: "/services/us-individual/representation",
                  },
                  {
                    icon: IdentificationIcon,
                    text: "ITIN Assistance",
                    link: "/services/us-individual/itin",
                  },
                  {
                    icon: BuildingOffice2Icon,
                    text: "US Incorporations",
                    link: "/services/us-business/incorporations",
                  },
                  {
                    icon: GlobeAltIcon,
                    text: "Indian Tax Filing",
                    link: "/services/indian/tax-filing",
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.link}
                      className="flex items-center gap-3 text-slate-300 hover:text-white hover:translate-x-1 transition"
                    >
                      <item.icon className="w-5 h-5 text-blue-300" />
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ================= RESOURCES ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-blue-300" />
                Resources
              </h3>

              <ul className="space-y-3 text-sm">
                {[
                  {
                    icon: ClipboardDocumentCheckIcon,
                    text: "Tax Resources",
                    link: "/tax-resources",
                  },
                  {
                    icon: CurrencyDollarIcon,
                    text: "Pricing",
                    link: "/pricing",
                  },
                  {
                    icon: InformationCircleIcon,
                    text: "About Us",
                    link: "/about",
                  },
                  { icon: GiftIcon, text: "Refer & Earn", link: "/referrals" },
                  {
                    icon: ChatBubbleLeftRightIcon,
                    text: "Contact Us",
                    link: "/contact",
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.link}
                      className="flex items-center gap-3 text-slate-300 hover:text-white hover:translate-x-1 transition"
                    >
                      <item.icon className="w-5 h-5 text-blue-300" />
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ================= SUPPORT ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                <QuestionMarkCircleIcon className="h-5 w-5 text-blue-300" />
                Support
              </h3>

              <ul className="space-y-3 text-sm">
                {[
                  {
                    icon: LifebuoyIcon,
                    text: "Customer Support",
                    link: "/help/support",
                  },
                  {
                    icon: QuestionMarkCircleIcon,
                    text: "Get Help",
                    link: "/help/contact",
                  },
                  {
                    icon: ShieldCheckIcon,
                    text: "Security",
                    link: "/security",
                  },
                  { icon: ScaleIcon, text: "Terms of Service", link: "/terms" },
                  {
                    icon: LockClosedIcon,
                    text: "Privacy Policy",
                    link: "/privacy",
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.link}
                      className="flex items-center gap-3 text-slate-300 hover:text-white hover:translate-x-1 transition"
                    >
                      <item.icon className="w-5 h-5 text-blue-300" />
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ================= LOCATIONS ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-blue-300" />
                Addresses
              </h3>
              <div className="">
                <p className="text-sm text-slate-300 mb-4 leading-snug">
                  <strong className="text-white flex items-center gap-1">
                    <MapPinIcon className="h-5 w-5 text-blue-300" />
                    Dallas, USA
                  </strong>
                  <a
                    href="https://www.google.com/maps/place/13610+Floyd+Cir,+Dallas,+TX+75243"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pl-5 mt-1"
                  >
                    13610 Floyd Cir, Dallas,
                    <br /> TX 75243
                  </a>
                </p>

                {/* <p className="text-sm text-slate-300 leading-snug">
                  <strong className="text-white flex items-center gap-1">
                    <MapPinIcon className="h-5 w-5 text-blue-300" />
                    Hyderabad, India
                  </strong>
                  <a
                    href="https://www.google.com/maps/place/Manjeera+Majestic+Commercial,+803,+JNTU+-+Hitech+City+Rd,+K+P+H+B+Phase+1,+Kukatpally,+Hyderabad,+Telangana+500072"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pl-5 mt-1"
                  >
                    # 801, Manjeera Majestic Commercial, Hitech City Road,
                    Hyderabad, Telangana 500072
                  </a>
                </p> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/10 bg-[#06101e]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-x-4 text-xs text-slate-300">
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>{" "}
            |
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>{" "}
            |
            <Link to="/glba" className="hover:text-white">
              GLBA
            </Link>{" "}
            |
            <Link to="/do-not-sell" className="hover:text-white">
              Do Not Sell My Info
            </Link>
          </div>

          <div className="flex flex-col items-center gap-1">
            {/* +count */}
            {renderDigitalCounter(10000)}
            {/* <SevenSegmentCounter value={count} /> */}
          </div>

          <div className="text-xs text-slate-300 space-y-1 text-center lg:text-right">
            <div className="flex justify-center lg:justify-end gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheckIcon className="h-4 w-4" /> TRUSTe
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheckIcon className="h-4 w-4" /> SSL Secured
              </span>
            </div>

            <div>© {currentYear} IRSTax Filer. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
