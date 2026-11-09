import React, { useState } from "react";
import styles from "./Contact.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import logoUpTik from "../../assets/uptik.png";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaYoutube,
  FaRegBuilding,
  FaLinkedinIn
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    dob: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dob: date }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/submitInquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.status === 1) {
        setResponseMessage(data.message || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile_number: "",
          dob: "",
          address: "",
          message: "",
        });
      } else {
        setResponseMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact UpTik | Support for Your Investment Queries</title>
        <meta name="description" content="Get in touch with UpTik for investment support, account assistance, and platform-related queries. Our team is here to help you invest confidently." />
      </Helmet>
      <Navbar />
      <section className={styles.AboutusheroSection}>
        <h1>We're Here to Help</h1>
      </section>

      <div className={styles.Contactcontainer}>
        <form className={styles.Contactform} onSubmit={handleSubmit}>
          <h3>Contact Us Now</h3>
          <div className={styles.Contactform_div}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.Contactform_div}>
            <input
              type="number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="Mobile number"
              className={styles.input}
              required
            />
            {/* <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Date of Birth"
              className={styles.input}
              required
            /> */}
            <DatePicker
              selected={formData.dob}
              name="dob"
              onChange={handleDateChange}
              wrapperClassName={styles.inputbirth}
              placeholderText="dd-mm-yyyy"
              dateFormat="dd-MM-yyyy"
              required
            />
          </div>
          <div className={styles.Contactform_div}>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={styles.input}
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            className={styles.Contactform_div_textarea}
            required
          ></textarea>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '15px', marginBottom: '15px', textAlign: 'left', fontSize: '14px' }}>
            <input 
              type="checkbox" 
              id="authorise" 
              name="authorise" 
              required 
              style={{ marginTop: '4px', cursor: 'pointer' }}
            />
            <label htmlFor="authorise" style={{ cursor: 'pointer', lineHeight: '1.4', color: '#555' }}>
              I authorise UpTik (growwcap Fintech pvt ltd) & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override DND/NDNC
            </label>
          </div>

          {responseMessage && (
            <p style={{ color: "green" }} className={styles.successMessage}>
              {responseMessage}
            </p>
          )}

          <button
            type="submit"
            className={styles.Contactform_button}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className={styles.Contactdetails}>
          <img src={logoUpTik} alt="Logo" className={styles.contactlogo} />
          <div className={styles.Contactdetails_content}>
             <p><FaRegBuilding style={{ color: '#78bb69', height: '16px', paddingRight: '10px' }} />GROWWCAP FINTECH PRIVATE LIMITED</p>
                      
            <div className={styles.Contactdetails_span}>
              <FaPhoneAlt className={styles.Contacticon} /> 8019698484{" "}
            </div>
            <div className={styles.Contactdetails_span}>
              <FaMapMarkerAlt className={styles.Contacticon} /> Plot No. 17, Third floor, Kakatiya Hills, GuttalaBe, Madhapur, Shaikpet, Hyderabad- 500081, Telangana
            </div>
            <div className={styles.Contactdetails_span}>
              <MdEmail className={styles.Contacticon} />
              contact@uptik.co.in
            </div>
          </div>
          <div className={styles.Contactdetails_socialicons}>
            {/* Facebook Link */}
            <a
              href="https://www.facebook.com/UpTikOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FaFacebook className={styles.Contact_socialicon} />
              </span>
            </a>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/uptik_official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <BsInstagram className={styles.Contact_socialicon} />
              </span>
            </a>

            {/* YouTube Link */}
            <a
              href="https://www.youtube.com/@UpTikOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FaYoutube className={styles.Contact_socialicon} />
              </span>
            </a>

            {/* X (Twitter) Link */}
            <a
              href="https://x.com/UpTikOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <RiTwitterXLine className={styles.Contact_socialicon} />
              </span>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/company/uptik-official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FaLinkedinIn className={styles.Contact_socialicon} />
              </span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
