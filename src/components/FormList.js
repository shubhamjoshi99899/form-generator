import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Backdrop,
  Card,
  CircularProgress,
  Container,
} from "@mui/material";
import axios from "axios";
import AppBarComponent from "./AppBar";

const FormList = () => {
  const [formTemplates, setFormTemplates] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://form-generator-zeta.vercel.app/forms/user/66916c3e828033edb6b95a01",
        );
        setFormTemplates(res.data);
      } catch (error) {
        console.error("Error fetching forms", error);
      }
      setLoading(false);
    };

    fetchForms();
  }, []);

  return (
    <>
      <AppBarComponent />
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {!loading && formTemplates.length > 0 ? (
            <>
              <Typography variant="h4">Form Templates</Typography>
              <List>
                {formTemplates.map((form) => (
                  <Card
                    key={form._id}
                    elevation={2}
                    sx={{ mb: 2, border: "1px solid #f0f0f0" }}
                  >
                    <ListItem
                      button
                      onClick={() => navigate(`/form/${form._id}`)}
                    >
                      <ListItemText
                        primary={form.title}
                        secondary={
                          <>
                            <Typography>{form.description}</Typography>
                            <ul>
                              {form.fields.map((field, index) => (
                                <li key={index}>
                                  {field.label} ({field.type})
                                </li>
                              ))}
                            </ul>
                          </>
                        }
                      />
                    </ListItem>
                  </Card>
                ))}
              </List>
            </>
          ) : (
            <>
              {!loading && (
                <>
                  <Typography>No templates generated yet</Typography>
                  <Button variant="contained" component={Link} to={`/create`}>
                    Create now
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default FormList;
