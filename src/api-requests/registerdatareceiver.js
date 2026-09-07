import React, { useState } from 'react';
import apiClient from "../api/apiClient";


//Axios API calls - POST
const registerdatareceiver = async (resource, registerInfo) => {

  try {
    const response = await apiClient.post(resource, registerInfo);    
    return { success: true };
  } catch (error) {    
    const {status, data} = error.response;
    if (status === 400) {
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