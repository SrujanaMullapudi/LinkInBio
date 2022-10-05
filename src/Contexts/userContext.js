import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "../axios";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  const [data, setData] = useState(null);

  const getUser = async () => {
    console.log("in get links");
    const data = await axios.get(`/links/${user.uid}`).then((res) => res.data);
    console.log(data, "user");
    setData(data);
  };

  useEffect(() => {
    getUser();
  },[user]);



  return (
    <UserContext.Provider value={{ data }}>
      {data && children}
    </UserContext.Provider>
  );
};
