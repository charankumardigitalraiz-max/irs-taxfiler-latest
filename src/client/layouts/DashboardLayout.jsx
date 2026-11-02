import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Mail, Phone, UserPlus, ChevronUp, User, LogOut, Hash } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import FloatingButton from '../components/common/FloatingButton';
import { getUser, clearAuth } from '../utils/auth';
import { userService } from '../services/userService';
import ToastContainer from '../../admin/components/common/ToastContainer';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    
    // Fetch full user profile to get userId
    const fetchUserProfile = async () => {
      try {
        const res = await userService.getProfile();
        if (res.success && res.data) {
          setUserProfile(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    
    fetchUserProfile();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    clearAuth();
    navigate('/client/login');
  };

  // Get user initials
  const getUserInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return user.fullName.substring(0, 2).toUpperCase();
    }
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Get user display name
  const getUserDisplayName = () => {
    return user?.fullName || user?.name || user?.email?.split('@')[0] || 'User';
  };

  // Get user role
  const getUserRole = () => {
    return user?.role || 'Client';
  };

  // Get page name from route
  const getPageName = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/dashboard/') return 'Dashboard';
    if (path.includes('/about-irs-tax-filer')) return 'What is IRS Tax Filer?';
    if (path.includes('/documents')) return 'Upload Documents';
    if (path.includes('/tax-draft')) return 'Tax Draft';
    if (path.includes('/schedule')) return 'Free to Call';
    if (path.includes('/payments')) return 'Pricing';
    if (path.includes('/filing')) return 'Filing Status';
    if (path.includes('/tax-summary')) return 'Tax Summary';
    if (path.includes('/tax-refund')) return 'Tax Refund';
    if (path.includes('/final-reports')) return 'Final Reports';
    if (path.includes('/referrals')) return 'Referrals';
    if (path.includes('/profile')) return 'Profile Settings';
    if (path.includes('/account-information')) return 'Personal Info';
    if (path.includes('/policies')) return 'Settings & Policies';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/support')) return 'Support Center';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 hidden lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header - For all pages */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left Section - only mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Center Section - Contact Info */}
            <div className="hidden xl:flex items-center gap-3">
              {/* Email */}
              <a
                href="mailto:contact@irstaxfiler.com"
                className="flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all group"
                title="Email: contact@irstaxfiler.com"
              >
                <div className="p-1.5 bg-blue-50 group-hover:bg-blue-100 rounded-md transition-colors">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  contact@irstaxfiler.com
                </span>
              </a>

              {/* Phone */}
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 rounded-lg transition-all group">
                <div className="p-1.5 bg-green-50 group-hover:bg-green-100 rounded-md transition-colors">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center gap-2.5">
                  <a 
                    href="tel:+1 (415) 223-1315" 
                    className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    +1 (415) 223-1315
                  </a>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <a 
                    href="tel:+91 9052 333 667/668" 
                    className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
                  >
                    +91 9052 333 667/668
                  </a>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Email & Phone - Mobile/Tablet */}
              <div className="xl:hidden flex items-center gap-2">
                <a
                  href="mailto:contact@irstaxfiler.com"
                  className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                  title="Email: contact@irstaxfiler.com"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="tel:+16692956566"
                  className="p-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                  title="Phone: +1(669)-295-6566"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              {/* User ID Display */}
              {/* {(userProfile?.userId || user?.userId) && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg">
                  <Hash className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {userProfile?.userId || user?.userId}
                  </span>
                </div>
              )} */}

              {/* Refer a Friend Button */}
              <button
                onClick={() => navigate('/client/dashboard/referrals')}
                className="hidden sm:flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:from-primary-700 hover:to-blue-700 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden md:inline">Refer a Friend</span>
                <span className="md:hidden">Refer</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors group"
                >
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <span className="text-white font-medium text-xs">
                      {getUserInitials()}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {getUserDisplayName()}
                    </p>
                    {(userProfile?.userId || user?.userId) && (
                            <div className="flex items-center gap-1.5 mt-1">
                              {/* <Hash className="w-3 h-3 text-gray-400" /> */}
                              <p className="text-xs font-medium text-gray-600">
                                User ID: {userProfile?.userId || user?.userId}
                              </p>
                            </div>
                          )}
                    {/* <p className="text-xs text-gray-500">{getUserRole()}</p> */}
                  </div>
                  <ChevronUp 
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      profileDropdownOpen ? 'rotate-0' : 'rotate-180'
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* User Info Card */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {getUserInitials()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email || userProfile?.email || 'client@example.com'}
                          </p>
                          {(userProfile?.userId || user?.userId) && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <Hash className="w-3 h-3 text-gray-400" />
                              <p className="text-xs font-medium text-gray-600">
                                User ID: {userProfile?.userId || user?.userId}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/dashboard/profile');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Profile Settings</span>
                      </button>
                      
                      <div className="border-t border-gray-200 my-1"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Floating Button - Appears on all pages */}
      <FloatingButton />

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
