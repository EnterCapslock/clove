import React, { useState, useEffect } from "react";
import styles from "../css modules/components/GameMode.module.css";

const challenges = {
  code_completion: [
    { question: "Fill in the missing part to print 'Hello, World!'.", code: "console.log(____);", answer: "\"Hello, World!\"" },
    { question: "Complete the loop to print numbers 1 to 5.", code: "for(let i = 1; i <= 5; ____){ console.log(i); }", answer: "i++" },
  ],
  code_tracing: [
    { question: "What is the output of this code?", code: "console.log(2 + '2');", answer: "22" },
    { question: "What will be printed?", code: "let x = 5; x += 2; console.log(x);", answer: "7" },
  ],
  code_fixer: [
    { question: "Fix the error in the following code:", code: "function hello() { console.log(Hello, World!); }", answer: "console.log(\"Hello, World!\");" },
    { question: "Fix this function declaration:", code: "function add(a, b) { return a + b }", answer: "return a + b;" },
  ]
};

const GameMode = ({ mode }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [challenge, setChallenge] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (mode && challenges[mode]) {
      const randomChallenge = challenges[mode][Math.floor(Math.random() * challenges[mode].length)];
      setChallenge(randomChallenge);
    }
  }, [mode]);

  const checkAnswer = () => {
    if (userInput.trim() === challenge.answer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Try Again");
    }
  };

  return (
    <div className={styles.gameMode}>
      {/* Timer Bar */}
      <div className={styles.timerBar} style={{ width: `${(timeLeft / 60) * 100}%` }}></div>
      <div className={styles.timer}>Time Left: {timeLeft}s</div>

      {/* Game Content */}
      <div className={styles.content}>
        <div className={styles.questionBox}>
          <h3>{challenge?.question}</h3>
          <pre className={styles.codeSnippet}>{challenge?.code}</pre>
        </div>

        <div className={styles.codeBox}>
          <textarea
            className={styles.codeEditor}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className={styles.runButton} onClick={checkAnswer}>Submit</button>
          <div className={styles.feedback}>{feedback}</div>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
