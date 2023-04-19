import Nav from "react-bootstrap/Nav";
import React from "react";
import { useLocation } from "react-router";
import { useContext } from "react";
import { myContext } from "./OAuthContext";
import { MdLiveTv } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
function Navigation() {
  const location = useLocation();

  const userObject = useContext(myContext);

  return (
    <React.Fragment>
      {userObject ? (
        <React.Fragment>
          {" "}
          {location.pathname === "/" ? (
            <div className="tv">
            <MdLiveTv/>

            <Nav.Link href="/calender" id="tva">TV Guide</Nav.Link>
            </div>
          ) : (
            <div className="tv">
            <AiOutlineHome/>
            <Nav.Link href="/">Home</Nav.Link>
            </div>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Navigation;
