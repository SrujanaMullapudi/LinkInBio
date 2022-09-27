import { Routes, Route } from "react-router";

import "./Styles/App.css";
import Dashboard from "./Components/Dashboard";
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
import AddNewCollections from "./Pages/AddNewCollections";
import CollectionPage from "./Pages/CollectionPage";

function App(props) {
  console.log(props);
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
                <Navbar pageName={"Dashboard"}>
                  <Dashboard />
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
                <Navbar
                  backIcon={true}
                  isCollection={false}
                  pageName={"Add New Link"}
                >
                  <AddLink collection={false}/>
                </Navbar>
              </Protected>
            }
          ></Route>
                    <Route
            exact
            path="/AddLinks/:collectionName/:id"
            element={
              <Protected>
                <Navbar
                  backIcon={true}
                  isCollection={false}
                  pageName={"Add New Link"}
                >
                  <AddLink collection={true}/>
                </Navbar>
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/AddLinksProfessional/:id"
            element={
              <Protected>
                <Navbar
                  backIcon={true}
                  isCollection={false}
                  pageName={"Add New Link"}
                >
                  <AddLinkProfessional collection={false}/>
                </Navbar>
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/AddLinksProfessional/:collectionName/:id"
            element={
              <Protected>
                <Navbar
                  backIcon={true}
                  isCollection={false}
                  pageName={"Add New Link"}
                >
                  <AddLinkProfessional collection={true}/>
                </Navbar>
              </Protected>
            }
          ></Route>
          <Route
            exact
            path="/Edit/:uid/:linkId"
            element={
              <Protected>
                <Navbar
                  backIcon={true}
                  isCollection={false}
                  pageName={"Edit Link"}
                >
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
                <Navbar
                  backIcon={true}
                  isCollection={false}
                  pageName={"Edit Link"}
                >
                  <EditLinkProfessional />
                </Navbar>
              </Protected>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/collections/addNew"
            element={
              <Navbar
                backIcon={true}
                isCollection={false}
                pageName={"Add New Collection"}
              >
                <AddNewCollections />{" "}
              </Navbar>
            }
          />
          <Route
            path="/collections/:username/:collectionName"
            element={
              <Navbar backIcon={true} isCollection={true} pageName={""}>
                <CollectionPage />{" "}
              </Navbar>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
