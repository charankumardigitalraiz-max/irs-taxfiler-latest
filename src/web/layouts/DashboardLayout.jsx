import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../Redux/Slices/userSlice";
// import { baseUrl } from "../Services/apis";
import Logo from "../assets/irsLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  DocumentArrowUpIcon,
  ClipboardDocumentCheckIcon,
  BellIcon,
  DocumentTextIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  UserPlusIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  // const user = null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
    {
      name: "Account Information",
      path: "/dashboard/account-info",
      icon: BuildingOfficeIcon,
    },
    {
      name: "Upload Documents",
      path: "/dashboard/upload",
      icon: DocumentArrowUpIcon,
    },
    { name: "Scheduling", path: "/dashboard/scheduling", icon: CalendarIcon },
    {
      name: "Filing Status",
      path: "/dashboard/status",
      icon: ClipboardDocumentCheckIcon,
    },
    { name: "Tax Summary", path: "/dashboard/tax-summary", icon: ChartBarIcon },
    { name: "Tax Refund", path: "/dashboard/tax-refund", icon: ArrowPathIcon },
    {
      name: "Final Reports",
      path: "/dashboard/reports",
      icon: DocumentTextIcon,
    },
    { name: "Referrals", path: "/dashboard/referrals", icon: UserPlusIcon },
    {
      name: "Support",
      path: "/dashboard/support",
      icon: ChatBubbleLeftRightIcon,
    },
    { name: "Notifications", path: "/dashboard/notifications", icon: BellIcon },
  ];

  const isActive = (path) => location.pathname === path;
  const isProfilePage = location.pathname === "/dashboard/profile";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/"
                  className="flex items-center cursor-pointer space-x-2"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {/* Oirstax Logo - Using actual image file */}
                  <img
                    src={Logo}
                    alt="Oirstax Logo"
                    className="h-6 w-auto object-contain"
                  />
                </Link>
              </motion.div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-primary-blue text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      active ? "text-white" : "text-gray-600"
                    }`}
                  />
                  {sidebarOpen && (
                    <span
                      className={`text-sm font-medium ${
                        active ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-xl font-semibold text-gray-900">
              {menuItems.find((item) => isActive(item.path))?.name ||
                "Dashboard"}
            </h2>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* ✅ Profile Section */}
              <div className="relative flex items-center space-x-3 pl-4 border-l border-gray-200">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-3"
                >
                  {/* Avatar */}
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md overflow-hidden">
                    {user?.image && !profileImageError ? (
                      <img
                        src={`${baseUrl}/${user.image.replace(/\\/g, "/")}`}
                        alt={user?.name || "Profile"}
                        className="w-full h-full object-cover"
                        onError={() => setProfileImageError(true)}
                      />
                    ) : (
                      <span className="text-white font-medium text-xs">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Username */}
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-12 w-44 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
                    {!isProfilePage ? (
                      // ✅ Show PROFILE if NOT on profile page
                      <button
                        onClick={() => {
                          navigate("/dashboard/profile");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    ) : (
                      // ✅ Show DASHBOARD if ALREADY on profile page
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
