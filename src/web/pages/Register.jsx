// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Logo from "../assets/irsLogo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../Redux/Slices/userSlice";

// import {
//   EnvelopeIcon,
//   LockClosedIcon,
//   UserIcon,
//   PhoneIcon,
//   ArrowRightIcon,
//   UserPlusIcon
// } from "@heroicons/react/24/outline";

// const Register = () => {
//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     const payload = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       mobile: formData.phone,
//       password: formData.password,
//       referralId: formData.referralId,
//     };
//     dispatch(registerUser(payload));
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen mt-16 pt-20 pb-20 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md"
//       >
//         <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-purple-100">
//           {/* LOGO + TITLE */}
//           <div className="flex flex-col items-center text-center mb-6">
//             <img src={Logo} alt="Logo" className="w-16 object-contain mb-3" />

//             {/* TITLE */}
//             <h1 className="text-2xl font-bold text text-[#EB4149]">
//               Create Account
//             </h1>

//             <p className="text-gray-600">Start your tax filing journey today</p>
//           </div>

//           {/* status */}
//           {loading && (
//             <p className="text-blue-600 text-center">Registering...</p>
//           )}
//           {success && (
//             <p className="text-green-600 text-center">
//               Registered Successfully
//             </p>
//           )}
//           {error && <p className="text-red-500 text-center">{error}</p>}

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* NAME */}
//             <Field
//               icon={<UserIcon />}
//               label="Full Name"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               placeholder="John Doe"
//             />
//             <Field
//               icon={<UserIcon />}
//               label="Full Name"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               placeholder="John Doe"
//             />

//             {/* EMAIL */}
//             <Field
//               icon={<EnvelopeIcon />}
//               label="Email Address"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               type="email"
//             />

//             {/* PHONE */}
//             <Field
//               icon={<PhoneIcon />}
//               label="Phone Number"
//               name="phone"
//               value={formData.mobile}
//               onChange={handleChange}
//               placeholder="+1 (234) 567-8900"
//               type="tel"
//             />

//             {/* PASSWORD */}
//             <Field
//               icon={<LockClosedIcon />}
//               label="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="At least 8 characters"
//               type="password"
//             />

//             {/* CONFIRM */}
//             <Field
//               icon={<LockClosedIcon />}
//               label="Confirm Password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//               type="password"
//             />
//                 <Field
//               icon={<UserPlusIcon />}
//               label="Referral ID"
//               name="referralId"
//               value={formData.referralId}
//               onChange={handleChange}
//               placeholder="Enter referral code (optional)"
//             />

//             {/* TERMS */}
//             <div className="flex items-center">
//               <input
//                 id="terms"
//                 type="checkbox"
//                 required
//                 className="w-4 h-4 accent-[#2B547E] border-gray-300"
//               />

//               <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//                 I agree to the{" "}
//                 <Link
//                   to="/terms"
//                   className="text-[#2B547E] font-semibold hover:underline"
//                 >
//                   Terms of Service
//                 </Link>{" "}
//                 and{" "}
//                 <Link
//                   to="/privacy"
//                   className="text-[#2B547E] font-semibold hover:underline"
//                 >
//                   Privacy Policy
//                 </Link>
//               </label>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 w-full flex items-center justify-center gap-2
//                 bg-[#EB4149] hover:bg-[#42064f]
//                 text-white py-3 px-6 rounded-lg font-semibold
//                 shadow-lg hover:shadow-xl transition-all
//               "
//             >
//               <span>{loading ? "creating... " : "Create Account"}</span>
//               <ArrowRightIcon className="h-5 w-5" />
//             </button>
//           </form>

//           {/* FOOTER */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-[#EB4149] font-semibold hover:underline"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

// const Field = ({
//   label,
//   icon,
//   name,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
// }) => (
//   <div>
//     <label className="block text-sm font-semibold text-[#EB4149] mb-2">
//       {label}
//     </label>

//     <div className="relative">
//       <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
//         {icon}
//       </div>

//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         required
//         className="
//           w-full pl-10 pr-4 py-3
//           border border-gray-300
//           rounded-lg outline-none
//           focus:ring-2 focus:ring-[#EB4149]
//           focus:border-transparent
//           transition-all
//         "
//         placeholder={placeholder}
//       />
//     </div>
//   </div>
// );
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Logo from "../assets/irsLogo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../Redux/Slices/userSlice";
// import ReCAPTCHA from "react-google-recaptcha";

