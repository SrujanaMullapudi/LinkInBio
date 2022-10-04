import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../Contexts/AuthContext";
import "../Styles/Collections.css";

function Collections(props) {
  const collectionsNew = props.data[0].collections.slice(0,3);
  const username = props.data[0].userName
  return (
    <div className="Collections">
      <div className="CollectionsHeader">
        <div>{`Collections(${props.data[0].collections.length})`}</div>
        <div className="CollectionsViewAllButton">
          <Link to="/viewAllCollections">View All</Link>
        </div>
        <div className="CollectionsAddNew">
          <Link to="/collections/addNew">
            <button>Add New</button>
          </Link>
        </div>
      </div>
      <div className="CollectionBox">
        {collectionsNew.map((collection) => (
          <Link to={`/collections/${username}/${collection.collectionName}`}>
            <div key={collection.name} className="Collection">
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
    </div>
  );
}

export default Collections;
