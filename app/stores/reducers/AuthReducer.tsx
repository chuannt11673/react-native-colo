import { SIGNIN, SIGNOUT, RETRIEVE_TOKEN } from '@stores/actions/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserInfo {
    token: string | null;
    username: string | null;
    isLoading: boolean;
};

const AuthReducer = (state = { token: null, username: null, isLoading: true }, action: { type: string, data: UserInfo }) => {
    switch (action.type) {
        case SIGNIN:
            return {
                ...action.data,
                isLoading: false
            };
        case SIGNOUT:
            return {
                username: null,
                token: null,
                isLoading: false
            };
        case RETRIEVE_TOKEN:
            return {
                username: '',
                token: action.data.token,
                isLoading: false
            };
        default:
            return state;
    }
};

// actions
export const signIn = async (userInfo: UserInfo) => {
    await AsyncStorage.setItem('access_token', userInfo.token ?? '');
    return {
        type: SIGNIN,
        data: userInfo
    };
};
export const signOut = async () => {
    await AsyncStorage.removeItem('access_token');
    const userInfo : UserInfo = {
        username: null,
        token: null,
        isLoading: false
    };
    return {
        type: SIGNOUT,
        data: userInfo
    };
};
export const retrieveToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    return {
        type: SIGNIN,
        data: {
            username: '',
            token: token
        }
    };
};

export default AuthReducer;