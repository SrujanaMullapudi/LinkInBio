import { Routes, Route } from "react-router";

import "./Styles/App.css";
import Body from "./Components/Body";
import CreateLink from "./Components/CreateLink";
import AddLink from "./Components/AddLink";
import SignIn from "./Components/SignIn";
import { AuthContextProvider } from "./Contexts/AuthContext";
import Protected from "./Components/Helpers/Protected";
import Navbar from "./Components/Navbar";
import PublicViewing from "./Components/PublicViewing";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/public-viewing/:username"
            element={<PublicViewing />}
          ></Route>
          <Route exact path="/signIn" element={<SignIn />}></Route>
          <Route
            exact
            path="signIn/account/:id"
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
