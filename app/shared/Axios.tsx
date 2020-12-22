import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonConstants from '@shared/consts/CommonConstants';

const AxiosClient = Axios.create({
    baseURL: 'https://colo-auth.azurewebsites.net'
});
AxiosClient.interceptors.response.use(response => {
    return response?.data;
});
AxiosClient.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem(CommonConstants.tokenKey);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
export default AxiosClient;
