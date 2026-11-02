import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "../../assets/irsLogo.png";

import {
  HomeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

/* ================= MENU CONFIG (BEST PRACTICE) ================= */

const SIDEBAR_MENU = [
  {
    section: "Dashboard",
    items: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: HomeIcon,
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        name: "All Users",
        path: "/admin/alluser",
        icon: BuildingOfficeIcon,
      },
    ],
  },
  {
    section: "Forms",
    items: [
      {
        name: "Schedule a Meet",
        path: "/admin/contact-leads",
        icon: BuildingOfficeIcon,
      },

      {
        name: "Contact Form",
        path: "/admin/contact-forms",
        icon: BuildingOfficeIcon,
      },
      {
        name: "Referral Form",
        path: "/admin/adminreferral",
        icon: BuildingOfficeIcon,
      },
    ],
  },
  // {
  //   section: "Account",
  //   items: [
  //     {
  //       name: "consultation",
  //       path: "/admin/alluser",
  //       icon: BuildingOfficeIcon,
  //     },
  //   ],
  // },
  // {
  //   type: "dropdown",
  //   name: "Pre-Processing",
  //   icon: ArrowPathIcon,
  //   items: [
  //     {
  //       name: "Registered Users",
  //       path: "/admin/registered-users",
  //       count: 6,
  //     },
  //     {
  //       name: "Information Pending",
  //       path: "/admin/information",
  //       count: 0,
  //     },
  //     {
  //       name: "Scheduling Pending",
  //       path: "/admin/scheduling-panding",
  //       count: 0,
  //     },
  //     {
  //       name: "Interview Pending",
  //       path: "/admin/interview",
  //       count: 2,
  //     },
  //     {
  //       name: "Documents Pending",
  //       path: "/admin/documents-pending",
  //       count: 0,
  //     },
  //   ],
  // },
  // {
  //   type: "dropdown",
  //   name: "PREPRATION",
  //   icon: ArrowPathIcon,
  //   items: [
  //     {
  //       name: "Prepration-1",
  //       path: "/admin/registered-users",
  //       count: 6,
  //     },
  //     {
  //       name: "Prepration-2",
  //       path: "/admin/information",
  //       count: 0,
  //     },
  //     {
  //       name: "Review & Summary-1",
  //       path: "/admin/scheduling-panding",
  //       count: 0,
  //     },
  //     {
  //       name: "Review & Summary-2",
  //       path: "/admin/interview",
  //       count: 2,
  //     },
  //   ],
  // },
  // {
  //   section: "Process",
  //   items: [
  //     {
  //       name: "Scheduling",
  //       path: "/admin/scheduling",
  //       icon: CalendarIcon,
  //     },
  //     {
  //       name: "Filing Status",
  //       path: "/admin/status",
  //       icon: ClipboardDocumentCheckIcon,
  //     },
  //   ],
  // },
  // {
  //   section: "Documents",
  //   items: [
  //     {
  //       name: "Tax Summary",
  //       path: "/admin/tax-summary",
  //       icon: ChartBarIcon,
  //     },
  //     {
  //       name: "Tax Refund",
  //       path: "/admin/tax-refund",
  //       icon: ArrowPathIcon,
  //     },
  //     {
  //       name: "Final Reports",
  //       path: "/admin/reports",
  //       icon: DocumentTextIcon,
  //     },
  //   ],
  // },
];

