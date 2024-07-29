import axios from "axios";
// import { useCookies } from 'react-cookie';

// const [cookies] = useCookies(['authorization']);
export const $api = axios.create({
    baseURL: "https://foolcard2.shop",

    
    headers: {
        Authorization: "f73b5b81a793775af51ff8ea1eaa487704c6a3f167326bf6"
    }
});


