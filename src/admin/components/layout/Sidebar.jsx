import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Mail,
  ClipboardList,
  Shield,
  ChevronDown,
  CheckCircle,
  UserCheck,
  UserX,
  MessageSquare,
  Tag,
  UserPlus,
  ClipboardCheck,
  PanelLeftClose,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PERMISSIONS } from '../../utils/permissions';
import Logo from '../../../assets/footerlogo.png';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    permission: PERMISSIONS.VIEW_DASHBOARD,
  },
  {
    name: 'Free to Call',
    href: '/admin/scheduling',
    icon: Calendar,
    permission: PERMISSIONS.VIEW_MEETINGS,
  },
  {
    name: 'Documents',
    href: '/admin/documents',
    icon: FileText,
    permission: PERMISSIONS.VIEW_DOCUMENTS,
  },
  {
    name: 'Email',
    href: '/admin/emailtemplates',
    icon: Mail,
    permission: PERMISSIONS.VIEW_EMAIL,
  },
  {
    name: 'Audit Logs',
    href: '/admin/audit',
    icon: ClipboardList,
    permission: PERMISSIONS.VIEW_AUDIT_LOGS,
  },
  {
    name: 'Support',
    href: '/admin/support',
    icon: MessageSquare,
    permission: PERMISSIONS.VIEW_SUPPORT,
  },
  {
    name: 'Coupons',
    href: '/admin/coupons',
    icon: Tag,
    permission: PERMISSIONS.VIEW_COUPONS,
  },
  {
    name: 'Referrals',
    href: '/admin/referrals',
    icon: UserPlus,
    permission: PERMISSIONS.VIEW_REFERRALS,
  },
];

const userSubsections = [
  {
    name: 'Unverified',
    href: '/admin/users/unverified',
    icon: UserX,
    description: 'Users sent OTP but not verified',
    permission: PERMISSIONS.VIEW_UNVERIFIED_USERS,
  },
  {
    name: 'Verified',
    href: '/admin/users/verified',
    icon: UserCheck,
    description: 'Users verified OTP but not registered',
    permission: PERMISSIONS.VIEW_VERIFIED_USERS,
  },
  {
    name: 'Registered',
    href: '/admin/users/registered',
    icon: CheckCircle,
    description: 'Users successfully registered',
    permission: PERMISSIONS.VIEW_REGISTERED_USERS,
  },
];

const formSubsections = [
  {
    name: 'Opt-Out Requests',
    href: '/admin/forms/opt-out',
    icon: FileText,
    description: 'Do Not Sell requests',
    permission: PERMISSIONS.VIEW_OPT_OUT_FORMS,
  },
  {
    name: 'Connect Expert',
    href: '/admin/forms/connect-expert',
    icon: MessageSquare,
    description: 'Tax expert consultation requests',
    permission: PERMISSIONS.VIEW_CONNECT_EXPERT_FORMS,
  },
  {
    name: 'Contact Messages',
    href: '/admin/forms/contact-message',
    icon: MessageSquare,
    description: 'General contact form submissions',
    permission: PERMISSIONS.VIEW_CONTACT_FORMS,
  },
  {
    name: 'Refer & Earn',
    href: '/admin/forms/refer-earn',
    icon: UserPlus,
    description: 'Referral program submissions',
    permission: PERMISSIONS.VIEW_REFER_EARN_FORMS,
  },
];

const settingsNavigation = [
  {
    name: 'Staff Management',
    href: '/admin/settings/team',
    icon: Users,
    permission: PERMISSIONS.VIEW_STAFF_MANAGEMENT,
  },
  {
    name: 'Roles & Permissions',
    href: '/admin/settings/roles',
    icon: Shield,
    permission: PERMISSIONS.VIEW_ROLES_PERMISSIONS,
  },
  {
    name: 'Content Settings',
    href: '/admin/settings/content',
    icon: FileText,
    permission: PERMISSIONS.VIEW_CONTENT_SETTINGS,
  },
];

