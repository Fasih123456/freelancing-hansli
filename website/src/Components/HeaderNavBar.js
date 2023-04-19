import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navigation from "./Navigation";
import { useContext } from "react";
import { myContext } from "./OAuthContext";
import SearchBar from "./SearchBar";
import LogoutImage64 from "./logout2.png";
import SettingsModal from "./SettingsModal";
import RedLogout from "../Pages/assets/sign-out-red.png";
import { AiOutlineSetting,AiOutlineCloseCircle } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsList } from 'react-icons/bs';
import image1 from "../Pages/assets/settingdark.png";

//This component holds the navbar for the header of this website
function HeaderNavBar({
  show,
  setShow,
  textMultipler,
  toggleTheme,
  buttonValue,
  handleTextSizeChange,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userObject = useContext(myContext);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setTimeout(function () {
      if (localStorage.getItem("theme") == "whiteTheme") {
        document.getElementById("button-uniqueID1").classList.add("transform-btn-active");
        document.getElementById("control-uniqueID1").classList.add("transform-control-active");
      }
    }, 100);
  };

  const GoogleLogin = async () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  const GoogleLogout = async () => {
    window.open("http://localhost:3001/auth/logout", "_self");
  };
  const [hide, setHide] = useState(false)
  
  const onHide = () => {
    setHide(!hide)
  }

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="blue" variant="white">
        <Container fluid>
          <Nav>
            <React.Fragment>
              

              <div  className="navbar1">
                {userObject ? (
                  <React.Fragment>
                    <Nav.Link>
                      <SearchBar />
                    </Nav.Link>
                    <Navigation />
                    <Nav.Link className="profile">
                      {windowWidth > 800 ? (
                        <img
                          src={userObject.photos[0].value}
                          alt=""
                          class="img-fluid rounded-circle"
                          style={{ maxHeight: "50px" }}
                        />
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}

                      <h1>
                        <a href="/" style={{ fontSize: "24px" }} id="name-link">
                          {userObject.displayName}
                        </a>
                      </h1>
                    </Nav.Link>

                    <Nav.Link>
                      <NavDropdown
                        title="Options"
                        id="basic-nav-dropdown "
                        style={{ paddingRight: "50px" }}
                        className="options"
                      >
                        <NavDropdown.Item href="#action/3.1" className="btn-drop">
                        <AiOutlineSetting onClick={handleShow} className="drop-icons"/>
                          {/* <img
                            className="settings darkMode"
                            src={image1}
                            alt=""
                            
                          /> */}
                          <Button 
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              paddingLeft: "70px",
                            }}
                            className="btn-logout "
                            onClick={handleShow}
                          >
                            Settings
                          </Button>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="nav-dropdown btn-drop">
                          {" "}
                          <BiLogOut onClick={GoogleLogout} className="drop-icons"/> 
                          
                          <Button 
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              paddingLeft: "60px",
                            }}
                            className="btn-logout "
                            onClick={GoogleLogout}
                          >
                            Logout
                          </Button>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav.Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button variant="success" className="login-button" onClick={GoogleLogin}>
                      Login
                    </Button>
                  </React.Fragment>
                )}
              </div>
              <div  className="navbar-responsive">
                {userObject ? (
                  <React.Fragment>
                    <Nav.Link>
                      <SearchBar />
                    </Nav.Link>
                    
                    

                    <Nav.Link className="profile">
                      
                        <img
                          src={userObject.photos[0].value}
                          alt=""
                          class="img-fluid rounded-circle"
                          style={{ maxHeight: "50px" }}
                        />
                      <h1>
                        <a href="/" style={{ fontSize: "24px" }} id="name-link">
                          {userObject.displayName}
                        </a>
                      </h1>
                    </Nav.Link>

                    {/* <Nav.Link className="profile">
                      {windowWidth > 800 ? (
                        <img
                          src={userObject.photos[0].value}
                          alt=""
                          class="img-fluid rounded-circle"
                          style={{ maxHeight: "50px" }}
                        />
                      ) 
                      : (
                        <React.Fragment></React.Fragment>
                      )
                      }

                      <h1>
                        <a href="/" style={{ fontSize: "24px" }} id="name-link">
                          {userObject.displayName}
                        </a>
                      </h1>
                    </Nav.Link> */}
                    <div className="ham" onClick={ () => { onHide()} }>
                    <BsList style={{ display: hide === false ? 'block' : 'none' }}/>
                    <AiOutlineCloseCircle style={{ display: hide === false ? 'none' : 'block' }}/>
                    </div>
                      <div className="list" style={{ display: hide === false ? 'none' : 'flex' }}>
                      
                        
                    <Navigation />
                        <div className="setting" onClick={handleShow}>
                          <AiOutlineSetting/>
                          <h5
                          // onClick={handleShow}
                          >Settings</h5>
                        </div>
                        <div className="setting" onClick={GoogleLogout}>
                          {" "}
                          <BiLogOut/>                      
                           <h5
                          //  onClick={GoogleLogout}
                           >
                            Logout
                          </h5>
                        </div>
                      </div>
                    
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button variant="success" className="login-button" onClick={GoogleLogin}>
                      Login
                    </Button>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          </Nav>
        </Container>
      </Navbar>
      <SettingsModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        textMultipler={textMultipler}
        toggleTheme={toggleTheme}
        buttonValue={buttonValue}
        handleTextSizeChange={handleTextSizeChange}
      />
    </React.Fragment>
  );
}

export default HeaderNavBar;
