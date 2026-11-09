import React from "react";
import "./Strip.css";
import investmentImg from "../../assets/23582693_2105.i201.005.S.m004.c13.financial education literacy isometric 1.png"; // Replace with your actual image path

const Strip = () => {
  return (
    <div className="strip-container">
      <div className="strip-content">
        <img src={investmentImg} alt="Investment Illustration" className="strip-image" />
        <div className="strip-text">
          <h2>
            We don’t just offer investments - we offer <span>clarity, control, and confidence.</span>
          </h2>
          <p>Welcome to the future of alternative investing.</p>
        </div>
      </div>
    </div>
  );
};

export default Strip;
