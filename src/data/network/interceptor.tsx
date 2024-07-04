import axios from 'axios';

axios.interceptors.request.use(
    config => {
        config.url = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}${config.url}`;
        config.headers.Authorization=`Bearer ${sessionStorage.getItem("std-db-token")}`;
        config.withCredentials=false;
        return config;
    },
    error => {
        return error;
    }
)

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return error.response;
    }
)


