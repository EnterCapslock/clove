import { Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import styles from "../css modules/components/TitleAndProfile.module.scss";

import profile from "../assets/images/DashboardPage/profile.svg";

export default function TitleAndProfile({ title, description, topic }) {
  return (
    <Row
    // style={{ backgroundColor: "red" }}
    >
      <Col
        className="ps-2 m-0 d-flex flex-column align-items-start justify-content-end"
        // style={{ backgroundColor: "blue" }}
      >
        <h2
          // style={{ backgroundColor: "green" }}
          className="m-0 p-0"
        >
          {title}
        </h2>
        <h5
          // style={{ backgroundColor: "orange" }}
          className="m-0 pb-1 pt-2"
        >
          {description}
        </h5>
      </Col>
      <Col className="d-flex justify-content-center align-items-end text-white">
        <h2
          // style={{ backgroundColor: "orange" }}
          className="m-0 pb-2 p-0"
        >
          {topic}
        </h2>
      </Col>

      <Col
        className="me-2 p-0 d-flex justify-content-end"
        //style={{ backgroundColor: "yellow" }}
      >
        <Image
          className={styles.profileImg}
          src={profile}
          fluid
          // style={{ backgroundColor: "blue" }}
        ></Image>
      </Col>
    </Row>
  );
}
