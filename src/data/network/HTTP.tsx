import axios, {AxiosResponse} from 'axios';

import {toast} from 'react-toastify';

import ApiResponseModel from '../../model/api_response';

function HTTP() {
}

HTTP.GET = async (endpoint: string): Promise<AxiosResponse> => {
    try {
        return await axios.get(endpoint);
    } catch (error) {
        throw error;
    }
}

HTTP.LOGIN = async (endpoint: string, payload: any): Promise<AxiosResponse> => {
    await axios.post(endpoint, payload)
        .then((response) => {
            console.log('header ' + response.headers.authorization)
            if (response.headers.authorization) {
                sessionStorage.setItem("std-db-token", response.headers.authorization);
            }
        })
        .catch((error) => {
            throw error;
        });
}

HTTP.POST = async (endpoint: string, payload: any): Promise<AxiosResponse> => {
    console.log("Request # ", endpoint, payload);
    try {
        return await axios.post(endpoint, payload);
    } catch (error) {
        throw error;
    }
}

HTTP.MULTIMEDIA = async (endpoint: string, payload: any): Promise<ApiResponseModel> => {
    console.log("Request # ", endpoint, payload);
    try {
        var result = await axios.post(endpoint, payload);
        HTTP.SESSIONSTATUS(result.status);
        console.log("Response # ", result.data);
        return new ApiResponseModel({status: result.status, data: result.data, msg: result.statusText});
    } catch (error) {
        return new ApiResponseModel({status: 500, data: undefined, msg: "Something went wrong!"});
    }
}

HTTP.SESSIONSTATUS = async (status: number) => {
    if (status === 403) {
        sessionStorage.clear();
        sessionStorage.clear();
        toast.error("Your session is out. Try to login again");
        window.location.replace(window.location.origin);
    }
}


export default HTTP;