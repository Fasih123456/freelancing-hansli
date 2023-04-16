import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import React, { useState, useContext } from "react";
import { myContext } from "./OAuthContext";

//This component shows the offcanvas for the selected show
function OffCanvas({ selectedShow, setSelectedShow }) {
  const userObject = useContext(myContext);

  const processShowReminder = () => {
    console.log("Reminder for", selectedShow.name);
    axios
      .post(
        "http://localhost:3001/api/reminders",
        {
          id: selectedShow.id,
          name: selectedShow.name,
          start_time: `${selectedShow.startTime}:00`,
          end_time: `${selectedShow.endTime}:00`,
          day: selectedShow.day,
          userid: userObject.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      });
  };

  const handleClose = () => setSelectedShow(null);

  const offcanvas = selectedShow && (
    <Offcanvas show={!!selectedShow} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{selectedShow.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {selectedShow.image ? (
          <img src={selectedShow.image} />
        ) : (
          <p style={{ color: "red" }}>No image to display :( </p>
        )}

        <p>{selectedShow.summary}</p>
        <p>
          <span>Network: </span>
          {selectedShow.network}
        </p>
        <p>{selectedShow.rating}</p>
        <p>
          <span>Time: </span>
          {selectedShow.startTime}:00 - {selectedShow.endTime}:00
        </p>
        {userObject ? (
          <React.Fragment>
            <button
              onClick={(e) => {
                processShowReminder();
              }}
            >
              Remind Me When this Show is On
            </button>

            <p>Note: We will send you an email 15 minutes before the Show starts </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <button onClick={handleClose}>Close</button>
            <p>Sign in to set a reminder</p>
          </React.Fragment>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );

  return <div>{offcanvas}</div>;
}

export default OffCanvas;
