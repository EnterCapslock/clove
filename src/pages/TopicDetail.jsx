import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const TopicDetail = () => {
  return (
    <Container fluid className="p-4">
      <Row>
        <Col xs={12} className="text-center bg-dark text-white p-3">
          this is for the profile
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center bg-dark text-white p-3">
          <h2>Conditional and Loops</h2>
          <p>
            Welcome to Galaxian World. You are going to Earth and destroy their
            planet. You are a valuable aircraft engineer. You are tasked to
            check every unit in the craft to ensure a safe flight.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="p-5 bg-primary text-white"></Col>
        <Col xs={4} className="p-5 bg-secondary text-white">
          2
        </Col>
        <Col xs={4} className="p-5 bg-success text-white">
          3
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="p-5 bg-danger text-white">
          4
        </Col>
        <Col xs={4} className="p-5 bg-warning text-dark">
          5
        </Col>
        <Col xs={4} className="p-5 bg-info text-white">
          6
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="p-5 bg-light text-dark">
          7
        </Col>
        <Col xs={4} className="p-5 bg-dark text-white">
          8
        </Col>
        <Col xs={4} className="p-5 bg-primary text-white">
          9
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="p-5 bg-orange text-dark">
          10
        </Col>
        <Col xs={4} className="p-5 bg-dark text-white">
          11
        </Col>
        <Col xs={4} className="p-5 bg-primary text-white">
          12
        </Col>
      </Row>
    </Container>
  );
};

export default TopicDetail;
