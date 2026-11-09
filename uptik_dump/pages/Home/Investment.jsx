import React from "react";
import styles from "./Investment.module.css";
import homework1 from "../../assets/Home/homework1.png";
import homework2 from "../../assets/Home/homework2.png";
import homework3 from "../../assets/Home/homework3.png";
import homework4 from "../../assets/Home/homework4.png";
import homework5 from "../../assets/Home/homework5.png";
import homework6 from "../../assets/Home/homework6.png";
import InvestorJourneyImg from "../../assets/Home/investorimg.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const investmentOptions = [
  {
    title: "Explore Alternative Investment Opportunities",
    description:
      "Access carefully vetted, high-yield investments, starting with invoice discounting. Every deal undergoes strict due diligence to ensure security and profitability.",
    icon: homework1,
  },
  {
    title: "Select Verified Investment Deals",
    description:
      "No speculation, no guesswork - just structured, data-backed opportunities. Choose investments that align with your goals, backed by robust risk analysis and financial security.",
    icon: homework2,
  },
  {
    title: "Invest with Confidence",
    description:
      "Your capital is deployed in structured deals with fixed maturity periods. No unnecessary lock-ins, just clear investment timelines and defined returns.",
    icon: homework3,
  },
  {
    title: "Track & Optimize in Real-Time",
    description:
      "With UpTik’s investor dashboard, you stay in control. Monitor investments, track returns, and manage your portfolio - all in one place.",
    icon: homework4,
  },
  {
    title: "Earn & Withdraw with Ease",
    description:
      "Once your investment matures, your returns are credited to your UpTik wallet. Simply raise a withdrawal request, and your earnings are seamlessly transferred to your bank account.",
    icon: homework5,
  },
  {
    title: "The Future of Alternative Investments",
    description:
      "UpTik is not just about invoice discounting - It’s a new way to build wealth. As we expand, expect diversified, high-yield opportunities designed for serious investors.",
    icon: homework6,
  },
];

const Investment = () => {
  return (
    <>
      <div className={styles.smartinvestment_container} name="works">
        <p className={styles.smartinvestment_subheading}>How It Works</p>
        <h2 className={styles.smartinvestment_heading}>
          Invest Smarter. Earn Faster.<br></br> Grow Without Limits.
        </h2>
        <p className={styles.faq_still_Para}>
          UpTik is more than just an investment platform - it’s a gateway to
          exclusive, high-yield<br></br>
          opportunities. Every investment is backed by real transactions,
          structured timelines,<br></br> and absolute transparency.
        </p>

        {/* Grid View (Visible on larger screens) */}
        <div className={styles.smartinvestment_grid}>
          {investmentOptions.map((option, index) => (
            <div key={index} className={styles.smartinvestment_card}>
              <div className={styles.smartinvestment_card_inner}>
                <div className={styles.smartinvestment_card_front}>
                  <span className={styles.smartinvestment_icon_container}>
                    <img
                      src={option.icon}
                      alt="Icon"
                      className={styles.smartinvestment_icon}
                    />
                  </span>
                  <h3 className={styles.smartinvestment_title}>
                    {option.title}
                  </h3>
                </div>
                <div className={styles.smartinvestment_card_back}>
                  <p
                    style={{
                      color: "white",
                      display: "flex",
                      textAlign: "justify",
                    }}
                    className={styles.smartinvestment_description}
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider View (Visible on screens <= 768px) */}
        <div className={styles.smartinvestment_resposive}>
          <Carousel showIndicators={true} autoPlay showStatus={false}>
            {investmentOptions.map((option, index) => (
              <div key={index} className={styles.smartinvestment_card}>
                <div className={styles.smartinvestment_card_inner}>
                  <div className={styles.smartinvestment_card_front}>
                    <span className={styles.smartinvestment_icon_container}>
                      <img
                        src={option.icon}
                        alt="Icon"
                        className={styles.smartinvestment_icon}
                      />
                    </span>
                    <h3 className={styles.smartinvestment_title}>
                      {option.title}
                    </h3>
                  </div>
                  <div className={styles.smartinvestment_card_back}>
                    <p
                      style={{
                        color: "white",
                        display: "flex",
                        textAlign: "justify",
                      }}
                      className={styles.smartinvestment_description}
                    >
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className={styles.InvestorJourneyStart}>
        
        <h4 className={styles.InvestorJourneyStart_heading}>
          What is invoice discounting ?
        </h4>
        <p>
          Invoice discounting allows businesses to unlock cash flow by selling
          unpaid invoices to investors at a discount. Investors earn returns
          when businesses settle these invoices—creating a secure, short-term
          investment opportunity.
        </p>
       
        <div className={styles.InvestorJourneyStart_Img}>
          <img
            src={InvestorJourneyImg}
            className={styles.InvestorJourneyStartImg}
          ></img>
        </div>

        {/* <div className={styles.InvestorJourneyStart_para}>
        <h4 className={styles.InvestorJourneyStart_heading}>What is invoice discounting ?</h4>
        <p>Invoice discounting allows businesses to unlock cash flow by selling
        unpaid invoices to investors at a discount. Investors earn returns
        when businesses settle these invoices—creating a secure, short-term
        investment opportunity.</p>
      </div>
      <div className={styles.InvestorJourneyStart_Img}>
        <img
          src={InvestorJourneyImg}
          className={styles.InvestorJourneyStartImg}
        ></img>
      </div> */}
      </div>
    </>
  );
};

export default Investment;
