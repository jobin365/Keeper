import React from "react";
import Paper from '@mui/material/Paper';
import "./CreateNote.css";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function CreateNote(){
    return(
        <Paper elevation={3} className="note">
            <TextField label="Title" variant="outlined"/>
            <Fab>
                <AddIcon/>
            </Fab>
        </Paper>
    )
}