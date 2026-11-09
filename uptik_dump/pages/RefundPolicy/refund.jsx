import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./refund.module.css";
function refund() {
    return (
        <>
            <div className={styles["navbar"]}>
                <Navbar />
            </div>
            <header className={styles.policyTitle}>
                <h1>Refund and Cancellation Policy</h1>
            </header>
            <div className={styles.policyContainer}>
                <div className={styles.policyContent}>
                    <div className={styles.section}>
                        <p>
                            <b>Effective Date:23-05-2025</b>
                        </p>
                        <p>
                            Thank you for choosing UpTik, a platform operated by{" "}
                            <b>Growwcap Fintech Private Limited.</b>
                        </p>
                        <p>
                            Please read this Refund and Cancellation Policy
                            carefully before using our services.
                        </p>
                    </div>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. No Refunds</h2>
                        <p>
                            All transactions made through the UpTik platform are{" "}
                            <b>final and non-refundable</b>. Once a transaction
                            is successfully completed, UpTik does not provide
                            refunds under any circumstances, including but not
                            limited to:
                        </p>
                        <ul className={styles.bulletList}>
                            <li>Change of mind by the user</li>
                            <li>
                                Dissatisfaction with returns or discounts
                                obtained.
                            </li>
                            <li>
                                Technical issues on the user's side (such as
                                connectivity or device problems)
                            </li>
                            <li>
                                Errors made by the user during submission or
                                investment
                            </li>
                        </ul>
                        <p>
                            We strongly advise users to review all details
                            carefully before confirming any transaction on our
                            platform.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            2. No Cancellations
                        </h2>
                        <p>
                            UpTik does <b>not support cancellations</b> of
                            transactions once they have been submitted and
                            processed. This includes, but is not limited to:
                        </p>
                        <ul className={styles.bulletList}>
                            <li>Invoice discounting commitments</li>
                            <li>Wallet or virtual card transactions</li>
                            <li>
                                Payments made towards any investment or funding
                                option available on UpTik
                            </li>
                        </ul>
                        <p>
                            Please ensure that all information entered is
                            accurate and all decisions are final before
                            confirming a transaction.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Contact Us</h2>
                        <p>
                            f you believe there has been an error or you require
                            assistance regarding your account or a transaction,
                            please reach out to our support team at:
                        </p>
                        <p className={styles.contactInfo}>
                            Email:{" "}
                            <a href="mailto:contact@uptik.co.in">
                                contact@uptik.co.in
                            </a>
                            <br />
                            Phone: +91 8019698484
                        </p>
                        {/* <p>
                            Our customer service team will assist you with any
                            queries you may have regarding our policies.
                        </p> */}
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </>
    );
}

export default refund;
