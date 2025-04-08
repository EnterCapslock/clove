//react
import React, { useState, useCallback, useContext } from "react";
//useContext
import { MyDeckContext } from "../../context/MyDeckContext";
//react router
import { useNavigate } from "react-router-dom";
//react bootstrap
import { Container, Row, Col } from "react-bootstrap";
//scss
import styles from "../../css modules/pages/MyDeck.module.scss";
//components
import TitleAndProfile from "../../components/TitleAndProfile";
import PreAssessment from "../../components/PreAssessment"; // ADDED MISSING IMPORT

// Import images
import ConditionalsLoopsImg from "../../assets/images/MyDeckPage/loops.svg";

const topicsData = [
  {
    id: "topic1",
    name: "Data types and Variables",
    description: "Learn about Java concepts.",
    image: ConditionalsLoopsImg,
    locked: false,
  },
  {
    id: "topic2",
    name: "Operators",
    description: "Learn about Java concepts.",
    image: ConditionalsLoopsImg,
    locked: false,
  },
  {
    id: "topic3",
    name: "Conditional",
    description: "Learn about Java concepts.",
    image: ConditionalsLoopsImg,
    locked: true,
  },
  {
    id: "topic4",
    name: "Loops",
    description: "Learn about Java concepts.",
    image: ConditionalsLoopsImg,
    locked: true,
  },
  {
    id: "topic5",
    name: "Method and Functions",
    description: "Learn about Java concepts.",
    image: ConditionalsLoopsImg,
    locked: true,
  },
];

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
  const { preAssessmentTaken, setPreAssessmentTaken } =
    useContext(MyDeckContext);
  const [showPreAssessment, setShowPreAssessment] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null); // ADDED MISSING STATE


  // const handlePreAssessment = () => setShowPreAssessment(true);

  const handleTopicClick = useCallback(
    (topic) => {
      if (topic.locked) {
        alert(`${topic.name} is locked!`);
        return;
      }

      setSelectedTopic(topic); // Store clicked topic

      if (!preAssessmentTaken) {
        setShowPreAssessment(true);
      } else {
        navigate(`/my-deck/${topic.id}`);
      }
    },
    [navigate, preAssessmentTaken]
  );

  return (
    <Container
      fluid
      className={`${styles.myDeckWrapper} p-2 ps-4 pe-4 text-white d-flex flex-column`}
    >
      <PreAssessment
        show={showPreAssessment}
        handleClose={() => setShowPreAssessment(false)}
        onSubmit={() => {
          setPreAssessmentTaken(true);
          if (selectedTopic) {
            navigate(`/my-deck/${selectedTopic.id}`);
          }
        }}
        lesson={selectedTopic?.name || "the topic"} // HANDLE UNDEFINED CASE
      />
      <TitleAndProfile title="Hello John Doe!" />
      {!preAssessmentTaken ? (
        <Container className="p-0 m-0">
          <button
            className={styles.preAssessmentBtn}
            onClick={() => setShowPreAssessment(true)}
          >
            Take Pre-Assessment &gt;
          </button>
          <p className={styles.assessmentInfo}>
            The pre-assessment helps us evaluate prior knowledge, identify
            learning gaps, and personalize course content.
          </p>
        </Container>
      ) : (
        <div
          className={`${styles.scrollableContainer} mt-3 p-0 d-flex flex-grow-1 flex-wrap justify-content-center`}
        >
          {topicsData.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={handleTopicClick}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
