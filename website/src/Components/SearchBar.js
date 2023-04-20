//Components

//Libraries
import React, { useState, useContext } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
//Bootstrap
import { AiOutlineSearch } from "react-icons/ai";
import { myContext } from "./OAuthContext";

//CSS

import "./SearchBar.css";
//This component holds the search bar for this component
function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const accessKey = process.env.REACT_APP_DICTIONARY_ACCESS_KEY;
  const [show, setShow] = useState(false);

  const userObject = useContext(myContext);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) {
      setRequestCount(requestCount + 1);
      if (requestCount >= 10) {
        setTimeout(() => {
          setRequestCount(0);
        }, 5000); // wait 5 seconds before resetting request count
      }
      axios
        .get(`https://api.tvmaze.com/singlesearch/shows?q=${query}`)
        .then((response) => {
          //console.log(response.data);

          let countryCode = null;
          if (response.data.webChannel && response.data.webChannel.country) {
            countryCode = response.data.webChannel.country.code;
          }

          const time = response.data.schedule.time || "";
          const days = response.data.schedule.days || [];

          //console.log(countryCode, time, days);

          // Check if country code is GB and schedule time and days are not empty
          if ((countryCode == "GB" || countryCode == null) && time !== "" && days.length !== 0) {
            setSuggestions([response.data]);
            //console.log(suggestions[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleAdd = () => {
    //We will first need the name, start_time, end_time and days of the show
    const id = suggestions[0].id;
    const name = suggestions[0].name;
    const scheduleTime = suggestions[0].schedule.time;
    const scheduleDays = [suggestions[0].schedule.days];
    //If there are multiple days then we will need to add the show multiple times with different days
    for (let i = 0; i < scheduleDays.length; i++) {
      addEachShow(id, name, scheduleTime, scheduleDays[i]);
    }

    setShow(true);
  };

  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible style={{ width: "100%" }}>
        <Alert.Heading>Your Show Has Been Successfully Added</Alert.Heading>
        <p>
          You will now receive a notification 15 minutes before your show starts. You can change
          this in your settings.
        </p>

        <p>
          The show you have added is {suggestions[0].name} and time is
          {suggestions[0].schedule.time}
        </p>
      </Alert>
    );
  }

  const addEachShow = (id, name, scheduleTime, scheduleDay) => {
    //We will need to add the show to the database
    axios.post(
      "http://localhost:3001/api/reminders",
      {
        id: id,
        name: name,
        start_time: `${scheduleTime}:00`,
        end_time: `${scheduleTime}:00`,
        day: scheduleDay,
        userid: userObject.id,
      },
      { withCredentials: true }
    );
  };

  return (
    <div>
      <div id="search-bar1" action="#" className="search1" data-aos="fade-up" data-aos-delay="200">
        <input
          type="text"
          className="search-box__input"
          placeholder="Search Your Show"
          value={query}
          onChange={handleQueryChange}
          aria-label="Search bar for your favorite show"
        />
        <button type="submit" onClick={handleAdd}>
          <AiOutlineSearch />
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="suggestion-container" style={{ paddingTop: "0px", marginTop: "0px" }}>
          <p>
            {suggestions[0].name}{" "}
            {suggestions[0].schedule.time !== "" && <>{suggestions[0].schedule.time} </>}
            {suggestions[0].schedule.days.length > 0 && (
              <>{suggestions[0].schedule.days.join(", ")}</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
