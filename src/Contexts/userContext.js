import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import axios from "../axios";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  const [data, setData] = useState([]);

  const getUser = async () => {
    console.log("in get links");
    const data = await axios.get(`/links/${user.uid}`).then((res) => res.data);
    console.log(data, "user");
    setData(data);
  };

  // if(data.length === 0){
  //     navigate("/createLink");
  // }

  useEffect(() => {
    getUser();
  },[user]);



  return (
    <UserContext.Provider value={{ data }}>
      {children}
    </UserContext.Provider>
  );
};
