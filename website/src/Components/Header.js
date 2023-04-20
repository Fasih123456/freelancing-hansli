//Components

//Libraries
import React, { useState, useEffect } from "react";

import HeaderNavBar from "./HeaderNavBar";

import "./Header.css";

//CSS
function Header() {
  const [show, setShow] = useState(false);
  const [buttonValue, setButtonValue] = useState("OFF");

  const [textMultipler, setTextMultipler] = useState(1);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [location, setLocation] = useState(window.location.pathname);

  const handleTextSizeChange = (e) => {
    const { value } = e.target;
    const multiplier = 0.1 + (value / 100) * 1.75; // convert the value (0 - 100) to a multiplier (0.1 - 2)
    document.documentElement.style.setProperty("--text-multiplier", multiplier);
    setTextMultipler(e.target.value);
  };

  const toggleTheme = () => {
    if (localStorage.getItem("theme") == "whiteTheme") {
      localStorage.setItem("theme", "darkTheme");
    } else {
      localStorage.setItem("theme", "whiteTheme");
    }

    document.getElementById("button-uniqueID1").classList.toggle("transform-btn-active");
    document.getElementById("control-uniqueID1").classList.toggle("transform-control-active");
    document.body.classList.toggle("whiteTheme");
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    //console.log(windowWidth, location);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, location]);

  return (
    <React.Fragment>
      <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between navbar-outer">
          <a href="/" class="logo d-flex align-items-center" aria-label="TV2NITE Homepage">
            <img src="assets/img/tv2nitelogo.png" alt="" />
          </a>

          <HeaderNavBar
            show={show}
            setShow={setShow}
            textMultipler={textMultipler}
            toggleTheme={toggleTheme}
            buttonValue={buttonValue}
            handleTextSizeChange={handleTextSizeChange}
          />
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
