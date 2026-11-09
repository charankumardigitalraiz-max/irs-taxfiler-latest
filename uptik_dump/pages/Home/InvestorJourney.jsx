import React from "react";
import Style from "./InvestorJourney.module.css";
import InvestorJourneyImg from "../../assets/Home/investorimg.png";
import kyc from "../../assets/Home/kyc.png";
import Invoice from "../../assets/Home/invoice.png";
import withdraw from "../../assets/Home/withdraw.png";
import trust from "../../assets/Home/whytrust.png";

function InvestorJourney() {
  return (
    <div>
    

      <div className={Style.InvestorJourneycenter}>
        <h5>Investor Journey in 3 Simple Steps</h5>
        <p className={Style.InvestorJourneycenter_p}>How to Invest with UpTik</p>

        <div className={Style.InvestorJourneycenter_box}>
          <div className={Style.InvestorJourney_box_step}>
            <span>Step-1</span>
          </div>
          <div className={Style.InvestorJourney_box_text}>
            <h6>Sign Up & KYC – </h6>
            <p>Quick, hassle-free onboarding</p>
          </div>
          <div className={Style.InvestorJourney_box_Img}>
            <img
              src={kyc}
              className={Style.InvestorJourneycenterImg}
              alt="KYC"
            />
          </div>
        </div>

        <div className={Style.InvestorJourneycenter_box}>
          <div className={Style.InvestorJourney_box_step}>
            <span>Step-2</span>
          </div>
          <div className={Style.InvestorJourney_box_text}>
            <h6>Choose Verified Invoices</h6>
            <p>Invest in secured, vetted deals</p>
          </div>
          <div className={Style.InvestorJourney_box_Img}>
            <img
              src={Invoice}
              className={Style.InvestorJourneycenterImg}
              alt="Invoices"
            />
          </div>
        </div>

        <div className={Style.InvestorJourneycenter_box}>
          <div className={Style.InvestorJourney_box_step}>
            <span>Step-3</span>
          </div>
          <div className={Style.InvestorJourney_box_text}>
            <h6>Earn & Withdraw</h6>
            <p>Returns hit your UpTik wallet, withdraw anytime.</p>
          </div>
          <div className={Style.InvestorJourney_box_Img}>
            <img
              src={withdraw}
              className={Style.InvestorJourneycenterImg}
              alt="Withdraw"
            />
          </div>
        </div>
      </div>

      <div className={Style.whyTrustUsContainer}>
      <div className={Style.content}>
        <h2 className={Style.title}> <span>Why</span> Trust Us?</h2>
        <p className={Style.subtitle}>Investor Security is Our Priority</p>
        
        <div className={Style.featureList}>
          <div className={Style.featureItem}>
            <h3>100% Verified Transactions</h3>
            <p>Every deal undergoes multi-layered risk checks.</p>
          </div>
          <div className={Style.featureItem}>
            <h3>UpTik Assured Plus Protection</h3>
            <p>Investors in select deals are secured from defaults.</p>
          </div>
          <div className={Style.featureItem}>
            <h3>Regulatory Compliance</h3>
            <p>Built with transparency & investor-first policies.</p>
          </div>
        </div>
      </div>

      <div className={Style.logoContainer}>
        <img src={trust} alt="UpTik Logo" className={Style.whyTrustUsContainerlogo} />
      </div>
    </div>
    </div>
  );
}

export default InvestorJourney;
