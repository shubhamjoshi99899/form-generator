import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const CarouselSelector = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/currentCarousel/collections"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        collectionId: selectedCollection,
      };
      const response = await axios.post(
        "http://localhost:3000/currentCarousel",
        data
      );
      console.log("Selected carousel updated:", response.data);
    } catch (error) {
      console.error("Error updating selected carousel:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Select Current Carousel
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Collection</InputLabel>
              <Select
                value={selectedCollection}
                onChange={handleCollectionChange}
              >
                {collections.map((collection) => (
                  <MenuItem key={collection._id} value={collection._id}>
                    {collection.collectionTitle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedCollection}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CarouselSelector;
