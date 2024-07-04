// src/components/FormResponse.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";

const FormResponse = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const storedTemplates = localStorage.getItem("formTemplates");
    const storedResponses = localStorage.getItem("responses");
    if (storedTemplates && storedResponses) {
      const templates = JSON.parse(storedTemplates);
      const allResponses = JSON.parse(storedResponses);
      const selectedForm = templates.find(
        (template) => template._id === formId,
      );
      setForm(selectedForm);

      const formResponses = allResponses.find(
        (response) => response.formId === formId,
      );

      if (formResponses) {
        setResponses(formResponses.responses);
      }
    }
  }, [formId]);

  if (!form) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">{form.title}</Typography>
      <Typography>{form.description}</Typography>
      {form.fields.map((field) => {
        const response = responses.find((r) => r.fieldId === field._id);
        return (
          <Grid container>
            <Grid item xs={12} md={6} key={field._id} sx={{ mt: 2 }}>
              <Typography>{field.label}</Typography>

              {field.type === "text" && (
                <Grid item xs={12} md={6} key={field._id} sx={{ mt: 2 }}>
                  <Typography>{response ? response.value : ""}</Typography>
                </Grid>
              )}
              {field.type === "number" && (
                <Grid item xs={12} md={6} key={field._id} sx={{ mt: 2 }}>
                  <Typography>{response ? response.value : ""}</Typography>
                </Grid>
              )}
              {field.type === "select" && (
                <Grid item xs={12} md={6} key={field._id} sx={{ mt: 2 }}>
                  <Typography>{response ? response.value : ""}</Typography>
                </Grid>
              )}
              {field.type === "radio" && (
                <Grid item xs={12} md={6} key={field._id} sx={{ mt: 2 }}>
                  <Typography>{response ? response.value : ""}</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default FormResponse;
