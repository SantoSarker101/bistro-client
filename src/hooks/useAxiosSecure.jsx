import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
 // Assuming you have an AuthContext


 const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
//   const [axiosSecure, setAxiosSecure] = useState(null);
  const { logOut } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    // Create Axios instance with base URL
    // const instance = axios.create({
    //   baseURL,
    // });

    // Add request interceptor to inject authorization header before each request
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle 401 and 403 responses
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Logout the user
          await logOut();

          // Redirect to the login page
          navigate('/login');
        }

        return Promise.reject(error);
      }
  );

    // setAxiosSecure(axiosSecure);
    // (axiosSecure);

    // Cleanup function
    // return () => {
    //   // Remove interceptors to avoid memory leaks
    //   axiosSecure.interceptors.request.eject();
    //   axiosSecure.interceptors.response.eject();
    // };
  }, [ logOut, navigate ]);

  // Return axiosSecure outside the useEffect
  return [axiosSecure];
};

export default useAxiosSecure;
