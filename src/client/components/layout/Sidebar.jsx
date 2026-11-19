import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Calendar,
  User,
  HelpCircle,
  Users,
  Building,
  FileCheck,
  FileText,
  FileEdit,
  CreditCard,
  ClipboardCheck,
  PanelLeftClose,
  X,
} from 'lucide-react';
import { getUser } from '../../utils/auth';
import { useState, useEffect } from 'react';
import Logo from '../../../assets/irsLogo.png';

export const navigation = [
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

export const settingsNavigation = [
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

const Sidebar = ({ onClose, isMobile = false }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white min-h-screen h-full text-[#1F4264] border-r border-[#DCEAF0]">
      {/* Logo & Close/Collapse Button */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-5 border-b border-[#E6F0F5]">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/irslogo.webp"
            alt="IRS Tax Filer"
            className="inline-block align-middle h-12 w-auto object-contain"
          />
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
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/client/dashboard'}
              onClick={handleNavClick}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-150',
                  isActive
                    ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-[0_2px_8px_rgba(18,126,171,0.22)]'
                    : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                )
              }
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Settings section */}
        <div className="pt-4 mt-4 border-t border-[#E6F0F5]">
          <p className="px-3 mb-2 text-[11px] font-bold text-[#8BA0B2] uppercase tracking-wider">
            Account
          </p>
          <div className="space-y-1">
            {settingsNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-150',
                    isActive
                      ? 'bg-gradient-to-r from-[#127EAB] to-[#0E668B] text-white font-semibold shadow-[0_2px_8px_rgba(18,126,171,0.22)]'
                      : 'text-[#6F7F8E] hover:bg-[#F4F9FB] hover:text-[#1F4264]'
                  )
                }
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* PayPal Payment Button */}
      <div className="p-3 sm:p-4 border-t border-[#E6F0F5]">
        <button
          onClick={() =>
            window.open(
              'https://www.paypal.com/ncp/payment/9AWG5USG2AUDU',
              '_blank'
            )
          }
          className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 bg-[#EE6450] hover:bg-[#D9523E] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Payments</span>
        </button>
      </div>

      {/* User section */}
      {/* <div className="p-3 sm:p-4 border-t border-[#E6F0F5] bg-[#F8FBFC]">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white border border-[#DCEAF0]">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#E9F7FA] border border-[#127EAB]/25 text-[#127EAB] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm">
            <span>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-[#1F4264] truncate">
              {user?.email || 'Client User'}
            </p>
            <p className="text-[11px] text-[#6F7F8E] font-medium truncate">Client Portal</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