const Sidebar = ({ onClose, isMobile = false }) => {
  const { user, checkPermission, checkAnyPermission } = useAuth();
  const location = useLocation();
  const [usersExpanded, setUsersExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/users');
  });
  const [formsExpanded, setFormsExpanded] = useState(() => {
    return location.pathname.startsWith('/admin/forms');
  });

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const filteredNavigation = navigation.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );

  const filteredSettings = settingsNavigation.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );

  const hasUserPermission = checkAnyPermission([
    PERMISSIONS.VIEW_UNVERIFIED_USERS,
    PERMISSIONS.VIEW_VERIFIED_USERS,
    PERMISSIONS.VIEW_REGISTERED_USERS,
  ]);
  const hasFormsPermission = checkAnyPermission([
    PERMISSIONS.VIEW_OPT_OUT_FORMS,
    PERMISSIONS.VIEW_CONNECT_EXPERT_FORMS,
    PERMISSIONS.VIEW_CONTACT_FORMS,
    PERMISSIONS.VIEW_REFER_EARN_FORMS,
  ]);
  const isUserSectionActive = location.pathname.startsWith('/admin/users');
  const isFormsSectionActive = location.pathname.startsWith('/admin/forms');

  useEffect(() => {
    if (location.pathname.startsWith('/admin/users')) {
      setUsersExpanded(true);
    }
    if (location.pathname.startsWith('/admin/forms')) {
      setFormsExpanded(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-64 bg-white min-h-screen h-full text-[#1F4264] border-r border-[#DCEAF0]">
      {/* Logo & Close/Collapse Button */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-5 border-b border-[#E6F0F5] shrink-0 bg-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/irslogo.webp"
            alt="IRS Tax Filer"
            className="h-[50px] w-auto object-contain"
          />
          {/* <span className="text-[10px] font-bold uppercase tracking-wider text-[#127EAB] bg-[#E9F7FA] border border-[#127EAB]/25 px-1.5 py-0.5 rounded-md">
            Admin
          </span> */}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            title="Close sidebar"
            aria-label="Close sidebar"
            className="p-1.5 rounded-lg text-[#6F7F8E] hover:text-[#1F4264] hover:bg-[#F4F9FB] transition-colors cursor-pointer shrink-0"
          >
            {isMobile ? (
              <X className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 sm:px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {/* Dashboard */}
          {filteredNavigation
            .filter((item) => item.name === 'Dashboard')
            .map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end
                onClick={handleNavClick}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-150',
                    isActive
                      ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-[0_2px_8px_rgba(18,126,171,0.22)]'
                      : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                  )
                }
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}

          {/* Users Section - Collapsible */}
          {hasUserPermission && (
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setUsersExpanded(!usersExpanded)}
                className={clsx(
                  'w-full flex items-center justify-between gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer',
                  isUserSectionActive || usersExpanded
                    ? 'bg-[#F4F9FB] text-[#1F4264] font-semibold'
                    : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                )}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Users</span>
                </div>
                <ChevronDown
                  className={clsx(
                    'w-4 h-4 transition-transform duration-200 text-[#8BA0B2]',
                    usersExpanded ? 'rotate-180' : ''
                  )}
                />
              </button>

              {/* User Subsections */}
              {usersExpanded && (
                <div className="ml-3 space-y-1 border-l-2 border-[#E6F0F5] pl-2.5 my-1">
                  {userSubsections
                    .filter(
                      (sub) => !sub.permission || checkPermission(sub.permission)
                    )
                    .map((subsection) => {
                      const isActive = location.pathname === subsection.href;
                      return (
                        <NavLink
                          key={subsection.name}
                          to={subsection.href}
                          onClick={handleNavClick}
                          className={clsx(
                            'flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-all',
                            isActive
                              ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-xs'
                              : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                          )}
                          title={subsection.description}
                        >
                          <subsection.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{subsection.name}</span>
                        </NavLink>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* Forms Section - Collapsible */}
          {hasFormsPermission && (
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setFormsExpanded(!formsExpanded)}
                className={clsx(
                  'w-full flex items-center justify-between gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer',
                  isFormsSectionActive || formsExpanded
                    ? 'bg-[#F4F9FB] text-[#1F4264] font-semibold'
                    : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                )}
              >
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Forms</span>
                </div>
                <ChevronDown
                  className={clsx(
                    'w-4 h-4 transition-transform duration-200 text-[#8BA0B2]',
                    formsExpanded ? 'rotate-180' : ''
                  )}
                />
              </button>

              {/* Form Subsections */}
              {formsExpanded && (
                <div className="ml-3 space-y-1 border-l-2 border-[#E6F0F5] pl-2.5 my-1">
                  {formSubsections
                    .filter(
                      (sub) => !sub.permission || checkPermission(sub.permission)
                    )
                    .map((subsection) => {
                      const isActive = location.pathname === subsection.href;
                      return (
                        <NavLink
                          key={subsection.name}
                          to={subsection.href}
                          onClick={handleNavClick}
                          className={clsx(
                            'flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-all',
                            isActive
                              ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-xs'
                              : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                          )}
                          title={subsection.description}
                        >
                          <subsection.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{subsection.name}</span>
                        </NavLink>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* Other Navigation Items */}
          {filteredNavigation
            .filter((item) => item.name !== 'Dashboard')
            .map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all duration-150',
                    isActive
                      ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-[0_2px_8px_rgba(18,126,171,0.22)]'
                      : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                  )
                }
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
        </div>

        {/* Settings section */}
        {filteredSettings.length > 0 && (
          <div className="pt-4 mt-4 border-t border-[#E6F0F5]">
            <p className="px-3 mb-2 text-[11px] font-bold text-[#8BA0B2] uppercase tracking-wider">
              Settings
            </p>
            {filteredSettings.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all duration-150',
                    isActive
                      ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-[0_2px_8px_rgba(18,126,171,0.22)]'
                      : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                  )
                }
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* User section */}
      <div className="p-3 sm:p-4 border-t border-[#E6F0F5] bg-[#F8FBFC] shrink-0">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-full bg-[#E9F7FA] border border-[#127EAB]/25 text-[#127EAB] flex items-center justify-center flex-shrink-0 shadow-2xs font-bold text-xs sm:text-sm">
            <span>
              {user?.fullName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-[#1F4264] truncate">
              {user?.fullName || user?.name || 'Admin User'}
            </p>
            <p className="text-[10px] text-[#6F7F8E] uppercase tracking-wider font-semibold truncate">
              {user?.role?.replace('_', ' ') || 'Admin'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
