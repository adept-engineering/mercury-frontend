"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Shuffle, Search } from "lucide-react";
import { useMaps } from "@/hooks/use-maps";

interface MapProps {
  mapIds: { map_id: string }[];
}

export function Map({ mapIds }: MapProps) {
  const { maps, isLoading, filterMapsByIds } = useMaps();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading maps...</div>
      </div>
    );
  }

  if (!maps || maps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
        <div className="text-muted-foreground">
          <p className="text-lg">No maps available.</p>
        </div>
      </div>
    );
  }

  const filteredMaps = mapIds.map((map) => filterMapsByIds(map.map_id));

  const getTypeLabel = (mapType: string) => {
    switch (mapType) {
      case "COMPLIANCE":
        return "Compliance Map";
      case "TRANSFORMATION":
        return "Transformation Map";
      case "RESEARCH":
        return "Research Map";
      default:
        return "Map";
    }
  };

  const getIcon = (mapType: string) => {
    switch (mapType) {
      case "COMPLIANCE":
        return <ShieldCheck className="h-5 w-5 text-primary" />;
      case "TRANSFORMATION":
        return <Shuffle className="h-5 w-5 text-primary" />;
      case "RESEARCH":
        return <Search className="h-5 w-5 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {filteredMaps.map((map: any, index: number) => (
        <div key={map.map_id} className="">
          <Card className="hover:shadow-md transition-shadow h-30 duration-300">
            <CardHeader className="p-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIcon(map.map_type)}
                  <span>{getTypeLabel(map.map_type)}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className=" pt-0">
              <div className=" -mt-5">
                <div>
                  <h4 className="font-medium text-sm">{map.map_title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {map.map_description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {index !== maps.length - 1 && (
            <div className="my-2 flex justify-center">
              <div className="w-px h-4 bg-border"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
