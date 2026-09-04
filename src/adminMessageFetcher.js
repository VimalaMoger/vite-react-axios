import React, { useState } from 'react';
import apiClient from "./api/apiClient";



//Axios API calls - GET
const adminMessageFetcher = async (resource) => {
 
    //let resultResponse = {errMessage: '', data: []}
    try {
        const response = await apiClient.get(resource);        
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


export const getMessages = () => {
    return adminMessageFetcher("/admin/messages");
}