import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  BoltIcon,
  GiftIcon,
  StarIcon,
  ArrowUpRightIcon,
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

// Color themes for contact method cards
const contactMethodThemes = [
  {
    iconBg: "bg-[#E9F7FA]",
    iconBorder: "border-[#127EAB]/25",
    iconText: "text-[#127EAB]",
    arrowBg: "bg-[#E9F7FA]",
    arrowBorder: "border-[#127EAB]/25",
    arrowText: "text-[#127EAB]",
    titleHover: "group-hover:text-[#127EAB]",
    contactHover: "group-hover:text-[#127EAB]",
    topLine: "group-hover:via-[#127EAB]",
    cardBorderHover: "hover:border-[#127EAB]/50",
    shadowHover: "hover:shadow-[0_16px_36px_rgba(18,126,171,0.12)]",
    watermark: "text-[#127EAB]/[0.08]",
  },
  {
    iconBg: "bg-[#FEF4F2]",
    iconBorder: "border-[#EE6450]/25",
    iconText: "text-[#EE6450]",
    arrowBg: "bg-[#FEF4F2]",
    arrowBorder: "border-[#EE6450]/25",
    arrowText: "text-[#EE6450]",
    titleHover: "group-hover:text-[#EE6450]",
    contactHover: "group-hover:text-[#EE6450]",
    topLine: "group-hover:via-[#EE6450]",
    cardBorderHover: "hover:border-[#EE6450]/50",
    shadowHover: "hover:shadow-[0_16px_36px_rgba(238,100,80,0.12)]",
    watermark: "text-[#EE6450]/[0.08]",
  },
  {
    iconBg: "bg-[#ECFDF5]",
    iconBorder: "border-[#059669]/25",
    iconText: "text-[#059669]",
    arrowBg: "bg-[#ECFDF5]",
    arrowBorder: "border-[#059669]/25",
    arrowText: "text-[#059669]",
    titleHover: "group-hover:text-[#059669]",
    contactHover: "group-hover:text-[#059669]",
    topLine: "group-hover:via-[#059669]",
    cardBorderHover: "hover:border-[#059669]/50",
    shadowHover: "hover:shadow-[0_16px_36px_rgba(5,150,105,0.12)]",
    watermark: "text-[#059669]/[0.08]",
  },
  {
    iconBg: "bg-[#EEF2FF]",
    iconBorder: "border-[#4F46E5]/25",
    iconText: "text-[#4F46E5]",
    arrowBg: "bg-[#EEF2FF]",
    arrowBorder: "border-[#4F46E5]/25",
    arrowText: "text-[#4F46E5]",
    titleHover: "group-hover:text-[#4F46E5]",
    contactHover: "group-hover:text-[#4F46E5]",
    topLine: "group-hover:via-[#4F46E5]",
    cardBorderHover: "hover:border-[#4F46E5]/50",
    shadowHover: "hover:shadow-[0_16px_36px_rgba(79,70,229,0.12)]",
    watermark: "text-[#4F46E5]/[0.08]",
  },
];

