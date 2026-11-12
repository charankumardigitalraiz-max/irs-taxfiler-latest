import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { UserPlus, ArrowLeft, ArrowRight, CheckCircle2, Shield, Clock, FileCheck, Gift, Loader2 } from 'lucide-react';
import Input from '../../components/common/Input';
import { authService } from '../../services/authService';
import { setAuthToken, setUser, getUser } from '../../utils/auth';
import Logo from '/irs-logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    referralCode: '',
    couponCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    // Auto-fill referral code from URL parameter (?ref=IRS25104)
    const refCode = searchParams.get('ref');
    if (refCode) {
      // Store referral code in sessionStorage to preserve it through login flow
      sessionStorage.setItem('pendingReferralCode', refCode);
      setFormData(prev => ({ ...prev, referralCode: refCode }));
    } else {
      // Check if there's a stored referral code from previous step
      const storedRefCode = sessionStorage.getItem('pendingReferralCode');
      if (storedRefCode) {
        setFormData(prev => ({ ...prev, referralCode: storedRefCode }));
      }
    }

    const user = getUser();
    const isClientRegisterPath = location.pathname.startsWith('/client/register');

    // If user is already fully registered and tries to open any register route, send to dashboard
    if (user && user.email && user.userType === 'registered') {
      navigate('/client/dashboard');
      return;
    }

    // Only pre-fill email (and later make it readonly) when coming from login flow (/client/register)
    if (isClientRegisterPath && user && user.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }

  }, [navigate, searchParams]);

  const validateForm = (checkEmail = false) => {
    const newErrors = {};

    if (checkEmail) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Always check if email is entered - user must enter email manually
    if (!formData.email || !formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    // Check if user has already verified OTP (has token but not registered)
    const user = getUser();
    const hasEmailFromOTP = user && user.email && formData.email.toLowerCase() === user.email.toLowerCase();
    
    if (!hasEmailFromOTP) {
      // User needs to verify email first - send OTP
      setLoading(true);
      try {
        // Send OTP to email
        const otpResponse = await authService.sendOTP(formData.email);
        
        if (otpResponse && otpResponse.success) {
          // Store email and referral code in sessionStorage
          sessionStorage.setItem('pendingEmail', formData.email);
          if (formData.referralCode) {
            sessionStorage.setItem('pendingReferralCode', formData.referralCode);
          }
          // Mark that user came from register page (not login)
          sessionStorage.setItem('cameFromRegister', 'true');
          // Navigate to OTP verification page
          navigate('/client/verify-otp');
        } else {
          setErrors({ submit: otpResponse?.message || 'Failed to send OTP. Please try again.' });
        }
      } catch (err) {
        const errorMessage = 
          err.response?.data?.message || 
          err.message || 
          'Something went wrong. Please try again.';
        setErrors({ submit: errorMessage });
      } finally {
        setLoading(false);
      }
      return;
    }

    // User has verified OTP - complete registration with all details
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register({
        ...formData,
        email: formData.email, // Use email from form
        mobileNumber: formData.mobileNumber.replace(/\D/g, '')
      });

      if (response.success) {
        setAuthToken(response.token);
        setUser(response.user);
        // Clear referral code from sessionStorage after successful registration
        sessionStorage.removeItem('pendingReferralCode');
        navigate('/client/dashboard');
      } else {
        setErrors({ submit: response.message || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      // Extract error message from API response
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        'Something went wrong. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: FileCheck,
      title: 'Expert Tax Filing',
      description: 'Professional tax preparation by certified experts',
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your data is encrypted and securely stored',
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Quick turnaround time for your tax filing',
    },
    {
      icon: Gift,
      title: 'Maximum Refund',
      description: 'We ensure you get the maximum refund possible',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 font-sans antialiased relative overflow-hidden">
      {/* Ambient Brand Glow Highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-[#165479]/[0.08] via-[#749220]/[0.05] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-[#749220]/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 group transition-opacity hover:opacity-90">
          <img src={Logo} alt="IRS Tax Filer" className="h-10 sm:h-10 w-auto object-contain" />
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-[#165479] transition-colors"
        >
          <span>Back to Website</span>
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </Link>
      </header>

      {/* Main Form Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Header Eyebrow & Title */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F9EE] border border-[#749220]/30 shadow-2xs mb-3 text-xs font-medium text-[#749220]">
              <span className="w-2 h-2 rounded-full bg-[#749220]" />
              <span>Official IRS e-File Provider & Licensed CPAs</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight leading-tight">
              Complete{" "}
              <span className="font-semibold bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#749220] bg-clip-text text-transparent">
                Registration
              </span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-sm mx-auto">
              Please enter your details to set up your client tax filing profile.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-[0_16px_40px_rgba(22,84,121,0.08)]">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3.5">
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  error={errors.lastName}
                  required
                />
              </div>

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                error={errors.email}
                required
                disabled={location.pathname.startsWith('/client/register') && !!getUser()?.email}
                className={
                  location.pathname.startsWith('/client/register') && !!getUser()?.email
                    ? 'bg-slate-50 cursor-not-allowed'
                    : ''
                }
              />

              <Input
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="9876543210"
                error={errors.mobileNumber}
                required
                maxLength="10"
              />

              <Input
                label="Referral Code (optional)"
                name="referralCode"
                type="text"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code if you have one"
              />

              <Input
                label="Coupon Code (optional)"
                name="couponCode"
                type="text"
                value={formData.couponCode}
                onChange={handleChange}
                placeholder="Enter coupon code if you have one"
              />

              {errors.submit && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs sm:text-[13px] leading-relaxed">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-[#0C3D5A] via-[#165479] to-[#1A5B82] hover:from-[#09324A] hover:via-[#134969] hover:to-[#165479] text-white font-medium text-sm sm:text-[15px] shadow-[0_4px_16px_rgba(22,84,121,0.25)] border border-white/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <span>{getUser()?.email && getUser()?.email.toLowerCase() === formData.email.toLowerCase() ? 'Complete Registration' : 'Continue with Email'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-600 hover:text-[#165479] font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>Back to Login</span>
            </button>
          </div>

          {/* Benefits Banner */}
          <div className="mt-6 bg-gradient-to-r from-[#0A4973] via-[#165479] to-[#134969] rounded-2xl shadow-sm p-5 text-white text-left">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white">Why Register with IRS Tax Filer?</h3>
              <p className="text-xs text-sky-100/90 mt-0.5">
                Licensed CPA preparation, guaranteed maximum deductions, and year-round support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg p-2.5">
                    <Icon className="w-4 h-4 text-[#749220] shrink-0" />
                    <span className="text-[11px] font-medium text-white">{benefit.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 sm:py-5 border-t border-slate-100 text-center text-[11px] sm:text-xs text-gray-400">
        <p>© {new Date().getFullYear()} IRS Tax Filer. Authorized IRS e-File Provider & Licensed CPA Practice.</p>
      </footer>
    </div>
  );
};

export default Register;
