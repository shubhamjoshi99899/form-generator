import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Card,
} from "@mui/material";
import AppBarComponent from "./AppBar";
import axios from "axios";
import { CSVLink } from "react-csv";

const FormResponse = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchFormAndResponses = async () => {
      try {
        const formTemplate = await axios.get(
          `https://form-generator-zeta.vercel.app/forms/${formId}`,
        );
        setForm(formTemplate.data);

        const formResponses = await axios.get(
          `https://form-generator-zeta.vercel.app/responses/form/${formId}`,
        );
        if (formResponses.data) {
          setResponses(formResponses.data);
        }
      } catch (error) {
        console.error("Error fetching form and responses", error);
      }
    };

    fetchFormAndResponses();
  }, [formId]);

  const getTemplateLabel = (fieldId) => {
    if (form) {
      const field = form.fields.find((fld) => fld._id === fieldId);
      return field ? field.label : "";
    }
    return "";
  };

  const headers = [
    { label: "Field Label", key: "label" },
    { label: "Response", key: "value" },
  ];

  const csvData = responses.flatMap((response) =>
    Object.entries(response.responses).map(([key, value]) => ({
      label: key,
      value: value,
    })),
  );

  if (!form) return <Typography>Loading...</Typography>;

  return (
    <>
      <AppBarComponent />
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4">{form.title}</Typography>
          <Typography>{form.description}</Typography>
          <TableContainer component={Card} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field Label</TableCell>
                  <TableCell>Response</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responses.flatMap((response) =>
                  Object.entries(response.responses).map(
                    ([key, value], index) => (
                      <TableRow key={index}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ),
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            <CSVLink
              data={csvData}
              headers={headers}
              filename={`${form.title}-responses.csv`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Download CSV
            </CSVLink>
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default FormResponse;
