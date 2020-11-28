import Axios, { AxiosInstance } from "axios";

const AxiosClient = Axios.create({
    baseURL: 'http://colo-auth.azurewebsites.net',
    timeout: 3000
});
AxiosClient.interceptors.response.use((response: any) => {
    return response?.data;
});
export default AxiosClient;