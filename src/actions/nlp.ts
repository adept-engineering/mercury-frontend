import {  axiosLocal } from "../lib/axios";

const BASEROUTE = "/nlp";
export const getAllFormats = async () => {
    const response = await axiosLocal.get(`${BASEROUTE}/formats`);
    return response.data;
}

export const getVersionByFormat = async (format: string) => {
    const response = await axiosLocal.get(`${BASEROUTE}/version/${format}`);
    return response.data.data;
}

export const getTransactionSetByVersion = async (version: string, agency: string) => {
    const response = await axiosLocal.get(`${BASEROUTE}/transactionset/${version}/${agency}`);
    return response.data;
}
export const getSegmentByTransactionSet = async (transactionSet: string, version: string, agency: string) => {
    const response = await axiosLocal.get(`${BASEROUTE}/segment/${transactionSet}/${version}/${agency}`);
    return response.data.data;
}
export const getElementBySegment = async (segment: string, version: string, agency: string, tenant_id: string) => {
    const response = await axiosLocal.get(`${BASEROUTE}/element/${segment}/${version}/${agency}?tenant_id=${tenant_id}`);
    return response.data.data;
}

export const setElementBySegment = async (segment: string, version: string, agency: string, tenant_id: string, elements: any) => {
    const response = await axiosLocal.post(`${BASEROUTE}/element/${segment}/${version}/${agency}?tenant_id=${tenant_id}`, { elements });
    return response.data.data;
}