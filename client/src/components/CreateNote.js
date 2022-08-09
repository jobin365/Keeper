import React from "react";
import Paper from '@mui/material/Paper';
import "./CreateNote.css";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function CreateNote(){
    return(
        <div className="noteContainer">
        <Paper elevation={3} className="note">
        <div className="noteTop">
        <TextField className="titleField" label="Title" variant="outlined"/>
            <Fab color="primary">
                <AddIcon/>
            </Fab>
        </div>
            <TextField className="noteField" label="Note" variant="outlined" multiline minRows="5"/>
        </Paper>
        </div>
    )
}