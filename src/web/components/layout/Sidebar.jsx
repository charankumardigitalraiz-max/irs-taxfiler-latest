import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Calculator,
  CreditCard,
  Send,
  ClipboardList,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PERMISSIONS } from '../../utils/permissions';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    permission: PERMISSIONS.VIEW_DASHBOARD,
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    permission: PERMISSIONS.VIEW_USERS,
  },
  {
    name: 'Scheduling',
    href: '/scheduling',
    icon: Calendar,
    permission: PERMISSIONS.VIEW_MEETINGS,
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    permission: PERMISSIONS.VIEW_DOCUMENTS,
  },
  {
    name: 'Tax Preparation',
    href: '/preparation',
    icon: Calculator,
    permission: PERMISSIONS.VIEW_TAX_PREP,
  },
  {
    name: 'Payments',
    href: '/payments',
    icon: CreditCard,
    permission: PERMISSIONS.VIEW_PAYMENTS,
  },
  {
    name: 'Filing',
    href: '/filing',
    icon: Send,
    permission: PERMISSIONS.VIEW_FILING,
  },
  {
    name: 'Audit Logs',
    href: '/audit',
    icon: ClipboardList,
    permission: PERMISSIONS.VIEW_AUDIT_LOGS,
  },
];

const settingsNavigation = [
  {
    name: 'Team Management',
    href: '/settings/team',
    icon: Users,
    permission: PERMISSIONS.VIEW_TEAM,
  },
  {
    name: 'Roles & Permissions',
    href: '/settings/roles',
    icon: Shield,
    permission: PERMISSIONS.MANAGE_SETTINGS,
  },
];

const Sidebar = () => {
  const { user, logout, checkPermission } = useAuth();
  
  const filteredNavigation = navigation.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );
  
  const filteredSettings = settingsNavigation.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );
  
  return (
    <div className="flex flex-col w-64 bg-gray-900 min-h-screen">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">TaxAdmin</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
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
                    'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      
      {/* User section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.fullName?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.fullName || 'Admin User'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.role?.replace('_', ' ') || 'Admin'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 mt-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

