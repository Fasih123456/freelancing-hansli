import React from "react";
import Carousel from "react-bootstrap/Carousel";

//This component is for the Homepage Caoursel

import image1 from "../Pages/assets/3.jpg";
import image2 from "../Pages/assets/2.jpg";
import image3 from "../Pages/assets/hero-image-3.jpg";
import image4 from "../Pages/assets/1.jpg";
import SearchBar from "./SearchBar";

import "../App.css";

function HPCarousel() {
  return (
    <React.Fragment>
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={image4} alt="First slide" />

          <Carousel.Caption>
            <h3 className="carousel-heading">High Accessibility User Rating</h3>
            <p>99% of our users are rating TV2nite accessibility tools</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="Second slide" />

          <Carousel.Caption>
            <h3 className="carousel-heading">Best TV Guide Award</h3>
            <p>Voted as Best TV guide in 2022</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image1} alt="Third slide" />

          <Carousel.Caption>
            <h3 className="carousel-heading">Punctual Email Reminders</h3>
            <p>Punctual Email reminders for your favourite TV show </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </React.Fragment>
  );
}

export default HPCarousel;
