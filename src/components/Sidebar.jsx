import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Image } from "react-bootstrap";
import {
  FaHome as FaTh,
  FaChartLine as FaChartBar,
  FaLayerGroup,
  FaSignOutAlt,
} from "react-icons/fa";
import { PiSidebarBold } from "react-icons/pi";
import styles from "../css modules/components/Sidebar.module.scss";
import CloveLogo from "../assets/images/CloveLogo.png";

const navItems = [
  { to: "/dashboard", icon: <FaTh />, label: "Dashboard" },
  { to: "/progress", icon: <FaChartBar />, label: "Progress" },
  { to: "/my-deck", icon: <FaLayerGroup />, label: "My Deck" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <div className={`${styles.sidebar} ${expanded ? styles.expanded : ""}`}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <Image fluid src={CloveLogo} className={styles.logoImg} />
          </div>
          {expanded && <span className={styles.logoText}>CLOVE</span>}
        </div>
      </div>

      {/* Navigation Links */}
      <Nav className={`${styles.navContainer} flex-column`}>
        {navItems.map(({ to, icon, label }) => (
          <Nav.Link
            as={Link}
            to={to}
            key={to}
            className={`${styles.navItem} ${
              location.pathname === to ? styles.active : ""
            }`}
          >
            <span className={styles.navIcon}>{icon}</span>
            {expanded && <span className={styles.navLabel}>{label}</span>}
          </Nav.Link>
        ))}
      </Nav>

      {/* Log Out Button */}
      <div className={styles.bottomSection}>
        <Nav.Link
          as={Link}
          to="/logout"
          className={`${styles.navItem} ${styles.logout}`}
        >
          <span className={styles.navIcon}>
            <FaSignOutAlt />
          </span>
          {expanded && <span className={styles.navLabel}>Log out</span>}
        </Nav.Link>

        {/* Sidebar Toggle */}
        <div
          className={styles.toggleIcon}
          onClick={() => setExpanded(!expanded)}
        >
          <PiSidebarBold />
        </div>
      </div>
    </div>
  );
}
