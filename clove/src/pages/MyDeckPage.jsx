// src/pages/MyDeckPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css modules/pages/MyDeck.module.css";

const topicsData = [
  {
    id: "topic1",
    name: "Conditional and Loops",
    description: "Learn about conditionals, loops, and control flow.",
    locked: false,
  },
  {
    id: "topic2",
    name: "Methods and Functions",
    description: "Learn about creating and calling methods/functions.",
    locked: true,
  },
  {
    id: "topic3",
    name: "Data Types and Variables",
    description: "Learn about primitive data types and variable usage.",
    locked: true,
  },
];

export default function MyDeckPage() {
  const navigate = useNavigate();

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
    <div className={styles.myDeckContainer}>
      <h2 className={styles.pageTitle}>What do you want to learn today?</h2>
      <button className={styles.preAssessmentBtn} onClick={handlePreAssessment}>
        Take Pre-Assessment &gt;
      </button>
      <p className={styles.assessmentInfo}>
        State here the importance of taking the assessment...
      </p>
      <div className={styles.topicsGrid}>
        {topicsData.map((topic) => (
          <div
            key={topic.id}
            className={`${styles.topicCard} ${topic.locked ? styles.locked : ""}`}
            onClick={() => handleTopicClick(topic)}
          >
            <h3 className={styles.topicName}>{topic.name}</h3>
            <p className={styles.topicDesc}>{topic.description}</p>
            {topic.locked && <div className={styles.lockIcon}>🔒</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
