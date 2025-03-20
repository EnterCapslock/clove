// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { FaFire } from "react-icons/fa";
import styles from "../css modules/pages/Dashboard.module.css";

const skillData = [
  { name: "Loops", value: 40, color: "#8884d8" },
  { name: "Functions", value: 30, color: "#82ca9d" },
  { name: "Arrays", value: 20, color: "#ffc658" },
  { name: "Objects", value: 10, color: "#ff8042" },
];

export default function DashboardPage() {
  const [streak] = useState(5);

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContent}>
        <Container fluid className="p-4 bg-dark text-white">
          <h2 className="mb-4">Overview</h2>
          <Row>
            <Col md={8}>
              <Card
                className="pt-3 ps-3 pe-3 mb-3 text-white d-flex flex-column"
                style={{ height: "100%", backgroundColor: "#A6AAFB" }}
              >
                <Card.Title>Recent Activity</Card.Title>
                <Card.Body className="d-flex flex-column flex-grow-1">
                  <h5>Conditional Loops</h5>
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#aaa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#555",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Loading...
                  </div>
                  <div className="mt-auto">
                    <ProgressBar
                      now={60}
                      label={`${60}%`}
                      animated
                      variant="success"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card
                className="pt-3 ps-3 pe-3 mb-3 bg-secondary text-white"
                style={{ height: "100%" }}
              >
                <Card.Title>Suggested Topic</Card.Title>
                <Card.Body>
                  <h5>Arrays</h5>
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#aaa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#555",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Loading...
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={4}>
              <Card
                className="pt-3 ps-3 pe-3 mb-3 bg-secondary text-white"
                style={{ height: "100%" }}
              >
                <Card.Title>Skill Progression</Card.Title>
                <Card.Body
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <ResponsiveContainer width={150} height={150}>
                    <PieChart>
                      <Pie
                        data={skillData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        innerRadius={30}
                        fill="#8884d8"
                        label
                      >
                        {skillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card
                className="pt-3 ps-3 pe-3 mb-3 text-white"
                style={{ height: "100%", backgroundColor: "#A6AAFB" }}
              >
                <Card.Title>
                  Daily Streak <FaFire className="text-warning" /> {streak} Days
                </Card.Title>
                <Card.Body
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  place holder muna
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
