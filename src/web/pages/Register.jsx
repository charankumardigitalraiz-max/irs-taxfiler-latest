import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/irsLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetStatus } from "../Redux/Slices/userSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
  ArrowRightIcon,
  UserPlusIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import SEO from "../components/seo/SEO";

/* ---------------- TIMEZONES ---------------- */
const timezones = [
  "UTC",
  "GMT",
  "EST (Eastern Time)",
  "PST (Pacific Time)",
  "CST (Central Time)",
  "MST (Mountain Time)",
  "IST (India Standard Time)",
  "CET (Central Europe Time)",
  "AEST (Australia Eastern Time)",
];

/* ---------------- COMPONENT ---------------- */

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [captcha, setCaptcha] = useState(null);
  const [searchParams] = useSearchParams();
  const [referbuttondisabled, setreferbuttondisabled] = useState(false);
  const [registerFormError, setRegisterFormError] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timezone: "",
    password: "",
    confirmPassword: "",
    referralId: "",
  });

  const registerfromValidation = () => {
    const err = {};

    if (!formData.firstName) {
      err.firstName = "First name is required";
    }
    if (!formData.lastName) {
      err.lastName = "Lastname is required";
    }
    if (!formData.email) {
      err.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      err.email = "Enter valid email";
    }
    if (!formData.phone) {
      err.phone = "Phone is required";
    }
    if (!formData.timezone) {
      err.timezone = "Timezone is required";
    }
    if (!formData.password) {
      err.password = "Password is required";
    } else if (formData.password.length < 6) {
      err.password = "Min 6 characters";
    }

    if (!formData.confirmPassword) {
      err.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword.length < 6) {
      err.confirmPassword = "Min 6 characters";
    } else if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    setRegisterFormError(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const ref = searchParams.get("ref");
    setFormData((prev) => ({ ...prev, referralId: ref || "" }));
    if (ref) {
      setreferbuttondisabled(true);
    } else {
      setreferbuttondisabled(false);
    }
    dispatch(resetStatus());
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (success) {
      toast.success("Registered successfully!");

      const timer = setTimeout(() => {
        navigate("/login");
        dispatch(resetStatus());
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captcha) {
      toast.error("Please verify reCAPTCHA", { title: "Verification Required" });
      return;
    }

    if (!registerfromValidation()) return;

    dispatch(
      registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.phone,
        timezone: formData.timezone,
        password: formData.password,
        referralId: formData.referralId || null,
        captchaToken: captcha,
      })
    );
  };

  const title = "Register | IRS Tax Filer";
  const description =
    "Create your account with IRS Tax Filer — secure US & Indian tax filing services with CPA review.";
  const keywords =
    "register, online tax filing, tax return, IRS Tax Filer register, account creation";
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
      <div className="min-h-screen py-8 sm:py-12 bg-background flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-border overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              {/* BACK BUTTON */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-slateText hover:text-primary transition-colors mb-6 group"
              >
                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>

              {/* LOGO & HEADER */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background-aqua rounded-2xl flex items-center justify-center shadow-md border border-border">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-normal text-primary mb-2"
                  >
                    Create Your Account
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm sm:text-base text-slateText"
                  >
                    Join thousands of users managing their taxes with confidence
                  </motion.p>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First + Last + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Input
                      icon={<UserIcon />}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      label="First Name"
                    />
                    {registerFormError.firstName && (
                      <span className="text-xs text-coral mt-1 block">
                        {registerFormError.firstName}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      icon={<UserIcon />}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                    {registerFormError.lastName && (
                      <span className="text-xs text-coral mt-1 block">
                        {registerFormError.lastName}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      icon={<EnvelopeIcon />}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      label="Email Address"
                    />
                    {registerFormError.email && (
                      <span className="text-xs text-coral mt-1 block">
                        {registerFormError.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone + Timezone + Referral */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Input
                      icon={<PhoneIcon />}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (551) 842-7896"
                      label="Phone Number"
                    />
                    {registerFormError.phone && (
                      <span className="text-xs text-coral mt-1 block">
                        {registerFormError.phone}
                      </span>
                    )}
                  </div>
                  {/* TIMEZONE DROPDOWN */}
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1.5">
                      Timezone <span className="text-coral">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slateText z-10">
                        <GlobeAltIcon />
                      </div>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="
                          w-full pl-10 pr-8 py-2.5 text-sm
                          bg-white border-2 border-border rounded-lg
                          shadow-sm text-primary
                          focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal
                          transition-all duration-200
                          appearance-none cursor-pointer
                          hover:border-teal
                        "
                      >
                        <option value="">Select Timezone</option>
                        {timezones.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-slateText"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {registerFormError.timezone && (
                        <span className="text-xs text-coral mt-1 block">
                          {registerFormError.timezone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* REFERRAL - OPTIONAL */}
                  <div>
                    <Input
                      icon={<UserPlusIcon />}
                      name="referralId"
                      value={formData.referralId}
                      onChange={handleChange}
                      placeholder="Enter referral code"
                      label="Referral Code (Optional)"
                      required={false}
                      disabled={referbuttondisabled}
                    />
                  </div>
                </div>

                {/* Password + Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Input
                      icon={<LockClosedIcon />}
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      label="Password"
                    />
                    {registerFormError.password && (
                      <span className="text-xs text-coral mt-1 block">
                        {registerFormError.password}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      icon={<LockClosedIcon />}
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      label="Confirm Password"
                    />
                    {registerFormError.confirmPassword && (
                      <span className="text-xs text-coral mt-1 block">
                        {registerFormError.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>

                {/* CAPTCHA */}
                <div className="flex justify-center py-2">
                  <div className="transform scale-90 sm:scale-100">
                    <ReCAPTCHA
                      sitekey="6LcYfScsAAAAAIdbZY1dsJ4BVj2IIwT0tBOjHYDH"
                      onChange={(token) => setCaptcha(token)}
                    />
                  </div>
                </div>

                {/* TERMS */}
                <div className="flex items-start space-x-3 p-3 bg-surface rounded-lg border border-border">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 w-4 h-4 accent-primary border-border rounded focus:ring-2 focus:ring-teal cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slateText cursor-pointer flex-1"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-teal font-semibold hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-teal font-semibold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* BUTTON */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    w-full py-3 flex justify-center items-center gap-2
                    bg-primary hover:bg-primary-dark
                    text-white font-semibold text-sm rounded-xl
                    shadow-md hover:shadow-lg
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:hover:scale-100 cursor-pointer
                  "
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* FOOTER */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-slateText">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-teal font-semibold hover:underline transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;

/* ---------------- INPUT COMPONENT ---------------- */
const Input = ({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
  label,
  disabled = false,
}) => (
  <div>
    {label && (
      <label className="block text-xs font-semibold text-primary mb-1.5">
        {label} {required && <span className="text-coral">*</span>}
      </label>
    )}
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slateText group-focus-within:text-teal transition-colors duration-200 z-10">
        {icon}
      </div>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="
          w-full pl-10 pr-3 py-2.5 text-sm
          bg-white border-2 border-border rounded-lg
          shadow-sm text-primary
          focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal
          transition-all duration-200
          placeholder:text-slateText/60
          hover:border-teal
          disabled:bg-background disabled:cursor-not-allowed
        "
      />
    </div>
  </div>
);
