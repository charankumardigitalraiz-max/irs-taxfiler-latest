import React, { useState } from "react";
import styles from "./Home.module.css";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = () => {
  const faqs = [
    {
      question: "What is UpTik?",
      answer:
        "UpTik is a premium alternative investment platform offering secure, high-yield opportunities, starting with invoice discounting. Our platform is built on transparency, investor-first principles, and seamless investing.",
    },
    {
      question: "Who Can Invest with UpTik?",
      answer: (
        <>
          <p>
            UpTik is designed for a wide range of investors looking for secure,
            high-yield opportunities:
          </p>
          <ul>
            <li>
              <strong>Retail Investors:</strong> Individuals can invest directly
              in verified invoices through the UpTik app and earn returns.
            </li>
            <li>
              <strong>High-Net-Worth Individuals (HNIs):</strong> Diversify
              portfolios with exclusive, short-term, high-yield investments.
            </li>
            <li>
              <strong>Institutional Investors:</strong> Banks, NBFCs, and
              alternative investment funds seeking secure, structured investment
              options.
            </li>
            <li>
              <strong>Family Offices & Wealth Managers:</strong> Access a
              transparent, technology-driven investment ecosystem for strategic
              asset allocation.
            </li>
          </ul>
          <p>
            UpTik provides flexible, scalable investment opportunities for
            investors of all sizes—backed by trust, transparency, and strong
            risk management.
          </p>
        </>
      ),
    },
    {
      question: "What happens if there is a default? Who is liable to pay?",
      answer: (
        <>
          <p>
            At UpTik, every invoice undergoes strict due diligence to minimize
            default risks, and the default rate is quite low. However, in the
            rare case of a default:
          </p>
          <ul>
            <li>
              <strong>For standard investments:</strong> The business that
              issued the invoice remains responsible for repayment.
            </li>
            <li>
              <strong>For UpTik Assured Plus deals:</strong> Investors who opt
              for this feature will still receive their returns even if the
              business defaults.
            </li>
          </ul>
          <p>
            UpTik Assured Plus provides an additional layer of security,
            ensuring investor protection in select deals.
          </p>
        </>
      ),
    },
    {
      question: "How does invoice discounting work, and how do investors earn?",
      answer:
        "Invoice discounting allows businesses to unlock cash flow by selling their unpaid invoices to investors at a discount. As an investor, you fund these invoices and earn returns when the invoice matures—providing a short-term, high-yield investment opportunity.",
    },
    {
      question: "What is UpTik Assured Plus?",
      answer: (
        <>
          <p>
            <strong>UpTik Assured Plus</strong> is an additional investor
            protection feature.
          </p>
          <ul>
            <li>
              If an invoice defaults, UpTik ensures that investors opting for
              this feature still receive their returns.
            </li>
            <li>Available only on select deals for Enhanced Security and peace of mind.</li>
          </ul>
        </>
      ),
    },
    {
      question: "How do I withdraw my returns?",
      answer: (
        <>
          <ul>
            <li>
              Your investment earnings are credited to your UpTik wallet upon
              maturity.
            </li>
            <li>
              You can initiate a withdrawal request, and the amount will be
              transferred to your registered bank account.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "How does UpTik ensure security and transparency?",
      answer: (
        <>
          <p>Every investment on UpTik undergoes:</p>
          <ul>
            <li>Multi-layered verification & fraud detection</li>
            <li>Legal & financial due diligence</li>
            <li>Transparent investment tracking in real-time</li>
          </ul>
          <p>
            Investors can verify invoices before making an investment, ensuring
            complete transparency.
          </p>
        </>
      ),
    },
    {
      question: "Where can I invest & track my portfolio?",
      answer: (
        <>
          <ul>
            <li>
              All investment opportunities are exclusively available through the
              UpTik app.
            </li>
            <li>
              Investors can browse, analyze, and invest in verified deals
              directly within the platform.
            </li>
            <li>
              The UpTik app provides real-time portfolio tracking, ensuring full
              transparency on investments, returns, and payouts.
            </li>
          </ul>
          <p>
            Everything you need—from investment discovery to earnings
            withdrawal—is available at your fingertips.
          </p>
        </>
      ),
    },
    {
      question: "Is UpTik regulated?",
      answer:
        "UpTik follows strict compliance measures and financial due diligence to ensure a legally compliant and secure investment ecosystem.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{backgroundColor: 'white'}} className={styles.faq}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <p className={styles.faq_still_Para}>
          Investing should be simple, secure, and rewarding. At UpTik, we ensure
          every investor has complete clarity before making a decision. Here’s
          everything you need to know.
        </p>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className={styles.faqQuestion}>
              {faq.question}
              <span className={styles.icon}>
                <IoIosArrowDown />
              </span>
            </div>
            {activeIndex === index && (
              <div className={styles.faqAnswer}>{faq.answer}</div>
            )}
          </div>
        ))}
        <div>
          <h5 className={styles.faq_still_question}>Still Have Questions?</h5>
          <p className={styles.faq_still_Para}>
            Our expert team is ready to assist you - let’s simplify your
            investment journey together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
