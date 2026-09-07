import React, { useState } from 'react';
import apiClient from "../api/apiClient";


//Axios API calls - POST
const profiledatareceiver = async (resource, profileInfo) => {

  try {
    const response = await apiClient.put(resource, profileInfo);      
    return { success: true, profileData: response.data};
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

export const saveProfileData = profileInfo => {
    return profiledatareceiver('/profile', profileInfo);
}