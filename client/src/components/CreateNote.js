import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import "./CreateNote.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function CreateNote(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function onTitleChange(event) {
    setTitle(event.target.value);
  }
  function onContentChange(event) {
    setContent(event.target.value);
  }
  function onAddClick() {
    Axios.post("/addNote", { title: title, content: content }).then((res) => {
      props.setNotes([...props.notes, res.data]);
    });
  }
  const handleClick = () => {
    props.setOpen(true);
  };

  const handleClickAway = () => {
    props.setOpen(false);
  };
  return (
    <div className="noteContainer">
      <ClickAwayListener onClickAway={handleClickAway}>
        <Paper elevation={7} className="note">
          {props.open && (
            <div className="fieldContainer">
              <TextField
                className="field"
                label="Title"
                variant="standard"
                onChange={onTitleChange}
                value={title}
              />
            </div>
          )}
          <div style={{marginBottom:props.open?"20px":"0px"}} onClick={handleClick}>
            <TextField
              className="field"
              label="Note"
              variant="standard"
              multiline
              minRows={props.open?"5":"1"}
              onChange={onContentChange}
              value={content}
            />
          </div>
          {props.open && (
            <Fab color="primary" onClick={onAddClick}>
              <AddIcon />
            </Fab>
          )}
        </Paper>
      </ClickAwayListener>
    </div>
  );
}
