import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./Notes.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Notes() {
  return (
    <Grid className="grid" container spacing={2} justifyContent="center">
      <Grid item>
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
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
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
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
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
          <CardContent className="cardNote">
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ width: 350 }} style={{ backgroundColor: "#F0EABE" }}>
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
