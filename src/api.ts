import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        Authorization: localStorage.getItem('authorization')
        // Authorization:'1c69128c0151373b38d6729366e8264f279f2cad58b3e283'

    }
});


