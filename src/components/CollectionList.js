import React, { useState, useEffect } from "react";
import axios from "axios";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await axios.get("http://localhost:3000/currentCarousel");
      setCollections(res.data);
    };
    fetchCollections();
  }, []);

  return (
    <div>
      <h2>Collections</h2>
      <ul>
        {collections?.length === 0 ? (
          <li>No collections</li>
        ) : (
          <>
            {collections &&
              collections?.map((collection) => (
                <li key={collection?._id}>
                  {collection?.title}
                  <ul>
                    {collection?.items.map((item) => (
                      <li key={item._id}>{item.title} - View</li>
                    ))}
                  </ul>
                </li>
              ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default CollectionList;
