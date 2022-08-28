import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditDialog(props) {
    const [urlName,setUrlName] = React.useState(props.urlName);
    const [urlLink,setUrlLink] = React.useState(props.urlLink);

  const handleEditClose = () => {
    props.handleEdit(urlName,urlLink);
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
        <DialogTitle  sx={{color:"black", fontFamily:"poppins"}} id="alert-dialog-title">
          {"Edit Your Link"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText  sx={{color:"black", fontFamily:"poppins"}} id="alert-dialog-description">
                <input placeholder="Enter urlName"  value={urlName}/>
                <br></br>
                <input placeholder="Enter urlLink"  value={urlLink}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"#2B4865", fontFamily:"poppins", fontWeight:"bold"}} onClick={handleEditClose} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
