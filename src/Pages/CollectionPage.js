import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Divider, Drawer, Fab } from "@mui/material";
import { Box } from "@mui/system";
import Button from "../Components/UI/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "../Styles/CollectionPage.css";
import { useAuth } from "../Contexts/AuthContext";
import axios from "../axios";

function CollectionPage(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collection, setCollection] = useState(null);
  const [linkDelete, setLinkDelete] = useState(false);
  const { collectionName } = useParams();

  const handleSetDelete = (data) => {
    setLinkDelete(data);
  };

  let navigate = useNavigate();
  const routerChange = (link) => {
    let path = link;
    navigate(path);
  };

  const { user } = useAuth();
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getLinks = async () => {
    const data = await axios
      .get(`links/${user.uid}`)
      .then((res) =>
        res.data[0].collections.filter(
          (curr) => curr.collectionName === collectionName
        )
      );

    console.log(data);

    setCollection(data[0]);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="CollectionPage">
      <div className="CollectionPage_name">
        <p>{collectionName}</p>
        <EditOutlinedIcon sx={{ color: "#4473a2" }} />
      </div>
      <div className="CollectionPage_body">
        <p>{`Links(${12})`}</p>
        <div className="Body-links-button" onClick={handleDrawerOpen}>
          <a>Add Link</a>
        </div>
      </div>
      <div className="collectionBody">
        {collection && collection.links.map((link) => (
          <Button
            key={link.id}
            idx={link.id}
            delete={linkDelete}
            handleSetDelete={handleSetDelete}
            user={user}
            url={link.link}
            onClick={() => routerChange(link.link)}
            name={link.name}
            type={link.type}
            imageURL={link.imageURL}
            CouponCriteria={link.CouponCriteria}
            isCollection={true}
          />
        ))}
      </div>
      <Drawer
        anchor="bottom"
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{ width: "auto" }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <div className="Link">
            <Link to={`/AddLinksProfessional/${collectionName}/${user.uid}`}>
              Add Proffessional Link
            </Link>
          </div>
          <Divider />
          <div className="Link">
            <Link to={`/AddLinks/${collectionName}/${user.uid}`}>
              Add Simple Link
            </Link>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

export default CollectionPage;
