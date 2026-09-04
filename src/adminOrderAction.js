import React, { useState } from 'react';
import apiClient from "./api/apiClient";



//Axios API calls - GET
const adminOrderAction = async (resource) => {
 
    //let resultResponse = {errMessage: '', data: []}
    try {
        //debugger;
        const response = await apiClient.patch(resource);        
        //resultResponse.errMessage = '';
        //resultResponse.data = response.data;
        return response.data; 
    } catch (error) {
        throw new Response(
            error.response?.data?.errorMessage || error.message || "Failed to fetch orders. Please try again.",
            {status: error.status || 500}
        );
        //resultResponse.errMessage = error.response?.data?.message || "Failed to fetch products. Please try again."
        //return resultResponse;
    }  
};

export const performAdminAction = (pathInfo) => {
    return adminOrderAction('/admin/orders'+ pathInfo);
}

export const closeMessage = (pathInfo) => {
    return adminOrderAction('/admin/messages'+ pathInfo)
}