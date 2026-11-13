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
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50/70 hover:bg-white focus:ring-2 focus:ring-[#165479]/15 focus:border-[#165479] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                  placeholder="John Doe"
                />
              </div>
              {contactFormError.name && (
                <span className="text-red-500 text-[11px] mt-0.5 block">
                  {contactFormError.name}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50/70 hover:bg-white focus:ring-2 focus:ring-[#165479]/15 focus:border-[#165479] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                  placeholder="john@example.com"
                />
              </div>
              {contactFormError.email && (
                <span className="text-red-500 text-[11px] mt-0.5 block">
                  {contactFormError.email}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Phone Number
            </label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleNumber}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50/70 hover:bg-white focus:ring-2 focus:ring-[#165479]/15 focus:border-[#165479] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                placeholder="+1 (404) 424-4191"
              />
            </div>
            {contactFormError.phone && (
              <span className="text-red-500 text-[11px] mt-0.5 block">
                {contactFormError.phone}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50/70 hover:bg-white focus:ring-2 focus:ring-[#165479]/15 focus:border-[#165479] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-medium"
              placeholder="How can we help?"
            />
            {contactFormError.subject && (
              <span className="text-red-500 text-[11px] mt-0.5 block">
                {contactFormError.subject}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50/70 hover:bg-white focus:ring-2 focus:ring-[#165479]/15 focus:border-[#165479] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-medium resize-none"
              placeholder="Tell us more about your tax requirements..."
            />
            {contactFormError.message && (
              <span className="text-red-500 text-[11px] mt-0.5 block">
                {contactFormError.message}
              </span>
            )}
          </div>

          {submitError && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full text-white py-2.5 px-5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg bg-gradient-to-r from-[#165479] via-[#1b5e85] to-[#749220] hover:from-[#114261] hover:to-[#5e7719] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer block text-center"
          >
            {submitting ? 'Sending Message...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
