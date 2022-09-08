import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../../Styles/Button.css";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import axios from "../../axios";
import { CircularProgress, createTheme, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    siteDefault: {
      main: "#4473a2",
      contrastText: "#fff",
    },
  },
});

function Button(props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const handleSetOpen = (data) => {
    setOpenDeleteDialog(data);
  };

  const handleEditSetOpen = (data) => {
    setOpenEditDialog(data);
  };
  const handleDelete = async (data) => {
    if (data) {
      setLoader(true);
      const data = await axios
        .post(`links/deleteLink/${props.user.uid}/${props.idx}`)
        .then((res) => res.data)
        .catch((error) => {
          console.log(error);
        });
      props.handleSetDelete(!props.delete);
      setLoader(false);
    }
  };
  const handleEdit = (type) => {
    if(type === "Simple Link"){
      navigate(`/Edit/${props.user.uid}/${props.idx}`);
    }else{
      navigate(`/EditProfessionalLink/${props.user.uid}/${props.idx}`);
    }
  };
  const handleNewTabOpen = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="buttonBox">
      <div className="button">
        {loader ? (
          <Box
            sx={{
              dispay: "flex",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="buttonHeader">
            {props.imageURL.length > 0 ? (
              <img src={props.imageURL} alt={props.name} />
            ) : (
              <div className="placeholder"></div>
            )}
            <div className="buttonBody">
              <div className="linkName">
                <p>{props.name}</p>
              </div>
              <div className="CouponCriteria">
                <p>{props.CouponCriteria}</p>
              </div>
            </div>
          </div>
        )}
        <div className="buttonFooter">
          <div className="linkType">
            <b>
              <p>{props.type}</p>
            </b>
          </div>
          <div className="buttonActions">
            <DeleteIcon onClick={()=>handleSetOpen(props.type)} className="delete" />
            <EditIcon onClick={()=>handleEdit(props.type)} className="edit" />
            <ThemeProvider theme={theme}>
              <Switch color="siteDefault" className="Switch" />
            </ThemeProvider>
            <OpenInNewIcon
              onClick={() => handleNewTabOpen(props.url)}
              className="openInNew"
            />
          </div>
        </div>
      </div>
      {openDeleteDialog ? (
        <DeleteDialog
          open={openDeleteDialog}
          handleDelete={handleDelete}
          setOpen={handleSetOpen}
        />
      ) : (
        <></>
      )}
      {openEditDialog ? (
        <EditDialog
          open={openEditDialog}
          handleEdit={handleEdit}
          setOpen={handleEditSetOpen}
          urlName={props.name}
          urlLink={props.url}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Button;