// import {
//   EnvelopeIcon,
//   LockClosedIcon,
//   UserIcon,
//   PhoneIcon,
//   ArrowRightIcon,
//   UserPlusIcon,
//   GlobeAltIcon,
// } from "@heroicons/react/24/outline";

// const Register = () => {
//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector((state) => state.auth);

//   const [captcha, setCaptcha] = useState(null);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     timezone: "",
//     password: "",
//     confirmPassword: "",
//     referralId: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!captcha) {
//       alert("Please verify reCAPTCHA");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     dispatch(
//       registerUser({
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         mobile: formData.phone,
//         timezone: formData.timezone,
//         password: formData.password,
//         referralId: formData.referralId,
//         captchaToken: captcha,
//       })
//     );
//   };

//   return (
//     <div className="min-h-screen  pt-20 pb-20 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-lg"
//       >

//         <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">

//           {/* LOGO */}
//           <div className="flex flex-col items-center text-center mb-4">
//             <img src={Logo} alt="Logo" className="w-14 mb-2" />
//             <h1 className="text-xl font-bold text-[#EB4149]">
//               Create Account
//             </h1>
//             <p className="text-xs text-gray-500">
//               Start your tax filing journey
//             </p>
//           </div>

//           {/* STATUS */}
//           {loading && (
//             <p className="text-blue-600 text-xs text-center">
//               Registering...
//             </p>
//           )}
//           {success && (
//             <p className="text-green-600 text-xs text-center">
//               Registered successfully
//             </p>
//           )}
//           {error && (
//             <p className="text-red-500 text-xs text-center">
//               {error}
//             </p>
//           )}

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-3">

//             {/* First + Last */}
//             <div className="grid grid-cols-2 gap-3">
//               <Input
//                 icon={<UserIcon />}
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="First Name"
//               />

//               <Input
//                 icon={<UserIcon />}
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//               />
//             </div>

//             {/* Email + Phone */}
//             <div className="grid grid-cols-2 gap-3">
//               <Input
//                 icon={<EnvelopeIcon />}
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//               />

//               <Input
//                 icon={<PhoneIcon />}
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Mobile Number"
//               />
//             </div>

//             {/* Timezone + Referral */}
//             <div className="grid grid-cols-2 gap-3">
//               <Input
//                 icon={<GlobeAltIcon />}
//                 name="timezone"
//                 value={formData.timezone}
//                 onChange={handleChange}
//                 placeholder="Time Zone"
//               />

//               <Input
//                 icon={<UserPlusIcon />}
//                 name="referralId"
//                 value={formData.referralId}
//                 onChange={handleChange}
//                 placeholder="Referral Code (Optional)"
//               />
//             </div>

//             {/* Password */}
//             <div className="grid grid-cols-2 gap-3">
//               <Input
//                 icon={<LockClosedIcon />}
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//               />

//               <Input
//                 icon={<LockClosedIcon />}
//                 name="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//               />
//             </div>

//             {/* CAPTCHA */}
//             <div className="flex justify-center scale-90">
//               <ReCAPTCHA
//                 sitekey="6LcYfScsAAAAAIdbZY1dsJ4BVj2IIwT0tBOjHYDH"
//                 onChange={(token) => setCaptcha(token)}
//               />
//             </div>

//             {/* TERMS */}
//             <div className="flex items-center text-[11px]">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 required
//                 className="w-3 h-3 accent-[#EB4149]"
//               />
//               <label htmlFor="terms" className="ml-1 text-gray-600">
//                 I agree to{" "}
//                 <Link to="/terms" className="text-[#EB4149] font-semibold">
//                   Terms
//                 </Link>
//                 {" & "}
//                 <Link to="/privacy" className="text-[#EB4149] font-semibold">
//                   Privacy
//                 </Link>
//               </label>
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 w-full py-2 flex justify-center items-center gap-1
//                 bg-[#EB4149] hover:bg-[#42064f]
//                 text-white font-semibold rounded-lg
//                 shadow-md
//               "
//             >
//               {loading ? "Registering..." : "Register"}
//               <ArrowRightIcon className="w-4 h-4" />
//             </button>

//           </form>

//           {/* FOOTER */}
//           <div className="mt-3 text-center text-xs">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="text-[#EB4149] font-semibold">
//                 Sign in
//               </Link>
//             </p>
//           </div>

//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

// /* INPUT COMPONENT — enhanced visuals only */
// const Input = ({
//   icon,
//   name,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
// }) => (
//   <div className="relative">
//     <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
//       {icon}
//     </div>

