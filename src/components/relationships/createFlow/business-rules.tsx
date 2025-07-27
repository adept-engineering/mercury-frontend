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

export function BusinessRules() {
  const [businessRules, setBusinessRules] = useState<{
    complianceRules?: ComplianceRules[];
    transformationRules?: TransformationRule[];
    researchRules?: ResearchRule[];
  }>({});

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

  const handleDragEnd = (
    event: DragEndEvent,
    type: "compliance" | "transformation" | "research"
  ) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const rules =
        type === "compliance"
          ? businessRules.complianceRules || []
          : type === "transformation"
          ? businessRules.transformationRules || []
          : businessRules.researchRules || [];

      const oldIndex = rules.findIndex(
        (rule) => rule.id.toString() === active.id
      );
      const newIndex = rules.findIndex(
        (rule) => rule.id.toString() === over?.id
      );

      const newRules = arrayMove(rules, oldIndex, newIndex);

      setBusinessRules((prev) => ({
        ...prev,
        [type === "compliance"
          ? "complianceRules"
          : type === "transformation"
          ? "transformationRules"
          : "researchRules"]: newRules,
      }));
    }
  };

  const handleAddComplianceRules = (rules: ComplianceRules[]) => {
    setBusinessRules((prev) => ({
      ...prev,
      complianceRules: [...(prev.complianceRules || []), ...rules],
    }));
  };

  const handleAddTransformationRules = (rules: TransformationRule[]) => {
    setBusinessRules((prev) => ({
      ...prev,
      transformationRules: [...(prev.transformationRules || []), ...rules],
    }));
  };

  const handleAddResearchRules = (rules: ResearchRule[]) => {
    setBusinessRules((prev) => ({
      ...prev,
      researchRules: [...(prev.researchRules || []), ...rules],
    }));
  };

  function SortableItem({
    rule,
    type,
  }: {
    rule: ComplianceRules | TransformationRule | ResearchRule;
    type: "compliance" | "transformation" | "research";
  }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: rule.id.toString() });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <div ref={setNodeRef} style={style} {...attributes} className="relative">
        <Card className="hover:shadow-md transition-shadow duration-300 relative group">
          <div className="absolute top-4 left-2 cursor-move" {...listeners}>
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardHeader className="p-2 pl-8">
            <CardTitle className="text-lg flex items-center justify-between">
              {type === "compliance" ? "Compliance Map" : "Transformation Map"}
              {type === "compliance" ? (
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Shuffle className="h-5 w-5 text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <p className="text-sm text-muted-foreground">{rule.rule_title}</p>
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
        onRuleSelect={handleAddComplianceRules}
      />
      <TransformationMapPage
        open={transformationOpen}
        setOpen={setTransformationOpen}
        onRuleSelect={handleAddTransformationRules}
      />
      <ResearchMapPage
        open={researchmapOpen}
        setOpen={setResearchmapOpen}
        onRuleSelect={handleAddResearchRules}
      />
      <div className="space-y-6 min-h-[40vh] relative overflow-y-auto">
        {!businessRules.complianceRules &&
        !businessRules.transformationRules ? (
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
            onDragEnd={(event) => handleDragEnd(event, "compliance")}
          >
            <SortableContext
              items={(businessRules.complianceRules || []).map((rule) =>
                rule.id.toString()
              )}
              strategy={rectSortingStrategy}
            >
              {businessRules.complianceRules?.map((rule) => (
                <SortableItem key={rule.id} rule={rule} type="compliance" />
              ))}
            </SortableContext>
          </DndContext>
        )}

        {businessRules.transformationRules &&
          businessRules.transformationRules.length > 0 && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, "transformation")}
            >
              <SortableContext
                items={(businessRules.transformationRules || []).map((rule) =>
                  rule.id.toString()
                )}
                strategy={rectSortingStrategy}
              >
                {businessRules.transformationRules?.map((rule) => (
                  <SortableItem
                    key={rule.id}
                    rule={rule}
                    type="transformation"
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}

        {businessRules.researchRules &&
          businessRules.researchRules.length > 0 && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleDragEnd(event, "research")}
            >
              <SortableContext
                items={(businessRules.researchRules || []).map((rule) =>
                  rule.id.toString()
                )}
                strategy={rectSortingStrategy}
              >
                {businessRules.researchRules?.map((rule) => (
                  <SortableItem key={rule.id} rule={rule} type="research" />
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
