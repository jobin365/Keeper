import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function Notes() {
  return (
    <Grid className="grid" container spacing={2} justifyContent="center">
      <Grid item>
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <h4>Hello</h4>
            <p>this is content</p>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
