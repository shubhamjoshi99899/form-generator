import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const DisplayResponses = () => {
  const params = useParams();
  const [responsesData, setResponsesData] = useState(null);

  useEffect(() => {
    // Fetch the responses from localStorage
    const storedResponses = localStorage.getItem("responses");
    if (storedResponses) {
      const parsedResponses = JSON.parse(storedResponses);
      const response = parsedResponses.find(
        (response) => response.formId === params?.formId,
      );
      setResponsesData(response);
    }
  }, [params?.formId]);

  console.log(params);
  console.log(responsesData);

  if (!responsesData) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">Form Responses</Typography>
      {responsesData.responses.map((response) => (
        <Box key={response.fieldId} sx={{ mt: 2 }}>
          <Typography variant="h6">{response.label}</Typography>
          <Typography>{response.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default DisplayResponses;
