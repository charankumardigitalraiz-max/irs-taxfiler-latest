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
      contact: "+1 (404) 424-4191 / 4815",
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
                Contact Us —{" "}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                const isLiveChat = method.title === "Live Chat";
                const isBusinessHours = method.title === "Business Hours";

                const cardContent = (
                  <>
                    {/* Top Accent Line on hover */}
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#127EAB]/0 to-transparent group-hover:via-[#127EAB] transition-all duration-300" />

                    <div>
                      {/* Top Row: Icon + Arrow / Indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 bg-[#E9F7FA] border border-[#127EAB]/30 text-teal">
                          <IconComponent className="w-5.5 h-5.5" />
                        </div>

                        {!isBusinessHours ? (
                          <div className="w-8 h-8 rounded-lg bg-[#FDF8F2] group-hover:bg-[#E9F7FA] border border-[#CCDCE1] group-hover:border-[#127EAB]/30 flex items-center justify-center text-[#6F7F8E] group-hover:text-teal transition-all">
                            <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#127EAB]" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-primary group-hover:text-teal transition-colors mb-1.5 leading-snug">
                        {method.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-[#6F7F8E] font-normal leading-relaxed mb-4">
                        {method.description}
                      </p>
                    </div>

                    {/* Bottom Detail */}
                    <div className="pt-3 border-t border-[#CCDCE1] flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-primary group-hover:text-teal transition-colors truncate">
                        {method.contact}
                      </span>
                      {isLiveChat && (
                        <span className="flex items-center gap-1.5 text-[11px] text-teal font-medium shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#127EAB] animate-pulse" />
                          24/7
                        </span>
                      )}
                    </div>
                  </>
                );

                const cardClasses =
                  "relative bg-white rounded-2xl p-6 border border-[#CCDCE1] shadow-[0_2px_10px_rgba(23,50,77,0.04)] hover:shadow-[0_12px_28px_rgba(63,124,122,0.12)] hover:border-[#127EAB]/50 transition-all duration-300 text-left flex flex-col justify-between group overflow-hidden h-full";

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
        <section id="send-message" className="py-16 sm:py-20 bg-[#FDF8F2] border-b border-[#CCDCE1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10 sm:mb-14"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-primary tracking-tight leading-[1.25] mb-2.5">
                Send Us a{" "}
                <span className="font-medium text-teal">
                  Message
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#6F7F8E] font-normal max-w-xl mx-auto leading-relaxed">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Unified Master Card: Contact Form & Office Location Together in Same Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#CCDCE1] shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Side: Contact Form */}
                <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E9F7FA] border border-[#127EAB]/30 text-teal shrink-0">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 text-teal" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-primary leading-snug">
                          Send Us a Message
                        </h3>
                        <span className="text-xs text-[#6F7F8E] font-normal">
                          We reply within 24 business hours
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-teal bg-[#E9F7FA] px-2.5 py-0.5 rounded-full border border-[#127EAB]/30 shrink-0">
                      Online Inquiry
                    </span>
                  </div>

                  <ContactForm />
                </div>

                {/* Right Side: Corporate Headquarters Office & Map */}
                <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 bg-slate-50/70 border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between">
                  <div>
                    {/* Interactive Google Map */}
                    <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-[#EFF9FB] bg-slate-100 shadow-inner mb-3.5">
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
                      <div className="p-3 rounded-xl bg-white border border-[#EFF9FB] shadow-2xs hover:border-[#CCDCE1] transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-border flex items-center justify-center shrink-0 text-primary mt-0.5">
                          <MapPinIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slateText uppercase tracking-wider block">
                            Address
                          </span>
                          <span className="text-xs text-slateText font-medium leading-relaxed block mt-0.5">
                            12600 Deerfield Pkwy, Ste 2096<br />Alpharetta, GA 30004, USA
                          </span>
                        </div>
                      </div>

                      {/* Working Hours */}
                      <div className="p-3 rounded-xl bg-white border border-[#EFF9FB] shadow-2xs hover:border-[#CCDCE1] transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal mt-0.5">
                          <ClockIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slateText uppercase tracking-wider block">
                            Hours (CST)
                          </span>
                          <span className="text-xs text-slateText font-medium leading-relaxed block mt-0.5">
                            Mon – Sat: 9:30 AM – 7:30 PM<br />Sunday: Closed
                          </span>
                        </div>
                      </div>

                      {/* Direct Phone */}
                      <div className="p-3 rounded-xl bg-white border border-[#EFF9FB] shadow-2xs hover:border-[#CCDCE1] transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-border flex items-center justify-center shrink-0 text-primary mt-0.5">
                          <PhoneIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slateText uppercase tracking-wider block">
                            Direct Telephone
                          </span>
                          <div className="flex flex-col gap-0.5 mt-0.5">
                            <a
                              href="tel:+14044244191"
                              className="text-xs text-primary hover:text-teal font-bold block truncate transition-colors"
                            >
                              +1 (404) 424-4191
                            </a>
                            <a
                              href="tel:+14044244815"
                              className="text-xs text-primary hover:text-teal font-bold block truncate transition-colors"
                            >
                              +1 (404) 424-4815
                            </a>
                          </div>
                          <span className="text-[10px] text-teal font-semibold block mt-1">Toll-Free Assistance</span>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="p-3 rounded-xl bg-white border border-[#EFF9FB] shadow-2xs hover:border-[#CCDCE1] transition-all flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-coral/10 border border-coral/20 flex items-center justify-center shrink-0 text-[#EE6450] mt-0.5">
                          <EnvelopeIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slateText uppercase tracking-wider block">
                            Official Email
                          </span>
                          <a
                            href="mailto:contact@irstaxfiler.com"
                            className="text-xs text-primary hover:underline font-bold block truncate mt-0.5"
                          >
                            contact@irstaxfiler.com
                          </a>
                          <span className="text-[10px] text-slateText font-normal block">Replies in 24 hours</span>
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
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-[#1E4162] transition-colors"
                    >
                      <span>Get Directions in Google Maps</span>
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-slateText font-normal italic">
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
