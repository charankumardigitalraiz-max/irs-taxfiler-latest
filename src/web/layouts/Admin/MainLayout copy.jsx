import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "../../assets/irsLogo.png";
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

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-20"
        } bg-white border-r border-gray-200`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">TB</span>
              </div> */}
              {sidebarOpen && (
                <div>
                  <div className="w-40">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="w-28 h-auto object-contain"
                    />
                  </div>
                </div>
              )}
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
            {sidebarOpen && (
              <div className="px-3 py-2 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  DASHBOARD
                </h3>
              </div>
            )}
            {menuItems.slice(0, 1).map((item) => {
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
                    className={`h-5 w-5 flex-shrink-0 ${
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
            {sidebarOpen && (
              <div className="px-3 py-2 mt-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ACCOUNT
                </h3>
              </div>
            )}
            {menuItems.slice(1, 2).map((item) => {
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
                    className={`h-5 w-5 flex-shrink-0 ${
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
            {sidebarOpen && (
              <div className="px-3 py-2 mt-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  DOCUMENTS
                </h3>
              </div>
            )}
            {menuItems.slice(2, 3).map((item) => {
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
                    className={`h-5 w-5 flex-shrink-0 ${
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
            {sidebarOpen && (
              <div className="px-3 py-2 mt-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ACCOUNT
                </h3>
              </div>
            )}
            {menuItems.slice(3, 4).map((item) => {
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
                    className={`h-5 w-5 flex-shrink-0 ${
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
            {sidebarOpen && (
              <div className="px-3 py-2 mt-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  DOCUMENTS
                </h3>
              </div>
            )}
            {menuItems.slice(4, 8).map((item) => {
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
                    className={`h-5 w-5 flex-shrink-0 ${
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
            {sidebarOpen && (
              <div className="px-3 py-2 mt-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  SETTINGS
                </h3>
              </div>
            )}
            {menuItems.slice(8).map((item) => {
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
                    className={`h-5 w-5 flex-shrink-0 ${
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
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {menuItems.find((item) => isActive(item.path))?.name ||
                  "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-medium text-xs">JD</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
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

export default AdminDashboardLayout;
