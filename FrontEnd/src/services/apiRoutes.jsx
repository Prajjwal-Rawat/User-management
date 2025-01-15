const BaseUrl = import.meta.env.VITE_APP_BASE_URL;


export const GET_ALL_USERS = BaseUrl + "getAllUsers";
export const CREATE_USER = BaseUrl + "createUser";
export const UPDATE_USER = BaseUrl + "updateUser/:userId";
export const DELETE_USER = BaseUrl + "/deleteUser/:userId";