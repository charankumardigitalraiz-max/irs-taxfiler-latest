import { Routes, Route, Navigate } from 'react-router-dom';

// ============================================
// CLIENT PORTAL IMPORTS
// ============================================
import ClientLogin from './client/pages/auth/Login';
import ClientVerifyOTP from './client/pages/auth/VerifyOTP';
import ClientRegister from './client/pages/auth/Register';
import ClientDashboard from './client/pages/Dashboard';
import ClientAboutIRS from './client/pages/AboutIRS';
import ClientDocuments from './client/pages/Documents';
import ClientTaxDraft from './client/pages/TaxDraft';
import ClientSchedule from './client/pages/Schedule';
import ClientPayments from './client/pages/Payments';
import ClientFiling from './client/pages/Filing';
import ClientTaxSummary from './client/pages/TaxSummary';
import ClientTaxRefund from './client/pages/TaxRefund';
import ClientFinalReports from './client/pages/FinalReports';
import ClientReferrals from './client/pages/Referrals';
import ClientProfile from './client/pages/Profile';
import ClientAccountInformation from './client/pages/AccountInformation';
import ClientSettings from './client/pages/Settings';
import ClientSupport from './client/pages/Support';
import ClientPolicies from './client/pages/Policies';
import ClientDashboardLayout from './client/layouts/DashboardLayout';
import ClientProtectedRoute from './client/routes/ProtectedRoute';
import ClientRootRedirect from './client/routes/RootRedirect';

// ============================================
// ADMIN PANEL IMPORTS
// ============================================
import AdminLayout from './admin/components/layout/AdminLayout';
import AdminLogin from './admin/pages/auth/Login';
import AdminRegister from './admin/pages/auth/Register';
import AdminProtectedRoute from './admin/routes/ProtectedRoute';
import AdminDashboard from './admin/pages/Dashboard';
import UserList from './admin/pages/users/UserList';
import UserDetail from './admin/pages/users/UserDetail';
import Meetings from './admin/pages/scheduling/Meetings';
import AdminDocuments from './admin/pages/documents/Documents';
import Email from './admin/pages/emailtemplates/Email';
import TaxPreparation from './admin/pages/preparation/TaxPreparation';
import AdminPayments from './admin/pages/payments/Payments';
import AdminFiling from './admin/pages/filing/Filing';
import AuditLogs from './admin/pages/audit/AuditLogs';
import StaffManagement from './admin/pages/settings/StaffManagement';
import RolesPermissions from './admin/pages/settings/RolesPermissions';
import ProfileSettings from './admin/pages/settings/ProfileSettings';
import ContentSettings from './admin/pages/settings/ContentSettings';
import AdminSupport from './admin/pages/support/Support';
import Coupons from './admin/pages/coupons/Coupons';
import AdminReferrals from './admin/pages/referrals/Referrals';
import FormsList from './admin/pages/forms/FormsList';

