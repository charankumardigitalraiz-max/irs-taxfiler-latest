import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Calendar,
  User,
  HelpCircle,
  LogOut,
  Users,
  Building,
  FileCheck,
  FileText,
  FileEdit,
  CreditCard,
  ClipboardCheck,
} from 'lucide-react';
import { getUser, clearAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../../assets/irsLogo.png';

const navigation = [
  {
    name: 'Dashboard',
    href: '/client/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Personal Info',
    href: '/client/dashboard/account-information',
    icon: Building,
  },
  {
    name: 'Free to Call',
    href: '/client/dashboard/schedule',
    icon: Calendar,
  },
  {
    name: 'Upload Documents',
    href: '/client/dashboard/documents',
    icon: FileText,
  },
  {
    name: 'Tax Draft',
    href: '/client/dashboard/tax-draft',
    icon: FileEdit,
  },
  {
    name: 'Final Reports',
    href: '/client/dashboard/final-reports',
    icon: ClipboardCheck,
  },
  {
    name: 'Referrals',
    href: '/client/dashboard/referrals',
    icon: Users,
  },
];

const settingsNavigation = [
  {
    name: 'Profile',
    href: '/client/dashboard/profile',
    icon: User,
  },
  {
    name: 'Settings & Policies',
    href: '/client/dashboard/policies',
    icon: HelpCircle,
  },
  {
    name: 'Help & Support',
    href: '/client/dashboard/support',
    icon: HelpCircle,
  },
  {
    name: 'What is IRS Tax Filer?',
    href: '/client/dashboard/about-irs-tax-filer',
    icon: FileCheck,
  },
];

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate('/client/login');
  };

  return (
    <div className="flex flex-col w-64 bg-gray-900 min-h-screen h-full">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 sm:px-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src={ Logo } alt="logo" className="inline-block invert brightness-0 align-middle w-9 w-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 sm:px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/client/dashboard'}
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
        <div className="pt-4 mt-4 border-t border-gray-800">
          <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Account
          </p>
          {settingsNavigation.map((item) => (
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
      </nav>

      {/* PayPal Payment Button */}
      <div className="p-3 sm:p-4 border-t border-gray-800">
        <button
          onClick={() => window.open('https://www.paypal.com/ncp/payment/9AWG5USG2AUDU', '_blank')}
          className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
        >
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Payments</span>
        </button>
      </div>
      

      {/* User section */}
      <div className="p-3 sm:p-4 border-t border-gray-800">
        <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs sm:text-sm font-medium text-white">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-white truncate">
              {user?.email || 'Client User'}
            </p>
            <p className="text-xs text-gray-400 truncate">Client Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
