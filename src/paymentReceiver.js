import React, { useState } from 'react';
import apiClient from "./api/apiClient";


//Axios API calls - POST
const paymentDataReceiver = async (resource, paymentInfo) => {
 
 // let resultResponse = {errMessage: '', data: {}}

  try {
    const response = await apiClient.post(resource, paymentInfo);   
    //const { clientSecret } = response.data; 
   //debugger;  
    return response;
  } catch (error) {
    //const {data} = error.response;
    /*if (status === 401) {
      //return { success: false, errors: {message: "Invalid username or password"}, };
      return { success: false, errors: error.response?.data };
    }*/
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