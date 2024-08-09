import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        Authorization: localStorage.getItem('authorization')
        // Authorization:'d68060df4fff4bd1436511f383692c674fb7a8710f67f4f1'
    }
});