//     <input
//       required
//       name={name}
//       value={value}
//       onChange={onChange}
//       type={type}
//       placeholder={placeholder}
//       className="
//         w-full pl-9 pr-2 py-[9px] text-sm
//         bg-blue-50/60
//         border border-gray-200
//         rounded-lg
//         shadow-sm
//         focus:outline-none
//         focus:ring-2
//         focus:ring-purple-500
//         transition
//       "
//     />
//   </div>
// );
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/irsLogo.png";
import { useDispatch, useSelector } from "react-redux";
// import { registerUser, resetStatus } from "../Redux/Slices/userSlice";
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
  const [searchParams, setSearchParams] = useSearchParams();
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
    const error = {};

    if (!formData.firstName) {
      error.firstName = "First name is required";
    }
    if (!formData.lastName) {
      error.lastName = "Lastname is required";
    }
    if (!formData.email) {
      error.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      error.email = "Enter valid email";
    }
    if (!formData.phone) {
      error.phone = "Phone is required";
    }
    if (!formData.timezone) {
      error.timezone = "Timezone is required";
    }
    if (!formData.password) {
      error.password = "Password is required";
    } else if (formData.password.length < 6) {
      error.password = "Min 6 characters";
    }

    if (!formData.confirmPassword) {
      error.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword.length < 6) {
      error.confirmPassword = "Min 6 characters";
    } else if (formData.password !== formData.confirmPassword) {
      error.confirmPassword = "Passwords do not match";
    }

    setRegisterFormError(error);
    return Object.keys(error).length === 0;
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
    dispatch(resetStatus()); // clears success & error
  }, [dispatch]);

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
      alert("Please verify reCAPTCHA");
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

  const title = "About Us | IRS Tax Filer";
  const description =
    "Learn about IRS Tax Filer — our mission, expertise in US & Indian tax services, and commitment to secure,Learn more.";
  const keywords =
    "online tax filing service,tax service provider,Internal Revenue Service,IRS Tax Filer about, US & Indian tax services, tax filing expertise, tax compliance company";
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
      <div className="min-h-screen py-8 sm:py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
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
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-1xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
                  >
                    Create Your Account
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm sm:text-base text-gray-600"
                  >
                    Join thousands of users managing their taxes with confidence
                  </motion.p>
                </div>
              </div>

              {/* STATUS MESSAGES
          {loading && ( 
            <p className="text-blue-600 text-xs text-center">Registering...</p>
          )}
          {success && (
            <p className="text-green-600 text-xs text-center">
             .
            </p>
          )}
          {error && <p className="text-red-500 text-xs text-center">{error}</p>} */}

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
                      <span className="text-red-500">
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
                      <span className="text-red-500">
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
                      <span className="text-red-500">
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
                      placeholder="+1 (234) 567-8900"
                      label="Phone Number"
                    />
                    {registerFormError.phone && (
                      <span className="text-red-500">
                        {registerFormError.phone}
                      </span>
                    )}
                  </div>
                  {/* TIMEZONE DROPDOWN */}
                  <div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Timezone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10">
                          <GlobeAltIcon />
                        </div>
                        <select
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleChange}
                          className="
                      w-full pl-10 pr-8 py-2.5 text-sm
                      bg-white border-2 border-gray-200 rounded-lg
                      shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-[#2B547E] focus:border-[#2B547E]
                      transition-all duration-200
                      appearance-none cursor-pointer
                      hover:border-gray-300
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
                            className="w-4 h-4 text-gray-400"
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
                          <span className="text-red-500">
                            {registerFormError.timezone}
                          </span>
                        )}
                      </div>
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
                      <span className="text-red-500">
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
                      <span className="text-red-500">
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
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 w-4 h-4 accent-[#2B547E] border-gray-300 rounded focus:ring-2 focus:ring-[#2B547E] cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-gray-700 cursor-pointer flex-1"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-[#2B547E] font-semibold hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-[#2B547E] font-semibold hover:underline"
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
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#2B547E] font-semibold hover:underline transition-colors"
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
}) => (
  <div>
    {label && (
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#2B547E] transition-colors duration-200 z-10">
        {icon}
      </div>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-3 py-2.5 text-sm
          bg-white border-2 border-gray-200 rounded-lg
          shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-[#2B547E] focus:border-[#2B547E]
          transition-all duration-200
          placeholder:text-gray-400
          hover:border-gray-300
          disabled:bg-gray-50 disabled:cursor-not-allowed
        "
      />
    </div>
  </div>
);
