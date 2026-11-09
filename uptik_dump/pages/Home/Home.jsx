// HomePage.js
import React, { useState, useEffect } from "react";
import ModalForm from "./Homeform.jsx"; // Import the ModalForm component
import styles from "./Home.module.css";
import modalStyles from "./ModernModal.module.css";
import { IoMdClose } from "react-icons/io";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import heroBg from "../../assets/Home/Homebanner.png";
import bannersideimg from "../../assets/Home/banner_side_img.png";
import bannersideimgMobile from "../../assets/Home/banner_side_phone.png";
import SmartInvesting from "./SmartInvesting";
import Investment from "./Investment";
import Kyc from "./Kyc";
import HomeStrip from "./HomeStrip";
import ExpertTeam from "./ExpertTeam.jsx";
import ExpertsStrip from "./ExpertsStrip";
import Homefaqs from "./Homefaqs";
import AppDownload from "./AppDownload";
import { useNavigate } from "react-router-dom";
import InvestorJourney from "./InvestorJourney.jsx";

import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(sessionStorage.getItem("homemodal")==null ? true : false);
  console.log(sessionStorage.getItem("homemodal")==null)


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (modalIsOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [modalIsOpen]);

  const closeModal = () => {
    console.log("Closing modal...");
    setModalIsOpen(false);
    try {
      sessionStorage.setItem("homemodal", "closed");
    } catch (error) {
      console.warn("Could not save modal state to session storage:", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Short-Term Investment Platform in India | Secure Smart Returns | UpTik</title>
        <meta name="description" content="Invest smarter with UpTik’s secure short-term investment plans. Enjoy flexible durations, transparent returns, and a trusted platform for wealth growth." />
      </Helmet>
      <Navbar />
      <div className={styles.homePage__bannercontainer}>
        <section
          className={styles.homePage__heroSection}
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
          id="home"
        >
          <div className={styles.homePage__heroContent}>
            <div className={styles.homePage__textWrapper}>
              <h1>
                Smart Short-Term Investment Solutions for Faster Wealth Growth
              </h1>
              <p>
                Earn predictable returns starting with Invoice discounting -
                where real businesses meet real investments.
              </p>
              <button
                className={styles.homebtn}
                onClick={() =>
                  navigate("/register", { state: { scrollToForm: true } })
                }
              >
                Start Investing
              </button>
            </div>
            <div className={styles.homePage__imgWrapper}>
              <img
                className={styles.desktopImage}
                src={bannersideimg}
                alt="Investment Banner"
              />
              {/* Mobile version */}
              <img
                className={styles.mobileImage}
                src={bannersideimgMobile}
                alt="Investment Banner Mobile"
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>
        </section>
        <SmartInvesting />
        <Investment />
        <HomeStrip />
        <InvestorJourney />
        <Kyc />
        <ExpertsStrip />
        <ExpertTeam />
        <Homefaqs />
        <AppDownload />
        <Footer />
      </div>

      {/* Custom Modern Modal */}
      {modalIsOpen && (
        <div
          className={modalStyles.modalOverlay}
          onClick={closeModal}
        >
          <div
            className={modalStyles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={modalStyles.closeButton} onClick={closeModal} title="Close">
              <IoMdClose size={24} />
            </div>
            <ModalForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
