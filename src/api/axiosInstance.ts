import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5286/api'
})

export default axiosInstance;