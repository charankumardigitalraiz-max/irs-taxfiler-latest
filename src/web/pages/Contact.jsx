import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BoltIcon,
  GiftIcon,
  CheckCircleIcon,
  StarIcon,
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
      color: "#EFF6FF",
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      description:
        "Speak directly with our tax experts for immediate assistance.",
      contact: "+1 (415) 7876190",
      link: "tel:++1 (415) 7876190",
      color: "#F0FDF4",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      description: "Get instant help from our support team. Available 24/7.",
      contact: "Start Chat",
      link: "#",
      color: "#FEF3C7",
    },
    {
      icon: ClockIcon,
      title: "Business Hours",
      description: "Our team is available during these hours.",
      contact: "Mon-Sat: 9:30AM-7:30PM CST",
      link: "#",
      color: "#F3E8FF",
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
      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Hero Section */}
        <section
          className="relative overflow-hidden py-28"
          style={{ backgroundColor: "#2B547E" }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 w-72 h-72 bg-[#2B547E]/30 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#2B547E]/30 rounded-full blur-3xl"
            ></motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30 shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <StarIcon className="h-4 w-4 text-yellow-300" />
                </motion.div>
                <span className="text-white font-semibold text-xs md:text-sm">We're Here to Help</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                <span className="block text-white drop-shadow-lg">Contact Us</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block text-[#EB4149] drop-shadow-2xl"
                >
                  Get in Touch Today
                </motion.span>
              </h1>

              <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                Have questions? We're here to help. Get in touch with our team
                today and let's discuss how we can assist you.
              </p>
            </motion.div>
          </div>

          {/* Bottom Wave Decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-16 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ color: "#202020" }}
              >
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the contact method that works best for you. We're ready to
                assist.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                  >
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: method.color }}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: "#2B547E" }}
                      />
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "#202020" }}
                    >
                      {method.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {method.description}
                    </p>
                    {method.link === "#" && method.title === "Live Chat" ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.dispatchEvent(new CustomEvent("openLiveChat"));
                        }}
                        className="text-sm font-semibold hover:opacity-70 transition-opacity"
                        style={{ color: "#2B547E" }}
                      >
                        {method.contact}
                      </button>
                    ) : (
                      <a
                        href={method.link}
                        className="text-sm font-semibold hover:opacity-70 transition-opacity"
                        style={{ color: "#2B547E" }}
                      >
                        {method.contact}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="send-message" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-center"
            >
              <h2
                className="text-2xl lg:text-3xl font-bold mb-2"
                style={{ color: "#202020" }}
              >
                Send Us a Message
              </h2>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="h-full">
                <ContactForm />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#2B547E]/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#EB4149]/10 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 p-5 flex flex-col">
                  <div className="rounded-lg overflow-hidden shadow-sm mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=900&auto=format&fit=crop&q=80"
                      alt="Customer success team"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="space-y-3 text-gray-700 text-xs leading-relaxed">
                    <p className="text-sm">
                      Our customer success team is available worldwide to help you
                      with onboarding, document collection, and any questions
                      about your filing.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircleIcon
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "#2B547E" }}
                        />
                        <span className="text-xs">
                          Dedicated point of contact for personalized support
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircleIcon
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "#2B547E" }}
                        />
                        <span className="text-xs">
                          Average response time under two business hours
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircleIcon
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "#2B547E" }}
                        />
                        <span className="text-xs">
                          Secure communication with bank-level encryption
                        </span>
                      </li>
                    </ul>
                    <div className="pt-2 text-xs text-gray-500 border-t border-gray-100">
                      * We respond to all messages within 24 hours.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Office Location Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ color: "#202020" }}
              >
                Visit Our Office
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                While we primarily serve clients remotely, you're welcome to
                schedule an in-person consultation.
              </p>
            </motion.div>

            <div className="">
              {/* <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#EFF6FF" }}
                >
                  <BuildingOfficeIcon
                    className="w-7 h-7"
                    style={{ color: "#2B537D" }}
                  />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "#202020" }}>
                  Office Address
                </h3>
              </div>
              <div className="space-y-4">
                <div className="">
                  <p className="text-sm text-slate-300 mb-4 leading-snug">
                    <strong className="text-white flex items-center gap-1">
                      <MapPinIcon className="h-5 w-5 text-[#2B537D]" />
                     <p className="text-[#2B537D]" >Dallas, USA</p> 
                    </strong>

                    <a
                      href="https://www.google.com/maps/place/13610+Floyd+Cir,+Dallas,+TX+75243"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="pl-5 text-[#2B537D]">
                        13610 Floyd Cir, Dallas,
                        <br /> TX 75243
                      </p>
                    </a>
                  </p>

                  <p className="text-sm text-slate-300 leading-snug">
                    <strong className="text-white flex items-center gap-1">
                      <MapPinIcon className="h-5 w-5 text-[#2B537D]" />
                      <p className="text-[#2B537D]" > Hyderabad, India</p>
                    </strong>

                    <a
                      href="https://www.google.com/maps/place/Manjeera+Majestic+Commercial,+803,+JNTU+-+Hitech+City+Rd,+K+P+H+B+Phase+1,+Kukatpally,+Hyderabad,+Telangana+500072"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="pl-5 text-[#2B537D]">
                        # 803, Manjeera Majestic Commercial, Hitech City Road,
                        Hyderabad, Telangana 500072
                      </p>
                    </a>
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    We're located in the heart of New York City. Schedule an
                    appointment to visit our office for in-person consultations.
                  </p>
                </div>
              </div>
            </motion.div> */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">

                {/* Dallas Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                  className="
      w-[300px] h-[240px] rounded-2xl p-7 bg-white cursor-pointer
      border-2 border-gray-300
      hover:border-[#2B537D]
      shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      transition-all duration-300
    "
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#EFF6FF]">
                      <MapPinIcon className="w-7 h-7 text-[#2B537D]" />
                    </div>

                    <h4 className="text-lg font-semibold text-[#202020] text-center">Dallas, USA</h4>
                    <p className="text-sm text-gray-600 mt-2 text-center leading-relaxed">
                      13610 Floyd Cir,<br />
                      Dallas, TX 75243<br />
                      USA
                    </p>
                  </div>
                </motion.div>


                {/* Hyderabad Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="
      w-[300px] h-[240px] rounded-2xl p-7 bg-white cursor-pointer
      border-2 border-gray-300
      hover:border-[#EB4149]
      shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
      transition-all duration-300
    "
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#F3E8FF]">
                      <MapPinIcon className="w-7 h-7 text-[#EB4149]" />
                    </div>

                    <h4 className="text-lg font-semibold text-[#202020] text-center">Hyderabad, India</h4>
                    <p className="text-sm text-gray-600 mt-2 text-center leading-relaxed">
                      #803, Manjeera Majestic Commercial,<br />
                      Hitech City Road,<br />
                      Hyderabad, Telangana 500072<br />
                      India
                    </p>
                  </div>
                </motion.div>

              </div>


              {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-gray-100 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="h-full flex items-center justify-center min-h-[300px] p-8">
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#EB4149" }}
                  >
                    <MapPinIcon className="w-10 h-10 text-white" />
                  </div>
                  <p
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#202020" }}
                  >
                    Map Integration
                  </p>
                  <p className="text-sm text-gray-600">
                    Google Maps can be integrated here
                  </p>
                </div>
              </div>
            </motion.div> */}
            </div>
          </div>
        </section>

        {/* Why Contact Us Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ color: "#202020" }}
              >
                Why Contact Us?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're here to help you with all your tax filing needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: AcademicCapIcon,
                  title: "Expert Guidance",
                  description:
                    "Get personalized advice from certified tax professionals who understand your unique situation.",
                  color: "#EFF6FF",
                },
                {
                  icon: BoltIcon,
                  title: "Quick Response",
                  description:
                    "We respond to all inquiries within 24 hours, ensuring you get the help you need promptly.",
                  color: "#F0FDF4",
                },
                {
                  icon: GiftIcon,
                  title: "Free Consultation",
                  description:
                    "Schedule a free consultation to discuss your tax filing needs and get a personalized quote.",
                  color: "#FEF3C7",
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: feature.color }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                      >
                        <IconComponent
                          className="w-7 h-7"
                          style={{ color: "#2B547E" }}
                        />
                      </motion.div>
                    </motion.div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "#202020" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
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
