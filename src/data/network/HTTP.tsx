import axios from 'axios';

import ApiResponseModel from '../../model/api_response';

function HTTP () {}

HTTP.API_URL = `https://quizappv2.onrender.com/api`;

HTTP.GET = async (endpoint:string):Promise<ApiResponseModel> => {
    console.log("Request # ",endpoint);
    try {
        var result = await axios.get(endpoint );
        console.log("Response # ",result.data);
        HTTP.SESSIONSTATUS(result.status);
        return new ApiResponseModel({status:result.status,data:result.data,msg:result.statusText});
    } catch (error) {
        return new ApiResponseModel({status:500,data:undefined,msg:"Something went wrong!"});
    }
}

HTTP.POST = async (endpoint:string, payload:any):Promise<ApiResponseModel> => {
    console.log("Request # ",endpoint,payload);
    try {
        var result = await axios.post(endpoint,payload );
        console.log("Response # ",result.data);
        HTTP.SESSIONSTATUS(result.status);
        return new ApiResponseModel({status:result.status,data:result.data,msg:result.statusText});
    } catch (error) {
        return new ApiResponseModel({status:500,data:undefined,msg:"Something went wrong!"});
    }
}

HTTP.MULTIMEDIA = async (endpoint:string, payload:any):Promise<ApiResponseModel> => {
    console.log(endpoint,payload);
    try {
        var result = await axios.post(endpoint,payload );
        HTTP.SESSIONSTATUS(result.status);
        return new ApiResponseModel({status:result.status,data:result.data,msg:result.statusText});
    } catch (error) {
        return new ApiResponseModel({status:500,data:undefined,msg:"Something went wrong!"});
    }
}

HTTP.SESSIONSTATUS = async (status:number) => {
    console.log(status,window.location);
    if(status===403) {
        localStorage.clear();
        sessionStorage.clear();
        // alert("Your session is out. Try to login again");
        window.location.replace(window.location.origin);
    }
}


export default HTTP;