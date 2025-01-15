import React, { useState, useEffect } from "react";
import UserFlow from "./components/UserFlow";
import Sidebar from "./components/Sidebar";
import UserForm from "./components/UserForm";
import "./index.css";
import { getUsers } from "./services/apis";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [hobbies, setHobbies] = useState(["Reading", "Gaming", "Coding"]);

  const fetchUsers = async () => {
    const data  = await getUsers();
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);


  const addHobby = (hobby) => setHobbies([...hobbies, hobby]);
  const toggleFormVisibility = () => setIsFormVisible((prevState) => !prevState);

  return (
    <div className="lg:flex h-screen relative"> {/* Relative positioning for the container */}
    <Sidebar hobbies={hobbies} onAddHobby={addHobby} onToggleForm={toggleFormVisibility} />
    <div className="flex-1 p-4 relative"> {/* Position relative to place form on top */}
      <UserFlow users={users} />
      
      {/* Conditionally render the form on top of UserFlow */}
      {isFormVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-500 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md z-10"> {/* Modal style */}
            <UserForm setIsFormVisible = {setIsFormVisible} fetchUsers = {fetchUsers}/>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default App;

