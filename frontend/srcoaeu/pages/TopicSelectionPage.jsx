// src/pages/TopicSelectionPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css modules/pages/TopicSelection.module.css";

export default function TopicSelectionPage() {
  const navigate = useNavigate();
  const topicsData = [
    { id: "topic1", name: "Conditional Statements and Loops" },
    { id: "topic2", name: "Methods and Functions" },
    { id: "topic3", name: "Data Types and Variables" },
  ];

  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    // Save the user's selection in localStorage
    localStorage.setItem("selectedTopics", JSON.stringify(selectedTopics));
    // Navigate to the dashboard (or MyDeckPage)
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Topics You Want to Learn</h2>
      <div className={styles.topicList}>
        {topicsData.map((topic) => (
          <button
            key={topic.id}
            className={`${styles.topicButton} ${
              selectedTopics.includes(topic.id) ? styles.selected : ""
            }`}
            onClick={() => toggleTopic(topic.id)}
          >
            {topic.name}
          </button>
        ))}
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>
        Save Selection &gt;
      </button>
    </div>
  );
}
