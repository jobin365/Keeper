import React from "react";
import Paper from "@mui/material/Paper";
import "./CreateNote.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function CreateNote() {
  return (
    <div className="noteContainer">
      <Paper
        elevation={7}
        className="note"
      >
      <div className="fieldContainer">
      <TextField className="field" label="Title" variant="standard" />
      </div>
      <div className="fieldContainer">
      <TextField
          className="field"
          label="Note"
          variant="standard"
          multiline
          minRows="5"
        />
      </div>
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Paper>
    </div>
  );
}
