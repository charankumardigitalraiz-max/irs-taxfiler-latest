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
} from "@heroicons/react/24/outline";
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const Contact = () => {
  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours.",
      contact: "contact@irstaxfiler.com",
      link: "mailto:contact@irstaxfiler.com",
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      description: "Speak directly with our tax experts for immediate assistance.",
      contact: "+1 (404) 424-4191",
      link: "tel:+14044244191",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      description: "Get instant help from our support team. Available 24/7.",
      contact: "Start Chat",
      link: "#",
    },
    {
      icon: ClockIcon,
      title: "Business Hours",
      description: "Our team is available during these hours.",
      contact: "Mon-Sat: 9:30AM-7:30PM CST",
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
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-white border-b border-slate-100">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl opacity-60" />
            <div className="absolute -top-20 right-1/4 w-80 h-80 bg-lime-100/40 rounded-full blur-3xl opacity-50" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 mb-4 select-none">
                <StarIcon className="w-3.5 h-3.5 text-[#749220]" />
                <span className="text-xs font-medium text-slate-700">We're Here to Help</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 tracking-tight leading-[1.25] mb-3.5 max-w-3xl mx-auto">
                Contact Us —{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Get in Touch Today
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 font-normal leading-[30px] sm:leading-[32px] lg:leading-[34px] mb-2 max-w-2xl mx-auto text-center">
                Have questions? We're here to help. Get in touch with our team today and let's discuss how we can assist you.
              </p>
            </motion.div>

            {/* Contact Methods Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                const isLime = index % 2 === 0;
                const isLiveChat = method.title === "Live Chat";
                const isBusinessHours = method.title === "Business Hours";

                const cardContent = (
                  <>
                    {/* Top Accent Line on hover */}
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#749220]/0 to-transparent group-hover:via-[#749220] transition-all duration-300" />

                    <div>
                      {/* Top Row: Icon + Arrow / Indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isLime
                            ? 'bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]'
                            : 'bg-sky-50 border border-sky-100 text-[#165479]'
                            }`}
                        >
                          <IconComponent className="w-5.5 h-5.5" />
                        </div>

                        {!isBusinessHours ? (
                          <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-sky-50 border border-slate-100/80 group-hover:border-sky-100 flex items-center justify-center text-slate-400 group-hover:text-[#165479] transition-all">
                            <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#749220]" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-[#165479] transition-colors mb-1.5 leading-snug">
                        {method.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed mb-4">
                        {method.description}
                      </p>
                    </div>

                    {/* Bottom Detail */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[#165479] group-hover:text-[#0A4973] transition-colors truncate">
                        {method.contact}
                      </span>
                      {isLiveChat && (
                        <span className="flex items-center gap-1.5 text-[11px] text-[#749220] font-medium shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#749220] animate-pulse" />
                          24/7
                        </span>
                      )}
                    </div>
                  </>
                );

                const cardClasses =
                  "relative bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-[0_16px_36px_rgba(22,84,121,0.08)] hover:border-[#165479]/30 transition-all duration-300 text-left flex flex-col justify-between group overflow-hidden h-full";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="h-full"
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

        {/* ========================================================================= */}
        {/* 2. CONTACT FORM & OFFICE LOCATIONS                                        */}
        {/* ========================================================================= */}
        <section id="send-message" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 sm:mb-14"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-2.5">
                Send Us a{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Message
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-xl mx-auto leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Unified Master Card: Contact Form & Office Location Together in Same Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Side: Contact Form */}
                <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-50 border border-sky-100 text-[#165479] shrink-0">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 text-[#165479]" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                          Send Us a Message
                        </h3>
                        <span className="text-xs text-slate-500 font-normal">
                          We reply within 24 business hours
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#165479] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 shrink-0">
                      Online Inquiry
                    </span>
                  </div>

                  <ContactForm />
                </div>

                {/* Right Side: Corporate Headquarters Office & Map */}
                <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between">
                  <div>
                    {/* Office Header */}
                    {/* <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-slate-200/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200/90 text-[#165479] shadow-2xs shrink-0">
                          <MapPinIcon className="w-4 h-4 text-[#165479]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                              Corporate Headquarters
                            </h3>
                            <span className="text-[10px] font-semibold text-[#165479] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                              USA
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 font-normal">
                            Alpharetta, Georgia
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 shrink-0">
                        By Appointment
                      </span>
                    </div> */}

                    {/* Interactive Google Map */}
                    <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-inner mb-3.5">
                      <iframe
                        title="Alpharetta Office Map"
                        src="https://maps.google.com/maps?q=12600+Deerfield+Parkway+Suite+2096,+Alpharetta,+GA+30004&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>

                    {/* Smart 2x2 Content Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Office Address */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#165479]/30 transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-[#165479] mt-0.5">
                          <MapPinIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Address
                          </span>
                          <span className="text-xs text-slate-700 font-medium leading-relaxed block mt-0.5">
                            12600 Deerfield Pkwy, Ste 2096<br />Alpharetta, GA 30004, USA
                          </span>
                        </div>
                      </div>

                      {/* Working Hours */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#165479]/30 transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-lime-50 border border-lime-100 flex items-center justify-center shrink-0 text-[#749220] mt-0.5">
                          <ClockIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Hours (CST)
                          </span>
                          <span className="text-xs text-slate-700 font-medium leading-relaxed block mt-0.5">
                            Mon – Sat: 9:30 AM – 7:30 PM<br />Sunday: Closed
                          </span>
                        </div>
                      </div>

                      {/* Direct Phone */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#165479]/30 transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-[#165479] mt-0.5">
                          <PhoneIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Direct Telephone
                          </span>
                          <a
                            href="tel:+14044244191"
                            className="text-xs text-[#165479] hover:underline font-bold block truncate mt-0.5"
                          >
                            +1 (404) 424-4191
                          </a>
                          <span className="text-[10px] text-emerald-600 font-semibold block">Toll-Free Assistance</span>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#165479]/30 transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-lime-50 border border-lime-100 flex items-center justify-center shrink-0 text-[#749220] mt-0.5">
                          <EnvelopeIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Official Email
                          </span>
                          <a
                            href="mailto:contact@irstaxfiler.com"
                            className="text-xs text-[#165479] hover:underline font-bold block truncate mt-0.5"
                          >
                            contact@irstaxfiler.com
                          </a>
                          <span className="text-[10px] text-slate-400 font-normal block">Replies in 24 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Footnote */}
                  <div className="pt-3 mt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                    <a
                      href="https://www.google.com/maps/place/12600+Deerfield+Parkway+Suite+2096,+Alpharetta,+GA+30004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#165479] hover:text-[#0A4973] transition-colors"
                    >
                      <span>Get Directions in Google Maps</span>
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-slate-400 font-normal italic">
                      * All client inquiries are confidential.
                    </span>
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
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-gray-900 tracking-tight leading-[1.25] mb-2.5">
                Why Contact{" "}
                <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                  Us?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
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
                const isLime = index === 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.08)] hover:border-[#165479]/30 transition-all duration-200 flex flex-col justify-start group"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 ${isLime
                        ? 'bg-[#F6F9EE] border border-[#749220]/25 text-[#749220]'
                        : 'bg-sky-50 border border-sky-100 text-[#165479]'
                        }`}
                    >
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>

                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 leading-snug">
                      {feature.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] text-gray-600 font-normal leading-relaxed">
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
