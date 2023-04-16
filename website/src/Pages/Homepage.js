//Components
import SearchBar from "../Components/SearchBar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

//Libraries
import React, { useEffect } from "react";
import { ContactUs } from "../Components/Email";
import HPCarousel from "../Components/HPCarousel";

//Bootstrap

//CSS

function Homepage() {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, [data]);

  return (
    <React.Fragment>
      <Header />
      <body>
        <HPCarousel />
      </body>
      <Footer />
    </React.Fragment>
  );
}

export default Homepage;
