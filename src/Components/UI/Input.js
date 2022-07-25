import React, { useState } from "react";
import "../../Styles/Input.css";
import { TextField, Button } from "@mui/material";

const textStyle ={
    width: '100%',
}
function Input(props) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="inputBox">
      <TextField
        sx={textStyle}
        id="outlined-basic"
        label="Create Tree"
        variant="outlined"
        onChange={handleChange}
      />

      {/* <input type="text" value={value} onChange={handleChange} /> */}
      <Button variant="outlined" href="" size="large">{props.button}</Button>
    </div>
  );
}

export default Input;
