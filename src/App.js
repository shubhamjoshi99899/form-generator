// src/App.js
import React from "react";
import {
  Routes,
  Route,
  Switch,
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import FormBuilder from "./components/FormBuilder";
import FormList from "./components/FormList";
import FormResponse from "./components/FormResponse";
import FormDetail from "./components/FormDetails";
import PrefillForm from "./components/PrefillForm";
import ResponsesList from "./components/ResponseList";
import DisplayResponses from "./components/PrefillForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <FormList />
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/create",
    element: (
      <div>
        <FormBuilder />
      </div>
    ),
  },
  {
    path: "/form/:formId",
    element: (
      <div>
        <FormDetail />
      </div>
    ),
  },
  {
    path: "/prefill/:formId",
    element: (
      <div>
        <DisplayResponses />
      </div>
    ),
  },
  {
    path: "/responses",
    element: (
      <div>
        <ResponsesList />
      </div>
    ),
  },
]);
const App = () => {
  return (
    <>
      <CssBaseline />

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
      <Container>
        <RouterProvider router={router} />
        {/* 
        <Route path="/" exact component={FormList} />
        <Route path="/create" component={FormBuilder} />
        <Route path="/form/:formId" component={FormResponse} /> */}
      </Container>
    </>
  );
};

export default App;
