import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        Authorization: localStorage.getItem('authorization')
        // Authorization:'800b09f92a0e629a6867ffa47799e2d11d006f6dff5e74c7'
    }
});


