import React from "react";
import "./Header.css";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function Header(){
    return(
        <div className="header">
            <div className="name">
            <LightbulbIcon style={{fontSize:"xx-large"}}/>
            Keeper
            </div>
        </div>
    )
}