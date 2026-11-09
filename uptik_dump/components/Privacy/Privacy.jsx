import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AppDownload from '../../pages/Home/AppDownload';
import styles from './Privacy.module.css';
import { useSearchParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";

function Privacy() {
  const [params] = useSearchParams();
  const isNavbarVisible = !params.get("type");

  return (
    <div>
      <Helmet>
        <title>Privacy Policy | UpTik Short-Term Investment Platform</title>
        <meta name="description" content="Read UpTik’s privacy policy to understand how we collect, use, protect, and manage your personal and investment-related information securely." />
      </Helmet>
      {isNavbarVisible && <Navbar />}
      
      <section
        className={`${styles.AboutusheroSection} ${params.get("type") ?  styles.mobilePadding:""}`}
      >
        <h1>Your Privacy Matters to Us</h1>
      </section>

      <div className={styles.PrivacyContainer}>
        <h1 className={styles.PrivacyHeader}>Privacy Policy</h1>
        <p className={styles.PrivacyText}>At UpTik, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you access our platform or use our services.</p>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>1. Information We Collect</h2>
          <p className={styles.PrivacyText}>We may collect the following types of information:</p>
          <ul className={styles.PrivacyList}>
            <li className={styles.PrivacyListItem}><strong>Personal Information:</strong> Name, email address, phone number, date of birth, and other information you provide during registration.</li>
            <li className={styles.PrivacyListItem}><strong>Financial Information:</strong> Details of your investments, transactions, and payment information.</li>
            <li className={styles.PrivacyListItem}><strong>Usage Data:</strong> Information about how you use the UpTik platform, including device information, IP address, browser type, and operating system.</li>
          </ul>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>2. How We Use Your Information</h2>
          <p className={styles.PrivacyText}>We use the collected data to:</p>
          <ul className={styles.PrivacyList}>
            <li className={styles.PrivacyListItem}>Provide, maintain, and improve our services.</li>
            <li className={styles.PrivacyListItem}>Process your transactions and investments.</li>
            <li className={styles.PrivacyListItem}>Communicate with you regarding your account and updates.</li>
            <li className={styles.PrivacyListItem}>Personalize your experience and offer relevant recommendations.</li>
            <li className={styles.PrivacyListItem}>Comply with legal and regulatory obligations.</li>
          </ul>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>3. How We Protect Your Data</h2>
          <p className={styles.PrivacyText}>Your data is protected through industry-standard encryption and security measures. We ensure that your personal and financial information is stored securely, and only authorized personnel can access it.</p>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>4. Sharing Your Information</h2>
          <p className={styles.PrivacyText}>We do not sell, rent, or trade your personal data. However, we may share your information with trusted third-party service providers, financial institutions, or regulatory bodies when necessary to provide our services or comply with legal obligations.</p>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>5. Cookies and Tracking Technologies</h2>
          <p className={styles.PrivacyText}>We use cookies and similar technologies to enhance your experience and analyze usage patterns. You can control cookie preferences through your browser settings, but disabling cookies may affect some features of the platform.</p>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>6. Data Retention</h2>
          <p className={styles.PrivacyText}>We retain your data for as long as necessary to provide our services or as required by law. Once your data is no longer needed, it will be securely deleted or anonymized.</p>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>7. Your Rights & Choices</h2>
          <p className={styles.PrivacyText}>You have the right to access, update, or delete your personal data. You can also manage your communication preferences and opt out of marketing communications at any time.</p>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>8. Governing Law & Dispute Resolution</h2>
          <p className={styles.PrivacyText}>This Privacy Policy is governed by applicable laws. In case of disputes, we encourage you to contact us first to resolve any concerns.</p>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>9. Changes to This Privacy Policy</h2>
          <p className={styles.PrivacyText}>We may update this Privacy Policy from time to time. Any changes will be communicated through the platform or via email. We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
        </div>
        
        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>10. Electronic Communication</h2>
          <p className={styles.PrivacyText}>When you voluntarily send us electronic mail / fillup the form, we will keep a record of this information so that we can respond to you. We only collect information from you when you register on our site or fill out a form. Also, when filling out a form on our site, you may be asked to enter your: name, e-mail address or phone number. You may, however, visit our site anonymously. In case you have submitted your personal information and contact details, we reserve the rights to Call, SMS, Email or WhatsApp about our products and offers, even if your number has DND activated on it.</p>
        </div>
      </div>
      
      <AppDownload />
      {isNavbarVisible && <Footer />}
    </div>
  );
}

export default Privacy;
