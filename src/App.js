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
import Edit from "./Components/Edit";
import LinkPreview from "./Components/LinkPreview";
import AddLinkProfessional from "./Components/AddLinkProfessional";
import EditLinkProfessional from "./Components/EditLinkProfessional";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          {/* <Route exact path="/" element={}></Route> */}
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
                <Navbar>
                  <Body />
                </Navbar>
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
                <Navbar backIcon={true} pageName={"Add New Link"}>
                  <AddLink />
                </Navbar>
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/AddLinksProfessional/:id"
            element={
              <Protected>
                <Navbar backIcon={true} pageName={"Add New Link"}>
                  <AddLinkProfessional />
                </Navbar>
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/Edit/:uid/:linkId"
            element={
              <Protected>
                <Navbar backIcon={true} pageName={"Edit Link"}>
                  <Edit />
                </Navbar>
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/EditProfessionalLink/:uid/:linkId"
            element={
              <Protected>
                <Navbar backIcon={true} pageName={"Edit Link"}>
                  <EditLinkProfessional />
                </Navbar>
              </Protected>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
