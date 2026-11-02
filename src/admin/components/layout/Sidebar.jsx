import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Calculator,
  CreditCard,
  Send,
  Mail,
  ClipboardList,
  Settings,
  Shield,
  ChevronDown,
  CheckCircle,
  UserCheck,
  UserX,
  MessageSquare,
  Tag,
  UserPlus,
  ClipboardCheck,
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
  /*
    {
      name: 'Tax Preparation',
      href: '/admin/preparation',
      icon: Calculator,
      permission: PERMISSIONS.VIEW_TAX_PREP,
    },
  */
  {
    name: 'Email',
    href: '/admin/emailtemplates',
    icon: Mail,
    permission: PERMISSIONS.VIEW_EMAIL,
  },
  /*
    {
      name: 'Payments',
      href: '/admin/payments',
      icon: CreditCard,
      permission: PERMISSIONS.VIEW_PAYMENTS,
    },
    {
      name: 'Filing',
      href: '/admin/filing',
      icon: Send,
      permission: PERMISSIONS.VIEW_FILING,
    }
  */

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

const Sidebar = () => {
  const { user, checkPermission, checkAnyPermission } = useAuth();
  const location = useLocation();
  const [usersExpanded, setUsersExpanded] = useState(() => {
    // Check if current path is under /users
    return location.pathname.startsWith('/admin/users');
  });
  const [formsExpanded, setFormsExpanded] = useState(() => {
    // Check if current path is under /forms
    return location.pathname.startsWith('/admin/forms');
  });

  const filteredNavigation = navigation.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );

  const filteredSettings = settingsNavigation.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );

  const hasUserPermission = checkAnyPermission([
    PERMISSIONS.VIEW_UNVERIFIED_USERS,
    PERMISSIONS.VIEW_VERIFIED_USERS,
    PERMISSIONS.VIEW_REGISTERED_USERS
  ]);
  const hasFormsPermission = checkAnyPermission([
    PERMISSIONS.VIEW_OPT_OUT_FORMS,
    PERMISSIONS.VIEW_CONNECT_EXPERT_FORMS,
    PERMISSIONS.VIEW_CONTACT_FORMS,
    PERMISSIONS.VIEW_REFER_EARN_FORMS
  ]);
  const isUserSectionActive = location.pathname.startsWith('/admin/users');
  const isFormsSectionActive = location.pathname.startsWith('/admin/forms');

  // Keep users section expanded when on user routes
  useEffect(() => {
    if (location.pathname.startsWith('/admin/users')) {
      setUsersExpanded(true);
    }
    if (location.pathname.startsWith('/admin/forms')) {
      setFormsExpanded(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-64 bg-gray-900 min-h-screen h-full">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 sm:px-6 border-b border-gray-800">
        <img src={Logo} alt="Logo" className="h-7 w-auto object-contain invert brightness-0" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 sm:px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {/* Dashboard */}
          {filteredNavigation.filter(item => item.name === 'Dashboard').map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
                onClick={() => setUsersExpanded(!usersExpanded)}
                className={clsx(
                  'w-full flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors',
                  isUserSectionActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Users</span>
                </div>
                <ChevronDown
                  className={clsx(
                    'w-4 h-4 transition-transform',
                    usersExpanded ? 'rotate-180' : ''
                  )}
                />
              </button>

              {/* User Subsections */}
              {usersExpanded && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-700 pl-2">
                  {userSubsections.filter(sub => !sub.permission || checkPermission(sub.permission)).map((subsection) => {
                    const isActive = location.pathname === subsection.href;
                    return (
                      <NavLink
                        key={subsection.name}
                        to={subsection.href}
                        className={clsx(
                          'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors',
                          isActive
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
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
                onClick={() => setFormsExpanded(!formsExpanded)}
                className={clsx(
                  'w-full flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors',
                  isFormsSectionActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Forms</span>
                </div>
                <ChevronDown
                  className={clsx(
                    'w-4 h-4 transition-transform',
                    formsExpanded ? 'rotate-180' : ''
                  )}
                />
              </button>

              {/* Form Subsections */}
              {formsExpanded && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-700 pl-2">
                  {formSubsections.filter(sub => !sub.permission || checkPermission(sub.permission)).map((subsection) => {
                    const isActive = location.pathname === subsection.href;
                    return (
                      <NavLink
                        key={subsection.name}
                        to={subsection.href}
                        className={clsx(
                          'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors',
                          isActive
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
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
          {filteredNavigation.filter(item => item.name !== 'Dashboard').map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
          <div className="pt-4 mt-4 border-t border-gray-800">
            <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
              Settings
            </p>
            {filteredSettings.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
      <div className="p-3 sm:p-4 border-t border-gray-800">
        <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs sm:text-sm font-medium text-white">
              {user?.fullName?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-white truncate">
              {user?.fullName || 'Admin User'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.role?.replace('_', ' ') || 'Admin'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

