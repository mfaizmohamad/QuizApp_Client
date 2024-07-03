import axios from 'axios';

import HTTP from './HTTP';

axios.interceptors.request.use(
    config => {
        config.url = `${HTTP.API_URL}/${config.url}`;
        config.headers.Authorization=`Bearer ${localStorage.getItem("token")}`;
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


