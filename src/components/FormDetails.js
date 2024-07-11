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
  Stack,
} from "@mui/material";
import axios from "axios";
import FaceCounter from "./FaceCounter";

const FormDetail = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [faceCount, setFaceCount] = useState({ current: 0, highest: 0 });

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const { data } = await axios.get(
          `https://form-generator-zeta.vercel.app/forms/${formId}`,
        );
        setForm(data);
        setResponses(
          data.fields
            .filter(
              (field) =>
                field.label !== "face_count" && field.label !== "Face Count",
            )
            .map((field) => ({
              fieldId: field._id,
              label: field.label,
              value: "",
            })),
        );
      } catch (error) {
        console.error("Error fetching form", error);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index].value = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const faceCountField = {
      fieldId: "face_count",
      label: "Face Count",
      value: faceCount.highest,
    };

    const updatedResponses = [...responses, faceCountField];

    console.log(updatedResponses);
    try {
      await axios.post("https://form-generator-zeta.vercel.app/responses", {
        formId,
        responses: updatedResponses,
      });
      alert("Response submitted!");
    } catch (error) {
      console.error("Error submitting response", error);
    }
  };

  if (!form) return <Typography>Loading...</Typography>;

  return (
    <Stack direction="column" sx={{ height: "100vh", overflow: "hidden" }}>
      {form.fields.some(
        (field) => field.label === "face_count" || field.label === "Face Count",
      ) && (
        <Box
          sx={{ flex: 1, position: "sticky", top: 0, height: "100vh", p: 4 }}
        >
          <FaceCounter
            setFaceCount={(current, highest) =>
              setFaceCount({ current, highest })
            }
          />
        </Box>
      )}
      <Box sx={{ flex: 1, overflow: "auto", p: 4 }}>
        <Typography variant="h4">{form.title}</Typography>
        <Typography>{form.description}</Typography>
        {responses.map((response, index) => {
          const field = form.fields.find((f) => f._id === response.fieldId);
          return (
            <Box key={field._id} sx={{ mt: 2 }}>
              <Typography>{field.label}</Typography>
              {field.type === "text" && (
                <TextField
                  value={response.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  fullWidth
                />
              )}
              {field.type === "number" && (
                <TextField
                  type="number"
                  value={response.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  fullWidth
                />
              )}
              {field.type === "select" && (
                <TextField
                  select
                  value={response.value}
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
                  value={response.value}
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
          );
        })}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit Response
        </Button>
      </Box>
    </Stack>
  );
};

export default FormDetail;
