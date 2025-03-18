import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PreAssessment = ({ show, handleClose, lesson, onSubmit }) => {
  const [answers, setAnswers] = useState({}); // Store selected answers

  // Example questions (you can update these dynamically)
  const questions = [
    {
      id: 1,
      text: "What is a loop?",
      options: ["A function", "A repeating structure", "A variable"],
    },
    {
      id: 2,
      text: "Which loop is best for a fixed number of iterations?",
      options: ["While", "For", "Do-While"],
    },
  ];

  // Handle answer selection
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  // Check if all questions are answered
  const isFormComplete = questions.every((q) => answers[q.id] !== undefined);

  // Submit PreAssessment
  const handleSubmit = () => {
    if (!isFormComplete) {
      alert("Please answer all questions before submitting.");
      return;
    }

    console.log("PreAssessment Answers:", answers);
    onSubmit(); // Unlock topics after completion
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pre-Assessment: {lesson}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {questions.map((question) => (
            <div key={question.id} className="mb-3">
              <h6>{question.text}</h6>
              {question.options.map((option, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  name={`question-${question.id}`}
                  label={option}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
              ))}
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreAssessment;
