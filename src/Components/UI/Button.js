import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SignIn from "../SignIn";
import "../../Styles/Button.css";
import axios from "../../axios";

function Button(props) {
  const handleDelete = async () => {
    const data = await axios
      .post(`links/deleteLink/${props.user.uid}/${props.idx}`)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });

    props.handleSetDelete(!props.delete);
  };
  const handleEdit = () => {
    return <SignIn />;
  };

  return (
    <div>
      <div className="button">
        <DeleteIcon onClick={handleDelete} className="delete" />
        <a href={props.url}>
          <button onClick={props.handleSubmit}>{props.name}</button>
        </a>
        <EditIcon onClick={handleEdit} className="edit" />
      </div>
    </div>
  );
}

export default Button;
