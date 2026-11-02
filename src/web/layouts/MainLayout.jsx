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
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WelcomeDialog />
      <FloatingWhatsApp />
    </div>
  );
};

export default MainLayout;

