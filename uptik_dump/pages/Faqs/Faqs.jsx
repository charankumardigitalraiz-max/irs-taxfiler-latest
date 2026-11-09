import React from "react";
import FAQ from "../Home/Homefaqs";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AppDownload from "../Home/AppDownload";
import styles from "./Faqs.module.css"
import ExpertsFaqs from "../Home/ExpertsFaqs";

import { Helmet } from "react-helmet-async";

function Faqs() {
  return (
    <div>
      <Helmet>
        <title>UpTik FAQs | Short-Term Investment Plans, Returns & Safety</title>
        <meta name="description" content="Find answers to common questions about UpTik’s short-term investment plans, returns, safety, withdrawals, and account management." />
      </Helmet>
      <Navbar/>
      <section className={styles.AboutusheroSection}>
        <h1>Everything You Need to Know About UpTik</h1>
      </section>
      <FAQ />
      {/* <ExpertsFaqs/> */}
      <AppDownload/>
      <Footer />
    </div>
  );
}

export default Faqs;
