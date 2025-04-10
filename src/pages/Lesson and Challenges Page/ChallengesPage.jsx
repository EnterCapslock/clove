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
import CosmicJavaGame from "./../../components/challenges/CosmicJavaGame";

const ChallengesPage = () => {
  const navigate = useNavigate(); // Set up navigation

  return (
    <>
      <CosmicJavaGame />
    </>
  );
};

export default ChallengesPage;
