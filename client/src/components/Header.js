import React from "react";
import "./Header.css";
import HighlightIcon from "@mui/icons-material/Highlight";
import Button from "@mui/material/Button";
import Axios from "axios";

export default function Header(props) {
  function logout() {
    props.load.current.continuousStart();
    Axios.get("/logout").then((res) => {
      props.checkLoginStatus();
    });
  }

  return (
    <div className="header">
      <div className="name">
        <HighlightIcon style={{ fontSize: "xx-large" }} />
        Keeper
      </div>
      <div>
        <Button
          className="logoutButton"
          variant="contained"
          style={{ backgroundColor: "#D61C4E" }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
