import React, { useState } from 'react';
import apiClient from "../api/apiClient";



//Axios API calls - GET
const fetcher = async (resource) => {
 
    let resultResponse = {errMessage: '', data: []}
    try {
        const response = await apiClient.get(resource);        
        resultResponse.errMessage = '';
        resultResponse.data = response.data;
        return resultResponse; 
    } catch (error) {
        throw new Response(
            error.response?.data?.errorMessage || error.message || "Failed to fetch products. Please try again.",
            {status: error.status || 500}
        );
        //resultResponse.errMessage = error.response?.data?.message || "Failed to fetch products. Please try again."
        //return resultResponse;
    }  
};


export const getProducts = () => {
    return fetcher("/products");
}

export const getProductById = id => {
    return fetcher('/products/' +  id);
}

export const getProductsByQuery = query =>{
    return fetcher('/products?q=' + query)
}