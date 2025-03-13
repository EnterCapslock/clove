import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import PreAssessment from "../components/PreAssessment";
import PostAssessment from "../components/PostAssessment";

const lessons = [
  {
    name: "Conditional and Loops",
    progress: 54,
    topics: [
      { name: "If-Else Statements" },
      { name: "For Loops" },
      { name: "While Loops" },
    ],
  },
  {
    name: "Methods and Functions",
    progress: 54,
    topics: [
      { name: "Defining Functions" },
      { name: "Function Parameters" },
      { name: "Return Statements" },
    ],
  },
];

const MyDeck = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [showPreAssessment, setShowPreAssessment] = useState(false);
  const [showPostAssessment, setShowPostAssessment] = useState(false);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setShowTopicsModal(true);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setShowPreAssessment(true);
  };

  return (
    <Container fluid className="d-flex vh-100 p-0">
      {/* Sidebar on the left */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#232529",
          minHeight: "100vh",
        }}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <Container
        fluid
        className="d-flex flex-grow-1 justify-content-center align-items-center"
        style={{ backgroundColor: "#232529", color: "white" }}
      >
        <div className="text-center" style={{ maxWidth: "600px" }}>
          <h4 className="text-white mb-4">What do you want to learn today?</h4>
          <Row className="g-3 justify-content-center">
            {lessons.map((lesson, index) => (
              <Col
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                className="d-flex justify-content-center"
              >
                <Card
                  onClick={() => handleLessonClick(lesson)}
                  className="p-3 text-white text-center d-flex flex-column justify-content-center align-items-center"
                  style={{
                    width: "500px",
                    height: "180px",
                    backgroundColor: "#3F3F46",
                    cursor: "pointer",
                    borderRadius: "12px",
                    border: "1px solid #494950",
                  }}
                >
                  <h6 className="fw-bold mb-2">{lesson.name}</h6>
                  <div
                    className="w-100 bg-dark rounded"
                    style={{ height: "10px" }}
                  >
                    <div
                      className="bg-primary rounded"
                      style={{ width: `${lesson.progress}%`, height: "100%" }}
                    ></div>
                  </div>
                  <span className="mt-2">{lesson.progress}% Completed</span>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Topics Modal */}
        <Modal
          show={showTopicsModal}
          onHide={() => setShowTopicsModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedLesson?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedLesson?.topics.map((topic, index) => (
              <Button
                key={index}
                variant="outline-dark"
                className="w-100 mb-2"
                onClick={() => handleTopicClick(topic)}
              >
                {topic.name}
              </Button>
            ))}
            {selectedLesson?.topics.length > 0 && (
              <Button
                variant="primary"
                className="w-100 mt-3"
                onClick={() => setShowPostAssessment(true)}
              >
                Take Post-Assessment
              </Button>
            )}
          </Modal.Body>
        </Modal>

        {/* Pre-Assessment Modal */}
        <PreAssessment
          show={showPreAssessment}
          handleClose={() => setShowPreAssessment(false)}
          lesson={selectedLesson?.name}
          onSubmit={() => setShowPreAssessment(false)} // Ensures onSubmit exists
        />

        {/* Post-Assessment Modal */}
        <PostAssessment
          show={showPostAssessment}
          handleClose={() => setShowPostAssessment(false)}
          lesson={selectedLesson?.name}
        />
      </Container>
    </Container>
  );
};

export default MyDeck;
