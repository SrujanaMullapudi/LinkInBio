import React from 'react'
import {Navigate, useParams} from 'react-router-dom';
import {useAuth} from "../../Contexts/AuthContext";


function Protected({children}) {
    const {user} = useAuth();
    if(!user){
        return <Navigate to={`/`} />
    }
  return children;
}

export default Protected