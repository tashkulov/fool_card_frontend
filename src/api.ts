import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        Authorization: localStorage.getItem('authorization')
        // Authorization:'6cc521bac480f3ad0ba0fa9a5f29dff1eae810a5b3a12bb3'
    }
});


