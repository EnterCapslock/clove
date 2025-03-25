import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { FaFire } from "react-icons/fa";

import styles from "../css modules/pages/DashboardPage.module.scss";
import TitleAndProfile from "../components/TitleAndProfile";

const skillData = [
  { name: "Loops", value: 40, color: "#8884d8" },
  { name: "Functions", value: 30, color: "#82ca9d" },
  { name: "Arrays", value: 20, color: "#ffc658" },
  { name: "Objects", value: 10, color: "#ff8042" },
];

export default function DashboardPage() {
  const [streak] = useState(5);

  return (
    <Container
      fluid
      className={`${styles.dashboardWrapper} p-2 ps-4 pe-4 text-white d-flex flex-column`}
      //style={{ backgroundColor: "green" }}
    >
      <TitleAndProfile
        title="Hello, John Doe!"
        description="Welcome to your dashboard!"
      />
      {/* Parent Wrapper for Equal Height Rows */}
      <Container
        className={`${styles.dashboardContent} d-flex flex-grow-1 flex-column justify-content-between m-0 p-0`}
        // style={{ backgroundColor: "blue" }}
      >
        {/* First Row */}
        <Row
          className="flex-grow-1"
          // style={{ backgroundColor: "brown" }}
        >
          <Col md={5} lg={7} className="d-flex mt-3">
            <Card
              className="flex-grow-1 text-white d-flex flex-column"
              style={{ backgroundColor: "black" }}
            >
              <Card.Title>Recent Activity</Card.Title>
              <Card.Body className="d-flex flex-grow-1">hehehe</Card.Body>
            </Card>
          </Col>

          <Col md={7} lg={5} className="d-flex mt-3">
            <Card className="flex-grow-1 bg-secondary text-white">
              <Card.Title>Suggested Topic</Card.Title>
              <Card.Body className="d-flex flex-grow-1">hehehe</Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Second Row */}
        <Row
          className="flex-grow-1"
          // style={{ backgroundColor: "violet" }}
        >
          <Col md={7} lg={5} className="d-flex mt-3">
            <Card className="flex-grow-1 bg-secondary text-white">
              <Card.Title>Skill Progression</Card.Title>
              <Card.Body className="d-flex flex-grow-1">hehehe</Card.Body>
            </Card>
          </Col>

          <Col md={5} lg={7} className="d-flex mt-3">
            <Card
              className="flex-grow-1 text-white"
              style={{ backgroundColor: "#A6AAFB" }}
            >
              <Card.Title>
                Daily Streak <FaFire className="text-warning" /> {streak} Days
              </Card.Title>
              <Card.Body className="d-flex flex-grow-1">
                place holder muna
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
