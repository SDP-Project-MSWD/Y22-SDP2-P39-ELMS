import axios from 'axios';

export const API = axios.create();

API.interceptors.request.use(
    function (config){
        const access_token = sessionStorage.getItem('accessToken');
        config.headers = {
            "Authorization": `Bearer ${access_token}`,
        };

        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    function(response){
        return response;
    }
    ,
    function(error){
        return Promise.reject(error);
    }
);

export default API;