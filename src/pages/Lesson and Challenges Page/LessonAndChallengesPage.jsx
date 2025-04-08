//react
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
//useContext
import { MyDeckContext } from "../../context/MyDeckContext";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

//components
import CodeCompletionChallenge from "../../components/challenges/CodeCompletion";
import CodeTracingChallenge from "../../components/challenges/CodeTracing";
import CodeFixerChallenge from "../../components/challenges/CodeFixer";
import TimerRing from "../../components/challenges/TimerRing";
import { challenges } from "../../components/challenges/challenges";

//scss
import styles from "../../css modules/components/challenges/ChallengesPage.module.scss";

const LessonAndChallengesPage = () => {
  const { topicId, subtopicId } = useParams();
  const {
    setTopicId,
    setSubtopicId,
    completedSubtopics,
    setCompletedSubtopics,
    setMasteryLevels,
  } = useContext(MyDeckContext);

  // Sync params with context
  useEffect(() => {
    setTopicId(topicId);
    setSubtopicId(subtopicId);
  }, [topicId, subtopicId]);

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [sessionChallenges, setSessionChallenges] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentHint, setCurrentHint] = useState("");
  const [hintVisible, setHintVisible] = useState(false);

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
    setSessionChallenges(shuffled);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswerSubmit = (isCorrect) => {
    setUserAnswers([...userAnswers, isCorrect]);
    if (isCorrect) {
      setScore((prev) => prev + 100);
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentChallengeIndex === sessionChallenges.length - 1) {
      setCompletedSubtopics((prev) => [...prev, subtopicId]);
      setMasteryLevels((prev) => ({
        ...prev,
        [subtopicId]: (prev[subtopicId] || 0) + (isCorrect ? 20 : 10),
      }));
    }
  };

  const getHint = () => {
    const hints = [
      "Try breaking down the code step by step.",
      "Remember to check for syntax errors.",
      "Use logic and debug your approach.",
    ];
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    setCurrentHint(randomHint);
    setHintVisible(true);

    // Hide the hint after 5 seconds
    setTimeout(() => {
      setHintVisible(false);
    }, 5000); // Hint disappears after 5 seconds
  };

  if (sessionChallenges.length === 0)
    return <div className={styles.loading}>Loading challenges...</div>;

  const currentChallenge = sessionChallenges[currentChallengeIndex];

  return (
    <div className={styles.challengesContainer}>
      <div className={styles.leftSection}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            Game Mode: {currentChallenge.type}
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
            {currentChallenge.description ||
              "No additional description available."}
          </p>
        </div>
      </div>

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
              Time Left: {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>

          {/* Hint Button */}
          <div className={styles.hintButtonContainer}>
            <span>Hint</span> {/* Place the text before the icon */}
            <FontAwesomeIcon
              icon={faLightbulb}
              size="lg"
              className={styles.hintIcon}
              onClick={getHint}
            />
          </div>
        </div>

        {/* Hint Text above the Timer */}
        {hintVisible && <div className={styles.hintText}>{currentHint}</div>}

        {/* Challenge Types */}
        {currentChallenge.type === "CodeCompletion" && (
          <CodeCompletionChallenge
            challenge={currentChallenge}
            onAnswerSubmit={handleAnswerSubmit}
            timeLeft={timeLeft}
          />
        )}
        {currentChallenge.type === "CodeTracing" && (
          <CodeTracingChallenge
            challenge={currentChallenge}
            onAnswerSubmit={handleAnswerSubmit}
            timeLeft={timeLeft}
          />
        )}
        {currentChallenge.type === "CodeFixer" && (
          <CodeFixerChallenge
            challenge={currentChallenge}
            onAnswerSubmit={handleAnswerSubmit}
            timeLeft={timeLeft}
          />
        )}
      </div>
    </div>
  );
};

export default LessonAndChallengesPage;
