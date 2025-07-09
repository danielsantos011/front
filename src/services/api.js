import axios from "axios";


const api = axios.create({
    baseURL: 'https://api-5hip.onrender.com'
})

export default api