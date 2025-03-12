import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../css modules/Forms.module.css";

export default function Form() {
  // Set default to Sign Up (false = Sign Up, true = Login)
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className={styles.page}>
      {/* Header with Logo */}
      <header className={styles.header}>
        <div className={styles.logo}>CLOVE</div>
      </header>

      {/* Main Content: Centered Form */}
      <main className={styles.content}>
        <div className={styles.formWrapper}>
          {/* Toggle Navigation */}
          <div className={styles.toggleNav}>
            <button
              className={`${styles.toggleButton} ${
                !isLogin ? styles.active : ""
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <button
              className={`${styles.toggleButton} ${isLogin ? styles.active : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>

          {/* Form Animation */}
          <motion.div
            initial={{ opacity: 0, x: isLogin ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? -50 : 50 }}
            key={isLogin ? "login" : "signup"}
          >
            {isLogin ? (
              <div>
                {/* Login Form */}
                <h2 className={`${styles.loginHeading}`}>Log In</h2>
                <p className={`${styles.loginDescription}`}>
                  Nice to see you again!
                </p>
                <form className="space-y-4">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={styles.formField}
                  />
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={styles.formField}
                  />
                  <div className={styles.forgotPassword}>
                    <a href="/forgot-password" className={styles.forgotPassword}>Forgot your password?</a>
                  </div>
                  <button className={styles.formButton}>Login</button>
                </form>
              </div>
            ) : (
              <div>
                {/* Sign Up Form */}
                <h2 className={`${styles.signupHeading}`}>Sign Up</h2>
                <p className={`${styles.signupDescription}`}>
                  Your journey in programming starts now!
                </p>
                <form className="space-y-4">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className={styles.formField}
                  />
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={styles.formField}
                  />
                  <label htmlFor="password">Password*</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={styles.formField}
                  />
                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      className={styles.checkbox}
                      required
                    />
                    <label htmlFor="termsCheckbox" className={styles.checkboxLabel}>
                      I agree to the{" "}
                      <a href="/terms" className={styles.termsLink}>
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <button className={styles.formButton}>Sign Up</button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer: Copyright */}
      <footer className={styles.footer}>
        <p>© 2025 CLOVE</p>
      </footer>
    </div>
  );
}
