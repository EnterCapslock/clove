import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { questions } from './questions.js';  
import styles from '../css modules/components/PreAssessment.module.scss'; 

const getRandomQuestions = () => {
  const allQuestions = [
    ...questions.basicLoops,
    ...questions.conditionalStatements,
    ...questions.advancedLoops,
  ];
  const randomQuestions = [];
  const selectedIndices = new Set();

  while (randomQuestions.length < 15) {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    if (!selectedIndices.has(randomIndex)) {
      selectedIndices.add(randomIndex);
      randomQuestions.push(allQuestions[randomIndex]);
    }
  }

  return randomQuestions;
};

const PreAssessment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);  
  const [questionsToAsk, setQuestionsToAsk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { topicId } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const randomQuestions = getRandomQuestions();
    setQuestionsToAsk(randomQuestions);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questionsToAsk[questionIndex];

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    const isCorrect = option === currentQuestion.answer;
    setIsAnswerCorrect(isCorrect);
    setIsAnswered(true);
  
    let category = "";  
    if (currentQuestion.id >= 5) {
      category = 'Basic Loops';
    } else if (currentQuestion.id >= 10) { 
      category = 'Conditional Statements';
    } else {
      category = 'Advanced Loops';
    }
  
    setUserAnswers(prev => [
      ...prev, 
      { 
        questionId: currentQuestion.id, 
        selectedOption: option, 
        isCorrect,
        category  // Add the category here
      }
    ]);
  };
  

  const handleNextQuestion = () => {
    if (questionIndex < questionsToAsk.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setProgress((prevProgress) => prevProgress + 100 / questionsToAsk.length);
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      setIsAnswered(false);
    } else {
      // After finishing the test, navigate to the result page with user answers
      navigate(`/my-deck/${topicId}/pre-assessment/result`, {
        state: {
          userAnswers, // Pass user answers to the result page
          questionsToAsk, // Pass questionsToAsk to the result page
          topicId, // Pass topicId to the result page
        },
      });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.testContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
        <div className={styles.questionCount}>
          Question {questionIndex + 1} out of {questionsToAsk.length}
        </div>
        <div className={styles.questionText} dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <div className={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${selectedOption === option ? (isAnswerCorrect ? styles.correct : styles.incorrect) : ''} ${isAnswered ? styles.disabled : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <button className={styles.nextBtn} onClick={handleNextQuestion}>
          {questionIndex < questionsToAsk.length - 1 ? 'Next Question' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default PreAssessment;
