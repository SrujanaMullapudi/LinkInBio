import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SignIn from "../SignIn";
import "../../Styles/Button.css";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

import axios from "../../axios";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

function Button(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSetOpen = (data) => {
    setOpenDialog(data);
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
    return <SignIn />;
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

        <EditIcon onClick={handleEdit} className="edit" />
      </div>
      {openDialog ? (
        <DeleteDialog
          open={openDialog}
          handleDelete={handleDelete}
          setOpen={handleSetOpen}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Button;
