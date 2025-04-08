import { useState, useContext } from "react";
import styles from "../../css modules/components/challenges/CodeTracing.module.scss";

const CodeTracingChallenge = ({ challenge, onAnswerSubmit, timeLeft }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = userAnswer.trim() === challenge.correctAnswer; // assuming correctAnswer is provided
    onAnswerSubmit(isCorrect);
    setUserAnswer(""); // reset answer input
  };

  return (
    <div className={styles.codeContainer}>
      {/* Question Display */}
      <div className={styles.questionContainer}>
        <h3 className={styles.questionText}>{challenge.question}</h3>
      </div>

      {/* Code Snippet */}
      <div className={styles.codeSnippet}>
        <pre>{challenge.code}</pre>
      </div>

      {/* Input field for answer */}
      <input
        type="text"
        className={styles.answerInput}
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Type your answer..."
      />

      {/* Submit button */}
      <div className={styles.buttonGroup}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default CodeTracingChallenge;
