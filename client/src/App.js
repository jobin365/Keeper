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
  const [emptyNotes,setEmpty]=useState(false);
  const [notes, setNotes] = useState([]);
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

  useEffect(() => {
    Axios.get("/getAllNotes").then((res) => {
      ref.current.complete();
      setNotes(res.data);
      console.log(res.data);
      if (res.data.length === 0) {
        setEmpty(true);
      }
    });
  }, []);

  function checkLoginStatus(){
    Axios.get("/checkLoginStatus",{ withCredentials: true }).then((res)=>{
      setLogin(res.data.status);
      // if(res.data.status){
      //   setUsername(res.data.username);
      // }
      (!res.data.status)&&ref.current.complete();
    });
  }

  return (
    <div className="App" style={(!userLoggedin||emptyNotes)?loggedInStyles:null}>
      <LoadingBar color='#f11946' ref={ref} />
      <Header checkLoginStatus={checkLoginStatus} load={ref} userLoggedin={userLoggedin}/>
      {userLoggedin ? (
        <>
          <CreateNote notes={notes} setNotes={setNotes}/>
          <Notes load={ref} setEmpty={setEmpty} notes={notes} setNotes={setNotes}/>
        </>
      ) : (
        <Auth load={ref} checkStatus={checkLoginStatus}/>
      )}
      <Footer login={!userLoggedin} />
    </div>
  );
}

export default App;
