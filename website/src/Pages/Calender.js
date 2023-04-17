//Components
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DayNumber from "../Components/DayNumber";
import DayText from "../Components/DayText";
import EachHour from "../Components/EachHour";

//Libraries
import React, { useState, useEffect } from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//CSS
import "./assets/Calender.css";
import { Button } from "react-bootstrap";

//This componenet will have the main Calender componenet in it.
function Calender() {
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleMoveLeft = () => {
    if (offset <= 0) {
      setOffset((prevOffset) => prevOffset + 100);
    }
  };

  const handleMoveRight = () => {
    if (offset > -1500) {
      setOffset((prevOffset) => prevOffset - 100);
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      <Header />
      <Container style={{ marginTop: "150px" }} className="calender" aria-label="Calendar">
        <div
          style={{
            display: "inline-block",
            minWidth: "100%",
            overflowX: "auto",
            overflowY: "scroll",
            overflow: "scroll",
          }}
        >
          <Row>
            <Col xs={1}></Col>
            <Col>
              <Button className="suggestion-container whiteOutLine" onClick={handleMoveLeft}>
                Move Left
              </Button>
            </Col>
            <Col>
              <Button className="suggestion-container whiteOutLine" onClick={handleMoveRight}>
                Move Right
              </Button>
            </Col>
            <Col xs={1}></Col>
          </Row>

          <Row className="daytext-row">
            <DayText />
          </Row>
          <Row className="daynumber-row">
            <DayNumber />
          </Row>

          <EachHour offset={offset} />
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default Calender;
