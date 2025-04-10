import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';

const TrainingPage = () => {
  const [code, setCode] = useState(`// Example:
int crewCount = 5;
double fuelLevel = 87.5;
String shipName = "Galaxy Runner";
boolean enginesOn = true;

// Your turn - add variables below:`);
  const [output, setOutput] = useState("Output will appear here...");
  const [progress, setProgress] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState({
    int: false,
    double: false,
    boolean: false,
    String: false
  });
  const { topicId, subtopicId } = useParams(); 
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [confettiFired, setConfettiFired] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [dropErrors, setDropErrors] = useState({
    int: false,
    double: false,
    boolean: false,
    String: false
  });

  const navigate = useNavigate();

  // Create stars background
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars');
      if (!starsContainer) return;

      starsContainer.innerHTML = '';
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const duration = 2 + Math.random() * 3;
        const startOpacity = Math.random() * 0.5;
        const endOpacity = 0.5 + Math.random() * 0.5;
        
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--start-opacity', startOpacity);
        star.style.setProperty('--end-opacity', endOpacity);
        
        starsContainer.appendChild(star);
      }
    };

    createStars();
  }, []);

  const runCode = () => {
    setOutput("Executing code... (In a real app, this would run the Java code)");
    
    setTimeout(() => {
      setOutput(`
        ✓ Code compiled successfully!
        Variables created:
        - crewCount (int)
        - fuelLevel (double)
        - shipName (String)
        - enginesOn (boolean)

        Try adding more variables!
      `);
      updateProgress(25);
    }, 1000);
  };

  const checkAnswer = (isCorrect, optionIndex) => {
    setSelectedAnswer(optionIndex);
    setIsCorrectAnswer(isCorrect);
    if (isCorrect) {
      updateProgress(25);
    }
  };

  const handleDragStart = (e, type) => {
    setDraggedItem(type);
    e.target.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('highlight');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('highlight');
  };

  const handleDrop = (e, expectedType) => {
    e.preventDefault();
    e.currentTarget.classList.remove('highlight');
    
    if (draggedItem === expectedType) {
      setMatches(prev => ({ ...prev, [expectedType]: true }));
      setDropErrors(prev => ({ ...prev, [expectedType]: false }));
      updateProgress(25);
    } else {
      setDropErrors(prev => ({ ...prev, [expectedType]: true }));
      setTimeout(() => {
        setDropErrors(prev => ({ ...prev, [expectedType]: false }));
      }, 1000);
    }
  };

  const updateProgress = (increment) => {
    setProgress(prev => {
      const newProgress = Math.min(prev + increment, 100);
      if (newProgress === 100 && !confettiFired) {
        setTimeout(() => {
          setShowCompletion(true);
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
          setConfettiFired(true);
        }, 500);
      }
      return newProgress;
    });
  };  

  const resetLesson = () => {
    setProgress(0);
    setMatches({
      int: false,
      double: false,
      boolean: false,
      String: false
    });
    setConfettiFired(false);
    setShowCompletion(false);  
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
  };

  // CSS as JavaScript objects with explicit colors instead of variables
  const styles = {
    root: {
      background: '#0a0a1a',
      fontFamily: "'Space Grotesk', sans-serif",
      color: '#ffffff',
      minHeight: '100vh',
      padding: '20px',
      backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(108, 92, 231, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 118, 117, 0.1) 0%, transparent 50%)',
    },
    stars: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
    lessonContainer: {
      maxWidth: '900px',
      margin: '0 auto',
      position: 'relative',
      paddingBottom: '60px',
    },
    codePlayground: {
      background: '#252540',
      borderRadius: '15px',
      padding: '20px',
      margin: '25px 0',
      border: '1px solid #6c5ce7',
      position: 'relative',
    },
    codeEditor: {
      width: '100%',
      minHeight: '150px',
      background: '#1e1e2e',
      color: '#ffffff',
      fontFamily: "'Courier New', monospace",
      padding: '15px',
      borderRadius: '8px',
      border: 'none',
      resize: 'none',
      marginBottom: '15px',
      lineHeight: 1.5,
    },
    runBtn: {
      background: '#6c5ce7',
      color: '#ffffff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontFamily: "'Orbitron', sans-serif",
      cursor: 'pointer',
      transition: 'all 0.3s',
      ':hover': {
        background: '#ff7675',
        transform: 'translateY(-2px)',
      },
    },
    outputContainer: {
      marginTop: '15px',
      padding: '15px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '8px',
      minHeight: '50px',
      fontFamily: "'Courier New', monospace",
      whiteSpace: 'pre-wrap',
      color: '#ffffff',
    },
    quizContainer: {
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '15px',
      padding: '25px',
      margin: '30px 0',
      borderLeft: '4px solid #6c5ce7',
    },
    quizOption: {
      background: 'rgba(108, 92, 231, 0.1)',
      border: '1px solid #6c5ce7',
      borderRadius: '10px',
      padding: '12px 15px',
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      color: '#ffffff',
      ':hover': {
        background: 'rgba(108, 92, 231, 0.3)',
        transform: 'translateX(5px)',
      },
    },
    correct: {
      background: 'rgba(100, 255, 150, 0.2)',
      borderColor: '#64ff96',
    },
    wrong: {
      background: 'rgba(255, 100, 100, 0.2)',
      borderColor: '#ff6464',
    },
    feedback: {
      marginTop: '15px',
      padding: '10px',
      borderRadius: '8px',
      display: 'none',
      color: '#ffffff',
    },
    feedbackCorrect: {
      background: 'rgba(100, 255, 150, 0.2)',
      borderLeft: '4px solid #64ff96',
      display: 'block',
    },
    feedbackWrong: {
      background: 'rgba(255, 100, 100, 0.2)',
      borderLeft: '4px solid #ff6464',
      display: 'block',
    },
    dragItem: {
      background: '#6c5ce7',
      padding: '10px 15px',
      borderRadius: '8px',
      cursor: 'grab',
      userSelect: 'none',
      margin: '5px',
      color: '#ffffff',
    },
    dropZone: {
      minHeight: '60px',
      background: 'rgba(108, 92, 231, 0.1)',
      border: '2px dashed #6c5ce7',
      borderRadius: '15px',
      padding: '15px',
      marginTop: '10px',
      marginBottom: '20px',
      transition: 'all 0.3s',
      color: '#ffffff',
    },
    dropZoneError: {
      background: 'rgba(255, 100, 100, 0.3)',
      borderColor: '#ff6464',
    },
    progressContainer: {
      bottom: 0,
      left: 0,
      right: 0,
      padding: '10px 20px',
      background: '#1a1a2e',
      borderTop: '1px solid #6c5ce7',
      zIndex: 100,
    },
    progressRocket: {
      height: '5px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '5px',
      margin: '10px 0',
      position: 'relative',
      overflow: 'hidden',
    },
    rocket: {
      position: 'absolute',
      left: `${progress}%`,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.5rem',
      transition: 'left 0.5s ease',
    },
    progressFill: {
      height: '100%',
      background: progress === 100 ? 
        'linear-gradient(90deg, #64ff96, #64ff96)' : 
        'linear-gradient(90deg, #6c5ce7, #ff7675)',
      width: `${progress}%`,
      transition: 'width 0.5s ease, background 0.5s ease',
    },
    matchingGame: {
      margin: '30px 0',
      color: '#ffffff',
    },
    matchedItem: {
      background: '#64ff96',
      padding: '8px 12px',
      borderRadius: '6px',
      margin: '5px 0',
      display: 'inline-block',
      color: '#000000',
    },
    completionMessage: {
      textAlign: 'center',
      margin: '30px 0',
      padding: '20px',
      background: 'rgba(100, 255, 150, 0.1)',
      borderRadius: '15px',
      borderLeft: '4px solid #64ff96',
      color: '#ffffff',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    actionButton: {
      background: '#6c5ce7',
      color: '#ffffff',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '8px',
      fontFamily: "'Orbitron', sans-serif",
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '1rem',
      ':hover': {
        background: '#ff7675',
        transform: 'translateY(-2px)',
      },
    },
    secondaryButton: {
      background: 'transparent',
      border: '1px solid #6c5ce7',
      color: '#ffffff',
    },
  };

  // Convert styles to CSS string for the style tag
  const cssString = `
    @keyframes twinkle {
      0% { opacity: var(--start-opacity); }
      100% { opacity: var(--end-opacity); }
    }
    
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      animation: twinkle var(--duration) infinite alternate;
    }
    
    .highlight {
      background: rgba(108, 92, 231, 0.3) !important;
    }
  `;

  return (
    <div style={styles.root}>
      {/* Animated Stars Background */}
      <div id="stars" style={styles.stars}></div>
      
      <style>{cssString}</style>

      <div style={styles.lessonContainer}>
        {/* Interactive Code Playground */}
        <div>
          <h2 style={{ color: '#ffffff' }}>🚀 CODE CONTROL CENTER</h2>
          
          <div style={styles.codePlayground}>
            <h3 style={{ color: '#ffffff' }}>Try it yourself:</h3>
            <p style={{ color: '#ffffff' }}>Declare variables for our spaceship's status:</p>
            <textarea 
              style={styles.codeEditor}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button style={styles.runBtn} onClick={runCode}>LAUNCH CODE</button>
            <div style={styles.outputContainer}>{output}</div>
          </div>
        </div>
        
        {/* Interactive Quiz */}
        <div>
          <div style={styles.quizContainer}>
            <h3 style={{ color: '#ffffff' }}>🪐 KNOWLEDGE CHECKPOINT</h3>
            <div style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#ffffff' }}>
              Which of these is NOT a valid Java variable declaration?
            </div>
            
            <div style={{
              ...styles.quizOption,
              ...(selectedAnswer === 0 && (isCorrectAnswer === false ? styles.wrong : styles.correct))
            }} onClick={() => checkAnswer(false, 0)}>
              int 2ships = 3;
            </div>

            <div style={{
              ...styles.quizOption,
              ...(selectedAnswer === 1 && (isCorrectAnswer === true ? styles.correct : styles.wrong))
            }} onClick={() => checkAnswer(true, 1)}>
              String captainName = "Kirk";
            </div>

            <div style={{
              ...styles.quizOption,
              ...(selectedAnswer === 2 && (isCorrectAnswer === false ? styles.wrong : styles.correct))
            }} onClick={() => checkAnswer(false, 2)}>
              double warpFactor = 9.9;
            </div>

            <div style={{
              ...styles.quizOption,
              ...(selectedAnswer === 3 && (isCorrectAnswer === false ? styles.wrong : styles.correct))
            }} onClick={() => checkAnswer(false, 3)}>
              boolean shieldsUp = true;
            </div>
            
            {selectedAnswer !== null && isCorrectAnswer && (
              <div style={{ ...styles.feedback, ...styles.feedbackCorrect }}>
                ✓ Correct! Variable names can't start with numbers in Java.
              </div>
            )}

            {selectedAnswer !== null && !isCorrectAnswer && (
              <div style={{ ...styles.feedback, ...styles.feedbackWrong }}>
                ✘ Not quite! This is actually a valid declaration. Try again!
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Drag-and-Drop Activity */}
        <div style={styles.matchingGame}>
          <h3>🧩 VARIABLE MATCHING GAME</h3>
          <p>Drag each data type to match with its correct description:</p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {!matches.int && (
              <div 
                style={styles.dragItem}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, 'int')}
                onDragEnd={handleDragEnd}
              >
                int
              </div>
            )}
            {!matches.double && (
              <div 
                style={styles.dragItem}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, 'double')}
                onDragEnd={handleDragEnd}
              >
                double
              </div>
            )}
            {!matches.boolean && (
              <div 
                style={styles.dragItem}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, 'boolean')}
                onDragEnd={handleDragEnd}
              >
                boolean
              </div>
            )}
            {!matches.String && (
              <div 
                style={styles.dragItem}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, 'String')}
                onDragEnd={handleDragEnd}
              >
                String
              </div>
            )}
          </div>
          
          <div>
            <p style={{ color: '#ffffff' }}>Whole numbers (no decimals)</p>
            <div 
              style={{
                ...styles.dropZone,
                ...(dropErrors.int && styles.dropZoneError)
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'int')}
            >
              {matches.int && <span style={styles.matchedItem}>int</span>}
            </div>
          </div>
          
          <div>
            <p style={{ color: '#ffffff' }}>Numbers with decimal points</p>
            <div 
              style={{
                ...styles.dropZone,
                ...(dropErrors.double && styles.dropZoneError)
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'double')}
            >
              {matches.double && <span style={styles.matchedItem}>double</span>}
            </div>
          </div>
          
          <div>
            <p style={{ color: '#ffffff' }}>True or false values</p>
            <div 
              style={{
                ...styles.dropZone,
                ...(dropErrors.boolean && styles.dropZoneError)
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'boolean')}
            >
              {matches.boolean && <span style={styles.matchedItem}>boolean</span>}
            </div>
          </div>
          
          <div>
            <p style={{ color: '#ffffff' }}>Textual data</p>
            <div 
              style={{
                ...styles.dropZone,
                ...(dropErrors.String && styles.dropZoneError)
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'String')}
            >
              {matches.String && <span style={styles.matchedItem}>String</span>}
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {showCompletion && (
          <div style={styles.completionMessage}>
            <h3>🎉 Mission Complete!</h3>
            <p>You've successfully completed the training! Proceed now to Challenges or Review again?</p>
            <div style={styles.actionButtons}>
              <button style={styles.actionButton} onClick={() => navigate(`/lesson/${topicId}/${subtopicId}/challenges`)}>
                Start Challenges
              </button>
              <button
                style={{ ...styles.actionButton, ...styles.secondaryButton }}
                onClick={resetLesson}
              >
                Review Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressRocket}>
          <div style={styles.progressFill}></div>
          <div style={styles.rocket}>{progress === 100 ? '🎉' : '🚀'}</div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;