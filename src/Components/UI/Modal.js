// import * as React from "react";
// import { useParams } from "react-router";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { TextField } from "@mui/material";
// import axios from "../../axios";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const modalStyle = {
//   display : 'flex',
//   justifyContentent: 'center',
//   alignItems:"center",
//   left : "50%",
//   top:"50%",
// }
// export default function BasicModal(props) {
//   const [open, setOpen] = React.useState(false);
//   const [data, setData] = React.useState({
//     uid: props.id,
//     name: "",
//     link: "",
//   });
//   console.log(props);
//   const handleNameInput = (e) => {
//     setData({ ...data, name: e.target.value });
//   };
//   const handleLinkInput = (e) => {
//     setData({ ...data, link: e.target.value });
//   };
//   React.useEffect(() => {}, [open]);
//   const sendData = () => {
//     axios.post(`/links/${props.id}`, data).then(() => {});
//     handleClose();
//     window.location.reload();
//   };
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleSubmit = () => {
//     console.log(data);
//     sendData();
//   };
//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//       sx={modalStyle}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography
//             sx={textStyle}
//             id="modal-modal-title"
//             variant="h6"
//             component="h2"
//           >
//             Add New Link
//           </Typography>
//           <TextField
//             sx={textStyle}
//             id="outlined-basic"
//             label="Add URL Name"
//             variant="outlined"
//             onChange={handleNameInput}
//           />
//           <TextField
//             sx={textStyle}
//             id="outlined-basic"
//             label="Add URL Link"
//             variant="outlined"
//             onChange={handleLinkInput}
//           />
//           <Button onClick={handleSubmit}>Add Link</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
