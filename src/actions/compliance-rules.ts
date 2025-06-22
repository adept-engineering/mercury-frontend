import {axiosLocal,axiosInstance} from "@/lib/axios";
import {auth} from "./auth";

export async function getComplianceRules(id: string) {
  try {
    const session = await auth();
    const response = await axiosInstance(session?.user?.token ?? "").get(
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
    const response = await axiosLocal.post("/compliance-rules/create", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
