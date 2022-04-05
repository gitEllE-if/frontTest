import axios from 'axios';

function sendRequest() {
    const axiosSettings = {
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL: process.env.VUE_APP_BASE_URL,
        crossdomain: true
    }
    return axios.create(axiosSettings);
}

export const instance = sendRequest();