import {toast} from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { CREATE_USER, GET_ALL_USERS, UPDATE_USER } from "./apiRoutes";


export const getUsers = async() => {
   const toastId = toast.loading("Loading...");
   let result;
   try{
      const response = await apiConnector("GET", GET_ALL_USERS);

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


export const addHobbyToUser = async({userId, hobbies}) => {
   const toastId = toast.loading("Loading...");
   try{
      const response = await apiConnector("PUT", UPDATE_USER, {userId, hobbies});

      if(!response?.data?.success){
        throw new Error(response.data.message);
      }
      return response.data.updatedUser;
   }catch(err){
    console.error("Failed to update node", err);
    toast.error("Failed to update");
   }finally{
    toast.dismiss(toastId);
   }
}