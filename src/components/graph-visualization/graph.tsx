"use client";
import React, { useState, useRef, useEffect } from "react";
import { InteractiveNvlWrapper } from "@neo4j-nvl/react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [currentZoom, setCurrentZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);

  // Tooltip state
  const [hoveredElement, setHoveredElement] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const nvlRef = useRef<any>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

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

  // Debug logging
  console.log("GraphVisualization data:", graphData);

  // Auto-fit/zoom to all nodes when data changes
  useEffect(() => {
    if (nvlRef.current && graphData.nodes.length > 0) {
      const nodeIds = graphData.nodes.map((n) => n.id);
      // Timeout ensures NVL is ready
      setTimeout(() => {
        nvlRef.current?.zoomToNodes(nodeIds);
        setCurrentZoom(1); // Reset zoom level when data changes
      }, 500);
    }
  }, [graphData]);

  // Zoom functions with better error handling and state management
  const handleZoomIn = () => {
    try {
      if (nvlRef.current) {
        const newZoom = Math.min(currentZoom * 1.2, 5); // Max zoom of 5x
        if (nvlRef.current.setZoom) {
          nvlRef.current.setZoom(newZoom);
          setCurrentZoom(newZoom);
        } else if (nvlRef.current.zoomIn) {
          nvlRef.current.zoomIn();
          setCurrentZoom(prev => Math.min(prev * 1.2, 5));
        }
      }
    } catch (error) {
      console.error("Zoom in error:", error);
    }
  };

  const handleZoomOut = () => {
    try {
      if (nvlRef.current) {
        const newZoom = Math.max(currentZoom * 0.8, 0.1); // Min zoom of 0.1x
        if (nvlRef.current.setZoom) {
          nvlRef.current.setZoom(newZoom);
          setCurrentZoom(newZoom);
        } else if (nvlRef.current.zoomOut) {
          nvlRef.current.zoomOut();
          setCurrentZoom(prev => Math.max(prev * 0.8, 0.1));
        }
      }
    } catch (error) {
      console.error("Zoom out error:", error);
    }
  };

  const handleResetZoom = () => {
    try {
      if (nvlRef.current) {
        if (nvlRef.current.zoomToNodes && graphData.nodes.length > 0) {
          const nodeIds = graphData.nodes.map((n) => n.id);
          nvlRef.current.zoomToNodes(nodeIds);
        } else if (nvlRef.current.setZoom) {
          nvlRef.current.setZoom(1);
        }
        setCurrentZoom(1);
      }
    } catch (error) {
      console.error("Reset zoom error:", error);
    }
  };

  // Panning event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button only
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && panStart && nvlRef.current) {
      const deltaX = e.clientX - panStart.x;
      const deltaY = e.clientY - panStart.y;
      
      try {
        // Use NVL's pan methods if available
        if (nvlRef.current.pan) {
          nvlRef.current.pan(-deltaX, -deltaY); // Invert deltas for correct direction
        } else if (nvlRef.current.setPan) {
          const currentPan = nvlRef.current.getPan?.() || { x: 0, y: 0 };
          nvlRef.current.setPan(currentPan.x - deltaX, currentPan.y - deltaY); // Invert deltas
        }
      } catch (error) {
        console.error("Pan error:", error);
      }
      
      setPanStart({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setPanStart(null);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsPanning(true);
      setPanStart({ x: touch.clientX, y: touch.clientY });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPanning && panStart && e.touches.length === 1 && nvlRef.current) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - panStart.x;
      const deltaY = touch.clientY - panStart.y;
      
      try {
        if (nvlRef.current.pan) {
          nvlRef.current.pan(-deltaX, -deltaY); // Invert deltas for correct direction
        } else if (nvlRef.current.setPan) {
          const currentPan = nvlRef.current.getPan?.() || { x: 0, y: 0 };
          nvlRef.current.setPan(currentPan.x - deltaX, currentPan.y - deltaY); // Invert deltas
        }
      } catch (error) {
        console.error("Touch pan error:", error);
      }
      
      setPanStart({ x: touch.clientX, y: touch.clientY });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setPanStart(null);
  };

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isPanning && panStart && nvlRef.current) {
        const deltaX = e.clientX - panStart.x;
        const deltaY = e.clientY - panStart.y;
        
        try {
          if (nvlRef.current.pan) {
            nvlRef.current.pan(-deltaX, -deltaY); // Invert deltas for correct direction
          } else if (nvlRef.current.setPan) {
            const currentPan = nvlRef.current.getPan?.() || { x: 0, y: 0 };
            nvlRef.current.setPan(currentPan.x - deltaX, currentPan.y - deltaY); // Invert deltas
          }
        } catch (error) {
          console.error("Global pan error:", error);
        }
        
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsPanning(false);
      setPanStart(null);
    };

    if (isPanning) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isPanning, panStart]);

  // Map nodes to add color, size, and labels
  const styledNodes = graphData.nodes.map((node: any) => {
    let color = "#cccccc";
    let size = 20; // Increase default size for better visibility
    let label = "";

    if (node.labels.includes("Client")) {
      if (node.properties.is_selected_sender) {
        color = "#ff6b6b"; // Highlight selected sender
        size = 30;
        label = node.properties.name || "Selected Sender";
      } else {
        color = "#4ecdc4";
        size = 20;
        label = node.properties.name || "Client";
      }
    } else if (node.labels.includes("Transaction997")) {
      color = "#ff9ff3";
      size = 18;
      label = "997";
    } else if (node.labels.includes("Transaction810")) {
      color = "#45b7d1";
      size = 18;
      label = "810";
    } else if (node.labels.includes("Transaction850")) {
      color = "#96ceb4";
      size = 18;
      label = "850";
    } else if (node.labels.includes("Transaction820")) {
      color = "#feca57";
      size = 18;
      label = "820";
    }

    return {
      ...node,
      color,
      size,
      label,
      caption: label,
    };
  });

  // Style relationships with labels
  const styledRels = graphData.relationships.map((rel: any) => {
    let color = "#cccccc";
    const width = 3; // Increase width for better visibility

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
      label: rel.type,
    };
  });

  console.log("Styled nodes:", styledNodes);
  console.log("Styled relationships:", styledRels);

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
    onRelationshipHover: (relationship: any, hitTargets: any, evt: MouseEvent) => {
      if (relationship) {
        setHoveredElement({ type: "rel", data: relationship });
        setTooltipPos({ x: evt.clientX, y: evt.clientY });
      } else {
        setHoveredElement(null);
        setTooltipPos(null);
      }
    },
    onNodeHover: (node: any, hitTargets: any, evt: MouseEvent) => {
      if (node) {
        setHoveredElement({ type: "node", data: node });
        setTooltipPos({ x: evt.clientX, y: evt.clientY });
      } else {
        setHoveredElement(null);
        setTooltipPos(null);
      }
    },
    onWheel: (evt: WheelEvent) => {
      // Handle mouse wheel zoom
      evt.preventDefault();
      if (evt.deltaY < 0) {
        // Zoom in
        handleZoomIn();
      } else {
        // Zoom out
        handleZoomOut();
      }
    },
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left sidebar with controls and info */}
      <div className="w-80 p-4 border-r overflow-y-auto bg-gray-50">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">EDI Transaction Graph Visualization</h2>

          <div className="mb-6">
            <label htmlFor="sender-select" className="block text-sm font-medium mb-2">
              Select Sender:
            </label>
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

          {loading && <div className="text-blue-600 mb-4">Loading graph data...</div>}
          {error && <div className="text-red-600 mb-4">Error: {error}</div>}

          {graphData.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Graph Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Nodes:</span>
                  <span className="font-medium">{graphData.summary.total_nodes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Relationships:</span>
                  <span className="font-medium">{graphData.summary.total_relationships}</span>
                </div>
                <div className="flex justify-between">
                  <span>Client Nodes:</span>
                  <span className="font-medium">{graphData.summary.client_nodes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction Nodes:</span>
                  <span className="font-medium">{graphData.summary.transaction_nodes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sent Transactions:</span>
                  <span className="font-medium">{graphData.summary.sent_transactions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Received Transactions:</span>
                  <span className="font-medium">{graphData.summary.received_transactions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Connected Clients:</span>
                  <span className="font-medium">{graphData.summary.connected_clients}</span>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-md font-semibold mb-3">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ff6b6b" }}></div>
                <span>Selected Sender</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#4ecdc4" }}></div>
                <span>Other Client</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ff9ff3" }}></div>
                <span>997 EDI Transaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#45b7d1" }}></div>
                <span>810 EDI Transaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#96ceb4" }}></div>
                <span>850 EDI Transaction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: "#feca57" }}></div>
                <span>820 EDI Transaction</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Relationships</h5>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1 rounded" style={{ backgroundColor: "#ff6b6b" }}></div>
                  <span>SENT_TRANSACTION</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1 rounded" style={{ backgroundColor: "#4ecdc4" }}></div>
                  <span>RECEIVED_BY</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-1 rounded" style={{ backgroundColor: "#feca57" }}></div>
                  <span>RESPONDS_TO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Graph area */}
      <div className="flex-1 relative bg-white">
        {graphLoading && !graphFetched && (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-wrap justify-center">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="skeleton animate-pulse bg-muted rounded-full w-10 h-10 m-1"
                />
              ))}
            </div>
          </div>
        )}
        
        {graphData && graphFetched && graphData.nodes.length > 0 ? (
          <div 
            ref={graphContainerRef}
            className="w-full h-full relative overflow-hidden"
            style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <InteractiveNvlWrapper
              ref={nvlRef}
              nodes={styledNodes}
              rels={styledRels}
              nvlOptions={{
                initialZoom: 1,
                disableTelemetry: true,
                layout: "d3Force",
              }}
              mouseEventCallbacks={mouseEventCallbacks}
              height="100%"
              width="100%"
            />
            
            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white/90 hover:bg-white"
                disabled={currentZoom >= 5}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white/90 hover:bg-white"
                disabled={currentZoom <= 0.1}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleResetZoom}
                className="w-10 h-10 bg-white/90 hover:bg-white text-xs"
                title="Fit to view"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </Button>
              {/* Zoom level indicator */}
              <div className="bg-white/90 px-2 py-1 rounded text-xs text-center font-medium">
                {Math.round(currentZoom * 100)}%
              </div>
            </div>

            {/* Panning instructions */}
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded text-xs">
              <div className="font-medium mb-1">Navigation:</div>
              <div>• Drag to pan</div>
              <div>• Scroll to zoom</div>
              <div>• Use buttons for precise control</div>
            </div>

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
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
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
