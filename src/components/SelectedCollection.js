import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectedCollection = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchSelected = async () => {
      const res = await axios.get("http://localhost:3000/currentCarousel");
      setSelected(res.data);
    };
    fetchSelected();
  }, []);

  if (!selected) {
    return <div>No collection selected</div>;
  }

  return (
    <div>
      <h2>Selected Collection</h2>
      <h3>{selected?.collectionId?.title}</h3>
      <p>Selected Item: {selected?.selectedItem?.title}</p>
      {selected?.items.map((item) => (
        <img src={item.imagePath} alt="image" />
      ))}
      View
    </div>
  );
};

export default SelectedCollection;
