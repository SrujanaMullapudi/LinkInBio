import { Routes, Route } from "react-router";

import "./Styles/App.css";
import Body from "./Components/Body";
import CreateLink from "./Components/CreateLink";
import AddLink from "./Components/AddLink";
import Home from "./Components/Home";
import { AuthContextProvider } from "./Contexts/AuthContext";
import Protected from "./Components/Helpers/Protected";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/account/:id"
            element={
              <Protected>
                <Body />
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/createLink"
            element={
              <Protected>
                <CreateLink />
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/AddLinks/:id"
            element={
              <Protected>
                <AddLink />
              </Protected>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
