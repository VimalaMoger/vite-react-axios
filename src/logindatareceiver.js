import React, { useState } from 'react';
import apiClient from "./api/apiClient";


//Axios API calls - POST
const logindatareceiver = async (resource, loginInfo) => {
 
 // let resultResponse = {errMessage: '', data: {}}

  try {
    const response = await apiClient.post(resource, loginInfo);   
    const { message, userDto, jwtToken } = response.data; 
   // debugger;  
    return { success: true, message, userDto, jwtToken };
  } catch (error) {
    const {status, data} = error.response;
    if (status === 401) {
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

export const saveLoginData = loginInfo => {
    return logindatareceiver('/auth/login', loginInfo);  // returns message, userDto, jwtToken
}