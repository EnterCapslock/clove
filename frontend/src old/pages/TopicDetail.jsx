import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import introduction from "../assets/images/intro subtopic.svg";
import subtopic1 from "../assets/images/7.svg";
import subtopic2 from "../assets/images/Subtopic2.svg";
import subtopic3 from "../assets/images/8.svg";
import bg from "../assets/images/space-bg.jpg";

import Layout from "../components/Layout";
import styles from "../css modules/pages/TopicDetail.module.scss";




const TopicDetail = () => {
  return (
    <Container fluid className="p-4">
      <div className={styles.layer}>
      <img src={bg} alt="introduction" />
      </div>
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
          <div className={styles.subtopicImage}>
          <img src={introduction} alt="introduction" />
          </div>
        </Col>
        <Col xs={4} className="p-5 bg-success text-white">
          3
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="p-5 bg-danger text-white">
        <div className={styles.subtopicImage}>
        <img src={subtopic1} alt="introduction" />
          </div>
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
        <div className={styles.subtopicImage}>

        <img src={subtopic2} alt="introduction" />
        </div>
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
        <div className={styles.subtopicImage}>
        <img src={subtopic3} alt="introduction" />
        </div>

        </Col>
      </Row>
    </Container>
  );
};

export default TopicDetail;
