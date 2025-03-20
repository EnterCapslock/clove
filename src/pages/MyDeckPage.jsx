import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "../css modules/pages/MyDeck.module.scss";
import Layout from "../components/Layout";

// Import images
import ConditionalsLoopsImg from "../assets/images/Contact.svg";
// import DataTypesImg from "../assets/images/data_types.svg";
// import MethodsFunctionsImg from "../assets/images/methods_functions.svg";

const topicsData = [
  {
    id: "topic1",
    name: "Conditional and Loops",
    description: "Learn about conditionals, loops, and control flow.",
    image: ConditionalsLoopsImg,
    locked: false,
  },
  {
    id: "topic2",
    name: "Data Types and Variables",
    description: "Learn about primitive data types and variable usage.",
    locked: true,
  },
  {
    id: "topic3",
    name: "Methods and Functions",
    description: "Learn about creating and calling methods/functions.",
    locked: true,
  },
];

export default function MyDeckPage() {
  const navigate = useNavigate();
  const [preAssessmentTaken, setPreAssessmentTaken] = React.useState(true);

  function handlePreAssessment() {
    alert("Navigate to or open Pre-Assessment here!");
  }

  function handleTopicClick(topic) {
    if (topic.locked) {
      alert(`"${topic.name}" is locked!`);
    } else {
      navigate(`/topic/${topic.id}`);
    }
  }

  return (
    <div className={styles.myDeckWrapper}>
      <Layout />
      <div className={styles.myDeckContent}>
        <h2 className={styles.pageTitle}>What do you want to learn today?</h2>
        {preAssessmentTaken ? (
          <br />
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
        <div className={styles.topicsGrid}>
          {topicsData.map((topic) => (
            <div
              key={topic.id}
              className={`${styles.topicCard} ${
                topic.locked ? styles.locked : ""
              }`}
              onClick={() => handleTopicClick(topic)}
              style={{
                backgroundImage: topic.image ? `url(${topic.image})` : "none",
              }}
            >
              <div className={styles.topicContent}>
                <h3 className={styles.topicName}>{topic.name}</h3>
                <p className={styles.topicDesc}>{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
