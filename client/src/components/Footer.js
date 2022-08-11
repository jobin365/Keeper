import React from "react";
import "./Footer.css";

export default function Footer(props) {
  return (
    <div
      className="footer"
      style={{ position: props.login&&"absolute", bottom: props.login&&0, width:props.login&& "100%" }}
    >
      <p>Made by Jobin.</p>
    </div>
  );
}
