// src/App.js
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useRoutes,
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
import Collection from "./components/Collection";

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
    path: "/image-gallery",
    element: (
      <div>
        <Collection />
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
    path: "/response/:formId",
    element: (
      <div>
        <FormResponse />
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

      <RouterProvider router={router} />
      {/* 
        <Route path="/" exact component={FormList} />
        <Route path="/create" component={FormBuilder} />
        <Route path="/form/:formId" component={FormResponse} /> */}
    </>
  );
};

export default App;
