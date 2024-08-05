import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        // Authorization: localStorage.getItem('authorization')
            Authorization:'dbafcfc84bfb6664a46cf72e8285bb5b19ac621e0555ae72'
    }
});


