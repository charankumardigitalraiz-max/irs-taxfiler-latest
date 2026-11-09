import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Aboutus.module.css";
import sectionImg from "../../assets/Home/Home_section1.png";
import bout from "../../assets/Home/aboutus.png";
import WhyChooseUpTik from "./WhyChooseUptik";
import AppDownload from "../Home/AppDownload";
import ExpertTeam from "../Home/ExpertTeam";
import Strip from "./Strip";
import WhyUpTikStrip from "../Home/WhyuptikStrip";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function Aboutus() {
  const [params] = useSearchParams();
  const isNavbarVisible = !params.get("type");

  return (
    <div>
      <Helmet>
        <title>About UpTik | Trusted Short-Term Investment Platform in India</title>
        <meta name="description" content="Learn about UpTik, a trusted platform focused on secure short-term investment solutions designed to help individuals grow wealth with confidence." />
      </Helmet>
      {isNavbarVisible && <Navbar />}
      {/* <section className={styles.AboutusheroSection}>
        <h1>Creating Wealth. Securing Futures.</h1>
      </section> */}

      <section
        className={`${styles.AboutusheroSection} ${params.get("type") ? styles.mobilePadding : ""}`}
      >
        <h1>Creating Wealth. Securing Futures.. </h1>
      </section>


      <section className={styles.AboutuscontentSection}>
        <div className={styles.AboutusimageContainer}>
          <img src={sectionImg} alt="Investment Growth" />
        </div>
        <div className={styles.AboutustextContainer}>
          <h5>ABOUT US</h5>
          <h2>Trust. Growth. Financial Freedom - Simplified.</h2>
          <p>
            Investing isn’t just about numbers. It’s about trust, security, and
            taking control of your financial future. At UpTik, we remove
            complexity and replace it with clarity, confidence, and high-yield
            opportunities.
          </p>
          <p>
            Traditional markets come with volatility and speculation. We believe
            in secure, structured investments that offer predictable returns.
            With invoice discounting as our first offering, UpTik is pioneering
            a better, smarter way to grow your wealth.
          </p>
          <p>
            No market swings. No hidden risks. Just smart, secure investing.
          </p>
        </div>
      </section>

      <section className={styles.AboutuscontentSectionReverse}>
        <div className={styles.AboutustextContainer}>
          <h2>Who We Are</h2>
          <p>Redefining Alternative Investments. Empowering Investors.</p>
          <p>
            UpTik is more than just an investment platform—it’s a vision-driven
            company reshaping alternative investments with trust, transparency,
            and innovation.
          </p>
          <ul>
            <li>
              <b>Our Mission:</b> To unlock secure, high-yield investment
              opportunities for investors of all levels through rigorous due
              diligence, technology-driven security, and investor-first
              principles.
            </li>
            <li>
              <b>Our Vision:</b> To become India’s most trusted alternative
              investment platform, offering seamless access to
              institutional-grade opportunities beyond traditional markets.
              Built by Experts, Backed by Experience.
            </li>
          </ul>
          <h3>Built by Experts, Backed by Experience</h3>
          <p>
            Our team brings decades of expertise in finance, risk management,
            technology, and digital growth, ensuring a seamless, secure, and
            high-return investment experience.
          </p>
          <ul>
            <li>
              <b>Trust & Transparency:</b> Every deal is fully verified,
              risk-assessed, and legally structured.
            </li>
            <li>
              <b>Designed for Smart Investors:</b> Whether HNIs, institutions,
              or retail investors, UpTik offers curated, high-yield deals with
              absolute clarity.
            </li>
            <li>
              <b>Scaling Beyond Invoice Discounting:</b> Starting with invoice
              discounting, expanding into corporate bonds, startup investments,
              and more.
            </li>
          </ul>
          <p>
            We don’t just facilitate investments—we create a future of financial
            confidence. Welcome to UpTik.
          </p>
        </div>
        <div className={styles.AboutusimageContainer}>
          <img src={bout} alt="Business Meeting" />
        </div>
      </section>

      <Strip />
      <WhyChooseUpTik />
      <WhyUpTikStrip />
      {/* <ExpertTeam /> */}
      <AppDownload />
      {isNavbarVisible && <Footer />}
    </div>
  );
}

export default Aboutus;
