import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Mail,
  Phone,
  UserPlus,
  ChevronUp,
  User,
  LogOut,
  Hash,
  PanelLeftOpen,
  PanelLeftClose,
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import FloatingButton from '../components/common/FloatingButton';
import { getUser, clearAuth } from '../utils/auth';
import { userService } from '../services/userService';
import ToastContainer from '../../admin/components/common/ToastContainer';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
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
    navigate('/login');
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
    <div className="min-h-screen bg-[#F4F9FB] font-sans">
      {/* Desktop Sidebar (Collapsible) */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-[#1F4264] border-r border-[#16314A] hidden lg:block transition-transform duration-200 ease-out ${desktopSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <Sidebar onClose={() => setDesktopSidebarOpen(false)} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#152F4A]/50 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div
        className={`transition-[margin] duration-200 ease-out ${desktopSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
          }`}
      >
        {/* Header - For all pages */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#DCEAF0] shadow-[0_1px_8px_rgba(31,66,100,0.04)]">
          {/* Route transition progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none">
            <div
              key={location.pathname}
              className="h-full w-full bg-gradient-to-r from-[#127EAB] via-[#22B8CF] to-[#EE6450] irs-top-progress"
            />
          </div>
          <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left Section - Mobile & Desktop Sidebar Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle mobile sidebar"
                className="lg:hidden p-2 text-[#1F4264] hover:text-[#127EAB] hover:bg-[#E9F7FA] rounded-lg transition-colors cursor-pointer"
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

              <button
                type="button"
                onClick={() => setDesktopSidebarOpen((prev) => !prev)}
                title={desktopSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                aria-label={desktopSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                className="hidden lg:inline-flex items-center justify-center p-2 text-[#1F4264] hover:text-[#127EAB] hover:bg-[#E9F7FA] border border-[#DCEAF0] rounded-lg transition-colors cursor-pointer"
              >
                {desktopSidebarOpen ? (
                  <PanelLeftClose className="w-5 h-5" />
                ) : (
                  <PanelLeftOpen className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Center Section - Contact Info */}
            <div className="hidden xl:flex items-center gap-3">
              {/* Email */}
              <a
                href="mailto:info@irstaxfiler.com"
                className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-[#DCEAF0] hover:border-[#127EAB]/40 hover:bg-[#E9F7FA]/50 rounded-lg transition-all group"
                title="Email: info@irstaxfiler.com"
              >
                <div className="p-1.5 bg-[#E9F7FA] group-hover:bg-[#127EAB] rounded-lg transition-colors">
                  <Mail className="w-4 h-4 text-[#127EAB] group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium text-[#1F4264] group-hover:text-[#127EAB] transition-colors">
                  info@irstaxfiler.com
                </span>
              </a>

              {/* Phone (US & India) */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-[#DCEAF0] hover:border-[#059669]/35 hover:bg-[#ECFDF5]/40 rounded-lg transition-all group">
                <div className="p-1.5 bg-[#ECFDF5] rounded-lg transition-colors shrink-0">
                  <Phone className="w-4 h-4 text-[#059669]" />
                </div>
                <div className="flex items-center gap-2 text-xs xl:text-[13px] font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {/* <span className="text-[10px] font-semibold uppercase text-[#6F7F8E]">US:</span> */}
                    <a
                      href="tel:+14044244191"
                      className="text-[#1F4264] hover:text-[#127EAB] transition-colors"
                    >
                      +1 (404) 424-4191
                    </a>
                    <span className="text-slate-300">/</span>
                    <a
                      href="tel:+14044244815"
                      className="text-[#1F4264] hover:text-[#127EAB] transition-colors"
                    >
                      4815
                    </a>
                  </div>
                  <span className="w-1 h-1 bg-[#CCDCE1] rounded-full shrink-0"></span>
                  <div className="flex items-center gap-1">
                    {/* <span className="text-[10px] font-semibold uppercase text-[#6F7F8E]">IN:</span> */}
                    <a
                      href="tel:+919052333667"
                      className="text-[#1F4264] hover:text-[#127EAB] transition-colors"
                    >
                      +91 9052 333 667
                    </a>
                    <span className="text-slate-300">/</span>
                    <a
                      href="tel:+919052333668"
                      className="text-[#1F4264] hover:text-[#127EAB] transition-colors"
                    >
                      668
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Email & Phone - Mobile/Tablet */}
              <div className="xl:hidden flex items-center gap-2">
                <a
                  href="mailto:info@irstaxfiler.com"
                  className="p-2.5 bg-[#E9F7FA] hover:bg-[#D5EEF5] text-[#127EAB] rounded-lg transition-colors"
                  title="Email: info@irstaxfiler.com"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="tel:+14044244191"
                  className="p-2.5 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#059669] rounded-lg transition-colors"
                  title="US: +1 (404) 424-4191 / 4815 | IN: +91 9052 333 667 / 668"
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
                className="hidden sm:flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#1F4264] to-[#127EAB] text-white hover:from-[#16314A] hover:to-[#0E668B] rounded-lg transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden md:inline">Refer a Friend</span>
                <span className="md:hidden">Refer</span>
              </button>

              {/* Notifications */}
              {/* <button className="relative p-2.5 text-[#6F7F8E] hover:text-[#1F4264] hover:bg-[#E9F7FA]/70 rounded-lg transition-colors cursor-pointer">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-[#EE6450] rounded-full border-2 border-white"></span>
              </button> */}

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 pl-3  hover:bg-[#F4F9FB] rounded-lg px-2 py-1.5 transition-colors group cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#1F4264] to-[#127EAB] flex items-center justify-center shadow-xs group-hover:shadow-md transition-shadow">
                    <span className="text-white font-semibold text-xs">
                      {getUserInitials()}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-[#1F4264] group-hover:text-[#127EAB] transition-colors">
                      {getUserDisplayName()}
                    </p>
                    {(userProfile?.userId || user?.userId) && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {/* <Hash className="w-3 h-3 text-gray-400" /> */}
                        <p className="text-xs font-medium text-[#6F7F8E]">
                          User ID: {userProfile?.userId || user?.userId}
                        </p>
                      </div>
                    )}
                    {/* <p className="text-xs text-gray-500">{getUserRole()}</p> */}
                  </div>
                  <ChevronUp
                    className={`w-4 h-4 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-0' : 'rotate-180'
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#DCEAF0] z-50 overflow-hidden">
                    {/* User Info Card */}
                    <div className="p-4 border-b border-[#E6F0F5] bg-[#F4F9FB]/60">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1F4264] to-[#127EAB] flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {getUserInitials()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#1F4264] truncate">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-[#6F7F8E] truncate">
                            {user?.email || userProfile?.email || 'client@example.com'}
                          </p>
                          {(userProfile?.userId || user?.userId) && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <Hash className="w-3 h-3 text-[#127EAB]" />
                              <p className="text-xs font-medium text-[#1F4264]">
                                User ID: {userProfile?.userId || user?.userId}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1.5">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/client/dashboard/profile');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#1F4264] hover:bg-[#E9F7FA]/60 hover:text-[#127EAB] transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[#127EAB]" />
                        <span>Profile Settings</span>
                      </button>

                      <div className="border-t border-[#E6F0F5] my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#EE6450] hover:bg-[#FEF4F2] transition-colors cursor-pointer"
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
          <div key={location.pathname} className="irs-page-enter">
            <Outlet />
          </div>
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
