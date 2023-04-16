//Components

//Libraries
import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
//Bootstrap

//CSS
function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    picture: "",
    userId: "",
  });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const accessKey = process.env.REACT_APP_GOOGLE_OAUTH_KEY;

  // Retrieve user info from local storage on page load
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // update the viewport width state when the window is resized
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save user info to local storage on successful login
  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [loggedIn, userInfo]);

  //TODO: implement the clients credentials here
  return (
    <div>
      {loggedIn ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          {viewportWidth > 800 && (
            <img
              className="profileimage"
              src={userInfo.picture}
              alt="Profile"
              key={userInfo.userId}
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
          )}

          <span id="username">{userInfo.name}</span>
        </div>
      ) : (
        <React.Fragment>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const value = jwt_decode(credentialResponse.credential);
              let name = value.name;
              let picture = value.picture;
              let sub = value.sub;

              setUserInfo({
                name: name,
                picture: picture,
                userId: sub,
              });

              setLoggedIn(true);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default Login;
