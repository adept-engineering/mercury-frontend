"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Globe, Settings, GripVertical } from "lucide-react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { getApiRegistration } from "@/actions/api-registration";
import { useMaps } from "@/hooks/use-maps";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface BusinessRule {
  reference_name: string;
  reference_value: string;
  position: number;
  stepName: string;
  registrationid: string;
}

interface BusinessRulesProps {
  businessRules: BusinessRule[];
  setBusinessRules: React.Dispatch<React.SetStateAction<BusinessRule[]>>;
}

interface ApiRegistration {
  id: string;
  name: string;
  description: string;
  registration_id: string;
  endpoints: Array<{
    endpoint: string;
    version: string;
    input_parameters: string;
    output_parameters: string;
  }>;
}

interface InputParameter {
  name: string;
  description: string;
  display_name: string;
  mandatory: string;
  type?: string; // Added for system-defined parameters
}

export function BusinessRules({
  businessRules,
  setBusinessRules,
}: BusinessRulesProps) {
  const { session } = useCurrentSession();
  const { maps, filterMapsByType } = useMaps();

  console.log("useMaps hook - maps:", maps); // Debug log
  console.log("useMaps hook - filterMapsByType function:", filterMapsByType); // Debug log
  const [apiRegistrations, setApiRegistrations] = useState<ApiRegistration[]>(
    []
  );
  const [selectedApiRegistration, setSelectedApiRegistration] =
    useState<string>("");
  const [selectedInputParameters, setSelectedInputParameters] = useState<
    string[]
  >([]);
  const [parameterValues, setParameterValues] = useState<
    Record<string, string>
  >({});
  const [stepName, setStepName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [parameterDialogOpen, setParameterDialogOpen] = useState(false);
  const [selectedApiForParams, setSelectedApiForParams] = useState<string>("");

  // Fetch API registrations
  useEffect(() => {
    const fetchApiRegistrations = async () => {
      if (!session?.user?.token) return;

      setIsLoading(true);
      try {
        const data = await getApiRegistration(session.user.token);
        setApiRegistrations(data);
      } catch (error) {
        console.error("Error fetching API registrations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiRegistrations();
  }, [session?.user?.token]);

  // Parse JSON parameters to InputParameter objects (same logic as edit-endpoint-dialog.tsx)
  function mapToInputParameterArray(input: string | object) {
    let obj = input;

    // Step 1: parse once if it's a string
    if (typeof obj === "string") {
      try {
        obj = JSON.parse(obj);

        // Step 2: if it's STILL a string, parse again
        if (typeof obj === "string") {
          obj = JSON.parse(obj);
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        return [];
      }
    }

    // Check if it's already an array of parameters
    if (Array.isArray(obj)) {
      return obj.map((item) => ({
        name: item.name || "",
        description: item.description || "",
        display_name: item.display_name || "",
        mandatory: item.mandatory || "no",
        type: item.type || "",
      }));
    }

    // If it's an object, convert to array format
    if (typeof obj === "object" && obj !== null) {
      return Object.entries(obj).map(([key, value]) => ({
        name: key,
        description: value as string,
        display_name: "",
        mandatory: "no",
        type: "",
      }));
    }

    return [];
  }

  // Parse input parameters from a specific API registration
  const getInputParametersForApi = (apiId: string): InputParameter[] => {
    const apiReg = apiRegistrations.find((api) => api.id === apiId);
    if (!apiReg || !apiReg.endpoints || apiReg.endpoints.length === 0)
      return [];

    try {
      const inputParamsStr = apiReg.endpoints[0].input_parameters;
      console.log("Raw input params string:", inputParamsStr); // Debug log

      const parsedInput = mapToInputParameterArray(inputParamsStr);
      console.log("Parsed input params:", parsedInput); // Debug log
      return parsedInput;
    } catch (error) {
      console.error("Error parsing input parameters:", error);
      return [];
    }
  };

  // Parse input parameters from selected API registration
  const getInputParameters = (): InputParameter[] => {
    if (!selectedApiRegistration) return [];

    const apiReg = apiRegistrations.find(
      (api) => api.id === selectedApiRegistration
    );
    if (!apiReg || !apiReg.endpoints || apiReg.endpoints.length === 0)
      return [];

    try {
      const inputParamsStr = apiReg.endpoints[0].input_parameters;
      console.log("Raw input params string:", inputParamsStr); // Debug log

      const parsedInput = mapToInputParameterArray(inputParamsStr);
      console.log("Parsed input params:", parsedInput); // Debug log
      return parsedInput;
    } catch (error) {
      console.error("Error parsing input parameters:", error);
      return [];
    }
  };

  // Get available API registrations (filter out already selected ones)
  const getAvailableApiRegistrations = () => {
    const selectedRegistrationIds = businessRules.map(
      (rule) => rule.registrationid
    );
    return apiRegistrations.filter(
      (api) => !selectedRegistrationIds.includes(api.id)
    );
  };

  const handleAddBusinessRule = () => {
    if (
      !selectedApiForParams ||
      selectedInputParameters.length === 0 ||
      !stepName.trim()
    ) {
      return;
    }

    const apiReg = apiRegistrations.find(
      (api) => api.id === selectedApiForParams
    );
    if (!apiReg) return;

    const inputParams = getInputParametersForApi(selectedApiForParams);
    const newBusinessRules: BusinessRule[] = selectedInputParameters.map(
      (paramName, index) => {
        const param = inputParams.find((p) => p.name === paramName);
        return {
          reference_name: paramName,
          reference_value: parameterValues[paramName] || "",
          position: businessRules.length + 1, // Same position for all params from same API
          stepName: stepName.trim(),
          registrationid: apiReg.registration_id, // Use registration_id instead of id
        };
      }
    );

    setBusinessRules((prev) => [...prev, ...newBusinessRules]);

    // Reset form
    setSelectedApiForParams("");
    setSelectedInputParameters([]);
    setParameterValues({});
    setStepName("");
    setParameterDialogOpen(false);
  };

  const handleRemoveBusinessRule = (index: number) => {
    const groupKeys = Object.keys(groupedBusinessRules);
    const groupKeyToRemove = groupKeys[index];
    const rulesToRemove = groupedBusinessRules[groupKeyToRemove];

    // Remove all business rules in the group
    setBusinessRules((prev) =>
      prev.filter(
        (rule) =>
          !rulesToRemove.some(
            (ruleToRemove) =>
              rule.registrationid === ruleToRemove.registrationid &&
              rule.position === ruleToRemove.position
          )
      )
    );
  };

  const handleParameterToggle = (paramName: string, checked: boolean) => {
    // Get the parameter to check if it's required
    const inputParams = getInputParametersForApi(selectedApiForParams);
    const param = inputParams.find((p) => p.name === paramName);

    // If it's a required field and trying to uncheck, prevent it
    if (param?.mandatory === "yes" && !checked) {
      return;
    }

    if (checked) {
      setSelectedInputParameters((prev) => [...prev, paramName]);
    } else {
      setSelectedInputParameters((prev) => prev.filter((p) => p !== paramName));
      setParameterValues((prev) => {
        const newValues = { ...prev };
        delete newValues[paramName];
        return newValues;
      });
    }
  };

  const handleParameterValueChange = (paramName: string, value: string) => {
    setParameterValues((prev) => ({
      ...prev,
      [paramName]: value,
    }));
  };

  const handleApiSelection = (apiId: string) => {
    setSelectedApiForParams(apiId);
    setDialogOpen(false);
    setParameterDialogOpen(true);

    const inputParams = getInputParametersForApi(apiId);
    console.log("Input params for auto-selection:", inputParams); // Debug log

    const requiredParams = inputParams
      .filter((param: InputParameter) => param.mandatory === "yes")
      .map((param: InputParameter) => param.name);

    console.log("Required params to auto-select:", requiredParams); // Debug log

    if (requiredParams.length > 0) {
      setSelectedInputParameters(requiredParams);

      // Initialize values for required parameters
      const initialValues: Record<string, string> = {};
      requiredParams.forEach((paramName: string) => {
        initialValues[paramName] = "";
      });

      setParameterValues(initialValues);
    }
  };

  // Group business rules by registrationid and position
  const groupedBusinessRules = businessRules.reduce((groups, rule) => {
    const key = `${rule.registrationid}-${rule.position}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(rule);
    return groups;
  }, {} as Record<string, BusinessRule[]>);

  // Sortable Business Rule Component
  function SortableBusinessRule({
    groupKey,
    rules,
    index,
    onDelete,
  }: {
    groupKey: string;
    rules: BusinessRule[];
    index: number;
    onDelete: (index: number) => void;
  }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: groupKey,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    const apiReg = apiRegistrations.find(
      (api) => api.registration_id === rules[0].registrationid
    );
    console.log("apiReg:", apiReg);

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="flex items-center justify-between p-3 border rounded-md bg-background">
        <div className="flex items-center gap-3">
          <div
            {...listeners}
            className="cursor-move p-1 hover:bg-muted rounded">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="font-medium">{rules[0].stepName}</span>
              <Badge variant="outline">Step {rules[0].position}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              API: {apiReg?.name || "System Defined API"}
            </p>
            <div className="mt-2 space-y-1">
              {rules.map((rule, ruleIndex) => (
                <p key={ruleIndex} className="text-sm text-muted-foreground">
                  Parameter: {rule.reference_name} = {rule.reference_value}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(index)}
          className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const groupKeys = Object.keys(groupedBusinessRules);
      const oldIndex = groupKeys.findIndex((key) => key === active.id);
      const newIndex = groupKeys.findIndex((key) => key === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // Get all business rules
        const allRules = [...businessRules];

        // Remove all rules from the old position
        const rulesToMove = groupedBusinessRules[groupKeys[oldIndex]];
        const filteredRules = allRules.filter(
          (rule) =>
            !rulesToMove.some(
              (ruleToMove) =>
                rule.registrationid === ruleToMove.registrationid &&
                rule.position === ruleToMove.position
            )
        );

        // Update positions for all remaining rules
        const updatedRules = filteredRules.map((rule, index) => ({
          ...rule,
          position: index + 1,
        }));

        // Add the moved rules at the new position
        const newPosition = newIndex + 1;
        const movedRules = rulesToMove.map((rule) => ({
          ...rule,
          position: newPosition,
        }));

        // Insert the moved rules at the correct position
        const finalRules = [...updatedRules];
        finalRules.splice(newIndex, 0, ...movedRules);

        // Update positions for all rules after the insertion
        const finalUpdatedRules = finalRules.map((rule, index) => ({
          ...rule,
          position: index + 1,
        }));

        setBusinessRules(finalUpdatedRules);
      }
    }
  };

  // Get available maps by type using the useMaps hook
  const getMapsByType = (mapType: string) => {
    console.log("getMapsByType called with mapType:", mapType); // Debug log

    const filteredMaps = filterMapsByType(
      mapType as "TRANSFORMATION" | "RESEARCH" | "COMPLIANCE"
    );
    console.log("filteredMaps:", filteredMaps); // Debug log
    console.log("maps:", maps); // Debug log
    const result =
      filteredMaps?.map(
        (map: {
          map_id?: string;
          id?: string;
          map_title?: string;
          map_name?: string;
        }) => ({
          id: map.map_id || map.id || "",
          name: map.map_title || map.map_name || "",
        })
      ) || [];

    console.log("Final result:", result); // Debug log
    return result;
  };

  // Validate HTTP URL
  const validateHttpUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Check if endpoint is system defined
  const isSystemDefined = (apiReg: ApiRegistration): boolean => {
    return apiReg.endpoints[0]?.endpoint === "System Defined";
  };

  // Get parameter input component based on type
  const getParameterInput = (
    param: InputParameter,
    paramName: string,
    value: string,
    onChange: (paramName: string, value: string) => void
  ) => {
    const apiReg = apiRegistrations.find(
      (api) => api.id === selectedApiForParams
    );

    if (!apiReg || !isSystemDefined(apiReg)) {
      // Regular input for non-system defined endpoints
      return (
        <Input
          id={`value-${paramName}`}
          placeholder={`Enter value for ${param.display_name || paramName}`}
          value={value}
          onChange={(e) => onChange(paramName, e.target.value)}
        />
      );
    }

    // Handle system-defined endpoint parameters
    if (param.type === "url") {
      const isValidUrl = validateHttpUrl(value);
      return (
        <div className="space-y-2">
          <Input
            id={`value-${paramName}`}
            placeholder="Enter HTTP URL (e.g., https://api.example.com)"
            value={value}
            onChange={(e) => onChange(paramName, e.target.value)}
            className={isValidUrl ? "" : "border-red-500"}
          />
          {value && !isValidUrl && (
            <p className="text-sm text-red-500">
              Please enter a valid HTTP URL
            </p>
          )}
        </div>
      );
    }

    if (param.type && param.type.startsWith("map_")) {
      const mapType = param.type.split("_")[1]; // Get the part after "map_"
      console.log(
        "Processing map type:",
        param.type,
        "extracted mapType:",
        mapType
      ); // Debug log

      const availableMaps = getMapsByType(mapType);
      console.log("Available maps for", mapType, ":", availableMaps); // Debug log

      return (
        <Select
          onValueChange={(value) => onChange(paramName, value)}
          value={value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select a ${mapType} map`} />
          </SelectTrigger>
          <SelectContent>
            {availableMaps.map((map: { id: string; name: string }) => (
              <SelectItem key={map.id} value={map.id}>
                {map.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    // Default input for other types
    return (
      <Input
        id={`value-${paramName}`}
        placeholder={`Enter value for ${param.display_name || paramName}`}
        value={value}
        onChange={(e) => onChange(paramName, e.target.value)}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Business Rules Configuration
        </h2>
        <p className="text-muted-foreground">
          Select API registrations and configure their input parameters
        </p>
      </div>

      {/* Selected Business Rules */}
      {businessRules.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                Selected Business Rules (
                {Object.keys(groupedBusinessRules).length})
              </h3>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Business Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="!w-fit !max-w-[1200px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Select Business Rule</DialogTitle>
                  <DialogDescription>
                    Choose an API registration to configure as a business rule
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 w-full">
                  {/* API Registration Selection Table */}
                  <div className="space-y-4">
                    <Label>Select API Registration</Label>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Select</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getAvailableApiRegistrations().map((api) => (
                          <TableRow key={api.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedApiForParams === api.id}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleApiSelection(api.id);
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {api.name}
                            </TableCell>
                            <TableCell>{api.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={Object.keys(groupedBusinessRules)}
              strategy={rectSortingStrategy}>
              <div className="space-y-3">
                {Object.entries(groupedBusinessRules).map(
                  ([groupKey, rules], index) => (
                    <SortableBusinessRule
                      key={groupKey}
                      groupKey={groupKey}
                      rules={rules}
                      index={index}
                      onDelete={handleRemoveBusinessRule}
                    />
                  )
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Add Business Rule Button - Show when no business rules exist */}
      {businessRules.length === 0 && (
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Business Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="!w-fit !max-w-[1200px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Select Business Rule</DialogTitle>
                <DialogDescription>
                  Choose an API registration to configure as a business rule
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 w-full">
                {/* API Registration Selection Table */}
                <div className="space-y-4">
                  <Label>Select API Registration</Label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Select</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAvailableApiRegistrations().map((api) => (
                        <TableRow key={api.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedApiForParams === api.id}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleApiSelection(api.id);
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {api.name}
                          </TableCell>
                          <TableCell>{api.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Parameter Configuration Dialog */}
      <Dialog open={parameterDialogOpen} onOpenChange={setParameterDialogOpen}>
        <DialogContent className="!w-fit !max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Business Rule Parameters</DialogTitle>
            <DialogDescription>
              Select input parameters and provide values for the selected
              business rule
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 w-full">
            {/* Input Parameters Selection */}
            {selectedApiForParams && (
              <div className="space-y-4">
                <div>
                  <Label>Select Input Parameters</Label>
                  <div className="mt-2 space-y-2">
                    {getInputParametersForApi(selectedApiForParams).map(
                      (param) => (
                        <div
                          key={param.name}
                          className="flex items-center space-x-3 p-3 border rounded-md">
                          <Checkbox
                            id={param.name}
                            checked={selectedInputParameters.includes(
                              param.name
                            )}
                            onCheckedChange={(checked) => {
                              handleParameterToggle(
                                param.name,
                                checked as boolean
                              );
                            }}
                            disabled={param.mandatory === "yes"}
                          />
                          <div className="flex-1">
                            <Label htmlFor={param.name} className="font-medium">
                              {param.display_name || param.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {param.description}
                            </p>
                            {param.mandatory === "yes" && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Parameter Values */}
                {selectedInputParameters.length > 0 && (
                  <div className="space-y-3">
                    <Label>Parameter Values</Label>
                    {selectedInputParameters.map((paramName) => {
                      const param = getInputParametersForApi(
                        selectedApiForParams
                      ).find((p) => p.name === paramName);

                      return (
                        <div key={paramName} className="space-y-2">
                          <Label htmlFor={`value-${paramName}`}>
                            {param?.display_name || paramName}
                          </Label>
                          {getParameterInput(
                            param!,
                            paramName,
                            parameterValues[paramName] || "",
                            (paramName, value) =>
                              handleParameterValueChange(paramName, value)
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Step Name */}
                <div className="space-y-2">
                  <Label htmlFor="step-name">Step Name</Label>
                  <Input
                    id="step-name"
                    placeholder="Enter step name for this business rule"
                    value={stepName}
                    onChange={(e) => setStepName(e.target.value)}
                  />
                </div>

                {/* Add Button */}
                <Button
                  onClick={handleAddBusinessRule}
                  disabled={
                    !selectedApiForParams ||
                    selectedInputParameters.length === 0 ||
                    !stepName.trim()
                  }
                  className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Business Rule
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
