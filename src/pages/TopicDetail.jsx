// src/pages/TopicDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import styles from "../css modules/pages/TopicDetail.module.css";

// Example subtopics data for each topic
const subtopicsData = {
  topic1: [
    {
      id: "forLoops",
      name: "For Loops",
      missionText: "Master the basics of iterating with for loops.",
      image: "/images/forLoops.png", // Replace with your actual image path
    },
    {
      id: "whileLoops",
      name: "While Loops",
      missionText: "Understand condition-based iteration using while loops.",
      image: "/images/whileLoops.png",
    },
    {
      id: "doWhileLoops",
      name: "Do-While Loops",
      missionText: "Learn the difference and usage of do-while loops.",
      image: "/images/doWhile.png",
    },
  ],
  topic2: [
    {
      id: "functions",
      name: "Functions",
      missionText: "Learn how to define and call functions effectively.",
      image: "/images/functions.png",
    },
    {
      id: "methods",
      name: "Methods",
      missionText: "Understand how to use methods in objects.",
      image: "/images/methods.png",
    },
  ],
  topic3: [
    {
      id: "dataTypes",
      name: "Data Types",
      missionText: "Explore different data types available in programming.",
      image: "/images/dataTypes.png",
    },
    {
      id: "variables",
      name: "Variables",
      missionText: "Learn how to declare and use variables.",
      image: "/images/variables.png",
    },
    {
      id: "operators",
      name: "Operators",
      missionText: "Understand how operators work and combine values.",
      image: "/images/operators.png",
    },
  ],
};

export default function TopicDetail() {
  const { topicId } = useParams();
  const subtopics = subtopicsData[topicId] || [];

  // Determine topic title based on topicId (for demo purposes)
  const topicTitle =
    topicId === "topic1"
      ? "Conditional Statements and Loops"
      : topicId === "topic2"
      ? "Methods and Functions"
      : topicId === "topic3"
      ? "Data Types and Variables"
      : "Topic";

  return (
    <div className={styles.topicDetailContainer}>
      <h1 className={styles.topicTitle}>{topicTitle}</h1>
      <p className={styles.topicDescription}>
        Welcome to this topic! Complete all the subtopic challenges to
        master the content and then take the post-assessment.
      </p>
      <div className={styles.subtopicsGrid}>
        {subtopics.map((sub) => (
          <div key={sub.id} className={styles.subtopicCard}>
            <img
              src={sub.image}
              alt={sub.name}
              className={styles.subtopicImage}
            />
            <h3 className={styles.subtopicName}>{sub.name}</h3>
            <p className={styles.subtopicMission}>{sub.missionText}</p>
            <button className={styles.playButton}>Play</button>
          </div>
        ))}
      </div>
      <div className={styles.assessmentArea}>
        <button className={styles.postAssessmentButton}>
          Take Post-Assessment
        </button>
      </div>
    </div>
  );
}
