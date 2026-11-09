import React from "react";
import "../Aboutus/Strip.css";
import investmentImg from "../../assets/23582693_2105.i201.005.S.m004.c13.financial education literacy isometric 1.png"; // Replace with your actual image path
import { useNavigate } from "react-router-dom";

const WhyUpTikStrip = () => {
    const navigate = useNavigate(); 
    return (
        <div className="strip-container">
            <div className="strip-content">
                {/* <img src={investmentImg} alt="Investment Illustration" className="strip-image" /> */}
                <div style={{ display: 'flex' }} className="strip-text">
                    <h2>
                    The future of investing starts now. Take control today. 
                    </h2>
                    <button
                        style={{
                            // height: "40px",
                            // width: "300px",
                            margin: "auto",
                            borderRadius: "8px",
                            padding: "12px", 
                            cursor: "pointer",
                            background: "#fff",
                            color: "#6ABB57",
                            border: "none",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        Secure Your Investment with UpTik
                    </button>

                </div>
            </div>
        </div>
    );
};

export default WhyUpTikStrip;
