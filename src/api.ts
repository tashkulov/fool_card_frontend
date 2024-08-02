import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        // Authorization: localStorage.getItem('authorization')
        Authorization:'01952c352d690981307e5ef18a4aa703eaf3761a5ded39d4'
    }
});


