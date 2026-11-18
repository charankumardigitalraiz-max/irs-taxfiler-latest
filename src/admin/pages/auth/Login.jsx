import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import useAuthStore from '../../store/authStore';
import Logo from '../../../assets/irsLogo.png';
import adminLoginGif from '../../../assets/admin-login-anim.gif';
import { authService } from '../../services/authService';

const Login = () => {
  const { isAuthenticated } = useAuthStore();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasAdmin, setHasAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await authService.hasAdmin();
        if (response.success) {
          setHasAdmin(response.hasAdmin);
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
      }
    };
    checkAdminStatus();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        const errorMessage =
          result.message ||
          result.error ||
          'Invalid credentials. Please try again.';
        setError(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#127EAB]/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1F4264]/[0.07] rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-[860px]"
      >
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_55px_rgba(31,66,100,0.10)] overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* LEFT SIDE: CLEAN LOGIN FORM */}
          <div className="md:col-span-6 p-7 sm:p-10 lg:p-11 flex flex-col justify-center bg-white">
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center mb-6 hover:opacity-90 transition-opacity w-fit"
            >
              <img
                src={Logo}
                alt="IRS Tax Filer"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            {/* Concise Heading */}
            <h1 className="text-2xl font-semibold text-[#1F4264] tracking-tight mb-6">
              Admin <span className="text-[#127EAB]">Login</span>
            </h1>

            {/* Error Banner */}
            {error && (
              <div className="mb-4 flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-medium leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-[#1F4264] mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 font-medium bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-[11px] sm:placeholder:text-xs placeholder:font-normal placeholder:text-slate-400 transition-all"
                    placeholder="admin@irstaxfiler.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#1F4264] mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm text-slate-800 font-medium bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] placeholder:text-[11px] sm:placeholder:text-xs placeholder:font-normal placeholder:text-slate-400 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#1F4264] transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center pt-0.5">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#127EAB] focus:ring-[#127EAB]/30 accent-[#127EAB] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-600">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-gradient-to-r from-[#1F4264] via-[#1B4A6E] to-[#127EAB] hover:from-[#16314A] hover:via-[#163C5B] hover:to-[#0E668B] text-white font-semibold text-sm shadow-[0_6px_18px_rgba(31,66,100,0.20)] hover:shadow-[0_8px_22px_rgba(31,66,100,0.26)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {!hasAdmin && (
              <div className="mt-5 text-center text-xs text-slate-500 font-medium">
                Need an account?{' '}
                <Link
                  to="/admin/register"
                  className="text-[#127EAB] hover:text-[#1F4264] font-semibold transition-colors"
                >
                  Register as Admin
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: ANIMATED GIF PANEL (NO TEXT CLUTTER, NO CSS BOUNCE) */}
          <div className="hidden md:flex md:col-span-6 bg-white border-l border-slate-200/70 p-6 items-center justify-center relative overflow-hidden">
            <img
              src={adminLoginGif}
              alt="Admin Tax Operations Animation"
              className="w-full max-w-[380px] h-auto rounded-2xl object-contain select-none pointer-events-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
