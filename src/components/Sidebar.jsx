import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import {
  FaTh,
  FaChartBar,
  FaLayerGroup,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const renderTooltip = (label) => (props) =>
    (
      <Tooltip id={`tooltip-${label}`} {...props}>
        {label}
      </Tooltip>
    );

  return (
    <div
      className={`d-flex flex-column p-3 text-white bg-dark ${
        expanded ? "" : "collapsed"
      }`}
      style={{ width: expanded ? "250px" : "80px", transition: "width 0.3s" }}
    >
      <div className="d-flex align-items-center mb-4">
      <FaBars className="text-white cursor-pointer" onClick={toggleSidebar} />

        {expanded && (
          <h4 className="mb-0 ps-2">
            CLOVE
          </h4>
        )}
      </div>
      <Nav defaultActiveKey="/" className="flex-column">
        <OverlayTrigger placement="right" overlay={renderTooltip("Dashboard")}>
          <Nav.Link
            as={Link}
            to="/DashboardPage"
            className={`nav-item text-white d-flex align-items-center ${
              activeItem === "/" ? "active" : ""
            }`}
          >
            <FaTh className="me-2" /> {expanded && <span>Dashboard</span>}
          </Nav.Link>
        </OverlayTrigger>
        <OverlayTrigger placement="right" overlay={renderTooltip("Progress")}>
          <Nav.Link
            as={Link}
            to="/progress"
            className={`nav-item text-white d-flex align-items-center ${
              activeItem === "/progress" ? "active" : ""
            }`}
          >
            <FaChartBar className="me-2" /> {expanded && <span>Progress</span>}
          </Nav.Link>
        </OverlayTrigger>
        <OverlayTrigger placement="right" overlay={renderTooltip("My Deck")}>
          <Nav.Link
            as={Link}
            to="/MyDeckPage"
            className={`nav-item text-white d-flex align-items-center ${
              activeItem === "/deck" ? "active" : ""
            }`}
          >
            <FaLayerGroup className="me-2" /> {expanded && <span>My Deck</span>}
          </Nav.Link>
        </OverlayTrigger>
        <div className="mt-auto">
          <OverlayTrigger placement="right" overlay={renderTooltip("Log out")}>
            <Nav.Link
              as={Link}
              to="/logout"
              className="nav-item text-white d-flex align-items-center"
            >
              <FaSignOutAlt className="me-2" />{" "}
              {expanded && <span>Log out</span>}
            </Nav.Link>
          </OverlayTrigger>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
