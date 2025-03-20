import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css modules/pages/SubtopicSelection.module.css";
import { FaCheckCircle, FaLock } from "react-icons/fa";

const subtopicsData = {
  topic1: [
    { id: "st1", name: "If/Else Statements" },
    { id: "st2", name: "Loops" },
  ],
  topic2: [
    { id: "st3", name: "Defining Methods" },
    { id: "st4", name: "Method Overloading" },
  ],
  topic3: [
    { id: "st5", name: "Primitive Data Types" },
    { id: "st6", name: "Variables" },
  ],
};

export default function SubtopicSelectionPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const subtopics = subtopicsData[topicId] || [];

  const [preAssessmentCompleted, setPreAssessmentCompleted] = useState(false);
  const [completedSubtopics, setCompletedSubtopics] = useState({});

  // Load Pre-Assessment status & completed subtopics from localStorage
  useEffect(() => {
    const preAssessmentStatus = localStorage.getItem(`preAssessment_${topicId}`);
    if (preAssessmentStatus === "completed") {
      setPreAssessmentCompleted(true);
    }

    const savedCompletedSubtopics = JSON.parse(localStorage.getItem(`completedSubtopics_${topicId}`)) || {};
    setCompletedSubtopics(savedCompletedSubtopics);
  }, [topicId]);

  const handlePreAssessment = () => {
    localStorage.setItem(`preAssessment_${topicId}`, "completed");
    setPreAssessmentCompleted(true);
    navigate(`/topic/${topicId}/pre-assessment`);
  };

  const handleSubtopicSelect = (subtopicId) => {
    if (preAssessmentCompleted) {
      // Mark subtopic as completed
      const updatedCompleted = { ...completedSubtopics, [subtopicId]: true };
      setCompletedSubtopics(updatedCompleted);
      localStorage.setItem(`completedSubtopics_${topicId}`, JSON.stringify(updatedCompleted));

      // Navigate to the challenge page
      navigate(`/topic/${topicId}/subtopic/${subtopicId}/challenge`);
    }
  };

  const allSubtopicsCompleted = subtopics.every((sub) => completedSubtopics[sub.id]);

  return (
    <div className={styles.container}>
      {/* Pre-Assessment Section */}
      <button
        className={styles.preAssessmentButton}
        onClick={handlePreAssessment}
        disabled={preAssessmentCompleted}
      >
        {preAssessmentCompleted ? "Pre-Assessment Done" : "Take Pre-Assessment"}
      </button>
      <p className={styles.assessmentDescription}>
        {preAssessmentCompleted
          ? "Great! You can now attempt the subtopics."
          : "You must complete the pre-assessment before accessing the subtopics."}
      </p>

      <h2 className={styles.title}>Select a Subtopic to Play</h2>

      {/* Subtopics List */}
      <div className={styles.subtopicList}>
        {subtopics.map((sub) => (
          <button
            key={sub.id}
            className={`${styles.subtopicButton} ${!preAssessmentCompleted ? styles.locked : ""}`}
            onClick={() => handleSubtopicSelect(sub.id)}
            disabled={!preAssessmentCompleted}
          >
            <span className={styles.subtopicText}>{sub.name}</span>
            {completedSubtopics[sub.id] && <FaCheckCircle className={styles.checkIcon} />}
            {!preAssessmentCompleted && <FaLock className={styles.lockIcon} />}
          </button>
        ))}
      </div>

      {/* Post-Assessment Section */}
      <p className={styles.assessmentDescription}>
        {allSubtopicsCompleted
          ? "You have completed all subtopics! Take the post-assessment for evaluation."
          : "Complete all subtopics to unlock the post-assessment."}
      </p>
      <button
        className={`${styles.postAssessmentButton} ${allSubtopicsCompleted ? styles.unlocked : ""}`}
        onClick={() => allSubtopicsCompleted && navigate(`/topic/${topicId}/post-assessment`)}
        disabled={!allSubtopicsCompleted}
      >
        Take Post-Assessment
      </button>
    </div>
  );
}
