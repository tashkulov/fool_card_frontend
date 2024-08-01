import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        // Authorization: localStorage.getItem('authorization')
        Authorization:'d2ab280a297f92a9c5806cee2f4a1a71ee928274e0bbad5c'
    }
});


