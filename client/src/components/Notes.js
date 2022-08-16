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
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    Axios.get("/getAllNotes").then((res) => {
      props.load.current.complete();
      setNotes(res.data);
      console.log(res.data);
      if (res.data.length === 0) {
        props.setEmpty(true);
      }
    });
  }, [props, props.load, props.setEmpty]);

  function checkEmptyNotes(response) {
    if (response.length === 0) {
      props.setEmpty(true);
    }
  }

  return (
    <Grid
      className="grid"
      container
      spacing={2}
      justifyContent="center"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      {notes.map((note) => {
        return (
          <Grid item key={uuidv4()}>
            <Card sx={{ width: 350 }}>
              <CardContent className="cardNote">
                <h4>{note.title}</h4>
                <p className="noteContent">{note.content}</p>
              </CardContent>
              <CardActions>
                <IconButton color="primary">
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