// ============================================
// WEB (PUBLIC SITE) IMPORTS
// ============================================
import ScrollToTop from './web/components/ScrollToTop';
import MainLayout from './web/layouts/MainLayout';
import Home from './web/pages/Home';
import About from './web/pages/About';
import Services from './web/pages/Services';
import Contact from './web/pages/Contact';
import Pricing from './web/pages/Pricing';
import TaxResources from './web/pages/TaxResources';
import CustomerSupport from './web/pages/CustomerSupport';
import FederalStateLocal from './web/pages/services/FederalStateLocal';
import FBARFATCA from './web/pages/services/FBARFATCA';
import Representation from './web/pages/services/Representation';
import ITIN from './web/pages/services/ITIN';
import Extension from './web/pages/services/Extension';
import Incorporations from './web/pages/services/Incorporations';
import SMBTaxFiling from './web/pages/services/SMBTaxFiling';
import IndianTaxFiling from './web/pages/services/IndianTaxFiling';
import IndianRepresentation from './web/pages/services/IndianRepresentation';
import Referrals from './web/pages/Referrals';
import Terms from './web/pages/Terms';
import Privacy from './web/pages/Privacy';
import GLBA from './web/pages/GLBA';
import DoNotSell from './web/pages/DoNotSell';
import Security from './web/pages/Security';

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ============================================
            WEB (PUBLIC SITE) ROUTES
            ============================================ */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />

          {/* US Individual Services */}
          <Route path="services/us-individual/federal-state-local" element={<FederalStateLocal />} />
          <Route path="services/us-individual/fbar-fatca" element={<FBARFATCA />} />
          <Route path="services/us-individual/representation" element={<Representation />} />
          <Route path="services/us-individual/itin" element={<ITIN />} />
          <Route path="services/us-individual/extension" element={<Extension />} />

          {/* US Business Services */}
          <Route path="services/us-business/incorporations" element={<Incorporations />} />
          <Route path="services/us-business/smb-tax-filing" element={<SMBTaxFiling />} />

          {/* Indian Services */}
          <Route path="services/indian/tax-filing" element={<IndianTaxFiling />} />
          <Route path="services/indian/representation" element={<IndianRepresentation />} />

          {/* Other Pages */}
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="tax-resources" element={<TaxResources />} />
          <Route path="referrals" element={<Referrals />} />
          <Route path="help/support" element={<CustomerSupport />} />
          <Route path="help/contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="glba" element={<GLBA />} />
          <Route path="do-not-sell" element={<DoNotSell />} />
          <Route path="security" element={<Security />} />
        </Route>

        {/* ============================================
            CLIENT PORTAL ROUTES
            ============================================ */}
        {/* Public Auth Routes */}
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/client/verify-otp" element={<ClientVerifyOTP />} />
        <Route path="/client/register" element={<ClientRegister />} />
        <Route path="/register" element={<ClientRegister />} />

        {/* Protected Client Dashboard Routes */}
        <Route
          path="/client/dashboard"
          element={
            <ClientProtectedRoute>
              <ClientDashboardLayout />
            </ClientProtectedRoute>
          }
        >
          <Route index element={<ClientDashboard />} />
          <Route path="about-irs-tax-filer" element={<ClientAboutIRS />} />
          <Route path="documents" element={<ClientDocuments />} />
          <Route path="tax-draft" element={<ClientTaxDraft />} />
          <Route path="schedule" element={<ClientSchedule />} />
          <Route path="payments" element={<ClientPayments />} />
          <Route path="filing" element={<ClientFiling />} />
          <Route path="tax-summary" element={<ClientTaxSummary />} />
          <Route path="tax-refund" element={<ClientTaxRefund />} />
          <Route path="final-reports" element={<ClientFinalReports />} />
          <Route path="referrals" element={<ClientReferrals />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="account-information" element={<ClientAccountInformation />} />
          <Route path="settings" element={<ClientSettings />} />
          <Route path="policies" element={<ClientPolicies />} />
          <Route path="support" element={<ClientSupport />} />
        </Route>

        {/* ============================================
            ADMIN PANEL ROUTES
            ============================================ */}
        {/* Public Admin Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Protected Admin Dashboard Routes */}
        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />

          {/* User Management */}
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/registered" element={<UserList userType="registered" />} />
          <Route path="/admin/users/verified" element={<UserList userType="verified" />} />
          <Route path="/admin/users/unverified" element={<UserList userType="unverified" />} />
          <Route path="/admin/users/:id" element={<UserDetail />} />

          {/* Scheduling */}
          <Route path="/admin/scheduling" element={<Meetings />} />

          {/* Documents */}
          <Route path="/admin/documents" element={<AdminDocuments />} />
          {/* Documents */}
          <Route path="/admin/emailtemplates" element={<Email />} />

          {/* Tax Preparation */}
          <Route path="/admin/preparation" element={<TaxPreparation />} />

          {/* Payments */}
          <Route path="/admin/payments" element={<AdminPayments />} />

          {/* Filing */}
          <Route path="/admin/filing" element={<AdminFiling />} />

          {/* Audit */}
          <Route path="/admin/audit" element={<AuditLogs />} />

          {/* Support */}
          <Route path="/admin/support" element={<AdminSupport />} />

          {/* Coupons */}
          <Route path="/admin/coupons" element={<Coupons />} />

          {/* Referrals */}
          <Route path="/admin/referrals" element={<AdminReferrals />} />

          {/* Forms */}
          <Route path="/admin/forms/:formType" element={<FormsList />} />

          {/* Settings */}
          <Route path="/admin/settings/profile" element={<ProfileSettings />} />
          <Route path="/admin/settings/team" element={<StaffManagement />} />
          <Route path="/admin/settings/roles" element={<RolesPermissions />} />
          <Route path="/admin/settings/content" element={<ContentSettings />} />
        </Route>

        {/* ============================================
            REDIRECTS & CATCH-ALL
            ============================================ */}
        <Route path="/client" element={<ClientRootRedirect />} />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
