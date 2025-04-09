import { useState } from "react";
import styles from "../../css modules/components/challenges/CodeTracing.module.scss";

const CodeTracingChallenge = ({ challenge, onAnswerSubmit, timeLeft }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value); // Ensure userAnswer is always a string
  };

  const handleSubmit = () => {
    // Normalize both user input and correct answer by trimming spaces and converting to lowercase
    const normalizedUserAnswer = String(userAnswer).trim().toLowerCase();
    const normalizedCorrectAnswer = String(challenge.answer).trim().toLowerCase();

    console.log("Normalized User Answer:", normalizedUserAnswer); // Debugging
    console.log("Normalized Correct Answer:", normalizedCorrectAnswer); // Debugging

    // Compare the normalized user input and correct answer
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    // Trigger callback with the result of the comparison
    onAnswerSubmit(isCorrect);
    setUserAnswer(""); // Reset input field after submission
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
