import axios from "axios";


export const $api = axios.create({
    baseURL: "https://foolcard2.shop",
    headers: {
        Authorization: "a76ebbfebe37774fa03f277bc4d3ea14fea16a24c117271f"
    }
});
