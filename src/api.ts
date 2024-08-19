import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        Authorization: localStorage.getItem('authorization')
        // Authorization:'2375d6c3284f6bfc5ea4c6f664146403fedf8e60c63330c5'
    }
});


