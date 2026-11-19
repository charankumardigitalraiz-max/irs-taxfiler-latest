import { useState, useEffect, useRef } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  Bell,
  ChevronUp,
  User,
  LogOut,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Shield,
  Hash,
  UserPlus,
  FileText,
  Check,
  Volume2,
} from 'lucide-react';
import Sidebar from './Sidebar';
import useAuthStore from '../../store/authStore';
import { useToastStore } from '../../hooks/useToast';
import ToastContainer from '../common/ToastContainer';
import { baseUrl } from '../../../baseurl.js';
import notificationService from '../../services/notificationService';
import {
  notifyAdminNewClientRegistration,
  playAdminChime,
} from '../../utils/adminVoiceAssistant.js';

const AdminLayout = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const profileDropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Load persistent notifications from database on mount
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await notificationService.getNotifications({ limit: 20 });
        if (res.success && Array.isArray(res.notifications)) {
          setNotifications(
            res.notifications.map((n) => ({
              id: n._id,
              type: n.type?.toLowerCase().includes('registration')
                ? 'registration'
                : n.type?.toLowerCase().includes('ticket')
                ? 'ticket'
                : 'document',
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
        console.warn('[Admin Notifications] Failed to fetch from server:', err);
      }
    };

    loadNotifications();
  }, []);

  // Socket.IO real-time connection for Admin
  useEffect(() => {
    const adminToken = useAuthStore.getState().token;
    if (!adminToken) return;

    const socket = io(baseUrl, {
      auth: { token: adminToken },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('⚡ [Admin Socket] Connected as Admin:', socket.id);
    });

    // Real-time Event: New Client Registered
    socket.on('new_client_registered', (data) => {
      console.log('⚡ [Admin Socket] New client registered:', data);

      // 1. Voice memo & notification chime
      notifyAdminNewClientRegistration(data);

      // 2. Visual Toast Alert
      const clientName = data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.email;
      useToastStore.getState().addToast({
        type: 'info',
        title: 'New Client Registered!',
        message: `${clientName} (${data.userId || 'ID pending'})`,
        duration: 8000,
      });

      // 3. Add to notifications dropdown list
      setNotifications((prev) => [
        {
          id: Date.now(),
          type: 'registration',
          title: 'New Client Registered',
          message: `${clientName} registered with User ID ${data.userId || ''}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
          data,
        },
        ...prev,
      ]);
      setUnreadCount((c) => c + 1);
    });

    // Real-time Event: New Support Ticket
    socket.on('new_ticket', (ticket) => {
      playAdminChime();
      useToastStore.getState().addToast({
        type: 'info',
        title: 'New Support Ticket',
        message: `${ticket.subject || 'Support Request'} from ${ticket.user?.fullName || 'Client'}`,
      });
      setNotifications((prev) => [
        {
          id: Date.now(),
          type: 'ticket',
          title: 'New Support Ticket',
          message: `${ticket.subject} - ${ticket.user?.fullName || ''}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        },
        ...prev,
      ]);
      setUnreadCount((c) => c + 1);
    });

    // Real-time Event: New Client Document Uploaded
    socket.on('new_client_document', (doc) => {
      playAdminChime();
      useToastStore.getState().addToast({
        type: 'info',
        title: 'New Document Uploaded',
        message: `${doc.fileName} uploaded by ${doc.user?.fullName || 'Client'}`,
      });
      setNotifications((prev) => [
        {
          id: Date.now(),
          type: 'document',
          title: 'New Document Uploaded',
          message: `${doc.fileName} by ${doc.user?.fullName || ''}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        },
        ...prev,
      ]);
      setUnreadCount((c) => c + 1);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    logout();
    navigate('/admin/login');
  };

  const handleClearNotifications = async () => {
    try {
      await notificationService.clearAll();
    } catch (_) {}
    setNotifications([]);
    setUnreadCount(0);
  };

  const handleToggleNotifications = async () => {
    const nextState = !notificationsOpen;
    setNotificationsOpen(nextState);
    if (nextState && unreadCount > 0) {
      try {
        await notificationService.markAllAsRead();
      } catch (_) {}
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const handleNotificationClick = async (item) => {
    try {
      if (item.id) {
        await notificationService.markAsRead(item.id);
      }
    } catch (_) {}
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setNotificationsOpen(false);
    if (item.link) {
      navigate(item.link);
    }
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
    return 'A';
  };

  // Get user display name
  const getUserDisplayName = () => {
    return user?.fullName || user?.name || user?.email?.split('@')[0] || 'Admin';
  };

  // Get user role
  const getUserRole = () => {
    return user?.role?.replace('_', ' ') || 'Admin';
  };

  return (
    <div className="min-h-screen bg-[#F4F9FB] font-sans flex">
      {/* Desktop Sidebar (Collapsible) */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-[#DCEAF0] hidden lg:block transition-transform duration-200 ease-out ${
          desktopSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden w-64">
            <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div
        className={`transition-[margin] duration-200 ease-out flex-1 min-w-0 flex flex-col min-h-screen ${
          desktopSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#DCEAF0] shadow-[0_1px_8px_rgba(31,66,100,0.04)]">
          {/* Route transition progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] overflow-hidden pointer-events-none">
            <div
              key={location.pathname}
              className="h-full w-full bg-gradient-to-r from-[#127EAB] via-[#22B8CF] to-[#EE6450] irs-top-progress"
            />
          </div>

          <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left Section - Sidebar Toggles & Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              {/* Mobile Sidebar Toggle */}
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle mobile sidebar"
                className="lg:hidden p-2 text-[#1F4264] hover:text-[#127EAB] hover:bg-[#E9F7FA] rounded-lg transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Sidebar Toggle */}
              <button
                type="button"
                onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                title={desktopSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                aria-label="Toggle desktop sidebar"
                className="hidden lg:flex p-2 text-[#1F4264] hover:text-[#127EAB] hover:bg-[#E9F7FA] rounded-lg transition-colors cursor-pointer"
              >
                {desktopSidebarOpen ? (
                  <PanelLeftClose className="w-5 h-5" />
                ) : (
                  <PanelLeftOpen className="w-5 h-5" />
                )}
              </button>

              {/* Universal Search Bar */}
              <div className="hidden md:flex relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-[#8BA0B2]" />
                </div>
                <input
                  type="text"
                  placeholder="Universal search..."
                  className="block w-full pl-9 pr-3 py-1.5 sm:py-2 border border-[#DCEAF0] rounded-lg bg-[#F8FBFC] text-xs sm:text-sm text-[#1F4264] placeholder-[#8BA0B2] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#127EAB]/20 focus:border-[#127EAB] transition-all"
                />
              </div>
            </div>

            {/* Right Section - Notifications & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationsRef}>
                <button
                  type="button"
                  onClick={handleToggleNotifications}
                  aria-label="Notifications"
                  className="relative p-2 text-[#6F7F8E] hover:text-[#127EAB] hover:bg-[#E9F7FA] rounded-lg transition-all cursor-pointer"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#EE6450] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#DCEAF0] z-50 overflow-hidden">
                    <div className="p-3.5 border-b border-[#E6F0F5] bg-[#F4F9FB] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1F4264]">Live Notifications</span>
                        {notifications.length > 0 && (
                          <span className="text-[11px] bg-[#127EAB]/10 text-[#127EAB] font-semibold px-2 py-0.5 rounded-full">
                            {notifications.length}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => window.testAdminVoiceMemo && window.testAdminVoiceMemo('Demo Client')}
                          className="text-[11px] font-medium text-[#127EAB] hover:underline flex items-center gap-1 cursor-pointer"
                          title="Preview voice memo alert"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Test Voice</span>
                        </button>
                        {notifications.length > 0 && (
                          <button
                            type="button"
                            onClick={handleClearNotifications}
                            className="text-[11px] font-semibold text-[#EE6450] hover:text-[#DC4C38] hover:underline transition-colors cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-[#F0F5F8]">
                      {notifications.length === 0 ? (
                        <div className="py-8 px-4 text-center">
                          <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-xs text-slate-500 font-medium">No live notifications</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Real-time client registrations and alerts will appear here.
                          </p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`p-3 transition-colors flex items-start gap-3 cursor-pointer ${
                              n.read ? 'hover:bg-[#F8FBFC]' : 'bg-[#E9F7FA]/30 hover:bg-[#E9F7FA]/60'
                            }`}
                          >
                            <div className="h-8 w-8 rounded-lg bg-[#E9F7FA] text-[#127EAB] flex items-center justify-center shrink-0 mt-0.5">
                              {n.type === 'registration' ? (
                                <UserPlus className="w-4 h-4" />
                              ) : n.type === 'ticket' ? (
                                <Bell className="w-4 h-4 text-[#EE6450]" />
                              ) : (
                                <FileText className="w-4 h-4 text-[#22B8CF]" />
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

              <div className="h-5 w-px bg-[#E6F0F5] mx-0.5 hidden sm:block" />

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 sm:p-1.5 hover:bg-[#E9F7FA]/60 rounded-lg transition-all cursor-pointer group"
                >
                  <div className="h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-full bg-gradient-to-br from-[#1F4264] to-[#127EAB] flex items-center justify-center shadow-xs group-hover:shadow group-active:scale-95 transition-all">
                    <span className="text-white font-semibold text-xs uppercase">
                      {getUserInitials()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs sm:text-sm font-semibold text-[#1F4264] leading-tight">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-[10px] text-[#127EAB] font-semibold uppercase tracking-wider">
                      {getUserRole()}
                    </p>
                  </div>
                  <ChevronUp
                    className={`hidden sm:block w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      profileDropdownOpen ? 'rotate-0' : 'rotate-180'
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 sm:w-64 bg-white rounded-xl shadow-xl border border-[#DCEAF0] z-50 overflow-hidden">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-[#E6F0F5] bg-[#F4F9FB]/60">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1F4264] to-[#127EAB] flex items-center justify-center text-white font-semibold text-sm shadow-xs shrink-0">
                          {getUserInitials()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#1F4264] truncate">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-[#6F7F8E] truncate">
                            {user?.email || 'admin@irstaxfiler.com'}
                          </p>
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#E9F7FA] text-[#127EAB]">
                            {getUserRole()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/admin/settings/profile');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1F4264] hover:bg-[#E9F7FA]/60 hover:text-[#127EAB] transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[#127EAB]" />
                        <span>Profile Settings</span>
                      </button>

                      <div className="border-t border-[#E6F0F5] my-1" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#EE6450] hover:bg-[#FEF4F2] transition-colors cursor-pointer"
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          <div key={location.pathname} className="irs-page-enter">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Toast Notifications Container */}
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
