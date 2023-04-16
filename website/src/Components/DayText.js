//Components

//Libraries
import React from "react";

//Bootstrap
import Col from "react-bootstrap/Col";

//CSS
import "./Calender.css";

//this function will have the day test, Sat, Sun, Mon
function DayText() {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDate = new Date();
  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
  const start = daysOfWeek.indexOf(currentDayOfWeek);
  const end = daysOfWeek.indexOf(currentDayOfWeek) + 7;

  const dates = [];
  for (let i = start; i <= end; i++) {
    const index = (i + daysOfWeek.length) % daysOfWeek.length; // Handle wrapping around to the beginning of the array
    dates.push(daysOfWeek[index]);
  }

  return (
    <React.Fragment>
      {dates.map((date) => (
        <Col key={date} className="col-date">
          {date}
        </Col>
      ))}
    </React.Fragment>
  );
}

export default DayText;
