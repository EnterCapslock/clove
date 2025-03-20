// src/pages/GameChallengePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameMode from "../components/GameMode";
import styles from "../css modules/pages/GameChallenge.module.css";

const challengesData = [
  { mode: "code_completion", description: "Complete the missing code." },
  { mode: "output_guesser", description: "Guess the output of the code." },
  { mode: "code_fixer", description: "Fix the error in the code." },
  { mode: "code_completion", description: "Fill in the blank in the code snippet." },
  { mode: "output_guesser", description: "Predict the result of the code." },
];

export default function GameChallengePage() {
  const { topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [randomChallenges, setRandomChallenges] = useState([]);

  useEffect(() => {
    // Shuffle and pick 5 random challenges
    const shuffledChallenges = [...challengesData].sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomChallenges(shuffledChallenges);
  }, []);

  const handleNext = () => {
    if (currentChallengeIndex < randomChallenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleFinish = () => {
    navigate(`/topic/${topicId}/subtopics`);
  };

  if (randomChallenges.length === 0) return <p>Loading challenges...</p>;

  const challenge = randomChallenges[currentChallengeIndex];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Challenge {currentChallengeIndex + 1} of {randomChallenges.length}
      </h2>
      <GameMode mode={challenge.mode} description={challenge.description} />
      {completed ? (
        <button className={styles.finishButton} onClick={handleFinish}>
          Finish Challenges
        </button>
      ) : (
        <button className={styles.nextButton} onClick={handleNext}>
          Next Challenge &gt;
        </button>
      )}
    </div>
  );
}
