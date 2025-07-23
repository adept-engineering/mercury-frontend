import React, { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  type Node,
  type FitViewOptions,
  type DefaultEdgeOptions,
  type OnNodeDrag,
  type Edge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  OnConnect,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import {
  CreateEntityNodeOrRelationshipNode,
  RelationshipNameNode,
} from "./transformationNameNode";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const nodeTypes = {
  relationshipNameNode: RelationshipNameNode,
  createEntityNodeOrRelationshipNode: CreateEntityNodeOrRelationshipNode,
};
const initialNodes: Node[] = [
  {
    id: "1",
    type: "relationshipNameNode",
    position: { x: 0, y: 150 },
    data: { value: 123 },
    ...nodeDefaults,
  },
];

const initialEdges: Edge[] = [];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log("drag event", node.data);
};

let id = 1;
const getId = () => `${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onConnectEnd = useCallback(
    (event: any, connectionState: any) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const { clientX, clientY } =
          "changedTouches" in event ? event.changedTouches[0] : event;
        const flowPosition = screenToFlowPosition({
          x: clientX,
          y: clientY,
        });
        const fromNodeId = connectionState.fromNode.type;
        console.log(fromNodeId);

        console.log("Screen Position:", { clientX, clientY });
        console.log("Flow Position:", flowPosition);

        const newNode = {
          id,
          position: {
            x: flowPosition.x,
            y: Math.max(flowPosition.y, 2), // Ensure y is at least 150
          },
          data: { value: `Node ${id}` },
          origin: [0.5, 0.0] as [number, number],
          type:
            fromNodeId === "relationshipNameNode"
              ? "createEntityNodeOrRelationshipNode"
              : "relationshipNameNode",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectionState.fromNode.id, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="h-[50vh] w-[50vw]" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onNodeDrag={onNodeDrag}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeOrigin={[0.5, 0]}
      >
        {/* <Background /> */}
        <Controls />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
};

export default Flow;

export const FlowProvider = () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
