import { create } from "@mui/material/styles/createTransitions";
import React, { useState } from "react";
import SearchAppBar from "./UI/Appbar";
import Input from "./UI/Input";

import "../Styles/App.css";
function Home() {
  const buttonName = "create";
  return (
    <div>
      <SearchAppBar />
      <div className="App">
        <p>Create Your Tree.</p>
        <Input button={buttonName} />
      </div>
    </div>
  );
}

export default Home;
