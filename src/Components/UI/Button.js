import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SignIn from "../SignIn";
import "../../Styles/Button.css";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import axios from "../../axios";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

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
  const handleEdit = () => {
    navigate(`/Edit/${props.user.uid}/${props.idx}`);
  };

  return (
    <div className="buttonBox">
      <div className="button">
        <DeleteIcon onClick={handleSetOpen} className="delete" />
        {loader ? (
          <Box
            sx={{
              dispay: "flex",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <a href={props.url}>
            <button>{props.name}</button>
          </a>
        )}

        <EditIcon  onClick={handleEdit} className="edit" />
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
