import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        Authorization: "8a32ef2bbe025a150047f8ff474b0d380c7f14ce2d7e03e4"
    }
});


