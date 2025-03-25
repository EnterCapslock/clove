import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../css modules/pages/MyDeck.module.scss";

import TitleAndProfile from "../../components/TitleAndProfile";
// Import images
import ConditionalsLoopsImg from "../../assets/images/MyDeckPage/loops.svg";

const topicsData = Array.from({ length: 5 }, (_, index) => ({
  id: `topic${index + 1}`,
  name: `Topic ${index + 1}`,
  description: "Learn about Java concepts.",
  image: ConditionalsLoopsImg,
  locked: index !== 0, // First topic unlocked, others locked
}));

const TopicCard = React.memo(({ topic, onClick }) => (
  <Col
    sm={6}
    md={4}
    lg={3}
    className={`${styles.topicCard} ${
      topic.locked ? styles.locked : ""
    } p-0 mt-3`}
    onClick={() => onClick(topic)}
    style={{
      backgroundImage: topic.image ? `url(${topic.image})` : "none",
    }}
  >
    <div className={styles.topicContent}>
      <h3 className={styles.topicName}>{topic.name}</h3>
      <p className={styles.topicDesc}>{topic.description}</p>
    </div>
  </Col>
));

export default function MyDeckPage() {
  const navigate = useNavigate();
  const [preAssessmentTaken, setPreAssessmentTaken] = useState(true);

  const handlePreAssessment = () => alert("Navigate to Pre-Assessment!");

  const handleTopicClick = useCallback(
    (topic) => {
      if (topic.locked) {
        alert(`${topic.name} is locked!`);
      } else {
        navigate(`/topic/${topic.id}`);
      }
    },
    [navigate]
  );

  return (
    <Container
      fluid
      className={`${styles.myDeckWrapper} p-2 ps-4 pe-4 text-white d-flex flex-column`}
    >
      <TitleAndProfile title="Hello John Doe!" />
      {preAssessmentTaken ? (
        <div
          className={`${styles.scrollableContainer} 
          mt-3 p-0 d-flex flex-grow-1 flex-wrap justify-content-center `}
          style={{ backgroundColor: "orange" }}
        >
          {topicsData.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={handleTopicClick}
            />
          ))}
        </div>
      ) : (
        <Container className="p-0 m-0">
          <button
            className={styles.preAssessmentBtn}
            onClick={handlePreAssessment}
          >
            Take Pre-Assessment &gt;
          </button>
          <p className={styles.assessmentInfo}>
            The pre-assessment helps us evaluate prior knowledge, identify
            learning gaps, and personalize course content.
          </p>
        </Container>
      )}
    </Container>
  );
}
