import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TeacherDashBoard(){
   const token=Cookies.get('token');
   const role=Cookies.get('role');
   const navigate=useNavigate();
   useEffect(() => {
      if(!token && role!='teacher'){
         navigate('/');
      }
   }, [token, navigate]);
   return (
    <h1>Hello Saurabh </h1>
   )
}