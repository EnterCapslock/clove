import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import styles from "../../css modules/pages/TopicDetailsPage.module.scss";

import intro from "../../assets/images/TopicDetailPage/intro.svg";
import subtopic1 from "../../assets/images/TopicDetailPage/subtopic1.svg";
import subtopic2 from "../../assets/images/TopicDetailPage/subtopic2.svg";
import subtopic3 from "../../assets/images/TopicDetailPage/subtopic3.svg";

import rightPath from "../../assets/images/TopicDetailPage/rightPath.svg";
import middlePath from "../../assets/images/TopicDetailPage/middlePath.svg";
import leftPath from "../../assets/images/TopicDetailPage/leftPath.svg";

import TitleAndProfile from "../../components/TitleAndProfile";

const popoverContent = {
  intro: {
    text: "Introduction to loops: why we use them.",
    time: "5 min",
    link: "/loops/intro",
  },
  subtopic1: {
    text: "For Loops: iterating with control.",
    time: "10 min",
    link: "/loops/for-loops",
  },
  subtopic2: {
    text: "While Loops: condition-based repetition.",
    time: "8 min",
    link: "/loops/while-loops",
  },
  subtopic3: {
    text: "Nested Loops: loops inside loops.",
    time: "12 min",
    link: "/loops/nested-loops",
  },
};

const LoopsPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const renderPopover = (id) => (
    <Popover id={`popover-${id}`}>
      <Popover.Body>
        <strong>{popoverContent[id].text}</strong>
        <br />⏳ Estimated Time: {popoverContent[id].time}
      </Popover.Body>
    </Popover>
  );

  return (
    <Container fluid className={`${styles.topicDetailContent} pt-2 m-0`}>
      <TitleAndProfile topic={"Loops"} />

      <div className={`${styles.scrollableContainer}`}>
        <Row>
          <Col
            xs={12}
            className="text-center text-white p-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Slight white overlay
              backdropFilter: "blur(3px)", // Blur effect
              borderRadius: "40px", // Rounded corners for a nice effect
            }}
          >
            <p
              className="ps-5 pe-5 pb-2 pt-2 p-0 m-0"
              style={{
                whiteSpace: "pre-wrap",
                textAlign: "justify",
                borderBottom: "2px dashed white",
                borderTop: "2px dashed white",
              }}
            >
              Welcome to CyberSpace Outpost Omega, a futuristic hub on the edge
              of space. Your mission is to restore power to the outpost’s
              failing energy grid and protect its data vaults. As a skilled
              cyber-engineer, your ability with loops is key to automating tasks
              and managing resources. The outpost’s smart systems are breaking
              down. With lights flickering and security failing, you must dive
              into the code, set up loops, and restore order before the colony’s
              important data is lost.
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={4}
            className="p-0 m-0  d-flex align-items-end justify-content-end "
          >
            <Image
              fluid
              src={rightPath}
              style={{ width: "200px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={4} className="p-5 text-white text-center">
            <h5>Introduction To Loops</h5>
            <OverlayTrigger
              trigger="hover"
              placement="top"
              overlay={renderPopover("intro")}
            >
              <Image
                src={intro}
                fluid
                style={{ cursor: "pointer" }}
                onClick={() => navigate(popoverContent["intro"].link)}
              />
            </OverlayTrigger>
          </Col>
          <Col xs={4}></Col>
        </Row>
        <Row>
          <Col xs={4} className="p-5  text-white text-center">
            <h5>For Loops</h5>
            <OverlayTrigger
              trigger="hover"
              placement="top"
              overlay={renderPopover("subtopic1")}
            >
              <Image
                src={subtopic1}
                fluid
                style={{ cursor: "pointer" }}
                onClick={() => navigate(popoverContent["subtopic1"].link)}
              />
            </OverlayTrigger>
          </Col>
          <Col
            xs={4}
            className="pt-5 p-0 m-0  d-flex align-items-end justify-content-start"
          >
            <Image
              fluid
              src={middlePath}
              style={{ width: "300px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={4}></Col>
        </Row>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4} className="p-5  text-white text-center">
            <h5>While Loops</h5>
            <OverlayTrigger
              trigger="hover"
              placement="top"
              overlay={renderPopover("subtopic2")}
            >
              <Image
                src={subtopic2}
                fluid
                style={{ cursor: "pointer" }}
                onClick={() => navigate(popoverContent["subtopic2"].link)}
              />
            </OverlayTrigger>
          </Col>
          <Col xs={4} className="pt-5 p-0 m-0  d-flex align-items-end">
            <Image
              fluid
              src={leftPath}
              style={{ width: "120px", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}></Col>
          <Col xs={4} className="p-5 text-white text-center">
            <h5>Nested Loops</h5>
            <OverlayTrigger
              trigger="hover"
              placement="top"
              overlay={renderPopover("subtopic3")}
            >
              <Image
                src={subtopic3}
                fluid
                style={{ cursor: "pointer" }}
                onClick={() => navigate(popoverContent["subtopic3"].link)}
              />
            </OverlayTrigger>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoopsPage;
