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

export function unauthorizedInterceptor(callback: any) {
    AxiosClient.interceptors.response.use((response: any) => {
        return response?.data;
    }, async err => {
        if (err?.response?.status === 401) {
           callback();
           return;
        }
        throw err;
    });
}
export default AxiosClient;