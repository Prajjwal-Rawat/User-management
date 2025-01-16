import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { addHobbyToUser } from '../services/apis';

function UserFlow({ users }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!users || users.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const newNodes = users.flatMap((user, index) => {
      const userNode = {
        id: user._id,
        position: { x: index * 300, y: 100 }, // Ensure sufficient horizontal spacing
        data: { label: `${user.username}, Age: ${user.age}` },
      };

      const hobbyNodes = user.hobbies.map((hobby, idx) => ({
        id: `${user._id}-${hobby}`,
        position: { x: index * 300 + 100, y: 100 + (idx + 1) * 100 }, // Space hobbies below user node
        data: { label: hobby },
      }));

      return [userNode, ...hobbyNodes];
    });

    const newEdges = users.flatMap((user) =>
      user.hobbies.map((hobby, index) => ({
        id: `${user._id}-${hobby}-${index}`,
        source: user._id,
        target: `${user._id}-${hobby}`,
        animated: true,
      }))
    );

    setNodes(newNodes.flat());
    setEdges(newEdges);
  }, [users, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();
  
      const hobby = event.dataTransfer.getData("application/reactflow");
      if (!hobby || hobby.trim() === "") {
        console.error("Invalid hobby data.");
        return;
      }
  
      const reactFlowBounds = document
        .querySelector(".react-flow")
        .getBoundingClientRect();
      const dropX = event.clientX - reactFlowBounds.left;
      const dropY = event.clientY - reactFlowBounds.top;
  
      console.log("Drop Coordinates:", { dropX, dropY });
      console.log("Node Positions:", nodes.map((node) => node.position));
  
      // Detect the parent node using bounding box
      const parentNode = nodes.find((node) => {
        const nodeBounds = {
          xMin: node.position.x - 50,
          xMax: node.position.x + 50,
          yMin: node.position.y - 25,
          yMax: node.position.y + 25,
        };
  
        return (
          dropX >= nodeBounds.xMin &&
          dropX <= nodeBounds.xMax &&
          dropY >= nodeBounds.yMin &&
          dropY <= nodeBounds.yMax
        );
      });
  
      if (!parentNode) {
        console.warn("Drop location is not near any node.");
        return;
      }
  
      try {
        console.log(`Updating user ${parentNode.id} with hobby: ${hobby}`);
        const updatedUser = await addHobbyToUser({ userId: parentNode.id, hobbies: [hobby] });
        if (!updatedUser) {
          console.error("Failed to update user hobbies in the database.");
          return;
        }
        console.log("User updated successfully:", updatedUser);
  
        // Add the new hobby node and edge in the UI
        const newNode = {
          id: `${parentNode.id}-${hobby}-${Date.now()}`,
          position: {
            x: parentNode.position.x + 150,
            y: parentNode.position.y + 50 + updatedUser.hobbies.length * 50,
          },
          data: { label: hobby },
        };
  
        const newEdge = {
          id: `e${parentNode.id}-${newNode.id}`,
          source: parentNode.id,
          target: newNode.id,
          animated: true,
        };
  
        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);
      } catch (error) {
        console.error("Error updating user hobbies:", error);
      }
    },
    [nodes, setNodes, setEdges]
  );
  
  
  
  
  
  
  

  return (
    <ReactFlow
      className="react-flow"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default UserFlow;
