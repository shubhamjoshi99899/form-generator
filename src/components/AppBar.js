import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
const AppBarComponent = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Forms
          </Typography>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/create">
            Create Form
          </Button>
          <Button color="inherit" href="/responses">
            Responses
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
