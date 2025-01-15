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

function UserFlow({ users }) {
  // Initialize state for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Dynamically generate nodes and edges when users data changes
  useEffect(() => {

    if (!users || users.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }
    
    const newNodes = users.flatMap((user, index) => {
      // Create a node for each user
      const userNode = {
        id: user._id, // Use user id as node id
        position: { x: 100 + index * 200, y: 100 }, // Adjust position for spacing
        data: { label: `${user.username}, Age: ${user.age}` }, // Display user info
      };

      // Create nodes for hobbies
      const hobbyNodes = user.hobbies.map((hobby, idx) => ({
        id: `${user._id}-${hobby}`, // Unique ID for each hobby node
        position: { x: 100 + index * 200 + 100, y: 100 + (idx + 1) * 100 }, // Position hobbies around user node
        data: { label: hobby }, // Label the hobby node
      }));

      return [userNode, ...hobbyNodes]; // Return user node and all its hobby nodes
    });

    // Create edges connecting user nodes to hobby nodes
    const newEdges = users.flatMap((user) =>
      user.hobbies.map((hobby, index) => ({
        id: `${user._id}-${hobby}-${index}`,
        source: user._id, // Connect from user node
        target: `${user._id}-${hobby}`, // Connect to hobby node
        animated: true, // Optional: Makes edges animated
      }))
    );

    // Setting the new nodes and edges state
    setNodes(newNodes.flat()); // Flatten the nodes array
    setEdges(newEdges);
  }, [users, setNodes, setEdges]);

  // Handle new connection between nodes
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default UserFlow;
