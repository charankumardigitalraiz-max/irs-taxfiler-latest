import React from "react";
import styles from "./Home.module.css";
import sectionImg from "../../assets/Home/Home_section2.png";
import { useNavigate } from "react-router-dom";

const SmartInvesting = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.Smartcontainer}>
      {/* Left Side - Image */}
      <div className={styles.SmartimageWrapper}>
        <img
          src={sectionImg}
          alt="Investment Analysis"
          className={styles.Smartimage}
        />
      </div>

      {/* Right Side - Content */}
      <div className={styles.Smartcontent}>
        <p className={styles.Smartsubtitle}>Smart Investing</p>
        <h2 className={styles.Smartheading}>
          Wealth Without the Complexity. Growth Without the Uncertainty.
        </h2>
        <p className={styles.Smartdescription}>
          Investing should be effortless. At UpTik, we eliminate speculation and
          bring you high-yield opportunities backed by real transactions and
          absolute transparency. No market swings. No guesswork. Just secure,
          data-driven investing that puts you in control.
        </p>

        {/* Progress Bars */}
        <div className={styles.SmartprogressContainer}>
          <div className={styles.SmartprogressItem}>
            <p className={styles.SmartprogressText}>
              0% Zero Speculation. Only Real-World Investments.
            </p>
            <div className={styles.SmartprogressBar}>
              <div className={styles.SmartprogressFill}></div>
            </div>
          </div>
          <div className={styles.SmartprogressItem}>
            <p className={styles.SmartprogressText}>
              0% Zero Market Volatility. Only Predictable Growth.
            </p>
            <div className={styles.SmartprogressBar}>
              <div className={styles.SmartprogressFill}></div>
            </div>
          </div>
          <div className={styles.SmartprogressItem}>
            <p className={styles.SmartprogressText}>
              0% Zero Hidden Fees. Only Complete Transparency.
            </p>
            <div className={styles.SmartprogressBar}>
              <div className={styles.SmartprogressFill}></div>
            </div>
          </div>
        </div>
        <p className={styles.Smartdescription}>
          Whether you’re looking to grow your wealth or diversify your
          portfolio, UpTik redefines investing - simplified, secure, and built
          for the future.
        </p>

        {/* Button */}
        <button onClick={() => navigate('/aboutus', {state: {scrollToForm: true}})} className={styles.Smartbutton}>Discover More</button>
      </div>
    </section>
  );
};

export default SmartInvesting;
