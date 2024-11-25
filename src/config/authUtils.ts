import Cookies from 'js-cookie';

export const getToken =  () => {

    return   Cookies.get('token');
};

export const getRole = () => {

    return Cookies.get('role');
};

export const isAdmin = () => {
    return getRole() === 'admin';
};


export const isTeacher = () => {
    
    return getRole() === 'teacher';
};


export const isStudent = () => {    
   
    return getRole() === 'student';
};

export const isAuthenticated = () => {
    
    return !!getToken();
};