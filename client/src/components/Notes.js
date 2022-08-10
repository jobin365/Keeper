import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./Notes.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Notes() {
  const notes=[
    {
      title:"What is Lorem Ipsum?",
      note:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      title:"Where does it come from?",
      note:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
    }
  ];
  return (
    <Grid className="grid" container spacing={2} justifyContent="center">
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Wind and Windmill</h4>
            <p>
              He quietly entered the museum as the super bowl started. With the
              high wind warning It took him a month to finish the meal. Kevin
              embraced his ability to be at the wrong place at the wrong time.
            </p>
          </CardContent>
          <CardActions>
            <IconButton color="primary">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>
              this is content this is content this is content this is content
              this is content this is content this is content
            </p>
          </CardContent>
          <CardActions>
            <IconButton color="primary">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
