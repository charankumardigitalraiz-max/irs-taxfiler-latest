import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Loader2, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';
import { setAuthToken, setUser } from '../../utils/auth';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('pendingEmail');
    if (!storedEmail) {
      navigate('/client/login');
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp.slice(0, 6));
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyOTP(email, otpString);
      
      if (response.success) {
        setAuthToken(response.token);
        setUser(response.user);
        sessionStorage.removeItem('pendingEmail');

        // Check if user came from register page (not login)
        const cameFromRegister = sessionStorage.getItem('cameFromRegister') === 'true';
        sessionStorage.removeItem('cameFromRegister');

        if (cameFromRegister) {
          // User came from register page - go directly to dashboard after OTP verification
          sessionStorage.removeItem('pendingReferralCode');
          navigate('/client/dashboard');
        } else if (response.isExistingUser) {
          // User came from login page and is already registered - go to dashboard
          sessionStorage.removeItem('pendingReferralCode');
          navigate('/client/dashboard');
        } else {
          // User came from login page and is new - go to registration page
          // Preserve referral code for new users going to registration
          const refCode = sessionStorage.getItem('pendingReferralCode');

          // Store email so register page can auto-fill it
          sessionStorage.setItem('prefillEmail', email);

          if (refCode) {
            navigate(`/client/register?ref=${refCode}`);
          } else {
            navigate('/client/register');
          }
        }
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      // Extract error message from API response
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        'Something went wrong. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setLoading(true);
    try {
      const response = await authService.sendOTP(email);
      if (response && response.success) {
        setResendTimer(60);
        setError('');
      } else {
        // Handle error response
        setError(response?.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      // Fallback for unexpected errors
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        'Failed to resend OTP. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit code sent to <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-10 shadow-sm rounded-xl border border-gray-200">
          <div className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter OTP Code
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleVerify}
              className="w-full"
              size="lg"
              isLoading={loading}
              disabled={otp.join('').length !== 6}
            >
              Verify OTP
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendTimer > 0 || loading}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default VerifyOTP;
