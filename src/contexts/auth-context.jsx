import { createContext, useEffect, useContext, useReducer } from "react";
import { AuthReducer } from "./auth-reducer";

export const AuthContext = createContext();

// Custom hook name
export const useAuth = () => useContext(AuthContext);

//SessionStorage to store within browser
const StorageGetAuth  = sessionStorage.getItem('jwtToken') ? JSON.parse(sessionStorage.getItem('jwtToken')) : [];

const initialState = { authItems: StorageGetAuth };

// Action types
const LOGIN_SUCCESS ="LOGIN_SUCCESS";
const LOGOUT ="LOGOUT";

export const AuthContextProvider = ({children}) => {
  
    const [state, dispatch] = useReducer(AuthReducer, initialState);
  
    // Action creators
    const loginSuccess = (jwtToken, user) => {
        dispatch({ type: LOGIN_SUCCESS, payload: { jwtToken, user } });
        return state.authItems;
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
        return state.authItems;
    }; 

    const getAuthItems =() => {
        return state.authItems;
    }

    const contextValues = {      //expose these methods to Provider
        loginSuccess, logout, getAuthItems,
        ...state
    }

    return(
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

