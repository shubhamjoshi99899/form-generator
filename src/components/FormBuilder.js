import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Backdrop,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuidv4 } from "uuid";

const FormBuilder = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const addField = (type) => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        label: "",
        type,
        options: type === "select" || type === "radio" ? [""] : [],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      _id: new Date().getTime().toString(),
      title,
      description,
      fields,
    };

    // Get existing templates from localStorage
    const storedTemplates = localStorage.getItem("formTemplates");
    const templates = storedTemplates ? JSON.parse(storedTemplates) : [];

    // Add the new form to the templates
    templates.push(form);

    // Save the updated templates back to localStorage
    localStorage.setItem("formTemplates", JSON.stringify(templates));

    // Redirect to the list page
    navigate("/");
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4">Create Form</Typography>
        <TextField
          label="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ mt: 2 }}
        />
        <TextField
          label="Form Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
        />
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mt: 2 }}>
            <TextField
              label="Field Label"
              value={field.label}
              onChange={(e) => {
                const newFields = [...fields];
                newFields[index].label = e.target.value;
                setFields(newFields);
              }}
              fullWidth
              required
              sx={{ mr: 2 }}
            />
            {field.type === "select" || field.type === "radio"
              ? field.options.map((option, optIndex) => (
                  <Box
                    key={optIndex}
                    sx={{ display: "flex", alignItems: "center", mt: 1 }}
                  >
                    <TextField
                      label="Option"
                      value={option}
                      onChange={(e) => {
                        const newFields = [...fields];
                        newFields[index].options[optIndex] = e.target.value;
                        setFields(newFields);
                      }}
                      sx={{ mr: 2 }}
                    />
                    <IconButton
                      onClick={() => {
                        const newFields = [...fields];
                        newFields[index].options.splice(optIndex, 1);
                        setFields(newFields);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ))
              : null}
            {(field.type === "select" || field.type === "radio") && (
              <Button
                onClick={() => {
                  const newFields = [...fields];
                  newFields[index].options.push("");
                  setFields(newFields);
                }}
              >
                Add Option
              </Button>
            )}
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <IconButton onClick={() => addField("text")}>
            <AddIcon /> <Typography>Add Text Field</Typography>
          </IconButton>
          <IconButton onClick={() => addField("number")}>
            <AddIcon /> <Typography>Add Number Field</Typography>
          </IconButton>
          <IconButton onClick={() => addField("select")}>
            <AddIcon /> <Typography>Add Select Field</Typography>
          </IconButton>
          <IconButton onClick={() => addField("radio")}>
            <AddIcon /> <Typography>Add Radio Field</Typography>
          </IconButton>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Template
        </Button>
      </Box>
    </>
  );
};

export default FormBuilder;
