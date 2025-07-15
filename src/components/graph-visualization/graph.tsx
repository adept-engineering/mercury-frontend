"use client";
import React, { useState, useEffect } from "react";
import { BasicNvlWrapper } from "@neo4j-nvl/react"; // Changed import to match actual export
import "./GraphVisualization.css";
import { useGraph, useSenders } from "@/hooks/use-graph";

// Define types for better type safety
export interface GraphData {
  nodes: any[];
  rels: any[];
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
  //   const [graphData, setGraphData] = useState<GraphData>({
  //     nodes: [],
  //     rels: [],
  //   });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<GraphSummary | null>(null);

  const API_BASE_URL = "http://localhost:8000"; // Adjust to your API URL

  // Fetch all available senders
  const { data: senders = [] } = useSenders();

  const {
    data: graphData = {
      nodes: [],
      rels: [],
    },
  } = useGraph(selectedSender);

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

  return (
    <div className="graph-container">
      <div className="controls">
        <h2>EDI Transaction Graph Visualization</h2>

        <div className="sender-selector">
          <label htmlFor="sender-select">Select Sender:</label>
          <select
            id="sender-select"
            value={selectedSender}
            onChange={(e) => setSelectedSender(e.target.value)}
            disabled={loading}
          >
            <option value="">Choose a sender...</option>
            {senders.map((sender: any) => (
              <option key={sender} value={sender}>
                {sender}
              </option>
            ))}
          </select>
        </div>

        {loading && <div className="loading">Loading graph data...</div>}
        {error && <div className="error">Error: {error}</div>}

        {summary && (
          <div className="summary">
            <h3>Graph Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Total Nodes:</span>
                <span className="value">{summary.total_nodes}</span>
              </div>
              <div className="summary-item">
                <span className="label">Total Relationships:</span>
                <span className="value">{summary.total_relationships}</span>
              </div>
              <div className="summary-item">
                <span className="label">Client Nodes:</span>
                <span className="value">{summary.client_nodes}</span>
              </div>
              <div className="summary-item">
                <span className="label">Transaction Nodes:</span>
                <span className="value">{summary.transaction_nodes}</span>
              </div>
              <div className="summary-item">
                <span className="label">Sent Transactions:</span>
                <span className="value">{summary.sent_transactions}</span>
              </div>
              <div className="summary-item">
                <span className="label">Received Transactions:</span>
                <span className="value">{summary.received_transactions}</span>
              </div>
              <div className="summary-item">
                <span className="label">Connected Clients:</span>
                <span className="value">{summary.connected_clients}</span>
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
        {graphData && graphData.nodes.length > 0 ? (
          <BasicNvlWrapper
            nodes={graphData.nodes}
            rels={graphData.rels || []}
            nvlOptions={{
              initialZoom: 1,
              disableTelemetry: true,
            }}
            height={600}
            width={800}
          />
        ) : (
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
