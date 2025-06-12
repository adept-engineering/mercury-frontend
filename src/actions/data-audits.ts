import axiosInstance from "@/lib/axios";

export async function getDataAuditLogs(fromDate: string, toDate: string) {
  try {
    const response = await axiosInstance.get(
      `/edi-info?dateFrom=${fromDate}&dateTo=${toDate}`
    );
    console.log("data audit", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getDataAuditLogDetails(id: string) {
  try {
    const response = await axiosInstance.get(`/edi-info/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
