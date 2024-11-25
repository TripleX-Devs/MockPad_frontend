import { API_BASE_URL } from "@/config/APIConfig";
import { Dispatch } from 'redux';
import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    AuthActionTypes,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from '@/StateManagement/Authentication/actionType';
import { Cookie } from "lucide-react";
import Cookies from "js-cookie";


interface User {
    universityEmail: string;
    universityEmailPassword: string;
}


export const teacherLogin = (userData: User, role: "student" | "teacher",navigate:Function) => async (dispatch: Dispatch<AuthActionTypes>) => {
   
    dispatch({ type: LOGIN_REQUEST });

    try {
        let response;
        if (role === "teacher") {
            response = await axios.post(`${API_BASE_URL}/teacher/signinTeacher`, userData, {
                withCredentials: true,
            });
        } else {
            response = await axios.post(`${API_BASE_URL}/student/signinStudent`, userData, {
                withCredentials: true,
            });
        }
        if(response.status !== 200) {
            throw new Error("An error occurred");
        }
        
        const { userId, name, token } = response.data;
        
        navigate(`/${role}-dashboard`);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: { id: userId, name: name, email: userData.universityEmail }, jwt: token }
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: {
                error: (err as any).response?.data?.message || 'An error occurred'
            }
        });
    }
};
export const getUserDetails = (jwt:string) => async(dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type:GET_USER_REQUEST });
    const role=Cookies.get('role');
    
    try{

        let response;
        if(role==="teacher"){
            response=await axios.get(`${API_BASE_URL}/teacher/getTeacherData`,{
                withCredentials: true,
            });
        }else{
            response=await axios.get(`${API_BASE_URL}/student/getStudentData`,{
                withCredentials: true,
            });
        }
        
        if(response.status!==200){
            throw new Error("An error occurred");
        }
        
        // console.log("Resposne Data Data ",response.data.data.name);

        dispatch({
            type:GET_USER_SUCCESS,
            payload:{
                user:response.data.data
            }
        })

    }catch(err){
        dispatch({
            type: GET_USER_FAILURE,
            payload: {
                error: (err as any).response?.data?.message || 'An error occurred'
            }
        })
    }

}
