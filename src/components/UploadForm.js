import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const CreateCollection = () => {
  const [collectionTitle, setCollectionTitle] = useState("");
  const [items, setItems] = useState([{ title: "", filePath: "" }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItemField = () => {
    setItems([...items, { title: "", filePath: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      collectionTitle,
      items,
    };

    try {
      const response = await axios.post("http://localhost:3000/upload", data);
      console.log("Collection created:", response.data);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New Collection
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Collection Title"
              value={collectionTitle}
              onChange={(e) => setCollectionTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <TextField
                  label="Image URL"
                  value={item.filePath}
                  onChange={(e) =>
                    handleItemChange(index, "filePath", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Title"
                  value={item.title}
                  onChange={(e) =>
                    handleItemChange(index, "title", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <IconButton onClick={addItemField}>
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Collection
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateCollection;
