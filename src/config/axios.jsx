import axios from "axios";

const ClienteAxios = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_URL}`
});

export default ClienteAxios;