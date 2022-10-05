import React from 'react'
import {Navigate, useParams} from 'react-router-dom';
import {useAuth} from "../../Contexts/AuthContext";


function Protected({children}) {
    const {user} = useAuth();
    console.log("hi");
    if(!user){
        return <Navigate to={`/signIn`} />
    }
  return children;
}

export default Protected