//Components

//Libraries
import React from "react";
import { Link } from "react-router-dom";

//Bootstrap
import Col from "react-bootstrap/Col";

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

//This function will contain the day number, 1,2,3,4,5
function DayNumber() {
  const currentDate = new Date();
  const start = currentDate.getDate();
  const end = start + 7;

  const numbers = [];

  for (let i = start; i <= end; i++) {
    let day = i;
    if (day > getDaysInMonth(currentDate)) {
      day = i - getDaysInMonth(currentDate);
    }
    numbers.push(day);
  }

  return (
    <React.Fragment>
      {numbers.map((day) => (
        <Col key={day}>
          {day < 10 ? (
            <Link to={`/calender/0${day}`}>{day}</Link>
          ) : (
            <Link to={`/calender/${day}`}>{day}</Link>
          )}
        </Col>
      ))}
    </React.Fragment>
  );
}

export default DayNumber;
