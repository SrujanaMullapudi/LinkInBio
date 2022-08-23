import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../axios";
import "../Styles/PublicView.css";
import DisplayPicture from "./DisplayPicture";
import Footer from "./Footer";
function PublicViewing() {
  const { username } = useParams();
  console.log(username);
  const [data, setData] = useState([]);
  const getData = async () => {
    const data = await axios
      .get(`/links/public/${username}`)
      .then((res) => res.data);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {data.map((dataElement) => (
        <div className="publicView">
          <DisplayPicture imageURL={dataElement.photoURL} />
          {dataElement.links.map((link) => (
            <div className="publicView-button">
              <a href={link.link}>
                <button>{link.name}</button>
              </a>
            </div>
          ))}
          <Footer />
        </div>
      ))}
    </div>
  );
}

export default PublicViewing;
