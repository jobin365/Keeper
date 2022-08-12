import "./App.css";
import Header from "./components/Header";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import React, { useState, useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import Axios from "axios";

function App() {
  const [userLoggedin, setLogin] = useState(false);
  const loggedInStyles={
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    height:"100vh"
  }
  const ref = useRef(null);

  // Axios.defaults.baseURL = "https://sleepy-ridge-02151.herokuapp.com";
  Axios.defaults.baseURL = "http://localhost:3001";
  Axios.defaults.withCredentials = true;

  useEffect(()=>{
    ref.current.continuousStart();
    checkLoginStatus();
  },[]);

  function checkLoginStatus(){
    Axios.get("/checkLoginStatus",{ withCredentials: true }).then((res)=>{
      setLogin(res.data.status);
      // if(res.data.status){
      //   setUsername(res.data.username);
      // }
      ref.current.complete();
    });
  }

  return (
    <div className="App" style={!userLoggedin?loggedInStyles:null}>
      <LoadingBar color='#f11946' ref={ref} />
      <Header />
      {userLoggedin ? (
        <>
          <CreateNote />
          <Notes />
        </>
      ) : (
        <Auth load={ref} checkStatus={checkLoginStatus}/>
      )}
      <Footer login={!userLoggedin} />
    </div>
  );
}

export default App;
