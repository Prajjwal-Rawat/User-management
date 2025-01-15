import React, { useState } from "react";
import toast from "react-hot-toast";
import { addUser } from "../services/apis";

const UserForm = ({setIsFormVisible, fetchUsers}) => {
  const [formData, setFormData] = useState( { username: "", age: "", hobbies: [] } );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.username || !formData.age){
      toast.error("All fields are required");
    }
    
    try{
      await addUser(formData);
      fetchUsers();
      setFormData({ username: "", age: "", hobbies: [] });
      setIsFormVisible(false);
    }catch(err){
      console.error("Failed to add user", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 shadow rounded border"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;