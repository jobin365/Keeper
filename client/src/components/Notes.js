import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./Notes.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

export default function Notes(props) {
  useEffect(() => {
    if (props.notes.length === 0) {
      props.setEmpty(true);
    } else {
      props.setEmpty(false);
    }
  }, [props]);

  function handleDeleteIconClick(event) {
    const noteId = event.currentTarget.value;
    Axios.patch("/deleteNote", { id: noteId }).then((res) => {
      let i = 0;
      props.notes.forEach((element) => {
        if (noteId === element._id) {
          props.notes.splice(i, 1);
          props.setNotes([...props.notes]);
        }
        i++;
      });
    });
  }

  function newlineToBreak(string) {
    const stringSplitted = string.split("\n");
    return stringSplitted.map((item) => {
      return (
        <span key={uuidv4()}>
          {item}
          <br/>
        </span>
      );
    });
  }
  
  return (
    <Grid
      className="grid"
      container
      spacing={2}
      justifyContent="center"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      {props.notes.map((note) => {
        return (
          <Grid item key={uuidv4()}>
            <Card sx={{ width: 350 }}>
              <CardContent className="cardNote">
                <h4>{note.title}</h4>
                <p className="noteContent">{newlineToBreak(note.content)}</p>
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  value={note._id}
                  onClick={handleDeleteIconClick}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
