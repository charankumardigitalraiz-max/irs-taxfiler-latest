import { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaSlack } from "react-icons/fa";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import logo from "../assets/irsLogo.png";
import { submitWebsiteForm } from "../services/formApi";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
// import {
//   submitConsultation,
//   resetConsultationState,
// } from "../Redux/Slices/consultationSlice";

/* ---------- INDIAN REVIEWS ---------- */
const reviews = [
  {
    name: "Rahul Sharma",
    comment: "Maximum refund & super smooth filing experience!",
    img: "https://randomuser.me/api/portraits/men/80.jpg",
  },
  {
    name: "Priya Iyer",
    comment: "Very professional team. They saved me a lot of time.",
    img: "https://randomuser.me/api/portraits/women/81.jpg",
  },
  {
    name: "Amit Verma",
    comment: "Expert tax support. Highly recommended!",
    img: "https://randomuser.me/api/portraits/men/82.jpg",
  },
];

export default function LeadModal({ open, onClose }) {
  // const dispatch = useDispatch();
  // const { loading, success, error } = useSelector(
  //   (state) => state.consultation
  // );
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [index, setIndex] = useState(0);
  const [slideKey, setSlideKey] = useState(0);

  // rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % reviews.length;
        setSlideKey((k) => k + 1);
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+1",
    mobileNumber: "",
    timeZone: "EST",
    bestTimeToConnect: "Morning",
    formType:"consultantform",
  });

  // Reset on success
  // useEffect(() => {
  //   if (success) {
  //     setFormData({
  //       fullName: "",
  //       email: "",
  //       countryCode: "+1",
  //       mobileNumber: "",
  //       timeZone: "EST",
  //       bestTimeToConnect: "Morning",
  //     });

  //     // close after a short delay so user sees success
  //     const t = setTimeout(() => {
  //       dispatch(resetConsultationState());
  //       onClose();
  //     }, 1500);

  //     return () => clearTimeout(t);
  //   }
  // }, [success, dispatch, onClose]);

  if (!open) return null;
  const review = reviews[index];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic client-side validation example (optional)
    if (!formData.fullName || !formData.email) {
      setSubmitError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setSubmitError('');
    
    try {
      // Map form data to match backend expectations
      const submitData = {
        fullName: formData.fullName,
        email: formData.email,
        countryCode: formData.countryCode,
        mobileNumber: formData.mobileNumber,
        preferredTime: `${formData.timeZone} - ${formData.bestTimeToConnect}`,
      };
      
      await submitWebsiteForm('connect-expert', submitData);
      setSubmitSuccess(true);
      
      // Reset form and close after success
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          countryCode: "+1",
          mobileNumber: "",
          timeZone: "EST",
          bestTimeToConnect: "Morning",
          formType: "consultantform",
        });
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[9999] flex items-start justify-center backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-[90%] max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative my-8">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black z-10"
        >
          ✕
        </button>

        {/* LEFT */}
        <div
          className="
            w-full md:w-1/3 p-8 space-y-4 relative overflow-y-auto
          "
          style={{ backgroundColor: "#F5F9FF" }}
        >
          <img
            src={logo}
            alt="IRS Tax Filer"
            className="w-[160px] drop-shadow-sm relative z-10"
          />
          <h3
            className="text-xl font-semibold mt-3"
            style={{ color: "#2B547E" }}
          >
            Contact Us
          </h3>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" style={{ color: "#2B547E" }} />
            <span
              className="px-3 py-1.5 rounded-lg font-semibold text-sm border"
              style={{
                backgroundColor: "#EFF6FF",
                color: "#2B547E",
                borderColor: "rgba(43, 84, 126, 0.3)",
              }}
            >
              +1 (415) 787-6190
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" style={{ color: "#2B547E" }} />
            <span
              className="px-3 py-1.5 rounded-lg font-semibold text-sm border"
              style={{
                backgroundColor: "#EFF6FF",
                color: "#2B547E",
                borderColor: "rgba(43, 84, 126, 0.3)",
              }}
            >
              +1 (415) 223-1315
            </span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4" style={{ color: "#2B547E" }} />
            <span
              className="px-3 py-1.5 rounded-lg font-semibold text-sm border"
              style={{
                backgroundColor: "#EFF6FF",
                color: "#2B547E",
                borderColor: "rgba(43, 84, 126, 0.3)",
              }}
            >
              contact@irstaxfiler.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4" style={{ color: "#2B547E" }} />
            <span
              className="px-3 py-1.5 rounded-lg font-semibold text-sm border"
              style={{
                backgroundColor: "#EFF6FF",
                color: "#2B547E",
                borderColor: "rgba(43, 84, 126, 0.3)",
              }}
            >
              irstaxfilers@gmail.com
            </span>
          </div>

          <div className="pt-2">
            <h4 className="font-semibold" style={{ color: "#2B547E" }}>
              Working Hours
            </h4>
            <p style={{ color: "#6B7280" }}>9:30 AM – 7:30 PM CST</p>
          </div>

          <div className="pt-3">
            <h4 className="font-semibold" style={{ color: "#2B547E" }}>
              Instant Contact
            </h4>
            <div className="flex gap-3 mt-2">
              {/* <Icon><FaFacebookF size={16} /></Icon>
              <Icon><FaLinkedinIn size={16} /></Icon>
              <Icon><FaSlack size={16} /></Icon>
              <Icon><FaWhatsapp size={16} /></Icon> */}
              <div className="flex gap-3 mt-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61584622772025"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon>
                    <FaFacebookF size={16} />
                  </Icon>
                </a>

                <a
                  href="https://www.linkedin.com/company/irs-tax-filer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon>
                    <FaLinkedinIn size={16} />
                  </Icon>
                </a>

                <a
                  href="https://irstaxfilerworkspace.slack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon>
                    <FaSlack size={16} />
                  </Icon>
                </a>

                <a
                  href="https://wa.me/919052333667?text=Hi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon>
                    <FaWhatsapp size={16} />
                  </Icon>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-3/5 p-6 md:p-8 bg-white overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2B547E] mb-6">
            Connect With A Tax Expert
          </h2>

          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Form submitted successfully! We'll contact you soon.
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-[#EB4149]">*</span>
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#EB4149] focus:border-[#EB4149] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-[#EB4149]">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#EB4149] focus:border-[#EB4149] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Mobile Number
              </label>
              <div className="grid grid-cols-[80px,1fr] gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#EB4149] focus:border-[#EB4149] focus:bg-white focus:outline-none transition-all"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                  <option value="+61">+61</option>
                </select>

                <input
                  name="mobileNumber"
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#EB4149] focus:border-[#EB4149] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Time Zone
                </label>
                <select
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#EB4149] focus:border-[#EB4149] focus:bg-white focus:outline-none transition-all"
                >
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                  <option value="GMT">GMT</option>
                  <option value="IST">IST</option>
                  <option value="CST">CST</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Best Time to Connect
                </label>
                <select
                  name="bestTimeToConnect"
                  value={formData.bestTimeToConnect}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#EB4149] focus:border-[#EB4149] focus:bg-white focus:outline-none transition-all"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition-all duration-200 hover:shadow-md hover:opacity-90 transform bg-gradient-to-r from-[#2B547E] to-[#1E3A5F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Get Free Consultation"
              )}
            </button>
          </form>

          {/* REVIEW CARD */}
          <div
            className="
            relative mt-6 p-4 h-[110px]
            bg-[#F5F9FF] border border-[#2B547E]/20
            rounded-xl overflow-hidden
          "
          >
            <div
              key={slideKey}
              className="flex items-center gap-4 h-full animate-slide-left"
            >
              <img
                src={review.img}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#2B547E]"
              />
              <div>
                <p className="text-[#2B547E] font-semibold leading-snug">
                  {review.comment}
                </p>
                <span className="text-xs text-gray-500">— {review.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ type = "text", name, placeholder, value, onChange }) {
  return (
    <input
      required
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-field"
    />
  );
}

function Icon({ children }) {
  return (
    <div
      className="
        bg-white text-[#2B547E] p-3 rounded-full shadow-md
        hover:bg-[#2B547E] hover:text-white hover:shadow-lg
        transition cursor-pointer
      "
      style={{ fontSize: "1.25rem" }}
    >
      {children}
    </div>
  );
}
