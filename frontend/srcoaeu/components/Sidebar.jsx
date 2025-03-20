// src/components/Sidebar.jsx

import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { FaTh, FaChartBar, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";
import { PiSidebarBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import styles from "../css modules/components/Sidebar.module.css";

import CloveLogo from "../assets/images/CloveLogo.png";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  // Update CSS variable for main content shift
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      expanded ? "250px" : "80px"
    );
  }, [expanded]);

  function toggleSidebar() {
    setExpanded(!expanded);
  }

  function renderTooltip(label) {
    return (props) => (
      <Tooltip id={`tooltip-${label}`} {...props}>
        {label}
      </Tooltip>
    );
  }

  return (
    <div
      className={`${styles.sidebar} ${
        expanded ? styles.expanded : ""
      } bg-dark text-white d-flex flex-column`}
    >
      {/* Top: Logo & Title */}
      <div className="d-flex align-items-center justify-content-center mb-3">
        {expanded ? (
          // Expanded: show full logo and text
          <div className={styles.logoSection}>
            <span className={styles.logoText}>CLOVE</span>
            <img src={CloveLogo} alt="CLOVE Logo" className={styles.logoImg} />
          </div>
        ) : (
          // Collapsed: only the logo
          <img
            src={CloveLogo}
            alt="CLOVE Logo"
            className={styles.logoImgCollapsed}
          />
        )}
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column flex-grow-1">
        <OverlayTrigger placement="right" overlay={renderTooltip("Dashboard")}>
          <Nav.Link
            as={Link}
            to="/dashboard"
            className={`text-white d-flex align-items-center ${
              styles.navItem
            } ${activeItem === "/dashboard" ? styles.active : ""}`}
          >
            <FaTh className="me-2" />
            {expanded && <span>Dashboard</span>}
          </Nav.Link>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={renderTooltip("Progress")}>
          <Nav.Link
            as={Link}
            to="/progress"
            className={`text-white d-flex align-items-center ${
              styles.navItem
            } ${activeItem === "/progress" ? styles.active : ""}`}
          >
            <FaChartBar className="me-2" />
            {expanded && <span>Progress</span>}
          </Nav.Link>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={renderTooltip("My Deck")}>
          <Nav.Link
            as={Link}
            to="/my-deck"
            className={`text-white d-flex align-items-center ${
              styles.navItem
            } ${activeItem === "/my-deck" ? styles.active : ""}`}
          >
            <FaLayerGroup className="me-2" />
            {expanded && <span>My Deck</span>}
          </Nav.Link>
        </OverlayTrigger>

        <OverlayTrigger placement="right" overlay={renderTooltip("Log out")}>
          <Nav.Link
            as={Link}
            to="/"
            className={`text-white d-flex align-items-center ${styles.navItem} mt-3`}
          >
            <FaSignOutAlt className="me-2" />
            {expanded && <span>Log out</span>}
          </Nav.Link>
        </OverlayTrigger>
      </Nav>

      {/* Bottom: Toggle Icon */}
      <div className="mt-auto d-flex justify-content-center mb-3">
        <PiSidebarBold
          className={styles.toggleIcon}
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        />
      </div>
    </div>
  );
}
