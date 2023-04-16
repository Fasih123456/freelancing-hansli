import Nav from "react-bootstrap/Nav";
import React from "react";
import { useLocation } from "react-router";
import { useContext } from "react";
import { myContext } from "./OAuthContext";

function Navigation() {
  const location = useLocation();

  const userObject = useContext(myContext);

  return (
    <React.Fragment>
      {userObject ? (
        <React.Fragment>
          {" "}
          {location.pathname === "/" ? (
            <Nav.Link href="/calender">TV Guide</Nav.Link>
          ) : (
            <Nav.Link href="/">Home</Nav.Link>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Navigation;
