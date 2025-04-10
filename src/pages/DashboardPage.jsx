import React from "react";
import {
  FaTrophy,
  FaCheckCircle,
  FaQuestionCircle,
  FaLayerGroup,
  FaChartLine,
  FaBrain,
  FaChartPie,
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
  FaStarHalfAlt,
  FaHome,
  FaChartLine as FaChartLineNav,
  FaLayerGroup as FaLayerGroupNav,
  FaSignOutAlt,
  FaLeaf,
} from "react-icons/fa";
import styles from "../css modules/pages/DashboardPage.module.scss";
import TitleAndProfile from "../components/TitleAndProfile";

const DashboardPage = () => {
  // Data that would normally come from props or context
  const learningModes = [
    {
      name: "Code Completion Mode",
      category: "Your strongest mode",
      icon: <FaCheckCircle />,
      accuracy: 92,
      accuracyClass: "High",
      attempts: 127,
      timeSpent: "24h",
      completionRate: 87,
    },
    {
      name: "Code Fixer Mode",
      category: "Needs improvement",
      icon: <FaQuestionCircle />,
      accuracy: 68,
      accuracyClass: "Medium",
      attempts: 84,
      timeSpent: "15h",
      completionRate: 72,
    },
    {
      name: "Output Tracing Mode",
      category: "Moderate performance",
      icon: <FaLayerGroup />,
      accuracy: 75,
      accuracyClass: "Medium",
      attempts: 63,
      timeSpent: "9h",
      completionRate: 81,
    },
  ];

  const topics = [
    {
      name: "Topic 1: Variables",
      progress: 80,
      subtopics: [
        {
          name: "Subtopic 1: Declaring Variables",
          mastery: "Intermediate",
          progress: 75,
          retention: 68,
          strengths: [
            "Variable naming conventions",
            "Data type assignments",
            "Initialization techniques",
          ],
          weaknesses: ["Scope understanding", "Hoisting concepts"],
        },
        {
          name: "Subtopic 2: Variable Scope",
          mastery: "Beginner",
          progress: 40,
          retention: 35,
          strengths: ["Basic scope concepts", "Global variables"],
          weaknesses: ["Block scope", "Function scope"],
        },
      ],
    },
    {
      name: "Topic 2: Loops",
      progress: 45,
      subtopics: [],
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.progressContent}>
        <header>
          <div>
            <h1>Learning Progress</h1>
            <p>Detailed analysis of your learning performance</p>
          </div>
          <img
            className="profile"
            src="https://i.pravatar.cc/48?img=12"
            alt="User avatar"
          />
        </header>

        {/* Learning Mode Performance Section */}
        <section className={styles.learningModesSection}>
          <h2 className={styles.sectionTitle}>
            <FaTrophy /> Learning Mode Performance
          </h2>
          <div className={styles.modePerformanceGrid}>
            {learningModes.map((mode, index) => (
              // <!-- Completion Challenges -->
              <div key={index} className={styles.modeCard}>
                <div className={styles.modeHeader}>
                  <div className={styles.modeIcon}>{mode.icon}</div>
                  <div className={styles.modeInfo}>
                    <div className={styles.modeName}>{mode.name}</div>
                    <div className={styles.modeCategory}>{mode.category}</div>
                  </div>
                </div>
                <div className={styles.modeStats}>
                  <div className={styles.statItem}>
                    <span
                      className={`${styles.statValue} ${
                        styles[`accuracy${mode.accuracyClass}`]
                      }`}
                    >
                      {mode.accuracy}%
                    </span>
                    <span className={styles.statLabel}>Accuracy Rate</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{mode.attempts}</span>
                    <span className={styles.statLabel}>Attempts</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{mode.timeSpent}</span>
                    <span className={styles.statLabel}>Time Spent</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {mode.completionRate}%
                    </span>
                    <span className={styles.statLabel}>Completion Rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Topic Progress Sections */}
        {topics.map((topic, topicIndex) => (
          <section key={topicIndex} className={styles.topicProgress}>
            <div className={styles.topicHeader}>
              <h2 className={styles.topicTitle}>{topic.name}</h2>
              <div className={styles.overallProgress}>
                <div
                  className={styles.progressCircle}
                  style={{ "--progress": `${topic.progress}%` }}
                >
                  <span className={styles.progressPercent}>
                    {topic.progress}%
                  </span>
                </div>

                <span>Overall Progress</span>
              </div>
            </div>

            <div className={styles.subtopics}>
              {/* <!-- Subtopic 1 --> */}
              {topic.subtopics.map((subtopic, subtopicIndex) => (
                <div key={subtopicIndex} className={styles.subtopicCard}>
                  <div className={styles.subtopicHeader}>
                    <h3 className={styles.subtopicName}>{subtopic.name}</h3>
                    <span
                      className={`${styles.masteryLevel} ${
                        styles[`mastery${subtopic.mastery}`]
                      }`}
                    >
                      {subtopic.mastery === "intermediate" ? (
                        <FaStarHalfAlt />
                      ) : (
                        <FaStar />
                      )}
                      {subtopic.mastery.charAt(0).toUpperCase() +
                        subtopic.mastery.slice(1)}
                    </span>
                  </div>

                  <div className={styles.progressDetails}>
                    <div className={styles.progressMetrics}>
                      <div className={styles.metricCard}>
                        <div className={styles.metricTitle}>
                          <FaChartLine /> Progress Completion
                        </div>
                        <div className={styles.progressBarContainer}>
                          <div
                            className={styles.progressBar}
                            style={{ width: `${subtopic.progress}%` }}
                          ></div>
                        </div>
                        <small>{subtopic.progress}% completed</small>
                      </div>

                      <div className={styles.metricCard}>
                        <div className={styles.metricTitle}>
                          <FaBrain /> Knowledge Retention
                        </div>
                        <div className={styles.progressBarContainer}>
                          <div
                            className={styles.progressBar}
                            style={{ width: `${subtopic.retention}%` }}
                          ></div>
                        </div>
                        <small>{subtopic.retention}% retention score</small>
                      </div>
                    </div>

                    <div className={styles.performanceAnalytics}>
                      <div className={styles.metricCard}>
                        <h4 className={styles.metricTitle}>
                          <FaChartPie /> Performance Analysis
                        </h4>

                        <div className={styles.strengthsWeaknesses}>
                          <div
                            className={`${styles.swCard}  ${styles.strengthCard}`}
                          >
                            <h5 className={styles.swTitle}>
                              <FaThumbsUp /> Strengths
                            </h5>
                            <div className={styles.swList}>
                              {subtopic.strengths.map((strength, i) => (
                                <div key={i} className={styles.swItem}>
                                  {strength}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div
                            className={`${styles.swCard}  ${styles.weaknessCard}`}
                          >
                            <h5 className={styles.swTitle}>
                              <FaThumbsDown /> Weaknesses
                            </h5>
                            <div className={styles.swList}>
                              {subtopic.weaknesses.map((weakness, i) => (
                                <div key={i} className={styles.swItem}>
                                  {weakness}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default DashboardPage;
