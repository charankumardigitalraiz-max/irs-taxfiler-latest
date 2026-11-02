import { Calculator, Eye, EyeOff } from "lucide-react";
import Button from "../../../components/common/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   adminLogin,
//   resetAdminAuthState,
// } from "../../../Redux/Slices/adminAuthSlice";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.adminAuth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formError, setFormError] = useState({});

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(
      adminLogin({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const handleshowpassword = (datas) => {
    
    if(datas === "text")
    {
       console.log(datas);
      setShowPassword(true);
    }else{
      setShowPassword(false);
    }

   
  }

  /* ---------------- SIDE EFFECTS ---------------- */
  useEffect(() => {
    if (success) {
      toast.success("Login successful");
      navigate("/admin/dashboard");
      dispatch(resetAdminAuthState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAdminAuthState());
    }
  }, [success, error, navigate, dispatch]);


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Tax Admin Panel</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage tax filing cases
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-10 shadow-sm rounded-xl border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                autoComplete="email"
                required
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@example.com"
              />
              {formError.email && (
                <p className="text-xs mt-1 text-red-500">{formError.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                {formError.password && (
                  <p className="text-xs mt-1 text-red-500">
                    {formError.password}
                  </p>
                )}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff onClick={() => handleshowpassword('password')} className="w-5 h-5" />
                  ) : (
                    <Eye onClick={() => handleshowpassword('text')} className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              size="lg"
              disabled={loading}
            >
             {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
