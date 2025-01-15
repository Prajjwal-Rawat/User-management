import {toast} from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { CREATE_USER, GET_ALL_USERS } from "./apiRoutes";


export const getUsers = async() => {
   const toastId = toast.loading("Loading...");
   let result;
   try{
      const response = await apiConnector("GET", GET_ALL_USERS);
      console.log("Get All users response ", response);

      if(!response?.data?.success){
        throw new Error(response.data.message);
      }

      result = response.data.Users
   }catch(err){
    console.error("Failed to fetch users", err);
    toast.error("Failed to get users");
   }finally{
    toast.dismiss(toastId);
    return result;
   }
}

export const addUser = async(formData) => {
    const toastId = toast.loading("Adding...");
    try{
        const response = await apiConnector("POST", CREATE_USER, formData);
        console.log("Create user response ", response);

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }

        toast.success("User Created Successfully");
    }catch(err){
        console.error("Failed to add user", err);
        toast.error("Failed to add user, Please try again");
    }finally{
        toast.dismiss(toastId);
    }
}