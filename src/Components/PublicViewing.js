import React,{useEffect} from 'react'
import { useParams } from "react-router";
import axios from '../axios';
function PublicViewing() {
    const {username} = useParams();
    console.log(username);
    const getData = async ()=>{
        const data = await axios.get(`/links/public/${username}`).then(res => res.data)
        console.log(data);
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div>PublicViewing</div>
  )
}

export default PublicViewing