import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog(props) {
  const handleDisagreeClose = () => {
    props.handleDelete(false);
    props.setOpen(false);
  };

  const handleAgreeClose = () => {
    props.handleDelete(true);
    props.setOpen(false);
  };

  const handleClose = () =>{
    props.setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle  sx={{color:"red", fontFamily:"poppins"}} id="alert-dialog-title">
          {"WAIT!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText  sx={{color:"black", fontFamily:"poppins"}} id="alert-dialog-description">
                The Deleted Links cannot be recoverd. 
                Are Your Sure You want to delete this link
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"#2B4865", fontFamily:"poppins", fontWeight:"bold"}} onClick={handleDisagreeClose}>No</Button>
          <Button sx={{color:"#2B4865", fontFamily:"poppins", fontWeight:"bold"}} onClick={handleAgreeClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
