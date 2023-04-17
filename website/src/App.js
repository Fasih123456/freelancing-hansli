import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";

import "./Pages/assets/css/main.css";
import Calender from "./Pages/Calender";

//Components

//Libraries

//Bootstrap

//CSS
import "./App.css";
import Register from "./Pages/Register";

//TODO: Like you did it with the date, you have to do it with the time aswell. So let say its 7pm now, it will show shows running at 7pm moving forward
//TODO: If we could perhaps, add start time and end time alongside series title
//TODO: The calender is making every thing for the month section + 1 month. So 2nd Apr is showing 2nd May
//TODO: Make the hours section pink(#F46666) for light mode
//TODO: Add white containers instaed of light grey ones for light mode
//TODO: Move the search bar from the Hero modal to the Header which only shows after login
//TODO: Add a button which says Add, this show should only show the first API link shows. No need for the old dictionary API anymore.

function App() {
  if (localStorage.getItem("theme") == "whiteTheme") {
    document.body.classList.add("whiteTheme");
  }
  //const userObject = useContext(myContext);
  //console.log(userObject);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route exact path="/calender" element={<Calender />} />
        <Route exact path="/calender/:day" element={<Calender />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

//        <Route exact path="/:day" index element={<Homepage />} />

export default App;
