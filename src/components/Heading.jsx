import React from "react";
import styles from "../css modules/Heading.module.css"; 
import tempPic from "../images/flower.jpg";
import CloveLogo from "../images/CloveLogo.png";

export default function Heading() {
  return (
    <div className={styles.page}>
      {/* ====== HEADER (Unchanged) ====== */}
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>CLOVE
          <img src={CloveLogo} alt="Clover Logo" className={styles.logoImg} /> 
          </h1>
        </div>
        <div className={styles.headerButtons}>
          <button className={styles.signUpBtnBtn}>Sign Up</button>
          <button className={styles.loginBtnBtn}>Login</button>
        </div>
      </header>

      {/* ====== HERO SECTION (Modified) ====== */}
      <section className={styles.hero}>
        <div className="container">
          <div className="row align-items-center">
            {/* Left side text */}
            <div className="col-md-6">
              <h1 className={styles.heroTitle}>
                Transform Learning with Interactive Educational Games
              </h1>
              <p className={styles.heroParagraph}>
                Discover how educational games can revolutionize learning by
                making it engaging and personalized. Our innovative approach
                combines advanced technologies to adapt to each learner's
                unique needs.
              </p>
              <div className={styles.heroButtons}>
                <button className={styles.learnMoreBtn}>Learn More</button>
                <button className={styles.signUpBtn}>Sign Up</button>
              </div>
            </div>
            {/* Right side image */}
            <div className="col-md-6 mt-4 mt-md-0 text-center">
              <img
                src={tempPic}
                className={styles.heroImg}
                alt="imgBig"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
