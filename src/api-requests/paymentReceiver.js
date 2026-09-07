import React, { useState } from 'react';
import apiClient from "../api/apiClient";


//Axios API calls - POST
const paymentDataReceiver = async (resource, paymentInfo) => {

  try {
    const response = await apiClient.post(resource, paymentInfo);    
    return response;
  } catch (error) {  
    throw new Response (
      error.response?.data?.errorMessage ||
        error.message ||
        "Payment failed, Please try again.",
      { status: error.status || 500 }
    );
  }  
};
 
export const receivePaymentData = paymentInfo => {
    return paymentDataReceiver('/payment/create-payment-intent', paymentInfo);  
}