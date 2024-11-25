// actionType.ts
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const LOGOUT = "LOGOUT";

interface RegisterRequestAction {
    type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: {
        user: any; // Replace 'any' with your user type
    };
}

interface RegisterFailureAction {
    type: typeof REGISTER_FAILURE;
    payload: {
        error: string;
    };
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: {
        user: any; // Replace 'any' with your user type
        jwt: string;
    };
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: {
        error: string;
    };
}

interface GetUserRequestAction {
    type: typeof GET_USER_REQUEST;
}

interface GetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    payload: {
        user: any; // Replace 'any' with your user type
    };
}

interface GetUserFailureAction {
    type: typeof GET_USER_FAILURE;
    payload: {
        error: string;
    };
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes =
    | RegisterRequestAction
    | RegisterSuccessAction
    | RegisterFailureAction
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | GetUserRequestAction
    | GetUserSuccessAction
    | GetUserFailureAction
    | LogoutAction;