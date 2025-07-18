"use server"
import {axiosInstance} from "@/lib/axios";

import { revalidatePath } from "next/cache";

export async function getComplianceRules(token: string) {
  try {
    const response = await axiosInstance(token).get(
      `/compliance-rules`
    );
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createComplianceRule(data: {

  rule: string;
  rule_title: string;
}, token: string) {
  try {
      const response = await axiosInstance(token).post("/compliance-rules/create", data);
      revalidatePath("/compliance-rules");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateComplianceRule(data: {
  rule: string;
  rule_title: string;
}, token: string,complianceRuleId: string) {
  try {
      const response = await axiosInstance(token).put(`/compliance-rules/${complianceRuleId}`, data);
      revalidatePath("/compliance-rules");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getComplianceRuleById = async (token: string,complianceRuleId: string) => {
  try {
      const response = await axiosInstance(token).get(`/compliance-rules/${complianceRuleId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteComplianceRule(token: string,complianceRuleId: string) {
  try {
      const response = await axiosInstance(token).delete(`/compliance-rules/${complianceRuleId}`);
      revalidatePath("/compliance-rules");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}