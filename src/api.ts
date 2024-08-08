import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        // Authorization: localStorage.getItem('authorization')
        Authorization:'0b8546a656fea16572ad1a13710f728feab9b144d33aa3a6'
    }
});


