import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { submitWebsiteForm } from "../services/formApi";

const ContactForm = () => {
  
  const [contactFormError, setContactFormError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    formType: "contactusform",
  });

  const contactFormValidation = () => {
    let newError = {};

    if (formData.name.trim() === "") {
      newError.name = "Name is Required";
    }

    if (formData.email.trim() === "") {
      newError.email = "Email is Required";
    }

    if (formData.subject.trim() === "") {
      newError.subject = "Subject is Required";
    }

    if (formData.phone.trim() === "") {
      newError.phone = "Phone is Required";
    }

    if (formData.message.trim() === "") {
      newError.message = "Message is Required";
    }

    setContactFormError(newError);
    return Object.keys(newError).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactFormValidation()) return;

    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      await submitWebsiteForm('contact-message', formData);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        formType: "contactusform",
      });
      setContactFormError({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNumber = (e) => {
    let value = e.target.value;

    // allow only digits and +
    value = value.replace(/[^0-9+]/g, "");

    // allow + only at start and only once
    if (value.includes("+")) {
      value = "+" + value.slice(1).replace(/\+/g, "");
    }

    // E.164 max 15 digits
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length > 15) return;

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  return (
    <div className="w-full h-full">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white p-5 lg:p-6 rounded-xl shadow-md border border-gray-100 h-full flex flex-col"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex-1 flex flex-col"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700 mb-1.5"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#165479] focus:border-[#165479] focus:bg-white focus:outline-none transition-all"
                placeholder="John Doe"
              />
             
            </div>
             {contactFormError.name && (
                <span className="text-red-500 text-xs">
                  {contactFormError.name}
                </span>
              )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1.5"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#165479] focus:border-[#165479] focus:bg-white focus:outline-none transition-all"
                placeholder="john@example.com"
              />
              
            </div>
            {contactFormError.email && (
                <span className="text-red-500 text-xs">
                  {contactFormError.email}
                </span>
              )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-medium text-gray-700 mb-1.5"
            >
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleNumber}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#165479] focus:border-[#165479] focus:bg-white focus:outline-none transition-all"
                placeholder="+1 (234) 567-8900"
              />
              
            </div>
            {contactFormError.phone && (
                <span className="text-red-500 text-xs">
                  {contactFormError.phone}
                </span>
              )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-medium text-gray-700 mb-1.5"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#165479] focus:border-[#165479] focus:bg-white focus:outline-none transition-all"
              placeholder="How can we help?"
            />
            {contactFormError.subject && (
              <span className="text-red-500 text-xs">
                {contactFormError.subject}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-gray-700 mb-1.5"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#165479] focus:border-[#165479] focus:bg-white focus:outline-none transition-all resize-none"
              placeholder="Tell us more about your requirements..."
            />
            {contactFormError.message && (
              <span className="text-red-500 text-xs">
                {contactFormError.message}
              </span>
            )}
          </div>

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-md hover:opacity-95 bg-gradient-to-r from-[#0A4973] to-[#165479] hover:from-[#083b5d] hover:to-[#124563] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
