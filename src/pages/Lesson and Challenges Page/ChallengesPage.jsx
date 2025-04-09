import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { MyDeckContext } from "../../context/MyDeckContext"; // Context for sharing data
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import CodeCompletionChallenge from "../../components/challenges/CodeCompletion";
import CodeTracingChallenge from "../../components/challenges/CodeTracing";
import CodeFixerChallenge from "../../components/challenges/CodeFixer";
import TimerRing from "../../components/challenges/TimerRing";
import { challenges } from "../../components/challenges/challenges";
import styles from "../../css modules/components/challenges/ChallengesPage.module.scss";

const ChallengesPage = () => {
  const navigate = useNavigate(); // Set up navigation
  const { topicId, subtopicId } = useParams(); // Get params from the URL
  const {
    setTopicId,
    setSubtopicId,
    completedSubtopics,
    setCompletedSubtopics,
    setMasteryLevels,
    setResults, // Function to set results in context
    results, // Retrieve results from context
  } = useContext(MyDeckContext); // Access context

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [sessionChallenges, setSessionChallenges] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswer, setUserAnswer] = useState(""); // To track user input

  // Flatten all challenges from the challenges file
  const flattenChallenges = () => {
    let allChallenges = [];
    Object.values(challenges).forEach((topic) => {
      Object.values(topic).forEach((subtopic) => {
        ["easy", "medium", "hard"].forEach((difficulty) => {
          allChallenges = [...allChallenges, ...subtopic[difficulty]];
        });
      });
    });
    return allChallenges;
  };

  useEffect(() => {
    const allChallenges = flattenChallenges();
    const shuffled = allChallenges.sort(() => 0.5 - Math.random()).slice(0, 10);
    setSessionChallenges(shuffled); // Select 10 random challenges
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1)); // Update time left
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Function to validate answers for each challenge type
  const handleAnswerSubmit = (isCorrect, userAnswer) => {
    const currentChallenge = sessionChallenges[currentChallengeIndex];

    const currentResult = {
      challengeIndex: currentChallengeIndex,
      isCorrect,
      timeTaken: 120 - timeLeft,
      challengeType: currentChallenge.type,
      userAnswer,  // Store user’s answer
      correctAnswer: currentChallenge.answer,
    };

    // Save results in context or state
    setResults((prevResults) => [...prevResults, currentResult]);

    // Update score if answer is correct
    if (isCorrect) {
      setScore((prev) => prev + 100);
      setCorrectAnswers((prev) => prev + 1);
    }

    // Move to the next challenge or finish quiz
    if (currentChallengeIndex < sessionChallenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setUserAnswer(""); // Reset user answer
      setTimeLeft(120);   // Reset the timer
    } else {
      // When all challenges are completed, save progress and go to results page
      setCompletedSubtopics((prev) => [...prev, subtopicId]);
      setMasteryLevels((prev) => ({
        ...prev,
        [subtopicId]: (prev[subtopicId] || 0) + (isCorrect ? 20 : 10),
      }));
      navigate(`/my-deck/${topicId}/${subtopicId}/results`);
    }

    // Feedback to the user
    alert(isCorrect ? "Correct answer!" : `Incorrect answer. The correct answer was: ${currentChallenge.answer}`);
  };

  return (
    <div className={styles.challengesContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            Game Mode: {sessionChallenges[currentChallengeIndex]?.type}
          </h2>
          <h3 className={styles.subTitle}>Game Mechanics:</h3>
          <ul className={styles.mechanicsList}>
            <li>Complete the code snippet</li>
            <li>Every wrong attempt will decrease the time</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.subTitle}>Description:</h3>
          <p className={styles.descriptionText}>
            {sessionChallenges[currentChallengeIndex]?.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        {/* Correct Answers Tracking */}
        <div className={styles.scoreContainer}>
          <p>
            Correct Answers: {correctAnswers} / {sessionChallenges.length}
          </p>
        </div>

        {/* Timer and Hint Button */}
        <div className={styles.timerAndHintContainer}>
          <div className={styles.timerContainer}>
            <TimerRing progress={(timeLeft / 120) * 100} />
            <span className={styles.timerText}>
              Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>

          {/* Hint Button */}
          <div className={styles.hintButtonContainer}>
            <span>Hint</span>
            <FontAwesomeIcon
              icon={faLightbulb}
              size="lg"
              className={styles.hintIcon}
              onClick={() => alert("Here’s your hint!")} // Placeholder for hint logic
            />
          </div>
        </div>

        {/* Challenge Types */}
        {sessionChallenges[currentChallengeIndex]?.type === "CodeCompletion" && (
          <CodeCompletionChallenge
            challenge={sessionChallenges[currentChallengeIndex]}
            onAnswerSubmit={handleAnswerSubmit}
            timeLeft={timeLeft}
            setUserAnswer={setUserAnswer} // Pass down to update the user's answer
            userAnswer={userAnswer} // Track the user's input
          />
        )}
        {sessionChallenges[currentChallengeIndex]?.type === "CodeTracing" && (
          <CodeTracingChallenge
            challenge={sessionChallenges[currentChallengeIndex]}
            onAnswerSubmit={handleAnswerSubmit}
            timeLeft={timeLeft}
            setUserAnswer={setUserAnswer} // Pass down to update the user's answer
            userAnswer={userAnswer} // Track the user's input
          />
        )}
        {sessionChallenges[currentChallengeIndex]?.type === "CodeFixer" && (
          <CodeFixerChallenge
            challenge={sessionChallenges[currentChallengeIndex]}
            onAnswerSubmit={handleAnswerSubmit}
            timeLeft={timeLeft}
            setUserAnswer={setUserAnswer} // Pass down to update the user's answer
            userAnswer={userAnswer} // Track the user's input
          />
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;
