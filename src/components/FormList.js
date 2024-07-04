// src/components/FormList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Link,
  Backdrop,
  Card,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const FormList = () => {
  const [formTemplates, setFormTemplates] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      const storedTemplates = localStorage.getItem("formTemplates");
      if (storedTemplates) {
        setFormTemplates(JSON.parse(storedTemplates));
      }
      setOpen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {formTemplates?.length > 0 ? (
        <>
          <Typography variant="h4">Form Templates</Typography>
          <Card elevation={2} sx={{ m: 2 }}>
            <List>
              {formTemplates.map((form) => (
                <ListItem
                  key={form._id}
                  sx={{ mt: 2 }}
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
              ))}
            </List>
          </Card>
        </>
      ) : (
        <>
          <Typography>No templates generated yet</Typography>
          <Button variant="contained" component={Link} to={`/create`}>
            Create now
          </Button>
        </>
      )}
    </Box>
  );
};

export default FormList;
