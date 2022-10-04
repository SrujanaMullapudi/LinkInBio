import { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  const getUser = async () => {
    console.log("in get links");
    const data = await axios.get(`/links/${user.uid}`).then((res) => res.data);
    setData(data);
  };
  useEffect(() => {
    getUser();
  },[]);
  return (
    <UserContext.Provider value={{ data }}>
      {data && children}
    </UserContext.Provider>
  );
};
