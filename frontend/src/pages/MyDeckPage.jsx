// src/pages/MyDeckPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css modules/pages/MyDeck.module.css";

export default function MyDeckPage() {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Retrieve selected topics from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedTopics");
    if (saved) {
      setSelectedTopics(JSON.parse(saved));
    }
  }, []);

  // Topics data including mastery, defaulting to 0 if locked
  const topicsData = [
    {
      id: "topic1",
      name: "Conditional Statements and Loops",
      description: "Learn about conditionals, loops, and control flow.",
      locked: !selectedTopics.includes("topic1"),
      mastery: selectedTopics.includes("topic1") ? 0 : 0, // Mastery is 0 if locked
    },
    {
      id: "topic2",
      name: "Methods and Functions",
      description: "Learn about creating and calling methods/functions.",
      locked: !selectedTopics.includes("topic2"),
      mastery: selectedTopics.includes("topic2") ? 0 : 0,
    },
    {
      id: "topic3",
      name: "Data Types and Variables",
      description: "Learn about primitive data types and variable usage.",
      locked: !selectedTopics.includes("topic3"),
      mastery: selectedTopics.includes("topic3") ? 0 : 0,
    },
  ];

  const handleTopicClick = (topic) => {
    if (topic.locked) {
      alert(`"${topic.name}" is locked!`);
    } else {
      navigate(`/topic/${topic.id}/subtopics`);
    }
  };

  return (
    <div className={styles.myDeckContainer}>
      <h2 className={styles.pageTitle}>Your Topics</h2>
      <p className={styles.assessmentInfo}>
        The topics you selected during signup have been unlocked. Click an unlocked topic to continue.
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
            {/* Mastery Level */}
            <div className={styles.masteryContainer}>
              <span className={styles.masteryLabel}>Mastery:</span>
              <div className={styles.masteryBar}>
                <div
                  className={styles.masteryFill}
                  style={{ width: `${topic.mastery}%` }}
                ></div>
              </div>
              <span className={styles.masteryPercent}>{topic.mastery}%</span>
            </div>
            {topic.locked && <div className={styles.lockIcon}>🔒</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
