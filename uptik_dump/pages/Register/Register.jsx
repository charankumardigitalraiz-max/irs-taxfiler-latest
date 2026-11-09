import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Register.module.css";
import lockImage from "../../assets/register/lock.png";
import registerImage from "../../assets/register/Registration.png";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { Helmet } from "react-helmet-async";

function Register() {
  const location = useLocation();
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    dob: "",
    investment_range: "",
  });
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dob: date }));
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numeric values for mobile number
    if (name === "mobile_number") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
      setFormData((prevData) => ({ ...prevData, [name]: numericValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Validation for mobile number
  const validateMobileNumber = (mobile_number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile_number);
  };

  // Function to check if the user is 21 or older based on DOB
  const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Adjust age if birthday hasn't occurred yet this year
    }

    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Mobile number validation check
    if (!validateMobileNumber(formData.mobile_number)) {
      setError("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    // DOB validation: Check if the user is at least 21 years old
    const age = validateAge(formData.dob);
    if (age < 21) {
      setError("You must be at least 21 years old to register.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/addRegistration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_AUTH_TOKEN`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.status === 1) {
        setSuccess(data.message || "Registration successful!");
        setFormData({
          name: "",
          email: "",
          mobile_number: "",
          dob: "",
          investment_range: "",
        });
        setConsentChecked(false);
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.scrollToForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <div>
      <Helmet>
        <title>Register on UpTik | Start Your Short-Term Investment Journey</title>
        <meta name="description" content="Create your UpTik account in minutes and start investing in secure short-term plans with flexible durations and transparent expected returns." />
      </Helmet>
      <Navbar />
      <section className={styles.AboutusheroSection}>
        <h1>Registrations</h1>
      </section>

      <div className={styles.registerContainer}>
        {/* Hero Section */}
        <section className={styles.registerHero}>
          <div className={styles.registerHero_content}>
            <h2>Secure Your Spot - Exclusive Pre-Launch Access!</h2>
            <p>
              The best investment opportunities go to those who move first.
              UpTik is revolutionizing alternative investments, and this is your
              chance to be part of it before anyone else.
            </p>
            <p>
              By registering now, you will gain early access, premium benefits,
              and an investor-first advantage before we go public.
            </p>
          </div>
          <div className={styles.registerHero_img}>
            <img
              src={lockImage}
              alt="Security Lock"
              className={styles.registerLockImg}
            />
          </div>
        </section>

        {/* Why Register Section */}
        <section className={styles.registerWhySection}>
          <div className={styles.registerImageContainer}>
            <img src={registerImage} alt="Register Benefits" />
          </div>
          <div className={styles.registerWhyContent}>
            <h3>Why Register Early?</h3>
            <ul>
              <li>
                <b>✔ First 25 Registrants - Lifetime platform fee exemption.</b>
              </li>
              <li>
                <b>✔ Next 100 Registrants - Zero platform fees for 1 year.</b>
              </li>
              <li>✔ Priority Access - Invest before public launch.</li>
              <li>✔ Elite Investor Advantage - Secure investment ecosystem.</li>
            </ul>
          </div>
        </section>

        {/* Registration Form */}
        <div className={styles.registerForm_heading}>
          <h2>
            Limited Spots Available - Secure Your Access Before Registrations
            Close!
          </h2>
          <p>The future of investing starts here. Move first, gain more.</p>
        </div>

        <section className={styles.registerFormSection}>
          <div className={styles.registerFormWrapper}>
            <h2>Secure Your Spot Now - Before Registrations Close!</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.registerForm}>
                <div className={styles.registerForm_div}>
                  <div className={styles.registerFormGroup}>
                    <label>* Name (As Per ID)</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={styles.placeholderDark}
                      required
                    />
                  </div>

                  <div className={styles.registerFormGroup}>
                    <label>* Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={styles.placeholderDark}
                      required
                      maxLength="10"
                    />
                  </div>

                  <div className={styles.registerFormGroup}>
                    <label>* What is your investment range?</label>
                    <select
                      name="investment_range"
                      value={formData.investment_range}
                      onChange={handleChange}
                      className={styles.placeholderDark}
                      required
                    >
                      <option value="">Select your investment range</option>
                      <option value="25000"> 25,000</option>
                      <option value="25000To1Lakh">25,000 to 1 lakh</option>
                      <option value="1LakhTo5Lakh">1 lakh to 5 lakhs</option>
                      <option value="above5Lakh">Above 5 lakhs</option>
                    </select>
                  </div>
                </div>

                <div className={styles.registerForm_div}>
                  <div className={styles.registerFormGroup}>
                    <label>* Date of Birth</label>
                    <DatePicker
                      selected={formData.dob}
                      onChange={handleDateChange}
                      wrapperClassName={styles.placeholderbirth}
                      placeholderText="dd-mm-yyyy"
                      dateFormat="dd-MM-yyyy"
                      required
                    />
                  </div>

                  <div className={styles.registerFormGroup}>
                    <label>* Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={styles.placeholderDark}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={{ margin: "15px 0", display: "flex", alignItems: "flex-start", gap: "10px", textAlign: "left" }}>
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  required
                  style={{ marginTop: "4px", width: "auto", cursor: "pointer" }}
                />
                <label htmlFor="consentCheckbox" style={{ fontSize: "14px", cursor: "pointer" }}>
                  <span style={{ color: "red" }}>*</span> I authorise UpTik (growwcap Fintech pvt ltd) & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override DND/NDNC
                </label>
              </div>

              {error && <p className={styles.errorMessage}>{error}</p>}
              {success && <p className={styles.successMessage}>{success}</p>}
              <button
                type="submit"
                className={styles.registerSubmitBtn}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Register;
