import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { resetStatus } from "../Redux/Slices/userSlice";
import { toast } from "react-toastify";
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const LoginSchema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Email required"),
});

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  // ❗ Clear old login errors when visiting this page
  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  const handleForgotPassword = (values) => {
    // send API request here
    console.log("Forgot Password for:", values.email);
    toast.success("Password reset link sent!");
  };

  const title = "About Us | IRS Tax Filer";
  const description = "Learn about IRS Tax Filer — our mission, expertise in US & Indian tax services, and commitment to secure,Learn more.";
  const keywords = "online tax filing service,tax service provider,Internal Revenue Service,IRS Tax Filer about, US & Indian tax services, tax filing expertise, tax compliance company";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-2">
      <div className="w-full max-w-sm">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleForgotPassword}
        >
          {(formik) => (
            <motion.form
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-xl p-6 rounded-2xl space-y-4"
            >
              <div className="text-center mb-3">
                <h2 className="text-2xl font-bold text-[#EB4149]">
                  Forgot Password
                </h2>
                <p className="text-sm text-gray-500">
                  Enter your email to reset password
                </p>
              </div>

              <Input label="Email *" name="email" type="email" formik={formik} />

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#EB4149" }}
                className="w-full py-2 mt-2 text-white rounded-xl font-bold disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </motion.button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Remember your password?
                <Link
                  to="/login"
                  className="ms-1 text-[#EB4149] font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </motion.form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}

const Input = ({ label, name, type = "text", formik }) => (
  <div>
    <label className="text-sm font-medium block mb-1 text-gray-700">
      {label}
    </label>

    <input
      type={type}
      {...formik.getFieldProps(name)}
      className={`
        w-full px-2 py-2 border rounded-xl
        focus:ring-2 focus:ring-[#EB4149] outline-none
        ${formik.touched[name] && formik.errors[name]
          ? "border-red-500"
          : "border-gray-200"}
      `}
    />

    {formik.touched[name] && formik.errors[name] && (
      <p className="text-xs mt-1 text-red-500">{formik.errors[name]}</p>
    )}
  </div>
);
