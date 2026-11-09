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
      contact: "+1 (415) 7876190",
      link: "tel:+14157876190",
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Form */}
              <div className="lg:col-span-6 h-full">
                <ContactForm />
              </div>

              {/* Right Column: Office Address List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* <div className="mb-3.5">
                    <h3 className="text-lg font-medium text-gray-900 leading-snug">
                      Visit Our{" "}
                      <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                        Office
                      </span>
                    </h3>
                    <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed mt-1">
                      While we primarily serve clients remotely, you're welcome to schedule an in-person consultation.
                    </p>
                  </div> */}

                  <div className="space-y-4">
                    {/* Dallas Office Card */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.08)] hover:border-[#165479]/30 transition-all duration-200 group">
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-50 border border-sky-100 text-[#165479] shrink-0 transition-transform duration-200 group-hover:scale-105">
                            <MapPinIcon className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                              Dallas, USA
                            </h4>
                            <span className="text-[10px] font-medium text-[#165479] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                              United States
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium select-none">
                          By Appointment
                        </span>
                      </div>

                      {/* Flex Body: Map & Address Text */}
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                        {/* Interactive Map Embed */}
                        <div className="w-full sm:w-48 md:w-52 h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-inner shrink-0">
                          <iframe
                            title="Dallas Office Map"
                            src="https://maps.google.com/maps?q=13610+Floyd+Cir,+Dallas,+TX+75243&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>

                        {/* Address & Directions */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
                            13610 Floyd Cir,<br />
                            Dallas, TX 75243,<br />
                            USA
                          </p>

                          <div className="pt-2">
                            <a
                              href="https://www.google.com/maps/place/13610+Floyd+Cir,+Dallas,+TX+75243"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#165479] hover:text-[#0A4973] transition-colors"
                            >
                              <span>Get Directions</span>
                              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hyderabad Office Card */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-[0_12px_28px_rgba(22,84,121,0.08)] hover:border-[#165479]/30 transition-all duration-200 group">
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#F6F9EE] border border-[#749220]/25 text-[#749220] shrink-0 transition-transform duration-200 group-hover:scale-105">
                            <MapPinIcon className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                              Hyderabad, India
                            </h4>
                            <span className="text-[10px] font-medium text-[#749220] bg-[#F6F9EE] px-2 py-0.5 rounded border border-[#749220]/20">
                              India
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium select-none">
                          By Appointment
                        </span>
                      </div>

                      {/* Flex Body: Map & Address Text */}
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                        {/* Interactive Map Embed */}
                        <div className="w-full sm:w-48 md:w-52 h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-inner shrink-0">
                          <iframe
                            title="Hyderabad Office Map"
                            src="https://maps.google.com/maps?q=Manjeera+Majestic+Commercial,+Kukatpally,+Hyderabad,+Telangana+500072&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>

                        {/* Address & Directions */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed">
                            #803, Manjeera Majestic Commercial,<br />
                            Hitech City Road,<br />
                            Hyderabad, Telangana 500072, India
                          </p>

                          <div className="pt-2">
                            <a
                              href="https://www.google.com/maps/place/Manjeera+Majestic+Commercial,+803,+JNTU+-+Hitech+City+Rd,+K+P+H+B+Phase+1,+Kukatpally,+Hyderabad,+Telangana+500072"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#165479] hover:text-[#0A4973] transition-colors"
                            >
                              <span>Get Directions</span>
                              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-500 font-normal italic">
                  * We respond to all messages within 24 hours.
                </div>
              </motion.div>
            </div>
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
