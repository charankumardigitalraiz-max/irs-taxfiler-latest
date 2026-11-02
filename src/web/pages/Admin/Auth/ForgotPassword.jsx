import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const ForgotSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function AdminForgotPassword() {
  return (
    <div className="w-full">
      
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-[#540863]">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500">
          Enter your registered email and we'll send you reset instructions
        </p>
      </motion.div>

      {/* FORM */}
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotSchema}
        onSubmit={(values) => {
          console.log("Forgot Password Request:", values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className={`
                  w-full px-4 py-3 rounded-xl border
                  focus:ring-2 focus:ring-[#540863]
                  focus:border-transparent outline-none transition
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-200"
                  }
                `}
                placeholder="admin@example.com"
              />

              {formik.touched.email && formik.errors.email && (
                <p className="text-xs mt-1 text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="
                w-full mt-4 py-3 rounded-xl
                font-bold text-white tracking-wider
                shadow-lg transition
              "
              style={{ backgroundColor: "#540863" }}
            >
              Send Reset Link
            </motion.button>
          </form>
        )}
      </Formik>
    </div>
  );
}
