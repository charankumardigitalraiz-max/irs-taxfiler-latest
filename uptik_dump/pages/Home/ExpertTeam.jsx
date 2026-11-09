import React from "react";
import styles from "./ExpertTeam.module.css";
import Dileep from "../../assets/Home/Dileep.png";
import Phani from "../../assets/Home/Phani.png";
import Ramki from "../../assets/founder.png";
import Vinod from "../../assets/Home/Vinod.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExpertTeam = () => {
  const experts = [

    {
      name: "Ainampudi Vinod Varma",
      role: "CEO & Co-Founder",
      img: Vinod,
      text: [
        <div key="1" className="expertText"><strong>Ainampudi Vinod Varma</strong>, a fintech entrepreneur passionate about innovation, I specialize in strategy, digital growth, and execution. Having worked with leading players in fintech, I understand how to build confidence and drive growth.</div>,
        <div key="2" className="expertText">At UpTik, my mission is to create a trusted, transparent platform that simplifies wealth creation by offering high-yield, secure, and accessible investments. By leveraging technology and strategic execution, I aim to bridge the gap between sophisticated investment solutions and forward-thinking investors.</div>,
      ],
    },
    {
      name: "Mudunuri Dileep Varma",
      role: "COO & Co-Founder",
      img: Dileep,
      text: [
        <div key="1" className="expertText"><strong>Mudunuri Dileep Varma</strong>, a data-driven operations leader with 8+ years of experience, including Deloitte, specializes in analytics, reporting, and business operations. He excels at optimizing processes and enhancing efficiency.</div>,
        <div key="2" className="expertText">As UpTik’s Co-Founder & COO, he ensures seamless execution in investor operations, risk management, and platform efficiency. His vision is to build a secure, transparent, and tech-driven investment ecosystem that empowers investors with confidence and long-term financial growth.</div>,
      ],
    },
    {
      name: "Phanindra Kumar",
      role: "Co-Founder",
      img: Phani,
      text: [
        <div key="1" className="expertText"><strong>Phanindra Kumar</strong>, a strategic operations expert, drives seamless financial management, efficient administration, and strong vendor partnerships at UpTik. With expertise in accounting, compliance, and execution, he ensures operational integrity and efficiency.</div>,
        <div key="2" className="expertText">As Co-Founder, he oversees financial structuring, workflows, and vendor relations, ensuring UpTik operates with precision, transparency, and a seamless investor experience, reinforcing its position as a trusted investment ecosystem.</div>,
      ],
    },
    {
      name: "Uma Mukesh Ponduru",
      role: "CMO and Co-Founder",
      img: Ramki,
      text: [
        <div key="1" className="expertText"><strong>Uma Mukesh Ponduru</strong>, As the Chief Marketing Officer and Co-Founder of UpTik, Uma Mukesh Ponduru is responsible for driving the company's growth, brand vision, and go-to-market strategy. Leveraging extensive experience in fintech, digital transformation, and customer engagement, Mukesh has helped build a trusted platform that delivers innovative financial solutions to a rapidly evolving market. Their leadership and focus on innovation, customer experience, and scalable growth continue to strengthen the company's position as a forward-thinking force in financial technology.
        </div>,
        // <div key="2" className="expertText">With a focus on risk-mitigated, high-yield opportunities, he is building UpTik into a trusted, transparent platform, empowering investors with secure, scalable, and profitable investments. His mission is to bridge the gap between institutional-grade investments and individual investors, ensuring accessibility and long-term wealth creation.</div>,
      ],
    },
  ];



  // Slider settings
  const settings = {
    infinite: true,
    // centerMode: true,
    centerPadding: "20px",
    arrows: false,
    // slidesToShow: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1, // Show 2 items on mobile
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1, // Show 2 items on mobile
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Show 2 items on mobile
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 items on larger devices
        },
      },
    ],
  };

  return (
    <div className={styles.Expertcontainer}>
      <p className={styles.Expertheading}>MEET OUR EXPERTS</p>
      <h2 className={styles.Experttitle}>
        Dedicated professionals ready to <br /> guide you through your journey.
      </h2>

      <div className={styles.ExpertteamGrid}>
        {experts.map((expert, index) => (
          <div key={index} className={styles.Expertcard}>
            <div className={styles.Expertcard_inner}>
              <div className={styles.Expert_card_front}>
                <img src={expert.img} alt={expert.name} />
                <p className={styles.Expertname}>{expert.name}</p>
                <p className={styles.Expertrole}>{expert.role}</p>
              </div>
              <div className={styles.Expert_card_back}>
                {expert.text.map((paragraph, i) => (
                  <p key={i} className={styles.Experttext}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ExpertteamGrid_mobileView}>
        <Slider {...settings}>
          {experts.map((expert, index) => (
            <div key={index} className={styles.Expertcard} style={{ width: "90%", margin: '10px' }}>
              <div className={styles.Expertcard_inner}>
                <div className={styles.Expert_card_front}>
                  <img src={expert.img} alt={expert.name} />
                  <p className={styles.Expertname}>{expert.name}</p>
                  <p className={styles.Expertrole}>{expert.role}</p>
                </div>
                <div className={styles.Expert_card_back}>
                  {expert.text.map((paragraph, i) => (
                    <p key={i} className={styles.Experttext}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ExpertTeam;
