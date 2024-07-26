import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    // headers: {
    //     Authorization: cookies.authorization
    // }
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})
