import React from "react";
import styles from "./Home.module.css";
import googlePlay from "../../assets/Home/playstore.png";
import appStore from "../../assets/Home/appstore.png";
import phoneMockup from "../../assets/Home/phonemarkup.png";

const AppDownload = () => {
  return (
    <section className={styles.appDownload}>
      <div className={styles.AppDownloadcontent}>
        <h2>
          Stay Connected With <span className={styles.AppDownloadhighlight}>UpTik</span> Anytime, Anywhere
        </h2>
        <p>
          Download the UpTik App on Android or iOS and take control of your investments effortlessly.
          Track your portfolio, explore new opportunities, and make informed financial decisions—all at your fingertips.
        </p>
        <div className={styles.AppDownloadbuttons}>
          <a href="https://play.google.com/store/apps/details?id=com.uptik.user&hl=en&pli=1"><img src={googlePlay} alt="Google Play" className={styles.AppDownloadstoreButton} /></a>
          <a href="https://apps.apple.com/in/app/uptik-growth-simplified/id6748020482">

            <img src={appStore} alt="App Store" className={styles.AppDownloadstoreButton} />
          </a>

        </div>
      </div>
      <div className={styles.AppDownloadimage}>
        <img src={phoneMockup} alt="UpTik App" className={styles.AppDownloadmockup} />
      </div>
    </section>
  );
};

export default AppDownload;
