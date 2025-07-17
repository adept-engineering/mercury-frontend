import { TransformationMap, TransformationRule } from "@/lib/types";

const sampleRules: TransformationRule[] = [
  {
    id: "rule-1",
    rule_title: "EDI to JSON Field Mapping",
    rule: "Convert EDI 837 format to JSON structure with field mapping",
  },
  {
    id: "rule-2",
    rule_title: "XML Validation Rule",
    rule: "Validate XML structure and content before transformation",
  },
  {
    id: "rule-3",
    rule_title: "Data Type Conversion",
    rule: "Convert data types between source and target formats",
  },
  {
    id: "rule-4",
    rule_title: "Field Mapping Logic",
    rule: "Map specific fields from source to target format",
  },
  {
    id: "rule-5",
    rule_title: "Error Handling",
    rule: "Handle transformation errors and provide fallback values",
  },
];

export const dummyTransformationMaps: TransformationMap[] = [
  {
    id: "1",
    map_title: "EDI to JSON Transformation",
    map_description: "Complete transformation map for converting EDI 837 healthcare claims to JSON format",
    rules: sampleRules.slice(0, 3),
  },
  {
    id: "2",
    map_title: "XML to EDI Conversion",
    map_description: "Transform XML healthcare data to EDI 837 format with validation",
    rules: sampleRules.slice(1, 4),
  },
  {
    id: "3",
    map_title: "JSON to CSV Mapping",
    map_description: "Map JSON response data to CSV format for reporting and analysis",
    rules: sampleRules.slice(2, 5),
  },
  {
    id: "4",
    map_title: "EDI 835 to Database",
    map_description: "Parse EDI 835 remittance advice and store in database with proper indexing",
    rules: sampleRules.slice(0, 2),
  },
  {
    id: "5",
    map_title: "Custom Field Mapping",
    map_description: "Custom transformation map for specific client requirements and business rules",
    rules: sampleRules.slice(3, 5),
  },
  {
    id: "6",
    map_title: "HL7 to FHIR Conversion",
    map_description: "Convert HL7 v2 messages to FHIR resources for modern healthcare systems",
    rules: sampleRules,
  },
  {
    id: "7",
    map_title: "Flat File to XML",
    map_description: "Transform flat file data to XML format with custom delimiters and validation",
    rules: sampleRules.slice(1, 3),
  },
  {
    id: "8",
    map_title: "Database to EDI 834",
    map_description: "Generate EDI 834 enrollment data from database records with proper formatting",
    rules: sampleRules.slice(0, 4),
  },
]; 