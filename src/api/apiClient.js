import axios from "axios";
import Cookies from "js-cookie";

// Creating instance of axios
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout:10000,
    withCredentials: true, // Instruction to browser to attach all the cookies to the request
});

apiClient.interceptors.request.use(
  async (config) => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const arr = jwtToken?.split(",");
    let newToken="";
    if(arr != null){
      newToken=arr[0]?.substring(13).replaceAll('"', '');
    }
    
    if (jwtToken) {      
      config.headers.Authorization = `Bearer ${newToken}`;
    }
    // Only fetch CSRF token for non-safe methods
    const safeMethods = ["Get","HEAD", "OPTIONS"];
    if(!safeMethods.includes(config.method.toUpperCase())) {
      let csrfToken = Cookies.get("XSRF-TOKEN");
      if(!csrfToken) {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/csrf-token`, {
          withCredentials: true,
        });
        csrfToken = Cookies.get("XSRF-TOKEN");
        if(!csrfToken) {
          throw new Error("Failed to retrieve CSRF token from cookies");
        }
      }
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if(error.response && error.response.status === 401) {
      const jwtToken = sessionStorage.getItem("jwtToken");
      if(jwtToken) {
        localStorage.removeItem("jwtToken");
        window.location.href="/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;