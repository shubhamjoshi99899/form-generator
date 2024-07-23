import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import Carousel from "react-material-ui-carousel";

function Collection() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCollections();
    fetchSelectedCollection();
  }, []);

  const fetchCollections = async () => {
    const res = await axios.get("http://localhost:3000/collections");
    setCollections(res.data);
  };

  const fetchSelectedCollection = async () => {
    const res = await axios.get("http://localhost:3000/selectedCollection");
    setSelectedCollection(res.data);
  };

  const addCollection = async () => {
    const res = await axios.post("http://localhost:3000/collections", {
      title: newCollectionTitle,
      images,
    });
    setCollections([...collections, res.data]);
    setNewCollectionTitle("");
    setImages([]);
  };

  const removeCollection = async (id) => {
    await axios.delete(`http://localhost:3000/collections/${id}`);
    setCollections(collections.filter((collection) => collection._id !== id));
  };

  const setAsSelected = async (id) => {
    await axios.post("http://localhost:3000/selectedCollection", { id });
    fetchSelectedCollection();
  };

  const handleImageChange = (index, key, value) => {
    const updatedImages = [...images];
    updatedImages[index][key] = value;
    setImages(updatedImages);
  };

  const addImageField = () => {
    setImages([...images, { title: "", url: "" }]);
  };

  const removeImageField = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Image Collections
      </Typography>
      <TextField
        label="New Collection Title"
        value={newCollectionTitle}
        onChange={(e) => setNewCollectionTitle(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginBottom: "10px" }}
      >
        Add Images
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Images</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the titles and URLs of the new images.
          </DialogContentText>
          {images.map((image, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              marginBottom="10px"
            >
              <TextField
                label="Image Title"
                value={image.title}
                onChange={(e) =>
                  handleImageChange(index, "title", e.target.value)
                }
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Image URL"
                value={image.url}
                onChange={(e) =>
                  handleImageChange(index, "url", e.target.value)
                }
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeImageField(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Box display="flex" justifyContent="center" marginBottom="10px">
            <Fab color="primary" aria-label="add" onClick={addImageField}>
              <AddIcon />
            </Fab>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <List>
        {images.map((image, index) => (
          <ListItem key={index}>
            <ListItemText primary={image.title} secondary={image.url} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={addCollection}>
        Add Collection
      </Button>
      <Typography variant="h5" gutterBottom>
        Collections
      </Typography>
      <List>
        {collections.map((collection) => (
          <ListItem key={collection._id} button>
            <ListItemText primary={collection.title} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeCollection(collection._id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="check"
                onClick={() => setAsSelected(collection._id)}
              >
                <CheckIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {selectedCollection && (
        <div>
          <Typography variant="h5" gutterBottom>
            Selected Collection
          </Typography>
          <Typography variant="h6">{selectedCollection.title}</Typography>
          <Carousel>
            {selectedCollection.images.map((image, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h6">{image.title}</Typography>
                <img
                  src={image.url}
                  alt={image.title}
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </Box>
            ))}
          </Carousel>
        </div>
      )}
    </Container>
  );
}

export default Collection;
