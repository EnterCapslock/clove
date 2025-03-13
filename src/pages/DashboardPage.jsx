import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { FaFire } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "react-calendar/dist/Calendar.css";
import Sidebar from "../components/Sidebar";

const skillData = [
  { name: "Loops", value: 40, color: "#8884d8" },
  { name: "Functions", value: 30, color: "#82ca9d" },
  { name: "Arrays", value: 20, color: "#ffc658" },
  { name: "Objects", value: 10, color: "#ff8042" },
];

const Dashboard = () => {
  const [streak, setStreak] = useState(5); // Example streak count
  const [loginDays, setLoginDays] = useState([
    "2025-03-10",
    "2025-03-11",
    "2025-03-12",
    "2025-03-13",
  ]);

  const generateStreakGrid = () => {
    const days = 35; // 7x5 grid
    const today = new Date();
    const grid = [];

    for (let i = days - 1; i >= 0; i--) {
      const day = new Date();
      day.setDate(today.getDate() - i);
      const dateString = day.toISOString().split("T")[0];

      let status = "missed";
      if (loginDays.includes(dateString)) {
        status = "logged-in";
      }

      grid.push(
        <div
          key={dateString}
          style={{
            width: "25px",
            height: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: status === "logged-in" ? "#4caf50" : "#ccc",
            color: "white",
            margin: "2px",
            borderRadius: "4px",
          }}
        >
          {status === "logged-in" ? <FaFire /> : ""}
        </div>
      );
    }

    return grid;
  };

  return (
    <Container fluid className="p-0 m-0 d-flex flex-row vh-100"
  
    >
      <Sidebar />
      <Container fluid className="p-4 bg-dark text-white">
        <h2 className="mb-4">Overview</h2>
        <Row>
          <Col md={8}>
            <Card
              className="pt-3 ps-3 pe-3 mb-3  text-white d-flex flex-column"
              style={{ height: "100%", backgroundColor: "#A6AAFB" }}
            >
              <Card.Title >Recent Activity</Card.Title>
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
            <Card className="pt-3 ps-3 pe-3 mb-3 bg-secondary text-white"
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
            <Card className="pt-3 ps-3 pe-3 mb-3 bg-secondary text-white"
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
            <Card className="pt-3 ps-3 pe-3 mb-3 text-white"
                          style={{ height: "100%", backgroundColor: "#A6AAFB" }}

            >
              <Card.Title>
                Daily Streak <FaFire className="text-warning" /> {streak} Days
              </Card.Title>
              <Card.Body
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div
                  className="d-flex flex-wrap justify-content-center"
                  style={{ maxWidth: "240px" }}
                >
                  {generateStreakGrid()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Dashboard;
