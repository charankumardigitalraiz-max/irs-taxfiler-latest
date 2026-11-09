import React, { useState } from "react";
import {
  HeroBanner,
  TaxFilingServices,
  WhyChooseSection,
  StatsSection,
  TestimonialsSection,
  CTASection,
  FAQSection,
} from "../components/home";
import LeadModal from "../components/popup";
import SEO from "../components/seo/SEO";
import Logo from "../assets/irsLogo.png";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const title = "U.S. Federal & State Tax Filing | CPA-Reviewed | IRS Tax Filer";
  const description =
    "File your U.S. federal and state tax returns online with certified CPA guidance. Guaranteed maximum refund, 100% IRS accuracy, Form 1040, W-2, 1099, and expat compliance.";
  const keywords =
    "US tax filing, IRS tax return, federal tax return, state tax return, Form 1040, expat tax service, Form 1040-NR, FBAR FATCA, CPA tax preparation, IRS Tax Filer";
  const canonical = window.location.href;
  const image = Logo;

  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image={image}
        keywords={keywords}
      />

      {/* 1. Hero Fold & Animated Compliance Badges */}
      <HeroBanner onOpenModal={handleOpenModal} />

      {/* 2. Interactive Tax Filing Services Categories & Cards */}
      <TaxFilingServices onOpenModal={handleOpenModal} />

      {/* 3. Why Choose Our Tax Team (Connected Architecture) */}
      <WhyChooseSection onOpenModal={handleOpenModal} />

      {/* 4. Statistics with Smooth Animated Counters */}
      <StatsSection />

      {/* 5. Verified Client Testimonials Deck */}
      <TestimonialsSection />

      {/* 6. Ready to File CTA Banner */}
      <CTASection onOpenModal={handleOpenModal} />

      {/* 7. Frequently Asked Questions */}
      {/* <FAQSection onOpenModal={handleOpenModal} /> */}

      {/* Lead Generation Modal */}
      <LeadModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
