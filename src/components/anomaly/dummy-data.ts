import { AnomalyInstance, AnomalyDefinition } from "@/lib/types"

export const dummyAnomalyInstances: AnomalyInstance[] = [
    {
        id: "1",
        fromEntity: "Farm A",
        toEntity: "SAP System",
        dateTime: "2025-05-27T14:30:00.000Z",
        anomalyDescription: "Missing field in payload",
        severity: "Critical"
    },
    {
        id: "2",
        fromEntity: "Farm B",
        toEntity: "EDI System",
        dateTime: "2025-05-26T14:30:00.000Z",
        anomalyDescription: "Format mismatch in data field",
        severity: "Critical"
    },
    {
        id: "3",
        fromEntity: "Farm A",
        toEntity: "SAP System",
        dateTime: "2025-05-26T14:30:00.000Z",
        anomalyDescription: "Missing field in payload",
        severity: "Warning"
    },
    {
        id: "4",
        fromEntity: "Farm B",
        toEntity: "EDI System",
        dateTime: "2025-05-24T14:30:00.000Z",
        anomalyDescription: "Format mismatch in data field",
        severity: "Warning"
    },
    {
        id: "5",
        fromEntity: "Farm A",
        toEntity: "SAP System",
        dateTime: "2025-05-23T14:30:00.000Z",
        anomalyDescription: "Missing field in payload",
        severity: "Warning"
    },
    {
        id: "6",
        fromEntity: "Farm B",
        toEntity: "EDI System",
        dateTime: "2025-05-22T14:30:00.000Z",
        anomalyDescription: "Format mismatch in data field",
        severity: "Unresolved"
    },
    {
        id: "7",
        fromEntity: "Farm A",
        toEntity: "SAP System",
        dateTime: "2025-05-21T14:30:00.000Z",
        anomalyDescription: "Missing field in payload",
        severity: "Critical"
    },
    {
        id: "8",
        fromEntity: "Farm B",
        toEntity: "EDI System",
        dateTime: "2025-05-20T14:30:00.000Z",
        anomalyDescription: "Format mismatch in data field",
        severity: "Resolved"
    },
    {
        id: "9",
        fromEntity: "Farm A",
        toEntity: "SAP System",
        dateTime: "2025-05-19T14:30:00.000Z",
        anomalyDescription: "Missing field in payload",
        severity: "Warning"
    },
    {
        id: "10",
        fromEntity: "Farm B",
        toEntity: "EDI System",
        dateTime: "2025-05-18T14:30:00.000Z",
        anomalyDescription: "Format mismatch in data field",
        severity: "Unresolved"
    }
]

export const dummyAnomalyDefinitions: AnomalyDefinition[] = [
    {
        id: "1",
        anomalyType: "Missing Field",
        description: "Triggered when required field is null",
        ruleTriggerLogic: "if field == null",
        severity: "Critical",
        editable: true
    },
    {
        id: "2",
        anomalyType: "Format Mismatch",
        description: "Wrong format detected in data field",
        ruleTriggerLogic: "regex: \\d{1}-\\d{2}-\\d{2}",
        severity: "Critical",
        editable: true
    },
    {
        id: "3",
        anomalyType: "Unexpected Value",
        description: "Value outside accepted range",
        ruleTriggerLogic: "value not in [A, B, C]",
        severity: "Warning",
        editable: true
    },
    {
        id: "4",
        anomalyType: "Missing Field",
        description: "Triggered when required field is null",
        ruleTriggerLogic: "if field == null",
        severity: "Warning",
        editable: true
    },
    {
        id: "5",
        anomalyType: "Format Mismatch",
        description: "Wrong format detected in data field",
        ruleTriggerLogic: "regex: \\d{1}-\\d{2}-\\d{2}",
        severity: "Warning",
        editable: true
    },
    {
        id: "6",
        anomalyType: "Unexpected Value",
        description: "Value outside accepted range",
        ruleTriggerLogic: "value not in [A, B, C]",
        severity: "Critical",
        editable: true
    },
    {
        id: "7",
        anomalyType: "Missing Field",
        description: "Triggered when required field is null",
        ruleTriggerLogic: "if field == null",
        severity: "Critical",
        editable: true
    },
    {
        id: "8",
        anomalyType: "Format Mismatch",
        description: "Wrong format detected in data field",
        ruleTriggerLogic: "regex: \\d{1}-\\d{2}-\\d{2}",
        severity: "Warning",
        editable: true
    },
    {
        id: "9",
        anomalyType: "Unexpected Value",
        description: "Value outside accepted range",
        ruleTriggerLogic: "value not in [A, B, C]",
        severity: "Warning",
        editable: true
    },
    {
        id: "10",
        anomalyType: "Missing Field",
        description: "Triggered when required field is null",
        ruleTriggerLogic: "if field == null",
        severity: "Warning",
        editable: true
    }
] 