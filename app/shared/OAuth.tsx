import { AuthRequestConfig, makeRedirectUri } from "expo-auth-session";
import AxiosClient from "./Axios";
import { TokenResponse } from "@shared/interfaces/TokenResponse";
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

export const MY_SECURE_AUTH_STATE_KEY = 'TokenKey';
export const clientId = 'dev';
export const scopes = ['openid', 'profile', 'WebAppAPI'];
export const responseType = 'id_token token';
export const redirectUri = makeRedirectUri({
    native: 'colo.app://redirect',
    preferLocalhost: true
});
export const discovery = {
    authorizationEndpoint: 'https://colo-auth.azurewebsites.net/connect/authorize'
};
export const googleConfig: AuthRequestConfig = {
    clientId,
    scopes,
    responseType,
    redirectUri,
    extraParams: {
        nonce: 'abz' // implicit flow need nonce
    }
};
export const facebookConfig: AuthRequestConfig = {
    clientId,
    scopes,
    responseType,
    redirectUri,
    extraParams: {
        provider: 'Facebook',
        nonce: 'abz' // implicit flow need nonce
    }
};
export const signIn = async (username: string, password: string) => {
    const form = new FormData();
    form.append('client_id', 'spa');
    form.append('grant_type', 'password');
    form.append('scope', 'openid profile WebAppAPI');
    form.append('username', username);
    form.append('password', password);
    const state: TokenResponse = await AxiosClient.post('/connect/token', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return state;
};
export const signOut = async () => {
    await WebBrowser.openAuthSessionAsync('https://colo-auth.azurewebsites.net/api/Identity/logout?returnUrl=' + redirectUri, redirectUri);
};