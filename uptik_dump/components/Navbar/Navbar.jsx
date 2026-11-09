import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation from react-router-dom
import styles from "./Navbar.module.css";
import logoUpTik from "../../assets/logo.png"; // Importing the image
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();  // Get the current route

  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleWheelScroll = (event) => {
      if (event.deltaY > 0) {
        // User is scrolling down (towards the bottom)
        const scrollPosition = window.scrollY;
        if (scrollPosition >= 150) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      } else if (event.deltaY < 0) {
        // User is scrolling up (towards the top)
        setIsSticky(false);
      }
    };

    window.addEventListener("wheel", handleWheelScroll);
    window.addEventListener("scroll", handleWheelScroll);

    return () => {
      window.removeEventListener("scroll", handleWheelScroll);
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path ? styles.active : '';

  return (
    <header className={styles.navbar__header}>
      <nav className={`${styles.navbar__container} ${isSticky ? styles?.navoffset : ""}`}>
        {/* Updated logo section */}
        <div className={styles.navbar__logo}>
          <img src={logoUpTik} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.navbar_links_items}>
          <ul
            className={
              mobileMenuOpen
                ? `${styles.navbar__links} ${styles.navbar__linksActive}`
                : styles.navbar__links
            }
          >
            <li>
              <a href="/" className={isActive("/")} onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/aboutus" className={isActive("/aboutus")} onClick={() => setMobileMenuOpen(false)}>
                About us
              </a>
            </li>
            <li>
              <a href="/register">
                <button className={styles.registerButton} >
                  Register
                </button>
              </a>
            </li>
            <li>
              <a href="/faqs" className={isActive("/faqs")} onClick={() => setMobileMenuOpen(false)}>
                FAQs
              </a>
            </li>
            <li>
              <a href="/contact" className={isActive("/contact")} onClick={() => setMobileMenuOpen(false)}>
                Contact us
              </a>
            </li>
            
          </ul>

        </div>

        <div className={styles.navbar__hamburger} onClick={handleToggleMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
