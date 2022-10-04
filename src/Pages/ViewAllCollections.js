import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import axios from "../axios";

function ViewAllCollections() {
  const [username, setUsername] = useState("");
  const [collections, setCollections] = useState(null);
  const { user } = useAuth();
  const getCollections = async () => {
    const data = await axios.get(`/links/${user.uid}`).then((res) => res.data);
    setUsername(data[0].userName);
    setCollections(data[0].collections);
  };
  useEffect(() => {
    getCollections();
  }, []);
  return (
    <div>
      {collections &&
        collections.map((collection) => (
          <Link to={`/collections/${username}/${collection.collectionName}`}>
            <div className="Collection">
              <div className="linkLength">
                <p>{collection.links.length}</p>
              </div>
              <img src={collection.imageURL} alt="" />
              <div>
                <p>{collection.collectionName}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ViewAllCollections;
