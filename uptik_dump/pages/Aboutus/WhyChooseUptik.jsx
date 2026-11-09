import React from "react";
import styles from "./Aboutus.module.css";
import stocks from "../../assets/Home/stocks.png"; // Default or generic icon
import abouticon1 from "../../assets/Home/abouticon1.png";
import abouticon2 from "../../assets/Home/abouticon2.png";
import abouticon3 from "../../assets/Home/abouticon3.png";
import abouticon4 from "../../assets/Home/abouticon4.png";
import abouticon5 from "../../assets/Home/abouticon5.png";
import abouticon6 from "../../assets/Home/abouticon6.png";

const features = [
  {
    title: "Smarter Investment Strategies",
    description:
      "Gain access to carefully curated, high-yield investments backed by real business transactions. No speculation, no guesswork - just secure, data-driven investing.",
    icon: abouticon1, // Use specific icon for this feature
  },
  {
    title: "Effortless Investing, Maximum Control",
    description:
      "UpTik’s platform is designed for seamless investing. Track, manage, and optimise your portfolio effortlessly regardless of smaller or bigger investments.",
    icon: abouticon6, // Default stock icon for this feature
  },
  {
    title: "Secure, Verified, & Transparent",
    description:
      "Every opportunity undergoes multi-layered verification, legal screening, and financial due diligence to ensure absolute investor protection.",
    icon: abouticon2, // Specific icon for this feature
  },
  {
    title: "Expert Insights & Support",
    description:
      "Our team of investment professionals, risk analysts, and finance experts provide the insights you need to invest with confidence.",
    icon: abouticon3, // Specific icon for this feature
  },
  {
    title: "24/7 Portfolio Access & Real-Time Updates",
    description:
      "Your money should work for you, not the other way around. Monitor your investments anytime, anywhere with real-time analytics and performance tracking.",
    icon: abouticon4, // Specific icon for this feature
  },
  {
    title: "Growth Simplified - Invest with Confidence",
    description:
      "At UpTik, we don’t believe in complexity. We believe in smart, structured investing that puts your financial growth first.",
    icon: abouticon5, // Specific icon for this feature
  },
];

function WhyChooseUpTik() {
  return (
    <section className={styles.responsiveContainer}>
      <h2 className={styles.responsiveTitle}>Why Choose UpTik?</h2>
      <p>Because real investing starts with real opportunities.</p>
      <div className={styles.responsiveGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.responsiveCard}>
            <div className={styles.responsiveIcon}>
              <img src={feature.icon} alt="Icon" />
            </div>
            <h3 className={styles.responsiveCardTitle}>{feature.title}</h3>
            <p className={styles.responsiveCardDescription}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUpTik;
