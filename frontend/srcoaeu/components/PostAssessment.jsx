// src/pages/PostAssessmentPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css modules/components/PostAssessment.module.css";

// Hard-coded post-assessment questions (could be same as pre-assessment for demo)
const postAssessmentData = {
  topic1: {
    questions: [
      { id: 1, question: "Post: Fill in the blank: if (x > 10) { ____ }" },
      { id: 2, question: "Post: What is the output of: if (true) { print('Yes') } else { print('No') }" },
      { id: 3, question: "Post: Fix the error: if x>10 { print('High') }" },
    ],
  },
  // Similar for topic2 and topic3...
};

export default function PostAssessment() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const assessment = postAssessmentData[topicId];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Post-Assessment submitted! (Results would be calculated.)");
    navigate("/dashboard");
  };

  if (!assessment) {
    return <div className={styles.container}>No post-assessment for this topic.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Post-Assessment for {topicId}</h2>
      <form onSubmit={handleSubmit}>
        {assessment.questions.map((q) => (
          <div key={q.id} className={styles.questionBlock}>
            <p className={styles.questionText}>{q.question}</p>
            <input type="text" className={styles.answerInput} placeholder="Your answer here" required />
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>Submit Post-Assessment</button>
      </form>
    </div>
  );
}
