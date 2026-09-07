import React, { useState } from 'react';
import apiClient from "../api/apiClient";


//Axios API calls - GET
const orderFetcher = async (resource) => {
  
    try {
        const response = await apiClient.get(resource);        
        return response.data; 
    } catch (error) {        
        throw new Response(
            error.response?.data?.errorMessage || error.message || "Failed to fetch orders. Please try again.",
            {status: error.status || 500}
        );
    }  
};


export const getOrders = () => {
    return orderFetcher("/orders");
}