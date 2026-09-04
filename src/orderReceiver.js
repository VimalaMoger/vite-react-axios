import React, { useState } from 'react';
import apiClient from "./api/apiClient";


//Axios API calls - POST
const orderDataReceiver = async (resource, orderInfo) => {
 
 // let resultResponse = {errMessage: '', data: {}}

  try {
    const response = await apiClient.post(resource, orderInfo);   
   // debugger;  
    return { success: true, response };
  } catch (error) {
    const {status, data} = error.response;
    if (status === 401) {
      //return { success: false, errors: {message: "Invalid username or password"}, };
      return { success: false, errors: error.response?.data };
    }
    throw new Response (
      error.response?.data?.errorMessage ||
        error.message ||
        "Order creation failed. Please contact support.",
      { status: error.status || 500 }
    );
  }  
};

export const receiveOrderData = orderInfo => {
    return orderDataReceiver('/orders', orderInfo);  
}