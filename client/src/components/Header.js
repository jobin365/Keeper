import React,{useEffect,useState} from "react";
import "./Header.css";
import HighlightIcon from "@mui/icons-material/Highlight";
import Button from "@mui/material/Button";
import Axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import {lime}  from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';

export default function Header(props) {
  const [realname,setRealname]=useState("");
  useEffect(()=>{
    props.userLoggedin&&
    Axios.get("/realname").then((res)=>{
      setRealname(res.data.realname);
    });
  },[props.userLoggedin]);


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
      <div style={{display:"flex",justifyContent:"space-between",width:"180px"}}>
        {props.userLoggedin && (
          <>
          <Tooltip title={realname}>
            <Avatar sx={{ bgcolor: lime[800] }}>{realname[0]}</Avatar>
            </Tooltip>
            <Button
              className="logoutButton"
              variant="contained"
              style={{ backgroundColor: "#D61C4E" }}
              onClick={logout}
            >
              <LogoutIcon style={{ marginRight: "10px" }} />
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
