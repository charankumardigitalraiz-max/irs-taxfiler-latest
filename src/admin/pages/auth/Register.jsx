import { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Calculator, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/common/Button';
import useAuthStore from '../../store/authStore';
import { authService } from '../../services/authService';

const AdminRegister = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // If an admin already exists, do not show registration page at all
  useEffect(() => {
    const checkHasAdmin = async () => {
      try {
        const res = await authService.hasAdmin();
        if (res.success && res.hasAdmin) {
          navigate('/admin/login', { replace: true });
        }
      } catch (e) {
        // If check fails, we still allow registration attempt (for first setup)
      }
    };
    checkHasAdmin();
  }, [navigate]);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.register({
        fullName,
        email,
        password,
        role,
      });

      if (response.success) {
        setSuccessMessage(
          response.message || 'Admin registered successfully. You can now login.'
        );
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('admin');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F9FB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/irsLogo.png" alt="IRS Tax Filer" className="h-10 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-[#1F4264] tracking-tight">
            Create Admin <span className="text-[#127EAB]">Account</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#6F7F8E] font-medium">
            Register a new admin user for the Tax Admin Panel
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl border border-[#DCEAF0] shadow-[0_4px_20px_rgba(31,66,100,0.06)]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs sm:text-sm">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-[#E9F7FA] border border-[#127EAB]/30 text-[#127EAB] px-4 py-3 rounded-xl text-xs sm:text-sm">
                {successMessage}
              </div>
            )}

            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-[#1F4264] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DCEAF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#1F4264] uppercase tracking-wider mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DCEAF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2]"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-[#1F4264] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm border border-[#DCEAF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2]"
                  placeholder="Enter a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8BA0B2] hover:text-[#1F4264]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-[#1F4264] uppercase tracking-wider mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm border border-[#DCEAF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264] placeholder-[#8BA0B2]"
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8BA0B2] hover:text-[#1F4264]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-xs font-semibold text-[#1F4264] uppercase tracking-wider mb-1.5">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-[#DCEAF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] bg-white text-[#1F4264]"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
              <p className="mt-1 text-xs text-[#8BA0B2]">
                In production, only super admins should be able to assign higher roles.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Create Admin Account
            </Button>
          </form>
        </div>

        <div className="text-center text-sm text-[#6F7F8E]">
          <p>
            Already have an account?{' '}
            <Link to="/admin/login" className="text-[#127EAB] hover:text-[#0E668B] font-semibold">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;