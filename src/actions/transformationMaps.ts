"use server"
import axiosInstance from "@/lib/axios";
import { revalidatePath } from "next/cache";



export const getTransformationMaps = async (token: string) => {
    try{
        const response = await axiosInstance(token).get("/transformation-maps")
        return response.data.formattedTransformationMaps
    }catch(error){
        console.error("Error getting transformation maps:", error)
        throw error
    }
}
export const createTransformMap = async (token: string, data:{map_title:string, map_description:string, rules:{rule:string, rule_title:string}[]}) => {
    try{
        const response = await axiosInstance(token).post("/transformation-maps/create", data)
        revalidatePath("/transformation-map")
        return response.data
    }catch(error){
        console.error("Error creating transformation map:", error)
        throw error
    }
}
export const getTransformationMapRules = async (token: string, transformationMapId: string) => {
    try{
        const response = await axiosInstance(token).get(`/transformation-maps/rules/${transformationMapId}`)
        return response.data.transformationRules
    }catch(error){
        console.error("Error getting transformation map rules:", error)
        throw error
    }
}

