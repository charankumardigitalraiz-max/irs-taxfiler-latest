import React from "react";
import styles from "./Home.module.css";
import offer1 from "../../assets/Home/offer1.png";
import offer2 from "../../assets/Home/offer2.png";
import offer3 from "../../assets/Home/offer3.png";
import offer4 from "../../assets/Home/offer4.png";
import offer5 from "../../assets/Home/offer5.png";
import offer6 from "../../assets/Home/offer6.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Kyc = () => {
  const financialFeatures = [
    {
      id: 1,
      title: "Personalized Investment Plans",
      description:
        "Investing isn’t one-size-fits-all. UpTik offers curated investment opportunities, starting with invoice discounting, ensuring that your capital is allocated to verified, high-growth deals that match your goals.",
      image: offer1,
    },
    {
      id: 2,
      title: "Expert Financial Advice",
      description:
        "Make informed investment decisions with UpTik’s data-driven insights and risk assessment tools. We provide all the necessary information and expert guidance to help you invest smarter and earn confidently.",
      image: offer2,
    },
    {
      id: 3,
      title: "Flexible Investment Options",
      description:
        "With structured investment cycles, UpTik allows you to diversify and reinvest efficiently without lock-ins. Whether you’re looking for steady returns or high-yield opportunities, our platform offers dynamic investment choices.",
      image: offer3,
    },
    {
      id: 4,
      title: "Seamless Transactions",
      description:
        "From investment to earnings, UpTik ensures a frictionless experience. Your returns are credited to your UpTik wallet, and you can initiate a withdrawal request anytime for seamless fund transfers.",
      image: offer4,
    },
    {
      id: 5,
      title: "Risk Management Tools",
      description:
        "UpTik’s multi-layered verification, legal screening, and financial due diligence ensure that every investment is secure and fraud-protected. Our platform is built on trust and data-backed decision-making.",
      image: offer5,
    },
    {
      id: 6,
      title: "Transparent Reporting",
      description:
        "Know exactly where your money is and how it’s growing. With real-time portfolio tracking, detailed investment reports, and performance insights, UpTik ensures complete transparency at every step.",
      image: offer6,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds delay for auto scroll
  };

  return (
    <div className={styles.investmentcontainer}>
      {/* Financial Features Section */}
      <div className={styles.financialsection}>
        <p className={styles.financialtitle}>What We Offer</p>
        <h2 className={styles.financialheading}>
          Achieve Financial Freedom <br></br>Through Smart Investments
        </h2>
        <p className={styles.faq_still_Para}>
          UpTik makes investing seamless, secure, and high-yield with a focus on
          transparency,<br></br> risk management, and long-term wealth creation.
        </p>
        <div className={styles.financialfeatures}>
          {financialFeatures.map((feature) => (
            <div key={feature.id} className={styles.financialfeatures_card}>
              <div key={feature.id} className={styles.financial_card_inner}>
                <div className={styles.financialfeatures_card_front}>
                  <span className={styles.financialicon}>
                    <img src={feature.image} alt={feature.title} />
                  </span>
                  <p className={styles.financialfeaturetitle}>
                    {feature.title}
                  </p>
                </div>
                <div className={styles.financialfeatures_card_back}>
                  <p className={styles.financialfeaturetext}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.financialfeatures_resposive}>
          <Slider {...settings}>
            {financialFeatures.map((feature) => (
              <div key={feature.id} className={styles.financialfeatures_card}>
                <div key={feature.id} className={styles.financial_card_inner}>
                  <div className={styles.financialfeatures_card_front}>
                    <span className={styles.financialicon}>
                      <img src={feature.image} alt={feature.title} />
                    </span>
                    <p className={styles.financialfeaturetitle}>
                      {feature.title}
                    </p>
                  </div>
                  <div className={styles.financialfeatures_card_back}>
                    <p className={styles.financialfeaturetext}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
