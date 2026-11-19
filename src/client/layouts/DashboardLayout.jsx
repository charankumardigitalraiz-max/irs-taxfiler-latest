import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Mail,
  Phone,
  UserPlus,
  ChevronUp,
  ChevronDown,
  User,
  LogOut,
  Hash,
  PanelLeftOpen,
  PanelLeftClose,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Calendar,
  LayoutGrid,
  CreditCard,
} from 'lucide-react';
import Sidebar, {
  navigation as sidebarNavigation,
  settingsNavigation as sidebarSettingsNavigation,
} from '../components/layout/Sidebar';
import FloatingButton from '../components/common/FloatingButton';
import { getUser, clearAuth } from '../utils/auth';
import { userService } from '../services/userService';
import { notificationService } from '../services/notificationService';
import { speakWelcome, playNotificationChime, speakNotificationMemo } from '../utils/voiceAssistant';
import { toast } from 'react-toastify';
import { initSocket, disconnectSocket, getSocket } from '../services/socketService';
import ToastContainer from '../../admin/components/common/ToastContainer';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('client_sidebar_open');
      return saved !== null ? saved === 'true' : true;
    } catch (_) {
      return true;
    }
  });
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const profileDropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const navDropdownRef = useRef(null);
  const recentEventsRef = useRef(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  const handleSetDesktopSidebar = (open) => {
    setDesktopSidebarOpen(open);
    if (open) {
      setNavDropdownOpen(false);
    }
    try {
      localStorage.setItem('client_sidebar_open', String(open));
    } catch (_) { }
  };

  // Load persistent notifications for client
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await notificationService.getNotifications({ limit: 15 });
        if (res.success && Array.isArray(res.notifications)) {
          setNotifications(
            res.notifications.map((n) => ({
              id: n._id,
              type: n.type?.toLowerCase().includes('document')
                ? 'document'
                : n.type?.toLowerCase().includes('ticket')
                  ? 'ticket'
                  : 'alert',
              title: n.title,
              message: n.message,
              time: new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              read: n.isRead,
              link: n.link,
              data: n.data,
            }))
          );
          setUnreadCount(res.unreadCount || 0);
        }
      } catch (err) {
        console.warn('[Client Notifications] Failed to load:', err);
      }
    };

    loadNotifications();
  }, []);

  // Fetch user and profile
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);

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

  // Identify client on Socket.IO when profile or user loads
  useEffect(() => {
    try {
      const s = initSocket();
      const uid = userProfile?._id || userProfile?.id || user?._id || user?.id;
      if (s && uid) {
        s.emit('identify', {
          userId: String(uid),
          customUserId: userProfile?.userId || user?.userId,
        });
      }
    } catch (_) { }
  }, [user, userProfile]);

  // Socket.IO real-time notification listeners
  useEffect(() => {
    try {
      const s = initSocket();
      if (!s) return;

      const triggerNotificationAlert = (title, message, isApproved, isRejected) => {
        // 1. Play pleasant audio chime
        playNotificationChime();

        // 2. Display Toast pop-up banner on screen
        if (isApproved) {
          toast.success(message || title || 'Document approved!');
        } else if (isRejected) {
          toast.warn(message || title || 'Action required on document');
        } else {
          toast.info(message || title || 'New update from Tax Admin');
        }

        // 3. Voice memo prompt in crisp Indian English
        speakNotificationMemo(title, message);
      };

      const handleNewNotification = (notif) => {
        const dedupeKey = `${notif._id || notif.id || ''}:${notif.title}:${notif.message}`;
        if (recentEventsRef.current.has(dedupeKey)) return;
        recentEventsRef.current.add(dedupeKey);
        setTimeout(() => recentEventsRef.current?.delete(dedupeKey), 4000);

        const isApproved =
          notif.data?.status === 'approved' || notif.title?.toLowerCase().includes('approved');
        const isRejected =
          notif.data?.status === 'rejected' || notif.title?.toLowerCase().includes('rejected');

        triggerNotificationAlert(notif.title, notif.message, isApproved, isRejected);

        setNotifications((prev) => [
          {
            id: notif._id || notif.id || Date.now(),
            type: notif.type?.toLowerCase().includes('document')
              ? 'document'
              : notif.type?.toLowerCase().includes('ticket')
                ? 'ticket'
                : 'alert',
            title: notif.title || 'Notification',
            message: notif.message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
            link: notif.link || '/client/dashboard/documents',
            data: notif.data,
          },
          ...prev,
        ]);
        setUnreadCount((c) => c + 1);
      };

      const handleDocStatus = (payload) => {
        const dedupeKey = `doc:${payload.documentId}:${payload.status}`;
        if (recentEventsRef.current.has(dedupeKey)) return;
        recentEventsRef.current.add(dedupeKey);
        setTimeout(() => recentEventsRef.current?.delete(dedupeKey), 4000);

        const isApproved = payload.status === 'approved';
        const title = isApproved ? 'Document Approved' : 'Document Status Updated';
        const msg = isApproved
          ? `Your document "${payload.fileName}" has been verified and approved.`
          : `Your document "${payload.fileName}" was rejected${payload.rejectionReason ? `: ${payload.rejectionReason}` : '.'}`;

        triggerNotificationAlert(title, msg, isApproved, !isApproved);

        setNotifications((prev) => [
          {
            id: Date.now(),
            type: 'document',
            title,
            message: msg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
            link: '/client/dashboard/documents',
            data: payload,
          },
          ...prev,
        ]);
        setUnreadCount((c) => c + 1);
      };

      s.on('new_notification', handleNewNotification);
      s.on('document_status_updated', handleDocStatus);

      return () => {
        s.off('new_notification', handleNewNotification);
        s.off('document_status_updated', handleDocStatus);
      };
    } catch (err) {
      console.warn('Socket connection error in DashboardLayout:', err);
    }
  }, []);

  // Voice welcome prompt upon login
  useEffect(() => {
    const isJustLoggedIn = sessionStorage.getItem('justLoggedIn');
    if (isJustLoggedIn) {
      const isNewUser = sessionStorage.getItem('isNewUser') === 'true';
      sessionStorage.removeItem('justLoggedIn');
      sessionStorage.removeItem('isNewUser');
      const currentUser = getUser();
      const displayName =
        userProfile?.firstName ||
        user?.firstName ||
        currentUser?.firstName ||
        userProfile?.fullName ||
        user?.fullName ||
        currentUser?.fullName ||
        currentUser?.name ||
        currentUser?.email?.split('@')[0] ||
        '';

      const timer = setTimeout(() => {
        speakWelcome(displayName, isNewUser);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [user, userProfile]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) {
        setNavDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close nav dropdown on route changes
  useEffect(() => {
    setNavDropdownOpen(false);
  }, [location.pathname]);

  // Live clock tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format live date and time for header
  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const handleToggleNotifications = async () => {
    const nextState = !notificationsOpen;
    setNotificationsOpen(nextState);
    if (nextState && unreadCount > 0) {
      try {
        await notificationService.markAllAsRead();
      } catch (_) { }
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const handleClearNotifications = async () => {
    try {
      await notificationService.clearAll();
    } catch (_) { }
    setNotifications([]);
    setUnreadCount(0);
  };

  const handleNotificationClick = async (item) => {
    try {
      if (item.id) {
        await notificationService.markAsRead(item.id);
      }
    } catch (_) { }
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setNotificationsOpen(false);
    if (item.link) {
      navigate(item.link);
    }
  };

  const handleLogout = () => {
    try {
      disconnectSocket();
    } catch (_) { }
    clearAuth();
    navigate('/');
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

  // Get user display name (properly capitalized)
  const getUserDisplayName = () => {
    const raw =
      userProfile?.fullName ||
      (userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName || ''}`.trim() : null) ||
      user?.fullName ||
      user?.name ||
      user?.firstName ||
      user?.email?.split('@')[0] ||
      'User';

    return String(raw)
      .replace(/[._]/g, ' ')
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-[#DCEAF0] hidden lg:block transition-transform duration-200 ease-out ${desktopSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <Sidebar onClose={() => handleSetDesktopSidebar(false)} />
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
            {/* Left Section - Mobile & Desktop Sidebar Toggle + Country Live Date & Time */}
            <div className="flex items-center gap-2 sm:gap-3">
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

              {/* Desktop Open Sidebar Button & Navigation Dropdown (shown when sidebar is closed) */}
              {!desktopSidebarOpen && (
                <>
                  <button
                    type="button"
                    onClick={() => handleSetDesktopSidebar(true)}
                    title="Open sidebar"
                    aria-label="Open sidebar"
                    className="hidden lg:inline-flex items-center justify-center p-2 text-[#1F4264] hover:text-[#127EAB] hover:bg-[#E9F7FA] border border-[#DCEAF0] rounded-lg transition-colors cursor-pointer"
                  >
                    <PanelLeftOpen className="w-5 h-5" />
                  </button>

                  {/* Sidebar Tabs Dropdown */}
                  <div className="relative hidden lg:block" ref={navDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                      aria-expanded={navDropdownOpen}
                      aria-label="Toggle all sidebar tabs"
                      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-[0_1px_2px_rgba(31,66,100,0.04)] cursor-pointer border ${
                        navDropdownOpen
                          ? 'bg-[#E9F7FA] text-[#127EAB] border-[#127EAB]/50 ring-2 ring-[#127EAB]/20'
                          : 'text-[#1F4264] hover:text-[#127EAB] bg-[#F4F9FB] hover:bg-[#E9F7FA] border-[#DCEAF0] hover:border-[#127EAB]/40'
                      }`}
                      title="All sidebar tabs"
                    >
                      <LayoutGrid className="w-4 h-4 text-[#127EAB]" />
                      <span>Tabs</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#6F7F8E] transition-transform duration-200 ${
                          navDropdownOpen ? 'rotate-180 text-[#127EAB]' : ''
                        }`}
                      />
                    </button>

                    {navDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-[520px] bg-white rounded-xl shadow-[0_12px_40px_rgba(31,66,100,0.16)] border border-[#DCEAF0] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        {/* Header */}
                        <div className="p-3 px-4 border-b border-[#E6F0F5] bg-[#F8FBFC] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-[#E9F7FA] rounded-md text-[#127EAB]">
                              <LayoutGrid className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-semibold text-sm text-[#1F4264] block leading-tight">
                                Navigation Tabs
                              </span>
                              <span className="text-[11px] text-[#6F7F8E]">
                                Quick access to all sidebar sections
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setNavDropdownOpen(false);
                              handleSetDesktopSidebar(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#127EAB] hover:text-white bg-[#E9F7FA] hover:bg-[#127EAB] rounded-md transition-all cursor-pointer"
                            title="Dock sidebar back to screen"
                          >
                            <PanelLeftOpen className="w-3.5 h-3.5" />
                            <span>Dock Sidebar</span>
                          </button>
                        </div>

                        {/* Content Grid */}
                        <div className="p-3.5 grid grid-cols-2 gap-4 max-h-[calc(100vh-140px)] overflow-y-auto">
                          {/* Column 1: Main Navigation */}
                          <div>
                            <p className="px-2.5 mb-2 text-[10px] font-bold text-[#8BA0B2] uppercase tracking-wider">
                              Main Navigation
                            </p>
                            <div className="space-y-1">
                              {sidebarNavigation.map((item) => {
                                const Icon = item.icon;
                                const isActive =
                                  item.href === '/client/dashboard'
                                    ? location.pathname === '/client/dashboard' || location.pathname === '/client/dashboard/'
                                    : location.pathname.startsWith(item.href);

                                return (
                                  <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => {
                                      setNavDropdownOpen(false);
                                      navigate(item.href);
                                    }}
                                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg transition-all text-left cursor-pointer ${
                                      isActive
                                        ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-[0_2px_6px_rgba(18,126,171,0.25)]'
                                        : 'text-[#526475] hover:text-[#1F4264] hover:bg-[#F4F9FB]'
                                    }`}
                                  >
                                    <Icon
                                      className={`w-4 h-4 shrink-0 ${
                                        isActive ? 'text-white' : 'text-[#127EAB]'
                                      }`}
                                    />
                                    <span className="truncate">{item.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 2: Account & Support */}
                          <div className="flex flex-col justify-between">
                            <div>
                              <p className="px-2.5 mb-2 text-[10px] font-bold text-[#8BA0B2] uppercase tracking-wider">
                                Account & Support
                              </p>
                              <div className="space-y-1">
                                {sidebarSettingsNavigation.map((item) => {
                                  const Icon = item.icon;
                                  const isActive = location.pathname.startsWith(item.href);

                                  return (
                                    <button
                                      key={item.name}
                                      type="button"
                                      onClick={() => {
                                        setNavDropdownOpen(false);
                                        navigate(item.href);
                                      }}
                                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg transition-all text-left cursor-pointer ${
                                        isActive
                                          ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-[0_2px_6px_rgba(18,126,171,0.25)]'
                                          : 'text-[#526475] hover:text-[#1F4264] hover:bg-[#F4F9FB]'
                                      }`}
                                    >
                                      <Icon
                                        className={`w-4 h-4 shrink-0 ${
                                          isActive ? 'text-white' : 'text-[#127EAB]'
                                        }`}
                                      />
                                      <span className="truncate">{item.name}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Payments Button */}
                            <div className="pt-3 mt-3 border-t border-[#E6F0F5]">
                              <button
                                type="button"
                                onClick={() => {
                                  setNavDropdownOpen(false);
                                  window.open(
                                    'https://www.paypal.com/ncp/payment/9AWG5USG2AUDU',
                                    '_blank'
                                  );
                                }}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#EE6450] hover:bg-[#D9523E] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                              >
                                <CreditCard className="w-4 h-4" />
                                <span>Payments</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Live Date & Time Badge (Header Left) */}
              <div
                className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#F4F9FB] border border-[#DCEAF0] hover:border-[#127EAB]/40 rounded-lg text-xs sm:text-[13px] text-[#1F4264] shadow-[0_1px_2px_rgba(31,66,100,0.04)] transition-all"
                title="Current Date & Time"
              >
                {/* Date */}
                <div className="flex items-center gap-1.5 text-[#4A6B82] font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#127EAB] shrink-0" />
                  <span>{formattedDate}</span>
                </div>

                <span className="text-slate-300">|</span>

                {/* Live Clock with pulsing green dot */}
                <div className="flex items-center gap-1.5 font-mono font-semibold text-[#1F4264] tabular-nums">
                  <span className="relative flex h-2 w-2" title="Live clock">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Clock className="w-3.5 h-3.5 text-[#127EAB] shrink-0" />
                  <span>{formattedTime}</span>
                </div>
              </div>
            </div>

            {/* Center Section - Contact Info */}
            <div className="hidden xl:flex items-center gap-3">
              {/* Email */}
              {/* <a
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
              </a> */}

              {/* Phone (US & India) */}
              {/* <div className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-[#DCEAF0] hover:border-[#059669]/35 hover:bg-[#ECFDF5]/40 rounded-lg transition-all group">
                <div className="p-1.5 bg-[#ECFDF5] rounded-lg transition-colors shrink-0">
                  <Phone className="w-4 h-4 text-[#059669]" />
                </div>
                <div className="flex items-center gap-2 text-xs xl:text-[13px] font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1">

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
              </div> */}
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

              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationsRef}>
                <button
                  type="button"
                  onClick={handleToggleNotifications}
                  aria-label="Notifications"
                  className="relative p-2.5 text-[#6F7F8E] hover:text-[#1F4264] hover:bg-[#E9F7FA]/70 rounded-lg transition-colors cursor-pointer"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[#EE6450] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#DCEAF0] z-50 overflow-hidden">
                    <div className="p-3.5 border-b border-[#E6F0F5] bg-[#F4F9FB] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1F4264]">Notifications</span>
                        {notifications.length > 0 && (
                          <span className="text-[11px] bg-[#127EAB]/10 text-[#127EAB] font-semibold px-2 py-0.5 rounded-full">
                            {notifications.length}
                          </span>
                        )}
                      </div>
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearNotifications}
                          className="text-[11px] font-semibold text-[#EE6450] hover:text-[#DC4C38] hover:underline transition-colors cursor-pointer"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-[#F0F5F8]">
                      {notifications.length === 0 ? (
                        <div className="py-8 px-4 text-center">
                          <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-xs text-slate-500 font-medium">No new notifications</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Status updates and support responses will appear here.
                          </p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`p-3.5 transition-colors flex items-start gap-3 cursor-pointer ${n.read ? 'hover:bg-[#F8FBFC]' : 'bg-[#E9F7FA]/30 hover:bg-[#E9F7FA]/60'
                              }`}
                          >
                            <div className="h-8 w-8 rounded-lg bg-[#E9F7FA] text-[#127EAB] flex items-center justify-center shrink-0 mt-0.5">
                              {n.type === 'document' ? (
                                <FileText className="w-4 h-4 text-[#127EAB]" />
                              ) : n.type === 'ticket' ? (
                                <MessageSquare className="w-4 h-4 text-[#EE6450]" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-[#059669]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-semibold text-[#1F4264] truncate">
                                  {n.title}
                                </p>
                                <span className="text-[10px] text-slate-400 shrink-0">
                                  {n.time}
                                </span>
                              </div>
                              <p className="text-xs text-[#526475] mt-0.5 line-clamp-2">
                                {n.message}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

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
                    <p className="text-sm font-semibold text-[#1F4264] group-hover:text-[#127EAB] transition-colors capitalize">
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
                          <p className="text-sm font-semibold text-[#1F4264] truncate capitalize">
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
