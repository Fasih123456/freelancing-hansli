//Components

//Libraries
import React, { useState, useEffect, useContext } from "react";

import { myContext } from "./OAuthContext";

import { useLocation } from "react-router-dom";

import axios from "axios";

import striptags from "striptags";
import accessImage from "../Pages/assets/accessibility.png";
import OffCanvas from "./OffCanvas";

//Bootstrap
import { Row, Col } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap";
//CSS

function generateHours() {
  const hours = [];

  for (let i = 0; i < 24; i++) {
    hours.push(
      <Col key={`hour-${i}`} aria-label={`displaying hour ${i}`}>
        {i}
      </Col>
    );
  }

  return hours;
}

function getNextMonth(currentMonth) {
  // Convert currentMonth to a number and add 1 to it
  let nextMonth = Number(currentMonth);
  // If nextMonth is less than 10, pad it with a leading zero
  if (nextMonth < 10) {
    nextMonth = "0" + nextMonth;
  }
  return nextMonth;
}

function getDayOfWeek(dateString) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateParts = dateString.split("/");
  const dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  return daysOfWeek[dateObj.getDay()];
}

function calculateEndTime(startTime, runtime) {
  // Parse the start time into hours and minutes
  const [startHour, startMinute] = startTime.split(":").map(Number);

  // Convert runtime from minutes to hours
  let runtimeHour = Math.floor(runtime / 60);
  let runtimeMinute = runtime % 60;

  // Calculate the total time in hours
  let totalHour = startHour + runtimeHour;
  let totalMinute = startMinute + runtimeMinute;

  // Check if totalMinute exceeds 60, and adjust totalHour accordingly
  if (totalMinute >= 60) {
    totalHour++;
  }

  // Format the total time into a string in HH:mm format
  const endTime = `${totalHour.toString().padStart(2, "0")}:${totalMinute
    .toString()
    .padStart(2, "0")}`;

  return endTime;
}

