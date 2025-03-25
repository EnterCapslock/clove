import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { FaTh, FaChartBar, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";
import { PiSidebarBold } from "react-icons/pi";
import styles from "../css modules/components/Sidebar.module.scss";
import CloveLogo from "../assets/images/CloveLogo.png";

import Image from "react-bootstrap/Image";

const navItems = [
  { to: "/dashboard", icon: <FaTh />, label: "Dashboard" },
  { to: "/progress", icon: <FaChartBar />, label: "Progress" },
  { to: "/my-deck", icon: <FaLayerGroup />, label: "My Deck" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`${styles.sidebar} ${expanded ? styles.expanded : ""} p-0 m-0`}
    >
      {/* Logo Section */}
      <Col
        className={`${styles.logoSection} mt-2 mb-2`}
        // style={{ backgroundColor: "green" }}
      >
        {expanded && <span className={styles.logo}>CLOVE</span>}
        <Image
          fluid
          src={CloveLogo}
          className={styles.logoImg}
          //style={{ backgroundColor: "violet" }}
        />
      </Col>

      {/* Navigation Links */}
      <Nav className="flex-column flex-grow-1">
        {navItems.map(({ to, icon, label }) => (
          <Nav.Link
            as={Link}
            to={to}
            key={to}
            className={`${styles.navItem} ${
              location.pathname === to ? styles.active : ""
            }`}
          >
            {icon}
            {expanded && <span>{label}</span>}
          </Nav.Link>
        ))}
      </Nav>

      {/* Log Out Button */}
      <Nav.Link
        as={Link}
        to="/logout"
        className={`${styles.navItem} ${styles.logout}`}
      >
        <FaSignOutAlt />
        {expanded && <span>Log out</span>}
      </Nav.Link>

      {/* Sidebar Toggle */}
      <div
        className={styles.toggleIcon}
        //style={{ backgroundColor: "violet" }}
      >
        <PiSidebarBold
          className="me-2"
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
