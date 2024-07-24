import axios from "axios";


export const $api = axios.create({
    baseURL: "http://77.222.37.34:8001",
    headers: {
        Authorization: "a76ebbfebe37774fa03f277bc4d3ea14fea16a24c117271f"
    }
});
