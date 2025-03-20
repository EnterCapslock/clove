// src/pages/PreAssessmentPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css modules/components/PreAssessment.module.css";

// Hard-coded questions for demo
const assessmentData = {
  topic1: {
    subtopics: [
      {
        id: "st1",
        name: "If/Else Statements",
        questions: [
          { id: 1, question: "Fill in the blank: if (x > 10) { ____ }", type: "fill-in" },
          { id: 2, question: "What is the output of: if (true) { print('Yes') } else { print('No') }", type: "mcq" },
          { id: 3, question: "Fix the error: if x > 10 { print('High') }", type: "code-fixer" },
        ],
      },
      {
        id: "st2",
        name: "Loops",
        questions: [
          { id: 4, question: "Complete the loop: for (int i=0; i<5; i++) { ____ }", type: "fill-in" },
          { id: 5, question: "What is the output of: for (int i=1;i<=3;i++){ print(i) }", type: "mcq" },
          { id: 6, question: "Fix the loop: for (int i=0; i<5 i++){ print(i) }", type: "code-fixer" },
        ],
      },
    ],
  },
  // You can add similar structures for topic2 and topic3
};

export default function PreAssessment() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topicAssessment = assessmentData[topicId];
  if (!topicAssessment) {
    return <div className={styles.container}>No assessment found for this topic.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save pre-assessment completion in localStorage
    localStorage.setItem(`preAssessment_${topicId}`, "completed");
  
    alert("Assessment submitted! Your mastery level has been estimated.");
    navigate(`/topic/${topicId}/subtopics`);
  };
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pre-Assessment for {topicId}</h2>
      <form onSubmit={handleSubmit}>
        {topicAssessment.subtopics.map((sub) => (
          <div key={sub.id} className={styles.subtopicSection}>
            <h3>{sub.name}</h3>
            {sub.questions.map((q) => (
              <div key={q.id} className={styles.questionBlock}>
                <p className={styles.questionText}>{q.question}</p>
                <input type="text" className={styles.answerInput} placeholder="Your answer here" required />
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>Submit Assessment</button>
      </form>
    </div>
  );
}
