import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyDeckContext } from "../../context/MyDeckContext";
import styles from '../../css modules/pages/Lessons.module.scss';

const LoopLesson = () => {
  const [showForLoop, setShowForLoop] = useState(false);
  const [showWhileLoop, setShowWhileLoop] = useState(false);
  const [showDoWhileLoop, setShowDoWhileLoop] = useState(false);
  const [code, setCode] = useState(''); // To store the code typed by the user
  const [output, setOutput] = useState(''); // To store the result of code execution

  const { topicId } = useParams();
  const navigate = useNavigate();
  const { preAssessmentTaken, setTopicId, setSubtopicId, completedSubtopics } =
    useContext(MyDeckContext);

  // Define popoverContent and subtopicKey for demonstration
  const popoverContent = {
    loop: {
      id: 1,
      name: "Loops Subtopic"
    }
  };
  const subtopicKey = "loop"; // For the sake of demonstration, we are using a fixed subtopic key

  const toggleForLoop = () => setShowForLoop(!showForLoop);
  const toggleWhileLoop = () => setShowWhileLoop(!showWhileLoop);
  const toggleDoWhileLoop = () => setShowDoWhileLoop(!showDoWhileLoop);

  // Function to handle code execution
  const runCode = () => {
    let outputBuffer = '';
    const originalLog = console.log;
    console.log = (message) => {
      outputBuffer += message + '\n'; // Capture output
    };

    try {
      eval(code); // Run the user's code in JavaScript
      setOutput(outputBuffer || 'Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }

    console.log = originalLog; // Reset console.log to its original state
  };

  useEffect(() => {
    setTopicId(topicId);
  }, [topicId, setTopicId]);

  const handleChallengesClick = () => {
    const subtopic = popoverContent[subtopicKey];
    if (subtopic) {
      setSubtopicId(subtopic.id);
      navigate(`/my-deck/${topicId}/${subtopic.id}/challenges`);
    } else {
      console.error("Subtopic not found");
    }
  };

  return (
    <div className={styles.lessonContainer}>
      <h1 className={styles.lessonTitle}>🧠 Introduction to Loops</h1>

      <div className={styles.section}>
        <p>Loops let you repeat a block of code multiple times. They're great for tasks like counting, processing lists of data, or creating animations. In this lesson, we’ll explore different types of loops.</p>
      </div>

      <div className={styles.section}>
        <h2>🔁 Types of Loops</h2>

        {/* For Loop Section */}
        <div className={styles.loopSection}>
          <p><strong>1. For Loop</strong> – Used when you know how many times you need to repeat something. It’s like saying “repeat this action for a specific number of times.”</p>
          <button onClick={toggleForLoop} className={styles.toggleButton}>
            {showForLoop ? 'Hide For Loop Code' : 'Show For Loop Code'}
          </button>
          {showForLoop && (
            <div>
              <pre className={styles.codeBlock}>
                {`for (let i = 0; i < 5; i++) {
  console.log("Count: " + i);
}`}
              </pre>
            </div>
          )}
        </div>

        {/* While Loop Section */}
        <div className={styles.loopSection}>
          <p><strong>2. While Loop</strong> – Used when the number of repetitions is unknown. The loop runs as long as a condition is true.</p>
          <button onClick={toggleWhileLoop} className={styles.toggleButton}>
            {showWhileLoop ? 'Hide While Loop Code' : 'Show While Loop Code'}
          </button>
          {showWhileLoop && (
            <div>
              <pre className={styles.codeBlock}>
                {`let i = 0;
while (i < 5) {
  console.log("Count: " + i);
  i++;
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Do-While Loop Section */}
        <div className={styles.loopSection}>
          <p><strong>3. Do-While Loop</strong> – A variation of the <code>while</code> loop that always runs at least once.</p>
          <button onClick={toggleDoWhileLoop} className={styles.toggleButton}>
            {showDoWhileLoop ? 'Hide Do-While Loop Code' : 'Show Do-While Loop Code'}
          </button>
          {showDoWhileLoop && (
            <div>
              <pre className={styles.codeBlock}>
                {`let i = 0;
do {
  console.log("Count: " + i);
  i++;
} while (i < 5);`}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tip}>
        ⚠️ <strong>Watch out for infinite loops!</strong> Always ensure the loop condition will eventually become false to avoid infinite execution.
      </div>

      <div className={styles.section}>
        <h3>✅ Quick Recap</h3>
        <pre className={styles.codeBlock}>
          {`| Loop Type  | Use When...                   | Runs At Least Once? |
|------------|-------------------------------|----------------------|
| for        | Known number of times         | No                   |
| while      | Unknown, condition-based loop | No                   |
| do-while   | At least one run needed       | Yes                  |`}
        </pre>
      </div>

      <div className={styles.section}>
        <h3>🔄 Try it Yourself!</h3>
        <p>Now, let's practice what you’ve learned. Choose a loop type and try writing your own code below:</p>
        
        {/* Textarea to input code */}
        <textarea 
          className={styles.textArea}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your loop code here..."
        ></textarea>
        
        {/* Button to execute the code */}
        <button onClick={runCode} className={styles.practiceButton}>
          Run Code
        </button>

        {/* Display output of the code */}
        <div className={styles.output}>
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      </div>

      {/* Challenges Button */}
      <div className={styles.challengeButtonContainer}>
        <button onClick={handleChallengesClick} className={styles.challengeButton}>
          Start Challenges
        </button>
      </div>
    </div>
  );
};

export default LoopLesson;
