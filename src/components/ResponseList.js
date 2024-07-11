import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Card,
} from "@mui/material";
import AppBarComponent from "./AppBar";
import axios from "axios";

const ResponsesList = () => {
  const [responses, setResponses] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplatesAndResponses = async () => {
      try {
        const formTemplates = await axios.get(
          "https://form-generator-zeta.vercel.app/forms",
        );
        // const formResponses = await axios.get("http://localhost:5000/responses");
        setTemplates(formTemplates.data);
        // setResponses(formResponses.data);
      } catch (error) {
        console.error("Error fetching templates and responses", error);
      }
    };

    fetchTemplatesAndResponses();
  }, []);

  return (
    <>
      <AppBarComponent />
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4">Form Responses</Typography>
          <List>
            {templates.length > 0 ? (
              templates.map((template) => (
                <Card key={template._id} elevation={2} sx={{ mb: 2, p: 2 }}>
                  <ListItem>
                    <ListItemText
                      primary={template.title}
                      secondary={template.description}
                    />
                    <Button
                      component={Link}
                      to={`/response/${template._id}`}
                      variant="contained"
                      color="primary"
                    >
                      View Responses
                    </Button>
                  </ListItem>
                </Card>
              ))
            ) : (
              <Typography variant="h6">No form templates found.</Typography>
            )}
          </List>
        </Box>
      </Container>
    </>
  );
};

export default ResponsesList;
