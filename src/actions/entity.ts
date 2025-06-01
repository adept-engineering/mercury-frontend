import axiosInstance from "@/lib/axios";

export async function getEntityIds() {
    try {
        const response = await axiosInstance.get("/entities/entity-ids");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}