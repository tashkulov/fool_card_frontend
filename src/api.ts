import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        // Authorization: localStorage.getItem('authorization')
        Authorization:'2b40590d9788c9737b94207f340715cb0b11d09ac4643bf8'
    }
});


