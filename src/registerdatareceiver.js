import React, { useState } from 'react';
import apiClient from "./api/apiClient";


//Axios API calls - POST
const registerdatareceiver = async (resource, registerInfo) => {
 
 // let resultResponse = {errMessage: '', data: {}}

  try {
    const response = await apiClient.post(resource, registerInfo);    
   // debugger;  
    return { success: true };
  } catch (error) {
    const {status, data} = error.response;
    if (status === 400) {
      //return { success: false, errors: {message: "Invalid username or password"}, };
      return { success: false, errors: error.response?.data };
    }
    throw new Response (
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }  
};

export const saveRegisterData = registerInfo => {
    return registerdatareceiver('/auth/register', registerInfo);
}