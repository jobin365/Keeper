import './App.css';
import Header from './components/Header';
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [userLoggedin, setLogin] = useState(false);
  return (
    <div className="App">
      <Header/>
      <CreateNote/>
      <Notes/>
      <Auth/>
      <Footer/>
    </div>
  );
}

export default App;