const Contact = () => {
  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      description: "Send us an email anytime and get a response within 24 hours.",
      contact: "info@irstaxfiler.com",
      link: "mailto:info@irstaxfiler.com",
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      description: "Speak directly with our certified CPA team for quick help.",
      contact: "+1 (404) 424-4191 / 4815",
      link: "tel:+14044244191",
    },
    // {
    //   icon: ChatBubbleLeftRightIcon,
    //   title: "Live Chat",
    //   description: "Get instant live assistance from our tax advisors 24/7.",
    //   contact: "Start Chat",
    //   link: "#",
    // },
    {
      icon: ClockIcon,
      title: "Business Hours",
      description: "Our dedicated tax support team is available six days a week.",
      contact: "Mon-Sat: 9:30 AM - 7:30 PM (CST)",
      link: "#",
    },
  ];

  const title = "Contact Us | IRS Tax Filer";
  const description = "Get in touch with IRS Tax Filer for assistance with US & Indian tax filing, representation, and support. Contact us today.";
  const keywords = "Contact Us,us tax for expats,irs tax,irs contact number,How do i contact irs tax filer";
  const canonical = window.location.href;
  const image = { Logo };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      <div className="min-h-screen bg-white overflow-x-hidden w-full max-w-full">

        {/* ========================================================================= */}
        {/* 1. HERO & CONTACT METHODS SECTION                                         */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-10 pb-8 sm:pt-12 sm:pb-10 bg-white ">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-slate-100/40 rounded-full blur-3xl opacity-40" />
            <div className="absolute -top-20 right-1/4 w-80 h-80 bg-slate-100/40 rounded-full blur-3xl opacity-40" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Hero Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 sm:mb-14"
            >
              {/* Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F7FA] border border-[#127EAB]/30 mb-4 select-none text-xs font-medium text-teal">
                <StarIcon className="w-3.5 h-3.5 text-[#EE6450]" />
                <span>We're Here to Help</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-primary tracking-tight leading-[1.25] mb-3.5 max-w-3xl mx-auto">
                Contact Us â€”{" "}
                <span className="font-medium text-teal">
                  Get in Touch
                </span>{" "}
                <span className="font-medium text-coral">
                  Today
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base lg:text-[17px] text-[#6F7F8E] font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-2 max-w-2xl mx-auto text-center">
                Have questions? We're here to help. Get in touch with our team today and let's discuss how we can assist you.
              </p>
            </motion.div>

            {/* Contact Methods Cards Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${contactMethods.length === 3 ? "lg:grid-cols-[1fr_1fr_1.25fr] max-w-5xl" : "lg:grid-cols-4"} gap-5 lg:gap-6 mx-auto`}>
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                const isLiveChat = method.title === "Live Chat";
                const isBusinessHours = method.title === "Business Hours";
                const theme = contactMethodThemes[index % contactMethodThemes.length];
                const cardNum = String(index + 1).padStart(2, "0");

                const cardContent = (
                  <>
                    {/* Top Accent Line on hover */}
                    <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-transparent to-transparent ${theme.topLine} transition-all duration-300`} />

                    {/* Large Decorative Watermark Number in Background */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-2 -right-1 text-7xl sm:text-8xl font-black font-mono tracking-tighter ${theme.watermark} select-none pointer-events-none transition-transform duration-300 group-hover:scale-110`}
                    >
                      {cardNum}
                    </span>

                    {/* Top Row: (Icon + Title) on Left, Arrow on Right with justify-between */}
                    <div className="flex items-center justify-between w-full mb-3.5 relative z-10">
                      <div className="flex items-center gap-2.5">
                        {/* Icon Badge */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${theme.iconBg} border ${theme.iconBorder} ${theme.iconText} shadow-2xs`}>
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-primary leading-snug">
                          {method.title}
                        </h3>
                      </div>

                      {/* Right Arrow / Indicator */}
                      {!isBusinessHours ? (
                        <div className={`w-7 h-7 rounded-lg ${theme.arrowBg} border ${theme.arrowBorder} ${theme.arrowText} flex items-center justify-center shrink-0 transition-all shadow-2xs`}>
                          <ArrowUpRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#059669]" />
                      )}
                    </div>

                    <div className="w-full text-left relative z-10 my-2">
                      {/* Highlighted Value / Contact Detail */}
                      <p className={`text-base sm:text-[17px] font-semibold ${theme.iconText} tracking-tight select-all leading-snug`}>
                        {method.contact}
                      </p>
                    </div>

                    {/* Bottom Detail - Description */}
                    <div className="pt-3 border-t border-[#CCDCE1]/80 w-full flex items-center justify-between text-left relative z-10 min-h-[44px]">
                      <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
                        {method.description}
                      </p>
                      {isLiveChat && (
                        <span className={`inline-flex items-center gap-1.5 text-[11px] ${theme.iconText} font-medium shrink-0 ml-2`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                          24/7
                        </span>
                      )}
                    </div>
                  </>
                );

                const cardClasses =
                  `relative bg-white rounded-2xl p-6 border border-[#CCDCE1] shadow-2xs ${theme.shadowHover} ${theme.cardBorderHover} transition-all duration-300 text-left flex flex-col justify-between group overflow-hidden h-full`;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className={`h-full ${isBusinessHours && contactMethods.length === 3 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  >
                    {isLiveChat ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent("openLiveChat"));
                        }}
                        className={`${cardClasses} w-full cursor-pointer`}
                      >
                        {cardContent}
                      </button>
                    ) : method.link !== "#" ? (
                      <a href={method.link} className={`${cardClasses} block`}>
                        {cardContent}
                      </a>
                    ) : (
                      <div className={cardClasses}>
                        {cardContent}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        <section id="send-message" className="relative pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 bg-white  overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#127EAB]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#EE6450]/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 sm:mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F7FA] border border-[#127EAB]/25 text-xs font-semibold text-teal mb-3.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                Direct Communication Desk
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25] mb-2.5">
                Send Us a{" "}
                <span className="font-medium text-teal">
                  Message
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F8E] font-normal max-w-xl mx-auto leading-relaxed">
                Connect directly with our CPA and IRS tax advisory team. Fill out the inquiry form below or reach our Alpharetta, GA headquarters.
              </p>
            </motion.div>

            {/* Unified Master Card: Contact Form & Office Location Together in Same Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl  shadow-[0_20px_50px_rgba(31,66,100,0.08)] overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Side: Contact Form */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#E9F7FA] border border-[#127EAB]/25 text-teal shrink-0 shadow-2xs">
                          <ChatBubbleLeftRightIcon className="w-5 h-5 text-teal" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-primary leading-snug">
                            Online Tax Inquiry
                          </h3>
                          <span className="text-xs text-[#6F7F8E] font-normal">
                            Tax advisors reply within 24 business hours
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal bg-[#E9F7FA] px-3 py-1 rounded-full border border-[#127EAB]/25 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Fast Response
                      </span>
                    </div>

                    <ContactForm />
                  </div>

                  {/* Trust Footer */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#6F7F8E]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-700">256-Bit SSL Encrypted & Confidential</span>
                    </div>
                    <span className="text-[11px] text-[#6F7F8E] hidden sm:inline">IRC Â§ 7216 Protected</span>
                  </div>
                </div>

                {/* Right Side: Corporate Headquarters Office & Map */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-9 bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between">
                  <div>
                    {/* Interactive Google Map */}
                    <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-xs mb-4 group">
                      <iframe
                        title="Alpharetta Office Map"
                        src="https://maps.google.com/maps?q=12600+Deerfield+Parkway+Suite+2096,+Alpharetta,+GA+30004&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      {/* Floating Location Pill */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-1.5 text-[11px] font-semibold text-primary pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>IRS Tax Adviser HQ</span>
                      </div>
                      {/* Floating Direct Maps Link */}
                      <a
                        href="https://www.google.com/maps/place/12600+Deerfield+Parkway+Suite+2096,+Alpharetta,+GA+30004"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-1 text-[11px] font-semibold text-teal hover:text-primary transition-colors"
                      >
                        <span>Open Maps</span>
                        <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Smart 2x2 Content Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Office Address */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#127EAB]/40 hover:shadow-xs transition-all flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[#E9F7FA] border border-[#127EAB]/25 flex items-center justify-center shrink-0 text-teal mt-0.5 group-hover:scale-105 transition-transform">
                          <MapPinIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#6F7F8E] uppercase tracking-wider block">
                            Address
                          </span>
                          <span className="text-xs sm:text-[13px] text-primary font-semibold block mt-0.5">
                            IRS Tax Adviser Inc
                          </span>
                          <span className="text-xs text-slate-600 font-normal leading-relaxed block mt-0.5">
                            12600 Deerfield Pkwy, Ste 2096<br />Alpharetta, GA 30004, USA
                          </span>
                        </div>
                      </div>

                      {/* Working Hours */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#127EAB]/40 hover:shadow-xs transition-all flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[#E9F7FA] border border-[#127EAB]/25 flex items-center justify-center shrink-0 text-teal mt-0.5 group-hover:scale-105 transition-transform">
                          <ClockIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#6F7F8E] uppercase tracking-wider block">
                            Hours (CST)
                          </span>
                          <span className="text-xs sm:text-[13px] text-primary font-semibold block mt-0.5">
                            Mon â€“ Sat: 9:30 AM â€“ 7:30 PM
                          </span>
                          <span className="text-xs text-slate-600 font-normal leading-relaxed block mt-0.5">
                            Sunday: Closed
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Online Portal Open 24/7
                          </span>
                        </div>
                      </div>

                      {/* Direct Phone */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#EE6450]/40 hover:shadow-xs transition-all flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[#FEF4F2] border border-[#EE6450]/25 flex items-center justify-center shrink-0 text-[#EE6450] mt-0.5 group-hover:scale-105 transition-transform">
                          <PhoneIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#6F7F8E] uppercase tracking-wider block">
                            Direct Phone
                          </span>
                          <div className="flex flex-col gap-0.5 mt-0.5">
                            <a
                              href="tel:+14044244191"
                              className="text-xs sm:text-[13px] text-primary hover:text-[#EE6450] font-semibold block truncate transition-colors"
                            >
                              +1 (404) 424-4191
                            </a>
                            <a
                              href="tel:+14044244815"
                              className="text-xs sm:text-[13px] text-primary hover:text-[#EE6450] font-semibold block truncate transition-colors"
                            >
                              +1 (404) 424-4815
                            </a>
                          </div>
                          <span className="text-[10px] text-[#EE6450] font-semibold block mt-1">
                            Toll-Free Assistance
                          </span>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#127EAB]/40 hover:shadow-xs transition-all flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-blue-200/70 flex items-center justify-center shrink-0 text-[#1F4264] mt-0.5 group-hover:scale-105 transition-transform">
                          <EnvelopeIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#6F7F8E] uppercase tracking-wider block">
                            Official Email
                          </span>
                          <a
                            href="mailto:info@irstaxfiler.com"
                            className="text-xs sm:text-[13px] text-primary hover:text-teal font-semibold block truncate mt-0.5 transition-colors"
                          >
                            info@irstaxfiler.com
                          </a>
                          <span className="text-xs text-slate-600 font-normal leading-relaxed block mt-0.5">
                            Tax desk & document intake
                          </span>
                          <span className="text-[10px] text-teal font-semibold block mt-1">
                            Replies within 2 hours
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Footnote */}
                  <div className="pt-4 mt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <a
                      href="https://www.google.com/maps/place/12600+Deerfield+Parkway+Suite+2096,+Alpharetta,+GA+30004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-teal transition-colors group"
                    >
                      <span>Get Directions in Google Maps</span>
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6F7F8E] italic">
                      <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0 not-italic" />
                      <span>Client consultations are strictly confidential</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. WHY CONTACT US? SECTION                                                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25] mb-2.5">
                Why Contact{" "}
                <span className="font-medium text-teal">
                  Us?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slateText font-normal max-w-2xl mx-auto leading-relaxed">
                We're here to help you with all your tax filing needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {[
                {
                  icon: AcademicCapIcon,
                  title: "Expert Guidance",
                  description:
                    "Get personalized advice from certified tax professionals who understand your unique situation.",
                },
                {
                  icon: BoltIcon,
                  title: "Quick Response",
                  description:
                    "We respond to all inquiries within 24 hours, ensuring you get the help you need promptly.",
                },
                {
                  icon: GiftIcon,
                  title: "Free Consultation",
                  description:
                    "Schedule a free consultation to discuss your tax filing needs and get a personalized quote.",
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EFF9FB] shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)] hover:border-[#CCDCE1] transition-all duration-200 flex flex-col justify-start group"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 ${index === 0
                        ? 'bg-blue-50 border border-border text-primary'
                        : index === 1
                          ? 'bg-teal-50 border border-teal-100 text-teal'
                          : 'bg-coral/10 border border-coral/20 text-[#EE6450]'
                        }`}
                    >
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>

                    <h3 className="text-base sm:text-lg font-medium text-primary mb-2 leading-snug">
                      {feature.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] text-slateText font-normal leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;
