import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const baseUrl = "http://localhost:5000";
const axiosSecure = axios.create({
  baseURL: baseUrl,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);
  return [axiosSecure];
};

export default useAxiosSecure;
