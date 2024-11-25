import { AuthState } from "../types";

import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT,
    AuthActionTypes
} from "./actionType";
export const initialState: AuthState = {
  
    user: null,
    loading: false,
    error: null,
    jwt: null,
};

export const authReducer = (
    state=initialState,
    action: AuthActionTypes

):AuthState=>{
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case REGISTER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload.user };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload.jwt, user: action.payload.user };
        case GET_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload.user };
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        case LOGOUT:
            return { ...initialState };
        default:
            return state;
    }

}