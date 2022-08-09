import React from "react";
import "./Header.css";
import HighlightIcon from '@mui/icons-material/Highlight';

export default function Header(){
    return(
        <div className="header">
            <div className="name">
            <HighlightIcon style={{fontSize:"xx-large"}}/>
            Keeper
            </div>
        </div>
    )
}