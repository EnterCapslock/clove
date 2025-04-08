import React from 'react';

const TimerRing = ({ progress }) => {
  const radius = 35;  // Reduced radius for a smaller timer
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="70" height="70" viewBox="0 0 100 100">  {/* Adjusted width and height */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#444"
        strokeWidth="8"  // Slightly thinner stroke for a smaller timer
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#A6AAFB"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)"
        transition="stroke-dashoffset 1s ease"
      />
    </svg>
  );
};

export default TimerRing;


// other stzle timer ring

// const TimerRing = ({ progress }) => {
//   return (
//     <div className={styles.timerRingContainer}>
//       <div
//         className={styles.timerRing}
//         style={{
//           background: `conic-gradient(#A6AAFB ${progress}%, #232529 ${progress}%)`,
//         }}
//       />
//       <div className={styles.timerCenter}>
//         <span className={styles.timerText}>{Math.round(progress)}%</span>
//       </div>
//     </div>
//   );
// };


// css 
// .timerRingContainer {
//   position: relative;
//   width: 70px; /* Reduced size */
//   height: 70px; /* Reduced size */
//   margin-top: 1rem;
// }

// .timerRing {
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   background: #232529;
// }

// .timerCenter {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: #E2E8F0;
// }

// .timerText {
//   font-size: 1rem; /* Smaller text size */
//   color: #A6AAFB;
// }
