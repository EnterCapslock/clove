import { useState, useContext } from "react";
import styles from "../../css modules/components/challenges/CodeFixer.module.scss";

const CodeFixerChallenge = ({ challenge, onAnswerSubmit, timeLeft }) => {
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
      {/* Question / Description */}
      <div className={styles.question}>
        <h3>{challenge.question}</h3>
      </div>
      {/* Code Snippet */}
      <div className={styles.codeSnippet}>
        <pre>{challenge.code}</pre>
      </div>
      {/* Answer Input Field */}
      <input
        type="text"
        className={styles.answerInput}
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Fix the code..."
      />
      <div className={styles.buttonGroup}>
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default CodeFixerChallenge;
