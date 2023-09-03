import "./App.css";
import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import React, { useState, useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import Axios from "axios";

function App() {
  const [userLoggedin, setLogin] = useState(false);
  const [emptyNotes, setEmpty] = useState(false);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);

  const prod = false;

  const loggedInStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
  };
  const ref = useRef(null);
  const width = window.screen.width;

  // Axios.defaults.baseURL = "https://sleepy-ridge-02151.herokuapp.com";
  Axios.defaults.baseURL = prod
    ? "https://sleepy-ridge-02151.herokuapp.com"
    : "http://localhost:3001";
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    ref.current.continuousStart();
    checkLoginStatus();
  }, []);

  function checkLoginStatus() {
    Axios.get("/checkLoginStatus", { withCredentials: true }).then((res) => {
      setLogin(res.data.status);
      if (res.data.status === true) {
        Axios.get("/getAllNotes").then((res) => {
          ref.current.complete();
          setNotes(res.data);
          if (res.data.length === 0) {
            setEmpty(true);
          }
        });
      }
      !res.data.status && ref.current.complete();
    });
  }

  return (
    <div
      className="App"
      style={
        !userLoggedin ||
        emptyNotes ||
        (!open && notes.length <= 2 && width < 700) ||
        (!open && notes.length <= 4 && width > 700)
          ? loggedInStyles
          : null
      }
    >
      <LoadingBar color="#f11946" ref={ref} />
      <Header
        checkLoginStatus={checkLoginStatus}
        load={ref}
        userLoggedin={userLoggedin}
      />
      {userLoggedin ? (
        <>
          <CreateNote
            notes={notes}
            setNotes={setNotes}
            setEmpty={setEmpty}
            open={open}
            setOpen={setOpen}
          />
          <Notes
            load={ref}
            setEmpty={setEmpty}
            notes={notes}
            setNotes={setNotes}
          />
        </>
      ) : (
        <Auth load={ref} checkStatus={checkLoginStatus} prod={prod} />
      )}
      <Footer login={!userLoggedin} />
    </div>
  );
}

export default App;
