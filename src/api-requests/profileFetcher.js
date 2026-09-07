import React, { useState } from 'react';
import apiClient from "../api/apiClient";


//Axios API calls - GET
const profileFetcher = async (resource) => {
 
    try {
        const response = await apiClient.get(resource);        
        return response;
    } catch (error) {
        throw new Response(
            error.response?.data?.errorMessage || error.message || "Failed to fetch profile details. Please try again.",
            {status: error.status || 500}
        );
    }  
};


export const getProfile = () => {
    return profileFetcher("/profile");
}