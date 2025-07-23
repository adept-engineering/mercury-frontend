import React, { useState, useRef, useEffect } from "react";
import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import "./GraphVisualization.css";
import type { GraphData } from "./graph";

interface GraphModalVisualizationProps {
  data: GraphData;
}

const GraphModalVisualization: React.FC<GraphModalVisualizationProps> = ({ data }) => {
  // Tooltip state
  const [hoveredElement, setHoveredElement] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const nvlRef = useRef<any>(null);

  // Auto-fit/zoom to all nodes when data changes
  useEffect(() => {
    if (nvlRef.current && data.nodes.length > 0) {
      const nodeIds = data.nodes.map((n) => n.id);
      // Timeout ensures NVL is ready
      setTimeout(() => {
        nvlRef.current?.zoomToNodes(nodeIds);
      }, 300);
    }
  }, [data]);

  // NVL styling configuration
  const styling = {
    node: {
      Client: {
        color: "#4ecdc4",
        size: 8,
        label: "name",
        caption: "name",
      },
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

  // Map nodes to add color, size, and highlight for main nodes
  const styledNodes = data.nodes.map((node: any) => {
    let color = "#cccccc";
    let size = 8;
    let border = undefined;
    let glow = undefined;
    let extraStyle = {};

    if (node.labels.includes("Client")) {
      if (node.properties.is_main_sender) {
        color = "#ff6b6b"; // Highlight main sender
        border = "3px solid #ff6b6b";
        glow = "0 0 10px #ff6b6b";
        size = 12;
        extraStyle = { border, boxShadow: glow };
      } else if (node.properties.is_main_receiver) {
        color = "#4ecdc4";
        border = "3px solid #4ecdc4";
        glow = "0 0 10px #4ecdc4";
        size = 12;
        extraStyle = { border, boxShadow: glow };
      } else {
        color = "#4ecdc4";
        size = 8;
      }
    } else if (node.labels.includes("Transaction997")) {
      color = "#ff9ff3";
      if (node.properties.is_main_transaction) {
        border = "3px solid #ff9ff3";
        glow = "0 0 10px #ff9ff3";
        size = 10;
        extraStyle = { border, boxShadow: glow };
      } else {
        size = 6;
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
    }

    return {
      ...node,
      color,
      size,
      ...extraStyle,
    };
  });

  // Style relationships as well
  const styledRels = data.relationships.map((rel: any) => {
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
      {data.summary && (
        <div className="summary">
          <h3>Graph Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Total Nodes:</span>
              <span className="value">{data.summary.total_nodes}</span>
            </div>
            <div className="summary-item">
              <span className="label">Total Relationships:</span>
              <span className="value">{data.summary.total_relationships}</span>
            </div>
            <div className="summary-item">
              <span className="label">Client Nodes:</span>
              <span className="value">{data.summary.client_nodes}</span>
            </div>
            <div className="summary-item">
              <span className="label">Transaction Nodes:</span>
              <span className="value">{data.summary.transaction_nodes}</span>
            </div>
            <div className="summary-item">
              <span className="label">Sent Transactions:</span>
              <span className="value">{data.summary.sent_transactions ?? "-"}</span>
            </div>
            <div className="summary-item">
              <span className="label">Received Transactions:</span>
              <span className="value">{data.summary.received_transactions ?? "-"}</span>
            </div>
            <div className="summary-item">
              <span className="label">Connected Clients:</span>
              <span className="value">{data.summary.connected_clients ?? (data.summary as any)?.involved_clients ?? "-"}</span>
            </div>
          </div>
        </div>
      )}
      <div className="legend">
        <h4>Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#ff6b6b" }}></div>
            <span>Selected Client</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#4ecdc4" }}></div>
            <span>Other Client</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#45b7d1" }}></div>
            <span>810 EDI Transaction</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#96ceb4" }}></div>
            <span>850 EDI Transaction</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#feca57" }}></div>
            <span>820 EDI Transaction</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#ff9ff3" }}></div>
            <span>997 EDI Transaction</span>
          </div>
        </div>
        <div className="legend-items mt-4">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#ff6b6b", width: 24, height: 4, borderRadius: 2 }}></div>
            <span>SENT_TRANSACTION (edge)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#4ecdc4", width: 24, height: 4, borderRadius: 2 }}></div>
            <span>RECEIVED_BY (edge)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#feca57", width: 24, height: 4, borderRadius: 2 }}></div>
            <span>RESPONDS_TO (edge)</span>
          </div>
        </div>
      </div>
      <div className="graph-view">
        {data.nodes.length > 0 ? (
          <>
            <InteractiveNvlWrapper
              ref={nvlRef}
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
        ) : (
          <div className="no-data">No graph data available</div>
        )}
      </div>
    </div>
  );
};

export default GraphModalVisualization; 