/* ================= MAIN LAYOUT ================= */

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [preOpen, setPreOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between h-20 px-6 border-b">
          {sidebarOpen && (
            <img src={Logo} alt="Logo" className="w-28 object-contain" />
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="px-4 py-4 overflow-y-auto text-sm">
          {SIDEBAR_MENU.map((block, index) => {
            /* ===== SECTION BLOCK ===== */
            if (block.section) {
              return (
                <div key={index}>
                  {sidebarOpen && (
                    <div className="mt-4 mb-2 px-3 text-xs font-semibold uppercase text-gray-500">
                      {block.section}
                    </div>
                  )}
                  {block.items.map((item) => (
                    <NavItem
                      key={item.path}
                      item={item}
                      active={isActive(item.path)}
                      sidebarOpen={sidebarOpen}
                    />
                  ))}
                </div>
              );
            }

            /* ===== PREparation DROPDOWN ===== */
            // if (block.type === "dropdown") {
            //   return (
            //     <div key={block.name} className="mt-3">
            //       <button
            //         onClick={() => setPreOpen(!preOpen)}
            //         className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100"
            //       >
            //         <div className="flex items-center gap-3">
            //           <block.icon className="h-5 w-5 text-gray-600" />
            //           {sidebarOpen && (
            //             <span className="text-sm font-semibold uppercase">
            //               {block.name}
            //             </span>
            //           )}
            //         </div>
            //         {sidebarOpen && (
            //           <ChevronDownIcon
            //             className={`h-4 w-4 transition-transform ${
            //               preOpen ? "rotate-180" : ""
            //             }`}
            //           />
            //         )}
            //       </button>

            //       {preOpen && sidebarOpen && (
            //         <div className="ml-8 mt-1 space-y-1">
            //           {block.items.map((sub) => (
            //             <Link
            //               key={sub.path}
            //               to={sub.path}
            //               className={`flex justify-between px-3 py-2 rounded-md text-sm ${
            //                 isActive(sub.path)
            //                   ? "bg-gray-200 font-medium"
            //                   : "text-gray-600 hover:bg-gray-100"
            //               }`}
            //             >
            //               <span>{sub.name}</span>
            //               <span className="bg-gray-300 px-2 rounded-full text-xs">
            //                 {sub.count}
            //               </span>
            //             </Link>
            //           ))}
            //         </div>
            //       )}
            //     </div>
            //   );
            // }
            // if (block.type === "dropdown") {
            //   return (
            //     <div key={block.name} className="mt-3">
            //       <button
            //         onClick={() => setPreOpen(!preOpen)}
            //         className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100"
            //       >
            //         <div className="flex items-center gap-3">
            //           <block.icon className="h-5 w-5 text-gray-600" />
            //           {sidebarOpen && (
            //             <span className="text-sm font-semibold uppercase">
            //               {block.name}
            //             </span>
            //           )}
            //         </div>
            //         {sidebarOpen && (
            //           <ChevronDownIcon
            //             className={`h-4 w-4 transition-transform ${
            //               preOpen ? "rotate-180" : ""
            //             }`}
            //           />
            //         )}
            //       </button>

            //       {preOpen && sidebarOpen && (
            //         <div className="ml-8 mt-1 space-y-1">
            //           {block.items.map((sub) => (
            //             <Link
            //               key={sub.path}
            //               to={sub.path}
            //               className={`flex justify-between px-3 py-2 rounded-md text-sm ${
            //                 isActive(sub.path)
            //                   ? "bg-gray-200 font-medium"
            //                   : "text-gray-600 hover:bg-gray-100"
            //               }`}
            //             >
            //               <span>{sub.name}</span>
            //               <span className="bg-gray-300 px-2 rounded-full text-xs">
            //                 {sub.count}
            //               </span>
            //             </Link>
            //           ))}
            //         </div>
            //       )}
            //     </div>
            //   );
            // }

            return null;
          })}
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* HEADER */}
        <header className="sticky top-0 bg-white border-b h-16 flex items-center px-8">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          <div className="flex items-center space-x-4">
            {/* <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button> */}

            <div className="relative flex items-center space-x-3 pl-4 border-l border-gray-200">
              <button
                onClick={() => {
                  // Remove all items from localStorage
                  localStorage.clear(); // Clears all data in localStorage

                  // Redirect to login page
                  window.location.href = "/admin/login"; // You can also use React Router for navigation
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ================= REUSABLE ITEM ================= */

const NavItem = ({ item, active, sidebarOpen }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
        active ? "bg-gray-200 font-medium" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-5 w-5 text-gray-600" />
      {sidebarOpen && <span>{item.name}</span>}
    </Link>
  );
};

export default AdminDashboardLayout;