function EachHour({ offset }) {
  const [selectedShow, setSelectedShow] = useState(null);

  const [shows, setShows] = useState([
    { name: "BBC", startTime: 1, endTime: 10 },
    { name: "CNN", startTime: 0, endTime: 3 },
  ]);

  console.log(shows);

  const path = useLocation().pathname;
  const number = path.split("/").pop();

  const day = number;

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let currentDay = new Date().getDate();

  currentMonth = currentMonth.toString().padStart(2, "0");
  currentDay = currentDay.toString().padStart(2, "0");

  const rows = [];
  const region = "GB";

  const handleShowDetails = (show) => {
    setSelectedShow(show);
  };

  const fetchShows = () => {
    let URL;
    let data;
    let mappedData;

    //This code is very buggy but vital, touch at your own risk
    if (day == undefined || day == "" || day == "calender") {
      //That means a new month has started
      currentMonth = getNextMonth(currentMonth);
      URL = `https://api.tvmaze.com/schedule?country=${region}&date=${currentYear}-${currentMonth}-${currentDay}`;
    } else {
      if (day < 10) {
        currentMonth = getNextMonth(currentMonth);
      }

      URL = `https://api.tvmaze.com/schedule?country=${region}&date=${currentYear}-${currentMonth}-${day}`;
    }

    console.log(URL);

    axios
      .request(options)
      .then((response) => {
        data = response.data.tv_episodes;
        console.log(data);
      })
      .then(() => {
        mappedData = data.map((episode) => ({
          id: episode.tvseries_imdb_id ? episode.tvseries_imdb_id : null,
          name: episode.tvseries_name ? episode.tvseries_name : null,

          startTime: episode.air_time ? episode.air_time : null,
          endTime: calculateEndTime(episode.air_time, episode.runtime),
          episodeName: episode.tvseries_name ? episode.tvseries_name : null,
          network: episode.network || "Unknown",

          summary: episode.summary ? striptags(episode.summary) : null,
          season_number: episode.season_number ? episode.season_number : null,
          air_date: episode.air_date ? episode.air_date : null,
        }));
      })
      .then(() => {
        setShows(mappedData);
      })
      .catch(function (error) {
        console.error(error);
      });

    /*axios
      .get(URL)
      .then((response) => {
        data = response.data;
        console.log(data);
      })
      .then(() => {
        mappedData = data.map((episode) => ({
          id: episode.id ? episode.id : null,
          name: episode.show?.name || episode.name || "Unknown",

          startTime: new Date(episode.airstamp).getHours(),
          endTime: new Date(episode.airstamp).getHours() + Math.floor(episode.runtime / 60),
          network: episode.show?.network?.name || "Unknown",
          image: episode.image ? episode.image.medium : null,
          summary: episode.summary ? striptags(episode.summary) : null,
          rating: episode.rating ? episode.rating.average : null,
          day: episode.name ? getDayOfWeek(episode.name) : null,
        }));
      })
      .then(() => {
        setShows(mappedData);
      });*/
  };

  const options = {
    method: "GET",
    url: "https://movies-tv-shows-database.p.rapidapi.com/",
    params: { country: "GB" },
    headers: {
      Type: "get-tvschedule-bycountry",
      "X-RapidAPI-Key": "795ff86a18msha7002734b039e2cp120de1jsn1e5c26b3b225",
      "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetchShows();
  }, [day]);

  // Generate the program rows
  shows.forEach((show, index) => {
    const programCells = [];
    let nextTime = false;
    let Counter = 0;
    const startTime = parseInt(show.startTime);
    const endTime = parseInt(show.endTime);
    console.log(show);

    // Generate the program cells for each hour
    for (let i = 0; i < 24; i++) {
      const isHighlighted = i >= startTime && i <= endTime;
      if (isHighlighted && i === startTime && startTime !== endTime) {
        nextTime = true;
        Counter = 0;
      } else if (nextTime && Counter < 1) {
        Counter++;
      } else {
        nextTime = false;
        Counter = 0;
      }
      programCells.push(
        <Col
          key={`program-${i}`}
          className={`col-program ${isHighlighted ? "highlighted" : ""} row-show`}
          aria-label={`Program ${show.name} starts at ${i}:00 on ${show.network}`}
          onClick={() => handleShowDetails(show)}
        >
          {isHighlighted && i === startTime && startTime !== endTime ? ( //This is for more than 1 hour shows
            <>{show.name}</>
          ) : isHighlighted && i === startTime && startTime === endTime ? ( //This is for 1 hour shows
            <>
              {show.name} <img src={accessImage} style={{ maxWidth: "20px" }} />
            </>
          ) : nextTime && endTime === i ? ( //This for shows which are 2 hours long
            <>
              {show.startTime}-{show.endTime}
              <img src={accessImage} style={{ maxWidth: "20px" }} />
            </>
          ) : nextTime ? ( //This is for displaying on the next COL for hours > 2
            <>
              {show.startTime}-{show.endTime}
            </>
          ) : show.endTime === i ? ( //This is for displayng the images at the end of the COL
            <>
              <img src={accessImage} style={{ maxWidth: "20px" }} />
            </>
          ) : (
            <></>
          )}
        </Col>
      );
    }

    //console.log(programCells);

    // Generate the row for this program
    if (show.network != "Unknown") {
      rows.push(
        <Row
          key={`row-${index}`}
          className="row-program"
          aria-label={`Programs for ${show.network}`}
        >
          {show.network == "BBC Two" && (
            <React.Fragment>
              <Col className="col-channel BBC-Two"></Col>
              <React.Fragment>{programCells}</React.Fragment>
            </React.Fragment>
          )}

          {show.network == "Channel 5" && (
            <React.Fragment>
              <Col className="col-channel Channel-5"></Col>
              <React.Fragment>{programCells}</React.Fragment>
            </React.Fragment>
          )}

          {show.network == "Channel 4" && (
            <React.Fragment>
              <Col className="col-channel Channel-4"></Col>
              <React.Fragment>{programCells}</React.Fragment>
            </React.Fragment>
          )}

          {show.network == "ITV1" && (
            <React.Fragment>
              <Col className="col-channel ITV1"></Col>
              <React.Fragment>{programCells}</React.Fragment>
            </React.Fragment>
          )}

          {show.network == "Sky Documentaries" && (
            <React.Fragment>
              <Col className="col-channel Sky-Documentaries"></Col>
              <React.Fragment>{programCells}</React.Fragment>
            </React.Fragment>
          )}

          {show.network == "BBC One" && (
            <React.Fragment>
              <Col className="col-channel BBC-One"></Col>
              <React.Fragment>{programCells}</React.Fragment>
            </React.Fragment>
          )}

          {show.network != "BBC One" &&
            show.network != "ITV1" &&
            show.network != "Sky Documentaries" &&
            show.network != "Channel 4" &&
            show.network != "Channel 5" &&
            show.network != "BBC Two" && (
              <React.Fragment>
                <Col className="col-channel">{show.network}</Col>
                <React.Fragment>{programCells}</React.Fragment>
              </React.Fragment>
            )}
        </Row>
      );
    }
  });

  return (
    <React.Fragment>
      <div>
        <div style={{ position: "relative", left: offset }} aria-label="TV program schedule">
          <Row className="row-header ">
            <Col>Time</Col>
            {generateHours()}
          </Row>

          <div
            className="wrapper"
            style={{ right: { offset }, transition: "all 0.3s ease-in-out" }}
          >
            <div className="container-programs" style={{ right: { offset } }}>
              {rows}
            </div>
          </div>
        </div>
      </div>
      <OffCanvas selectedShow={selectedShow} setSelectedShow={setSelectedShow} />
    </React.Fragment>
  );
}

export default EachHour;
