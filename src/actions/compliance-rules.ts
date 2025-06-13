import axiosInstance from "@/lib/axios";

export async function getComplianceRules(id: string) {
  try {
    const response = await axiosInstance.get(
      `/compliance-rules?entityid_relationship_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createComplianceRuleController(data: {
  entityid_relationship_id: string;
  rule: string;
  rule_title: string;
}) {
  try {
    const response = await axiosInstance.post("/compliance-rules/create", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
