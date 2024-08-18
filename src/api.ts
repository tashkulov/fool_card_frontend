import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        // Authorization: localStorage.getItem('authorization')
        Authorization:'247a78d883d424869b1bb9c3897fea7186ed0786694927dd'
    }
});


