import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { loginUser, resetStatus } from "../Redux/Slices/userSlice";
import { toast } from "react-toastify";
import Logo from "../assets/irsLogo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import SEO from "../components/seo/SEO";

/* -------------------- VALIDATION -------------------- */

const LoginSchema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Email required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password required"),
});

/* -------------------- COMPONENT -------------------- */

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.auth);

  // ================= FORM STATE =================
  const savedEmail = localStorage.getItem("rememberEmail") || "";

  const [formData, setFormData] = useState({
    email: savedEmail,
    password: "",
    rememberMe: !!savedEmail,
  });

  const [loginError, setLoginError] = useState({});

  // ================= VALIDATION =================
  const loginFormValidation = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Enter valid email";
    }

    if (!formData.password) {
      errors.password = "Password required";
    } else if (formData.password.length < 6) {
      errors.password = "Min 6 characters";
    }

    setLoginError(errors);
    return Object.keys(errors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!loginFormValidation()) return;

    dispatch(loginUser(formData));

    if (formData.rememberMe) {
      localStorage.setItem("rememberEmail", formData.email);
    } else {
      localStorage.removeItem("rememberEmail");
    }
  };

  // ================= EFFECTS =================
  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Login successful!");
      const timer = setTimeout(() => {
        navigate("/dashboard");
        dispatch(resetStatus());
      }, 1200); // ⏱ small delay

      return () => clearTimeout(timer);
    }

    if (error) {
      toast.error(error);
      dispatch(resetStatus());
    }
  }, [success, error, navigate, dispatch]);

  const title = "About Us | IRS Tax Filer";
  const description =
    "Learn about IRS Tax Filer — our mission, expertise in US & Indian tax services, and commitment to secure,Learn more.";
  const keywords =
    "online tax filing service,tax service provider,Internal Revenue Service,IRS Tax Filer about, US & Indian tax services, tax filing expertise, tax compliance company";
  const canonical = window.location.href;
  const image = { Logo };

  // ================= UI =================
  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />
      <div className="min-h-screen py-8 sm:py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2B547E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EB4149]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              {/* BACK BUTTON */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#2B547E] transition-colors mb-6 group"
              >
                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>

              <Formik
                initialValues={{
                  email: savedEmail,
                  password: "",
                  rememberMe: savedEmail ? true : false,
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <motion.form
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* LOGO & HEADER */}
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center shadow-lg border-2 border-gray-100">
                          <img
                            src={Logo}
                            alt="Logo"
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                          />
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <motion.h2
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                        >
                          Welcome Back
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="text-sm sm:text-base text-gray-600"
                        >
                          Sign in to your account to continue
                        </motion.p>
                      </div>
                    </div>

                    {/* INPUTS */}

                    <Input
                      label="Email *"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      error={loginError.email}
                      icon={<EnvelopeIcon />}
                    />

                    {/* PASSWORD */}
                    <Input
                      label="Password *"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      error={loginError.password}
                      icon={<LockClosedIcon />}
                    />
                    {/* <Input label="Email Address" name="email" type="email" formik={formik} icon={<EnvelopeIcon />} /> */}
                    {/* <Input label="Password" name="password" type="password" formik={formik} icon={<LockClosedIcon />} /> */}

                    {/* Remember Me + Forgot Password */}
                    <div className="flex justify-between items-center">
                      {/* Remember Me Checkbox */}
                      <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formik.values.rememberMe}
                          onChange={formik.handleChange}
                          className="w-4 h-4 accent-[#2B547E] border-gray-300 rounded focus:ring-2 focus:ring-[#2B547E] cursor-pointer"
                        />
                        Remember me
                      </label>

                      {/* Forgot Password */}
                      <Link
                        to="/forgot-password"
                        className="text-xs text-[#2B547E] font-semibold hover:underline transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="
                      w-full py-3 flex justify-center items-center gap-2
                      bg-gradient-to-r from-[#2B547E] to-[#1E3A5F]
                      hover:from-[#1E3A5F] hover:to-[#2B547E]
                      text-white font-semibold text-sm rounded-lg
                      shadow-lg hover:shadow-xl
                      transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      disabled:hover:scale-100
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
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRightIcon className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    {/* FOOTER */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          className="text-[#2B547E] font-semibold hover:underline transition-colors"
                        >
                          Create Account
                        </Link>
                      </p>
                    </div>
                  </motion.form>
                )}
              </Formik>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ================= INPUT COMPONENT ================= */

const Input = ({ label, type = "text", value, onChange, error }) => (
  <div>
    <label className="text-sm font-medium block mb-1 text-gray-700">
      {label}
    </label>

    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`
        w-full px-2 py-2 border rounded-xl
        focus:ring-2 focus:ring-[#540863] outline-none
        ${error ? "border-red-500" : "border-gray-200"}
      `}
    />

    {error && <p className="text-xs mt-1 text-red-500">{error}</p>}
  </div>
);
