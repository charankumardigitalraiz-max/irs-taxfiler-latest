import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WelcomeDialog from '../components/WelcomeDialog';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import '../index.css';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Global layout offset: reserves header height (64px / pt-16) so page content naturally starts below navbar everywhere */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <WelcomeDialog />
      <FloatingWhatsApp />
    </div>
  );
};

export default MainLayout;

