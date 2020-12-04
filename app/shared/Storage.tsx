import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosClient from './Axios';

const userInfoKey = 'userInfo';
export const storeUserInfo = async () => {
    const response : any = await AxiosClient.get('/connect/userinfo');
    const value = JSON.stringify(response);
    AsyncStorage.setItem(userInfoKey, value);
}
export const getUserInfo = async () => {
    const value = await AsyncStorage.getItem(userInfoKey);
    return JSON.parse(value ?? '');
}
export const clear = () => {
    AsyncStorage.clear();
}