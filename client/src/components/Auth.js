import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import "./Auth.css";
import Button from "@mui/material/Button";
import Axios from "axios";
import Alert from "@mui/material/Alert";
import googleLogo from "./images/google.png";
import LoadingBar from "react-top-loading-bar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alignment, setAlignment] = React.useState("sign in");
  const [realname, setRealname] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleAuthChange = (event, newAlignment) => {
    setAlignment(event.target.value);
  };

  function handleRealnameChange(event) {
    setRealname(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setPasswordConfirm(event.target.value);
  }

  function handleLogin(event) {
    if (isValidEmail()&&passwordIsPresent()) {
      props.load.current.continuousStart();
      Axios.post("/login", { username: username, password: password })
        .then((res) => {
          if (res.data.login === "success") {
            props.checkStatus();
          } else {
            setErrorMessage(res.data.error);
            setShowAlert(true);
          }
        })
        .catch((err) => {
          setErrorMessage("Check if username or password is correct");
          setShowAlert(true);
          props.load.current.complete();
        });
    } else {
      setShowAlert(true);
    }
  }

  function handleRegister(event) {
    if (realnameIsPresent()&&isValidEmail()&&passwordIsPresent()&&isSamePassword()) {
      props.load.current.continuousStart();
      Axios.post("/register", { username: username, password: password }).then(
        (res) => {
          if (res.data.register === "failed") {
            setErrorMessage(res.data.error);
            setShowAlert(true);
            props.load.current.complete();
          } else {
            props.checkStatus();
          }
        }
      );
    } else {
      setShowAlert(true);
    }
  }

  function isValidEmail() {
    if(/\S+@\S+\.\S+/.test(username)){
      return 1;
    }else{
      setErrorMessage("Invalid Email!");
      return 0;
    }
  }

  function isSamePassword(){
    if(password===passwordConfirm){
      return 1;
    }else{
      setErrorMessage("Passwords don't match!");
      return 0;
    }
  }

  function realnameIsPresent(){
    if(realname!==""){
      return 1;
    }else{
      setErrorMessage("Please enter your name!");
      return 0;
    }
  }

  function passwordIsPresent(){
    if(password!==""){
      return 1;
    }else{
      setErrorMessage("Please enter a password!");
      return 0;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        height:"70vh",
        alignItems:"center"
      }}
    >
      <Paper
        elevation={3}
        className="roltopContainer"
        style={{
          padding: "25px",
          margin: "25px 0 0",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleAuthChange}
        >
          <ToggleButton value="sign in">Sign In</ToggleButton>
          <ToggleButton value="sign up">Sign Up</ToggleButton>
        </ToggleButtonGroup>
        {alignment === "sign up" && (
          <TextField
            style={{ marginBottom: "20px", marginTop: "20px" }}
            className="username"
            label="Name"
            value={realname}
            onChange={handleRealnameChange}
            variant="outlined"
          />
        )}
        <TextField
          style={{
            marginBottom: "20px",
            marginTop: alignment === "sign in" && "20px",
          }}
          className="username"
          label="Email"
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
          type="email"
        />
        <TextField
          style={{ marginBottom: "20px" }}
          className="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          type="password"
        />
        {alignment === "sign up" && (
          <TextField
            style={{ marginBottom: "20px" }}
            className="password"
            label="Confirm password"
            value={passwordConfirm}
            onChange={handleConfirmPasswordChange}
            variant="outlined"
            type="password"
          />
        )}
        <div className="lorButtons">
          <Button
            className="lorButton"
            variant="contained"
            onClick={alignment==="sign in"?handleLogin:handleRegister}
          >
            {alignment}
          </Button>
          <a href="/auth/google" style={{ textDecoration: "none" }}>
            {/* <a href="http://localhost:3001/auth/google" style={{textDecoration:"none"}}> */}
            <Button
              variant="outlined"
              className="googleButton"
            >
              <img
                style={{ width: "33px", height: "34px", marginRight: "10px" }}
                src={googleLogo}
                alt="Google"
              ></img>
              Google
            </Button>
          </a>
        </div>
      </Paper>
      {showAlert ? <Alert severity="error">{errorMessage}</Alert> : null}
    </div>
  );
}
