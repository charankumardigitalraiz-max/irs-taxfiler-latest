import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import AppDownload from '../../pages/Home/AppDownload';
import styles from '../Privacy/Privacy.module.css'; 
import { useSearchParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";

function Terms() {
  const [params] = useSearchParams();
  const isNavbarVisible = !params.get("type");

  return (
    <div>
      <Helmet>
        <title>Terms & Conditions | UpTik Investment Platform</title>
        <meta name="description" content="Review UpTik’s terms and conditions covering account usage, investment durations, returns, withdrawals, and platform policies." />
      </Helmet>
      {isNavbarVisible && <Navbar />}

      <section
        className={`${styles.AboutusheroSection} ${params.get("type") ? styles.mobilePadding : ""}`}
      >
        <h1>Terms and Conditions</h1>
      </section>

      <div className={styles.PrivacyContainer}>
        <h1 className={styles.PrivacyHeader}>Terms of Service</h1>
        <p className={styles.PrivacyText}>
          These Terms & Conditions (“Terms”) govern your access to and use of the website www.uptik.co.in (“Website”) operated by Growwcap Fintech Private Limited under the brand name UpTik (“UpTik”, “we”, “us”, or “our”). By accessing, browsing, registering, or interacting with this Website, you (“User”, “you”, or “your”) confirm that you have read, understood, and agree to be legally bound by these Terms, along with our Privacy Policy and Risk Disclosure Statement. If you do not agree to these Terms, you must not access or use the Website.
        </p>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>1. Legal Entity</h2>
          <p className={styles.PrivacyText}>
            UpTik is owned and operated by Growwcap Fintech Private Limited, a company incorporated under the Companies Act, 2013 (CIN: U62090TS2025PTC192664), with its registered office at Plot No.17, Kavuri Hills Road, Kakatiya Hills, Guttala Begumpet, No. 36 Extension, Jubilee Hills, Hyderabad, Telangana 500081.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>2. Nature of the Website</h2>
          <p className={styles.PrivacyText}>
            The Website functions solely as an informational and registration portal. It provides details regarding the UpTik platform and enables Users to:
            <ul>
              <li>Register their interest as potential investors (“Members”)</li>
              <li>Initiate onboarding for issuer partnerships (“Issuers”)</li>
              <li>Access publicly available information about invoice discounting as a product category</li>
            </ul>
            No investments, transactions, or financial commitments are executed on the Website. All investment-related activity, if any, occurs off-platform and through designated, secure channels post-verification.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>3. Eligibility and Registration</h2>
          <p className={styles.PrivacyText}>
            To register:
            <ul>
              <li>Members must submit accurate identity and contact information to express interest in becoming an investor.</li>
              <li>Issuers must initiate partnership discussions through designated contact forms or inquiry channels.</li>
            </ul>
            Submission of your data does not guarantee onboarding. UpTik reserves the sole right to approve, reject, or defer applications at its discretion.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>4. Account Access and Communication</h2>
          <p className={styles.PrivacyText}>
            By registering, you authorize UpTik to contact you via email, phone, or SMS regarding your registration, investment-readiness status, onboarding process, or platform updates. You may withdraw your consent at any time by writing to compliance@uptik.co.in.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>5. Permitted Use and Conduct</h2>
          <p className={styles.PrivacyText}>
            You agree to use the Website only for lawful and legitimate purposes. You shall not:
            <ul>
              <li>Provide false, misleading, or outdated information</li>
              <li>Attempt to breach or compromise the security of the Website</li>
              <li>Copy, reproduce, or misuse content from the Website</li>
              <li>Misrepresent your identity, affiliation, or eligibility</li>
              <li>Interfere with other Users’ experience or access</li>
            </ul>
            Any violation may result in immediate revocation of access and may attract legal consequences.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>6. Platform Rights</h2>
          <p className={styles.PrivacyText}>
            UpTik reserves the unconditional right to:
            <ul>
              <li>Modify, suspend, or discontinue any feature of the Website without prior notice</li>
              <li>Restrict or deny access to any User</li>
              <li>Monitor usage to maintain system integrity and compliance</li>
              <li>Share your submitted data with regulatory bodies or as permitted under our Privacy Policy</li>
            </ul>
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>7. Intellectual Property</h2>
          <p className={styles.PrivacyText}>
            All trademarks, logos, software, content, data structures, and layouts used on this Website are the exclusive intellectual property of UpTik or its licensors. You are granted a limited, revocable, non-exclusive license to access and use the Website for informational purposes only. You may not:
            <ul>
              <li>Copy, scrape, or commercially exploit any part of the Website</li>
              <li>Use UpTik’s brand assets without express written consent</li>
            </ul>
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>8. Third-Party Links</h2>
          <p className={styles.PrivacyText}>
            The Website may contain links to third-party websites for reference. UpTik is not responsible for their content, accuracy, or policies. Accessing such links is entirely at your own risk.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>9. Disclaimers</h2>
          <p className={styles.PrivacyText}>
            <ul>
              <li>The Website is provided on an “as is” and “as available” basis.</li>
              <li>UpTik makes no representations or warranties regarding Website availability, content accuracy, or performance.</li>
              <li>Nothing on this Website constitutes investment advice, an offer, or solicitation.</li>
              <li>Any expression of interest by you shall not be deemed as acceptance or confirmation of onboarding by UpTik.</li>
            </ul>
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>10. Indemnity</h2>
          <p className={styles.PrivacyText}>
            You agree to fully indemnify, defend, and hold harmless UpTik, its directors, officers, employees, and affiliates from any loss, liability, claim, or expense (including legal fees) arising from your:
            <ul>
              <li>Use or misuse of the Website</li>
              <li>Violation of these Terms</li>
              <li>Infringement of applicable laws or third-party rights</li>
            </ul>
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>11. Governing Law and Jurisdiction</h2>
          <p className={styles.PrivacyText}>
            These Terms shall be governed by and construed in accordance with the laws of India. All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>12. Amendments</h2>
          <p className={styles.PrivacyText}>
            UpTik reserves the right to update or amend these Terms at any time without prior notice. Updated Terms will be published on the Website and will be effective immediately upon publication. Continued use of the Website constitutes your acceptance of the revised Terms.
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>13. Miscellaneous</h2>
          <p className={styles.PrivacyText}>
            <ul>
              <li>No Agency: Nothing in these Terms shall be construed as creating any agency, partnership, or joint venture.</li>
              <li>Severability: If any provision is held unenforceable, the remainder shall continue in full force.</li>
              <li>Waiver: No waiver of any provision shall be deemed a waiver of any other provision or right.</li>
              <li>Entire Agreement: These Terms represent the full agreement governing your use of the Website.</li>
            </ul>
          </p>
        </div>

        <div className={styles.PrivacySection}>
          <h2 className={styles.PrivacySubHeader}>14. Acceptance</h2>
          <p className={styles.PrivacyText}>
            By accessing or using this Website, you irrevocably confirm your acceptance of these Terms in full.
          </p>
        </div>
      </div>
      <AppDownload />
      {isNavbarVisible && <Footer />}
    </div>
  );
}

export default Terms;