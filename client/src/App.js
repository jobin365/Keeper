import "./App.css";
import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [userLoggedin, setLogin] = useState(true);
  const loggedInStyles={
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    height:"100vh"
  }
  return (
    <div className="App" style={!userLoggedin?loggedInStyles:null}>
      <Header />
      {userLoggedin ? (
        <>
          <CreateNote />
          <Notes />
        </>
      ) : (
        <Auth />
      )}
      <Footer login={!userLoggedin} />
    </div>
  );
}

export default App;
