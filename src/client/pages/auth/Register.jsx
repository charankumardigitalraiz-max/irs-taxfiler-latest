import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { UserPlus, ArrowLeft, CheckCircle2, Shield, Clock, FileCheck, Gift } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';
import { setAuthToken, setUser, getUser } from '../../utils/auth';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Complete Registration</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in your details to continue
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-10 shadow-sm rounded-xl border border-gray-200">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
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
              // Make email readonly only when coming from login flow (/client/register) with an authenticated user
              disabled={location.pathname.startsWith('/client/register') && !!getUser()?.email}
              className={
                location.pathname.startsWith('/client/register') && !!getUser()?.email
                  ? 'bg-gray-50 cursor-not-allowed'
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
              // readOnly
              // className="bg-gray-50 cursor-not-allowed"
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={loading}
            >
              {getUser()?.email && getUser()?.email.toLowerCase() === formData.email.toLowerCase() ? 'Complete Registration' : 'Continue with Email'}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/client/login')}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>

        {/* Mobile Benefits - Show on small screens */}
        <div className="lg:hidden bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Why Choose IRS Tax Filer?</h3>
            <p className="text-sm text-white/90">
              Professional tax filing services with expert guidance
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="p-2 bg-white/20 rounded-lg mb-2">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-medium text-white">{benefit.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
