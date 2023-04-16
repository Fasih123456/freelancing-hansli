//Components

//Libraries
import React, { useState, useEffect } from "react";
//Bootstrap

//CSS

function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    console.log(windowWidth, location);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, location]);

  //TODO: footer is broken in mobile view
  return (
    <React.Fragment>
      <footer id="footer" class="footer">
        <div class="container">
          <div class="row gy-4">
            <div class="col-lg-5 col-md-12 footer-info">
              <a href="index.html" class="logo d-flex align-items-center">
                <img className="logoImage" src="assets/img/tv2nitelogo.png" alt="" />
              </a>
              <p style={{ textAlign: "left" }}>
                TV2nite is your ultimate accessible TV guide that has been created to make your life
                much simpler. It offers a well-designed interface which shows the schedule of all
                your favorite TV shows and movies all at one place. Furthermore, TV2nite comes with
                a range of tools and features that you haven’t seen anywhere else. So, buckle up
                because, you are in for a wild ride with TV2nite. Never miss an episode of your show
                ever again and enjoy TV the way you like it.
              </p>
            </div>

            <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
                TV2nite Ltd <br />
                Birmingham Business Park.
                <br />
                Solihull Parkway <br />
                Birmingham, B37 7YB <br />
                United Kingdom <br />
                <br />
                <strong>Phone:</strong> 0121 750045
                <br />
                <strong>Email:</strong> tv2nite.cs@gmail.com
                <br />
              </p>
            </div>
            <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Follow Us On Social Media</h4>
              <div class="social-media-icons mt-3">
                <a
                  href="https://www.facebook.com/tv2nite"
                  className="social-media-links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://twitter.com/tv2nite_"
                  className="social-media-links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com/tv2nite_/"
                  className="social-media-links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UC2uBvCI4Cj8TO2i-mKqqwqQ"
                  target="_blank"
                  className="social-media-links"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="container mt-4" aria-label="copyright">
          <div class="copyright">
            Designed By
            <strong style={{ paddingLeft: "10px" }}>
              <a href="https://sysmologic.com">
                <span class="company-name">Sysmologic</span>
              </a>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
