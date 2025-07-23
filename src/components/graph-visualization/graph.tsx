"use client";
import React, { useState, useEffect } from "react";
import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import "./GraphVisualization.css";
import { useGraph, useSenders } from "@/hooks/use-graph";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Define types for better type safety
export interface GraphData {
  nodes: any[];
  relationships: any[];
  summary: {
    client_nodes: number;
    connected_clients: number;
    received_transactions: number;
    sender: string;
    sent_transactions: number;
    total_nodes: number;
    total_relationships: number;
    transaction_nodes: number;
  };
}

export interface GraphSummary {
  total_nodes: number;
  total_relationships: number;
  client_nodes: number;
  transaction_nodes: number;
  sent_transactions: number;
  received_transactions: number;
  connected_clients: number;
}

const GraphVisualization = () => {
  const [selectedSender, setSelectedSender] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Tooltip state
  const [hoveredElement, setHoveredElement] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Fetch all available senders
  const { data: senders = [] } = useSenders();

  const {
    data: graphData = {
      nodes: [],
      relationships: [],
      summary: null,
    },
    isLoading: graphLoading,
    isFetched: graphFetched,
  } = useGraph(selectedSender);
  console.log("graphData", graphData);

  // Neo4j NVL configuration
  const neo4jConfig = {
    // Neo4j connection settings (if using direct connection)
    // For now, we'll use the data from our API
  };

  // NVL styling configuration
  const styling = {
    node: {
      // Client nodes
      Client: {
        color: "#4ecdc4",
        size: 8,
        label: "name",
        caption: "name",
      },
      // Transaction nodes with different colors based on type
      Transaction810: {
        color: "#45b7d1",
        size: 6,
        label: "data_id",
        caption: "transaction_type",
      },
      Transaction850: {
        color: "#96ceb4",
        size: 6,
        label: "data_id",
        caption: "transaction_type",
      },
      Transaction820: {
        color: "#feca57",
        size: 6,
        label: "data_id",
        caption: "transaction_type",
      },
      Transaction997: {
        color: "#ff9ff3",
        size: 6,
        label: "data_id",
        caption: "transaction_type",
      },
    },
    relationship: {
      SENT_TRANSACTION: {
        color: "#ff6b6b",
        width: 2,
        label: "type",
      },
      RECEIVED_BY: {
        color: "#4ecdc4",
        width: 2,
        label: "type",
      },
      RESPONDS_TO: {
        color: "#feca57",
        width: 2,
        label: "type",
      },
    },
  };

  // Custom node styling function
  const getNodeStyle = (node: any) => {
    const baseStyle =
      styling.node[node.labels[0] as keyof typeof styling.node] || {};

    // Highlight selected sender
    if (node.properties.is_selected_sender) {
      return {
        ...baseStyle,
        color: "#ff6b6b",
        size: 12,
      };
    }

    return baseStyle;
  };

  const handleNodeClick = (node: any) => {
    console.log("Clicked node:", node);
    // You can add more detailed information display here
  };

  const handleRelationshipClick = (relationship: any) => {
    console.log("Clicked relationship:", relationship);
    // You can add more detailed information display here
  };

  // Map nodes to add color and size based on type and legend
  const styledNodes = graphData.nodes.map((node: any) => {
    let color = "#cccccc";
    let size = 8;

    if (node.labels.includes("Client")) {
      if (node.properties.is_selected_sender) {
        color = "#ff6b6b"; // Selected Sender
        size = 12;
      } else {
        color = "#4ecdc4"; // Other Clients
        size = 8;
      }
    } else if (node.labels.includes("Transaction810")) {
      color = "#45b7d1";
      size = 6;
    } else if (node.labels.includes("Transaction850")) {
      color = "#96ceb4";
      size = 6;
    } else if (node.labels.includes("Transaction820")) {
      color = "#feca57";
      size = 6;
    } else if (node.labels.includes("Transaction997")) {
      color = "#ff9ff3";
      size = 6;
    }

    return {
      ...node,
      color,
      size,
    };
  });

  // Style relationships as well
  const styledRels = graphData.relationships.map((rel: any) => {
    let color = "#cccccc";
    const width = 2;

    if (rel.type === "SENT_TRANSACTION") {
      color = "#ff6b6b";
    } else if (rel.type === "RECEIVED_BY") {
      color = "#4ecdc4";
    } else if (rel.type === "RESPONDS_TO") {
      color = "#feca57";
    }

    return {
      ...rel,
      color,
      width,
    };
  });

  // Mouse event callbacks for InteractiveNvlWrapper
  const mouseEventCallbacks = {
    onHover: (element: any, hitTargets: any, evt: MouseEvent) => {
      if (element) {
        setHoveredElement({ type: element.labels ? "node" : "rel", data: element });
        setTooltipPos({ x: evt.clientX, y: evt.clientY });
      } else {
        setHoveredElement(null);
        setTooltipPos(null);
      }
    },
  };

  return (
    <div className="graph-container">
      <div className="controls">
        <h2>EDI Transaction Graph Visualization</h2>

        <div className="sender-selector">
          <label htmlFor="sender-select">Select Sender:</label>
          <Select
            value={selectedSender}
            onValueChange={setSelectedSender}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a sender..." />
            </SelectTrigger>
            <SelectContent>
              {senders.map((sender: any) => (
                <SelectItem key={sender} value={sender}>
                  {sender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && <div className="loading">Loading graph data...</div>}
        {error && <div className="error">Error: {error}</div>}

        {graphData.summary && (
          <div className="summary">
            <h3>Graph Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Total Nodes:</span>
                <span className="value">{graphData.summary.total_nodes}</span>
              </div>
              <div className="summary-item">
                <span className="label">Total Relationships:</span>
                <span className="value">
                  {graphData.summary.total_relationships}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Client Nodes:</span>
                <span className="value">{graphData.summary.client_nodes}</span>
              </div>
              <div className="summary-item">
                <span className="label">Transaction Nodes:</span>
                <span className="value">
                  {graphData.summary.transaction_nodes}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Sent Transactions:</span>
                <span className="value">
                  {graphData.summary.sent_transactions}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Received Transactions:</span>
                <span className="value">
                  {graphData.summary.received_transactions}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Connected Clients:</span>
                <span className="value">
                  {graphData.summary.connected_clients}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="legend">
          <h4>Legend</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: "#ff6b6b" }}
              ></div>
              <span>Selected Sender</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: "#4ecdc4" }}
              ></div>
              <span>Other Clients</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: "#45b7d1" }}
              ></div>
              <span>810 Transactions</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: "#96ceb4" }}
              ></div>
              <span>850 Transactions</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: "#feca57" }}
              ></div>
              <span>820 Transactions</span>
            </div>
            <div className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: "#ff9ff3" }}
              ></div>
              <span>997 Transactions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="graph-view">
        {graphLoading && !graphFetched && (
          <div className="flex flex-wrap justify-center">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="skeleton animate-pulse bg-muted rounded-full w-10 h-10 m-1"
              />
            ))}
          </div>
        )}
        {graphData && graphFetched && graphData.nodes.length > 0 && (
          <>
            <InteractiveNvlWrapper
              nodes={styledNodes}
              rels={styledRels}
              nvlOptions={{
                initialZoom: 3,
                disableTelemetry: true,
              }}
              mouseEventCallbacks={mouseEventCallbacks}
              height={600}
              width={800}
            />
            {hoveredElement && tooltipPos && (
              <div
                style={{
                  position: "fixed",
                  left: tooltipPos.x + 12,
                  top: tooltipPos.y + 12,
                  background: "rgba(0,0,0,0.85)",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: 6,
                  pointerEvents: "none",
                  zIndex: 1000,
                  maxWidth: 320,
                  fontSize: 14,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                {hoveredElement.type === "node" ? (
                  <>
                    <div><b>Node</b></div>
                    <div><b>Labels:</b> {hoveredElement.data.labels?.join(", ")}</div>
                    {Object.entries(hoveredElement.data.properties || {}).map(([k, v]) => (
                      <div key={k}><b>{k}:</b> {String(v)}</div>
                    ))}
                  </>
                ) : (
                  <>
                    <div><b>Relationship</b></div>
                    <div><b>Type:</b> {hoveredElement.data.type}</div>
                    {Object.entries(hoveredElement.data.properties || {}).map(([k, v]) => (
                      <div key={k}><b>{k}:</b> {String(v)}</div>
                    ))}
                  </>
                )}
              </div>
            )}
          </>
        )}

        {graphFetched && (!graphData || graphData.nodes.length < 1) && (
          <div className="no-data">
            {selectedSender
              ? "No graph data available for selected sender"
              : "Select a sender to view the graph"}
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualization;
