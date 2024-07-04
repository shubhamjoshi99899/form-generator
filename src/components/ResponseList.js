// src/components/ResponsesList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const ResponsesList = () => {
  const [responses, setResponses] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const storedResponses = localStorage.getItem("responses");
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }

    const storedTemplates = localStorage.getItem("formTemplates");
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    }
  }, []);

  const getTemplateLabel = (templateId, fieldId) => {
    const template = templates.find((temp) => temp._id === templateId);
    if (template) {
      const field = template.fields.find((fld) => fld._id === fieldId);
      return field ? field.label : "";
    }
    return "";
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">Form Responses</Typography>
      <List>
        {responses?.length > 0 ? (
          <>
            {responses.map((response, index) => (
              <ListItem key={index} sx={{ mt: 2 }}>
                <ListItemText
                  primary={`Response for Form ID: ${response.formId}`}
                  secondary={
                    <>
                      <ul>
                        {response.responses.map((res, resIndex) => (
                          <li key={resIndex}>
                            {getTemplateLabel(response.templateId, res.fieldId)}
                            : {res.value}
                          </li>
                        ))}
                      </ul>
                      <Button
                        component={Link}
                        to={`/prefill/${response.formId}`}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        View Response
                      </Button>
                    </>
                  }
                />
              </ListItem>
            ))}
          </>
        ) : (
          <Typography variant="h6">No form responses found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default ResponsesList;
