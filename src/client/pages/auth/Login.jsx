import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Loader2 } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { authService } from '../../services/authService';
import { isAuthenticated } from '../../utils/auth';
import Logo from '../../../assets/irsLogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Preserve referral code from URL or sessionStorage
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      sessionStorage.setItem('pendingReferralCode', refCode);
    }
  }, [searchParams]);

  // If user is already authenticated (token in localStorage), skip login and go to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/client/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.sendOTP(email);
      if (response && response.success) {
        sessionStorage.setItem('pendingEmail', email);
        // Mark that user came from login page (not register)
        sessionStorage.setItem('cameFromRegister', 'false');
        navigate('/client/verify-otp');
      } else {
        // Handle error response (authService now returns error data instead of throwing)
        setError(response?.message || 'Failed to send OTP');
      }
    } catch (err) {
      // Fallback for unexpected errors
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        'Something went wrong. Please try again.';
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
            <div>
              <img src={Logo} alt="IRS Tax Filer Logo" className="h-7 w-auto object-contain" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">IRS Tax Filer</h2>
          <p className="mt-2 text-sm text-gray-600">
            Client Portal - Secure OTP Authentication
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-10 shadow-sm rounded-xl border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                error={error && !email.includes('@') ? error : ''}
                required
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={loading}
            >
              Send OTP
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              We'll send a one-time password to your email address. No password required.
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Secure OTP-based authentication</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
