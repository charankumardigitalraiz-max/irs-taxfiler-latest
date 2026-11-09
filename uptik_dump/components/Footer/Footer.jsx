import React from "react";
import style from "./Footer.module.css"; // Import the CSS module
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import logoUpTik from "../../assets/footerlogo.png";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style["footer-container"]}>
        {/* Left Section */}
        <div className={style["footer-left"]}>
          <h2 className={style["footer-logo"]}>
            <img src={logoUpTik} alt="Logo" className={style["footer-logo"]} />
          </h2>

          <p>
            Empowering your financial future with smart, secure, and data-driven
            investment solutions. Grow your wealth confidently with UpTik.
          </p>
        </div>

        {/* Middle Section - Company & Support Links */}
        <div className={style["footer-links"]}>
          <div className={style["footer-column"]}>
            <h3>Company</h3>
            <ul>
              <li>
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="aboutus">About us</Link>
              </li>
              <li>
                <Link to="/">How it Works</Link>
              </li>
              <li>
                <Link to="/">Testimonials</Link>
              </li>
              <li>
                <Link to="/">Team</Link>
              </li>
            </ul>
          </div>

          <div className={style["footer-column"]}>
            <h3>Support</h3>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                {" "}
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                {" "}
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/faqs">FAQ</Link>
              </li>
              <li>
                {" "}
                <Link to="/terms ">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Contact Info */}
        <div className={style["footer-contact"]}>
          <h3>Get in Touch</h3>
          <p>
            <FaMapMarkerAlt
              style={{
                color: "#78bb69",
                height: "16px",
                paddingRight: "10px",
              }}
            />
            Third Floor, Encore Developers, Road No : 9, Kavuri Hills, Jubilee
            Hills Road no 36 Extension, Hyderabad, Telangana - 500085
          </p>
          <p style={{ display: "flex" }}>
            <IoMdMailOpen
              style={{
                color: "#78bb69",
                height: "20px",
                paddingRight: "10px",
              }}
            />
            contact@uptik.co.in
          </p>
          <p style={{ display: "flex" }}>
            {" "}
            <FaPhone
              style={{
                color: "#78bb69",
                height: "20px",
                paddingRight: "10px",
              }}
            />
            8019698484
          </p>
        </div>
      </div>

      {/* Bottom Section - Copyright & Social Media */}
      <div className={style["footer-bottom"]}>
        <p>
          Copyright © 2025 UpTik, All rights reserved. Powered by MoxCreative.
        </p>
        <p style={{ border: "1px solid #767575" }}></p>
        <div className={style["footer-socials"]}>
          <a
            href="https://www.instagram.com/uptik_official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/UpTikOfficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.facebook.com/UpTikOfficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com/company/uptik-official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.youtube.com/@UpTikOfficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <p className={style["footer-disclaimer"]}>
        *Investing in the stock markets carries risk: the value of investments
        can go up as well as down and you may receive back less than your
        original investment. Individual investors should make their own
        decisions or seek independent advice.
      </p>
    </footer>
  );
};

export default Footer;
