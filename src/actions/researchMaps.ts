"use server";
import { ResearchMap, ResearchRule } from "@/lib/types";

// Dummy data based on types from @/lib/types.ts
const dummyResearchMaps: ResearchMap[] = [
  {
    id: "1",
    map_title: "Research Map 1",
    map_description: "First research map for data exploration",
    rules: [
      {
        id: "rule1",
        rule: "Rule 1 details",
        rule_title: "Initial Research Rule",
      },
      {
        id: "rule2",
        rule: "Rule 2 details",
        rule_title: "Advanced Research Rule",
      },
    ],
    map_type: "research",
    updated_by: "admin",
    updated_date: new Date().toISOString(),
    created_by: "admin",
    created_date: new Date().toISOString(),
  },
];

export const getResearchMaps = async (token: string) => {
  try {
    // Simulate API response with dummy data
    return dummyResearchMaps;
  } catch (error) {
    console.error("Error getting research maps:", error);
    throw error;
  }
};

export const createResearchMap = async (
  token: string,
  data: {
    map_title: string;
    map_description: string;
    rules: { rule: string; rule_title: string }[];
  }
) => {
  try {
    // Simulate creating a new research map
    const newResearchMap: ResearchMap = {
      id: (dummyResearchMaps.length + 1).toString(),
      map_title: data.map_title,
      map_description: data.map_description,
      rules: data.rules.map((rule, index) => ({
        id: `rule_${Date.now()}_${index}`,
        rule: rule.rule,
        rule_title: rule.rule_title,
      })),
      map_type: "research",
      updated_by: "admin",
      updated_date: new Date().toISOString(),
      created_by: "admin",
      created_date: new Date().toISOString(),
    };

    dummyResearchMaps.push(newResearchMap);
    return newResearchMap;
  } catch (error) {
    console.error("Error creating research map:", error);
    throw error;
  }
};

export const getResearchMapsRules = async (
  token: string,
  researchMapId: string
) => {
  try {
    // Find the research map and return its rules
    const researchMap = dummyResearchMaps.find(
      (map) => map.id === researchMapId
    );
    return researchMap ? researchMap.rules : [];
  } catch (error) {
    console.error("Error getting research map rules:", error);
    throw error;
  }
};
