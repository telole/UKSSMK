import axios from "axios";
const token = localStorage.getItem("token");

const links = axios.create({
    baseURL : 'http://localhost:8000/api',
    headers: {
        'Accept' : 'Application/json',
        'content-type': 'Application/json',
        'Authorization' : "Bearer " + token
    },
});

export {links};