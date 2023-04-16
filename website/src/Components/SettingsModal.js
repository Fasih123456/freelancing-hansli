import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navigation from "./Navigation";
import axios from "axios";
import { useContext } from "react";
import { myContext } from "./OAuthContext";

function SettingsModal({
  show,
  setShow,
  textMultipler,
  handleClose,
  toggleTheme,

  handleTextSizeChange,
}) {
  const userObject = useContext(myContext);
  const [buttonValue, setButtonValue] = useState("OFF");

  const updateEmailPreference = async () => {
    axios
      .put(`http://localhost:3001/api/reminders/${userObject.id}`, {
        preference: buttonValue,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const toggleChekbox = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    if (e.target.value == undefined) {
      setButtonValue("ON");
      updateEmailPreference();
    } else {
      setButtonValue("OFF");
      updateEmailPreference();
    }

    document.getElementById("button-uniqueID2").classList.toggle("transform-btn-active");
    document.getElementById("control-uniqueID2").classList.toggle("transform-control-active");
  };

  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ borderColor: "#FF0000" }}>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col className="modal-text">Dark Mode</Col>
              <Col>
                <div className="toggle-btn-wrapper" onClick={toggleTheme}>
                  <div
                    id="control-uniqueID1"
                    className="toggle-btn-control transform-control"
                  ></div>
                  <input
                    type="button"
                    id="button-uniqueID1"
                    value="ON     OFF"
                    className="toggle-btn-default transform-btn"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="modal-text">Email Reminders</Col>
              <Col>
                <div className="toggle-btn-wrapper" onClick={(e) => toggleChekbox(e)}>
                  <div
                    id="control-uniqueID2"
                    className="toggle-btn-control transform-control"
                    style={{ opacity: 0.5 }}
                  ></div>
                  <input
                    type="button"
                    id="button-uniqueID2"
                    value={buttonValue}
                    className="toggle-btn-default transform-btn"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="modal-text">Adjust Text Size</Col>
              <Col>
                <Form.Range
                  min={0}
                  max={100}
                  value={((textMultipler - 0.1) / 1.9) * 100} // convert the multiplier (0.1 - 2) to a value (0 - 100) for the range slider
                  onChange={handleTextSizeChange}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderColor: "#FF0000" }}></Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default SettingsModal;
