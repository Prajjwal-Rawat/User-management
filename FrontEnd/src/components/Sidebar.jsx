import React, { useState } from "react";

const Sidebar = ({ hobbies, onAddHobby, onToggleForm }) => {
  const [newHobby, setNewHobby] = useState("");

  const handleDragStart = (event, hobby) => {
    event.dataTransfer.setData("application/reactflow", hobby);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      onAddHobby(newHobby);
      setNewHobby("");
    }
  };

  return (
    <div className="w-64 p-4 bg-gray-100 border-r">
      <div className="flex justify-between items-center mt-4">
      <h3 className="text-lg font-semibold mb-4">Hobbies</h3>
      <button
      onClick={onToggleForm} 
      className="mb-2 px-2 bg-blue-500 text-white py-2 rounded">
        Add User
      </button>
      </div>
      <ul className="space-y-2">
        {hobbies.map((hobby, index) => (
          <li key={index}
          draggable="true"
          onDragStart={(event) => handleDragStart(event, hobby)}
          className="p-2 bg-white shadow rounded"
          >
            {hobby}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a new hobby"
        />
        <button
          onClick={handleAddHobby}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Hobby
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

