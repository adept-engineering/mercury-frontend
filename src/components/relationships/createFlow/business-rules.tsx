"use client";
import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldCheck,
  Shuffle,
  Search,
  GripVertical,
  PlusCircle,
} from "lucide-react";
import { ComplianceRulesPage } from "./compliance-rules";
import { TransformationMapPage } from "./transformation-rules";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComplianceRules, ResearchRule, TransformationRule } from "@/lib/types";
import { ResearchMapPage } from "./research-map";
import { SeparatorArrow,ArrowConnector } from "@/components/ui/separator";
import { useMaps } from "@/hooks/use-maps";

export function BusinessRules() {
  const { maps, isLoading } = useMaps();
  const [businessRules, setBusinessRules] = useState<{
    map_type: "COMPLIANCE" | "TRANSFORMATION" | "RESEARCH";
    id: string;
    map_title: string;
    map_description: string;
  }[]>([]);
    
  //   Dialog States
  const [complianceOpen, setComplianceCheckOpen] = useState(false);
  const handleComplianceDialog = () => setComplianceCheckOpen(!complianceOpen);

  const [transformationOpen, setTransformationOpen] = useState(false);
  const handleTransformationDialog = () =>
    setTransformationOpen(!transformationOpen);

  const [researchmapOpen, setResearchmapOpen] = useState(false);
  const handleResearchDialog = () => setResearchmapOpen(!researchmapOpen);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = businessRules.findIndex(
        (rule) => rule.id.toString() === active.id
      );
      const newIndex = businessRules.findIndex(
        (rule) => rule.id.toString() === over?.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const newRules = arrayMove(businessRules, oldIndex, newIndex);
        setBusinessRules(newRules);
      }
    }
  };

  const handleAddComplianceMaps = (selectedMaps: any[]) => {
    const newMaps = selectedMaps.map((map, index) => ({
      map_type: "COMPLIANCE" as const,
      id: `${map.id}-${Date.now()}-${index}`,
      map_title: map.map_title,
      map_description: map.map_description
    }));
    setBusinessRules((prev) => [...prev, ...newMaps]);
  };

  const handleAddTransformationMaps = (selectedMaps: any[]) => {
    const newMaps = selectedMaps.map((map, index) => ({
      map_type: "TRANSFORMATION" as const,
      id: `${map.id}-${Date.now()}-${index}`,
      map_title: map.map_title,
      map_description: map.map_description
    }));
    setBusinessRules((prev) => [...prev, ...newMaps]);
  };

  const handleAddResearchMaps = (selectedMaps: any[]) => {
    const newMaps = selectedMaps.map((map, index) => ({
      map_type: "RESEARCH" as const,
      id: `${map.id}-${Date.now()}-${index}`,
      map_title: map.map_title,
      map_description: map.map_description
    }));
    setBusinessRules((prev) => [...prev, ...newMaps]);
  };

  function SortableItem({
    rule,
    index,
  }: {
    rule: { map_type: "COMPLIANCE" | "TRANSFORMATION" | "RESEARCH"; id: string; map_title: string; map_description: string; };
    index: number;
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: rule.id.toString() });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const getTypeLabel = () => {
      switch (rule.map_type) {
        case "COMPLIANCE":
          return "Compliance Map";
        case "TRANSFORMATION":
          return "Transformation Map";
        case "RESEARCH":
          return "Research Map";
      }
    };

    const getIcon = () => {
      switch (rule.map_type) {
        case "COMPLIANCE":
          return <ShieldCheck className="h-5 w-5 text-primary" />;
        case "TRANSFORMATION":
          return <Shuffle className="h-5 w-5 text-primary" />;
        case "RESEARCH":
          return <Search className="h-5 w-5 text-primary" />;
      }
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} className={`relative ${index !== 0 ? '-mt-5' : ''}`}>
        <Card className="hover:shadow-md h-20 transition-shadow duration-300 relative group">
          <div className="absolute top-4 left-2 cursor-move" {...listeners}>
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardHeader className="p-2 pl-8">
            <CardTitle className="text-lg flex items-center justify-between">
              {getTypeLabel()}
              {getIcon()}
            </CardTitle>
          </CardHeader>
          <CardContent className="absolute bottom-2 left-0">
            <p className="text-sm text-muted-foreground">{rule.map_title}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ComplianceRulesPage
        open={complianceOpen}
        setOpen={setComplianceCheckOpen}
        onRuleSelect={handleAddComplianceMaps}
      />
      <TransformationMapPage
        open={transformationOpen}
        setOpen={setTransformationOpen}
        onRuleSelect={handleAddTransformationMaps}
      />
      <ResearchMapPage
        open={researchmapOpen}
        setOpen={setResearchmapOpen}
        onRuleSelect={handleAddResearchMaps}
      />
              <div className="space-y-6 min-h-[40vh] relative overflow-y-auto">
          {businessRules.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="text-muted-foreground">
                <p className="text-lg">
                  You have not added any business rules, please specify.
                </p>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default" className="mt-4">
                    Add Business Rule
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 space-y-2">
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleComplianceDialog}
                    >
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Compliance Map
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleTransformationDialog}
                    >
                      <Shuffle className="mr-2 h-4 w-4" />
                      Transformation Map
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleResearchDialog}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Research Map
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={businessRules.map((rule) => rule.id.toString())}
                strategy={rectSortingStrategy}
              >
                {businessRules.map((rule,index) => (
                  <div key={rule.id} className="relative">
                    <SortableItem index={index} rule={rule} />
                    {index !== businessRules.length - 1 && (
                      <div className="my-1">
                        <ArrowConnector color="primary" size="lg" />
                      </div>
                    )}
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              className="mt-4 absolute bottom-0 right-0"
            >
              <PlusCircle size={40} className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 space-y-2">
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleComplianceDialog}
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Compliance Map
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleTransformationDialog}
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Transformation Map
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleResearchDialog}
              >
                <Search className="mr-2 h-4 w-4" />
                Research Map
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
