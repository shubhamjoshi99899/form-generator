// src/components/FormDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const FormDetail = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const storedTemplates = localStorage.getItem("formTemplates");
    if (storedTemplates) {
      const templates = JSON.parse(storedTemplates);
      const selectedForm = templates.find(
        (template) => template._id === formId,
      );
      setForm(selectedForm);
      setResponses(
        selectedForm.fields.map((field) => ({
          fieldId: field.id, // Ensure we're using the field 'id'
          label: field.label,
          value: "",
        })),
      );
    }
  }, [formId]);

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index].value = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueFormId = new Date().getTime().toString();
    const storedResponses = localStorage.getItem("responses");
    const allResponses = storedResponses ? JSON.parse(storedResponses) : [];

    // Add the static face_count field
    const faceCountField = {
      fieldId: "1", // static field ID
      label: "face_count",
      value: "24", // static value
    };

    // Include the static face_count field in the responses
    const updatedResponses = [...responses, faceCountField];

    allResponses.push({
      templateId: formId,
      formId: uniqueFormId,
      responses: updatedResponses,
    });

    localStorage.setItem("responses", JSON.stringify(allResponses));
    alert("Response submitted!");
  };

  if (!form) return <Typography>Loading...</Typography>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h4">{form.title}</Typography>
      <Typography>{form.description}</Typography>
      {form.fields.map((field, index) => (
        <Box key={field.id} sx={{ mt: 2 }}>
          <Typography>{field.label}</Typography>
          {field.type === "text" && (
            <TextField
              value={responses[index].value}
              onChange={(e) => handleChange(index, e.target.value)}
              fullWidth
            />
          )}
          {field.type === "number" && (
            <TextField
              type="number"
              value={responses[index].value}
              onChange={(e) => handleChange(index, e.target.value)}
              fullWidth
            />
          )}
          {field.type === "select" && (
            <TextField
              select
              value={responses[index].value}
              onChange={(e) => handleChange(index, e.target.value)}
              fullWidth
            >
              {field.options.map((option, optIndex) => (
                <MenuItem key={optIndex} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
          {field.type === "radio" && (
            <RadioGroup
              value={responses[index].value}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              {field.options.map((option, optIndex) => (
                <FormControlLabel
                  key={optIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          )}
        </Box>
      ))}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Response
      </Button>
    </Box>
  );
};

export default FormDetail;
