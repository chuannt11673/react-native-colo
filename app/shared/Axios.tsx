import Axios from "axios";
import * as SecureStore from 'expo-secure-store';

const MY_SECURE_AUTH_STATE_KEY = 'TokenKey';
const AxiosClient = Axios.create({
    baseURL: 'https://colo-auth.azurewebsites.net',
    timeout: 3000
});
AxiosClient.interceptors.request.use(async config => {
    const token = await SecureStore.getItemAsync(MY_SECURE_AUTH_STATE_KEY);
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});
AxiosClient.interceptors.response.use((response: any) => {
    return response?.data;
});
export default AxiosClient;