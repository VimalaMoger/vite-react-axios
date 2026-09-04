import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export default function ProtectedRoute() {

    const { getAuthItems } = useAuth();
    const location = useLocation();
    const isAuthenticated = getAuthItems()[0]?.isAuthenticated;
    console.log("isAuthenticated ", isAuthenticated);
    
    useEffect(() => {
        //debugger;
        const skipRedirect =  sessionStorage.getItem("skipSavedPage") === "true";
        if((isAuthenticated) && (location.pathname !== "/login" && !skipRedirect)){
            sessionStorage.setItem("savedPage", location.pathname);
        }
    }, [getAuthItems, location.pathname]);
  
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
}