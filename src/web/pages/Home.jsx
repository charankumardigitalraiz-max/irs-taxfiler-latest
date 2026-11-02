import HeroSection from '../components/HeroSection';
import FAQSection from '../components/FAQSection';
import SEO from '../components/seo/SEO';
import Logo from '../assets/irsLogo.png';

const Home = () => {

  const title = "US Tax Filing for Expats & NRIs | IRS Tax Filer";
  const description = "File your U.S. federal tax return online — fast, secure, and hassle-free. IRS Tax Filer helps expats & NRIs submit ITR from anywhere in the world. Get started today!";
  const keywords = "US tax filing, IRS tax return, NRI tax filing, expat tax service, online ITR filing, U.S. income tax return, IRS Tax Filer,form 1040nr";
  const canonical = window.location.href;
  const image = { Logo };
  return (

    <div>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />
      <HeroSection />
      <FAQSection />
    </div>
  );
};

export default Home;

