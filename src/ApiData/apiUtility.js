import axios from "axios";
import environment from "./environment";

export const HttpService = async (url, method, insrtData = null, edtID = null, edtData = null, SlctDltId = null) => {
    const storageValue = JSON.parse(localStorage.getItem('access_token'));
    
    const hdrSctn = {
        headers: {
            Authorization: `Bearer ${storageValue}`,
            'Content-Type' : 'application/json' 
        }
    };
    switch (method) {
        case "GET": 
            const getRequestUrl = edtID ? `${environment.apiBaseUrl}${url}/${edtID}` : `${environment.apiBaseUrl}${url}`; 
            console.log("url", environment.apiBaseUrl+url, `${environment.apiBaseUrl}${url}`, getRequestUrl)
            try {
                const resp = await axios.get(getRequestUrl, hdrSctn);
                return resp.data;
            } catch (error) {
                return handleError(error);
            }

        case "PUT":
            const putRequestUrl = `${environment.apiBaseUrl}${url}/${edtID}`;
            try {
                const resp_1 = await axios.put(putRequestUrl, edtData, hdrSctn);
                return resp_1.data;
            } catch (error_2) {
                return handleError(error_2);
            }

        case "POST":
            const postRequestUrl = `${environment.apiBaseUrl}${url}`;
            try {
                const resp_2 = await axios.post(postRequestUrl, insrtData, hdrSctn);
                return resp_2.data;
            } catch (error_3) {
                return handleError(error_3);
            }

        case "DELETE":
            const deleteRequestUrl = `${environment.apiBaseUrl}${url}/${SlctDltId}`;
            try {
                const resp_3 = await axios.delete(deleteRequestUrl, hdrSctn);
                return resp_3.data;
            } catch (error_4) {
                return handleError(error_4);
            }

        default:
            return Promise.reject(new Error("Invalid HTTP method"));
    }
};

const handleError = (error) => {
    if (error.response && error.response.data) {
        return error.response.data.toString();
    } else {
        return 'Something went wrong'; 
    }
};

export default  HttpService ;
